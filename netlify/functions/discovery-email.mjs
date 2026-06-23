const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Accept',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  });
}

function formatFieldLines(payload) {
  return Object.entries(payload)
    .filter(([key]) => !key.startsWith('_'))
    .map(([key, value]) => `${key}: ${value ?? '—'}`)
    .join('\n');
}

const isEmail = (v) => typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

export default async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return jsonResponse({ ok: false, error: 'Method not allowed' }, 405);
  }

  const apiKey = Netlify.env.get('RESEND_API_KEY');
  const toEmail = (Netlify.env.get('DISCOVERY_TO_EMAIL') || 'contact@truecrewllc.com').trim();
  const fromEmail = (Netlify.env.get('DISCOVERY_FROM_EMAIL') || 'TrueCrew Discovery <onboarding@resend.dev>').trim();

  if (!apiKey) {
    console.error('Missing RESEND_API_KEY');
    return jsonResponse({ ok: false, error: 'Email service is not configured (RESEND_API_KEY missing).' }, 500);
  }

  let payload;
  try {
    payload = await req.json();
  } catch {
    return jsonResponse({ ok: false, error: 'Invalid JSON payload.' }, 400);
  }

  const subject =
    payload._subject ||
    `[TrueCrew Discovery] ${payload['Lead Score'] || 'NEW LEAD'} — ${payload.Name || 'Unknown'} @ ${payload.Company || 'Unknown'}`;

  // Only set reply_to when it's a valid email — Resend rejects an invalid value.
  const replyCandidate = payload._replyto || payload.Email;
  const replyTo = isEmail(replyCandidate) ? replyCandidate.trim() : undefined;

  const textBody = payload['Full Gap Report'] || formatFieldLines(payload);

  const emailBody = {
    from: fromEmail,
    to: [toEmail],
    subject,
    text: textBody,
  };
  if (replyTo) emailBody.reply_to = replyTo;

  let res;
  try {
    res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailBody),
    });
  } catch (err) {
    console.error('Resend request failed:', err);
    return jsonResponse({ ok: false, error: 'Could not reach the email service.' }, 502);
  }

  if (!res.ok) {
    const errorText = await res.text();
    console.error(`Resend error (${res.status}):`, errorText);

    // Surface the real reason so failures are diagnosable from the browser, not just logs.
    let detail = errorText;
    try {
      const parsed = JSON.parse(errorText);
      detail = parsed.message || parsed.error || errorText;
    } catch {
      /* keep raw text */
    }

    return jsonResponse(
      {
        ok: false,
        error: 'Failed to send discovery email.',
        status: res.status,
        detail,
      },
      502,
    );
  }

  return jsonResponse({ ok: true });
};
