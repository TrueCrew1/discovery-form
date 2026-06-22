TrueCrew Discovery Form

Static Operations Gap Finder for TrueCrew, deployed on Netlify with a serverless email handler.

Project structure

index.html
netlify.toml
netlify/functions/discovery-email.mjs
.env.example

Local setup





Copy environment variables:

 cp .env.example .env



Add the same variables in the Netlify site dashboard under Site configuration → Environment variables.



Run locally:

 npx netlify dev

Deploy

Connect this repository to Netlify or deploy manually:

npx netlify deploy --prod

Email flow

Form submissions POST to /.netlify/functions/discovery-email, which sends the full gap report through Resend.

Required Netlify env vars:





RESEND_API_KEY



DISCOVERY_TO_EMAIL



DISCOVERY_FROM_EMAIL


