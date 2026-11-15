# Testnet release checklist

## Completed and observed

- [x] Dedicated `testnet-hosting` branch kept separate from `main`.
- [x] Cloudflare Pages Testnet project is publicly serving https://beyond-known-pi.pages.dev/.
- [x] Homepage clearly identifies itself as a Testnet preview.
- [x] Pi Developer Portal reports domain ownership verified for the configured Testnet URL.
- [x] Pi Sign-In is enabled and the redirect URI is configured as `https://beyond-known-pi.pages.dev/signin/callback.html`.
- [x] Official Pi Sign-In OAuth helper (`Pi.signIn`) is present in the deployed homepage.
- [x] OAuth callback validates the returned `state` before accepting the response.
- [x] Callback sends the short-lived access token to a Cloudflare Pages Function.
- [x] Pages Function verifies the token with Pi Platform API `GET /v2/me` using Bearer authorization.
- [x] User completed a Pi approval flow for authentication and username; the site displayed `Pi identity verified for @LissaFx`.
- [x] Public homepage inspection confirmed the page loads, SDK readiness message appears, and Testnet warning is visible.
- [x] Static-site tests and GitHub Actions checks are configured.

## Still required before relying on Pi Sign-In for app accounts

- [ ] Repeat a fresh sign-in after clearing the current tab session and confirm the verified username appears again.
- [ ] Test cancellation/decline and confirm the site handles it without displaying a false success.
- [ ] Test a missing or mismatched OAuth state and confirm verification is rejected.
- [ ] Test an invalid/expired access token and confirm the backend rejects it.
- [ ] Test Pi API/network failure and confirm the page shows a recoverable error.
- [ ] Add a proper server-side session mechanism before introducing protected user data, memberships or paid access.
- [ ] Review rate limiting, abuse controls, privacy notice and retention before public production use.

## Payments and Mainnet

- [ ] Payments are not implemented and must remain disabled until the complete server-side approval/completion flow is implemented and tested.
- [ ] Add replay protection, idempotency and duplicate-payment handling before any payment testing.
- [ ] Obtain the required successful Testnet App-to-User transactions to distinct wallets if applying for Mainnet outgoing-wallet capability.
- [ ] Keep Mainnet credentials and configuration separate; do not enable Mainnet payments until approved and tested.

## Important

A successful Pi approval screen is not sufficient by itself. The site should display a verified identity only after the backend validates the access token with Pi's `/v2/me` endpoint. The current browser display is a temporary identity preview, not a secure server-side account session. Never request wallet passphrases or expose a Pi Server API Key in frontend code.
