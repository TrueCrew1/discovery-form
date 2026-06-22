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

export default async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return jsonResponse({ ok: false, error: 'Method not allowed' }, 405);
  }

  const apiKey = Netlify.env.get('RESEND_API_KEY');
  const toEmail = Netlify.env.get('DISCOVERY_TO_EMAIL') || 'contact@truecrewllc.com';
  const fromEmail = Netlify.env.get('DISCOVERY_FROM_EMAIL') || 'TrueCrew Discovery <onboarding@resend.dev>';

  if (!apiKey) {
    console.error('Missing RESEND_API_KEY');
    return jsonResponse({ ok: false, error: 'Email service is not configured.' }, 500);
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

  const replyTo = payload._replyto || payload.Email;
  const textBody =
    payload['Full Gap Report'] ||
    formatFieldLines(payload);

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: replyTo,
      subject,
      text: textBody,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('Resend error:', errorText);
    return jsonResponse({ ok: false, error: 'Failed to send discovery email.' }, 502);
  }

  return jsonResponse({ ok: true });
};
