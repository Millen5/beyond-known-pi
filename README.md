# BEYOND THE KNOWN — Testnet Preview

This branch, `testnet-hosting`, is the separate Testnet preview deployment. It is not the Mainnet deployment.

## Live Testnet preview

- URL: https://beyond-known-pi.pages.dev/
- Hosting: Cloudflare Pages
- GitHub repository: `Millen5/beyond-known-pi`
- Production branch: `testnet-hosting`
- Build command: none (static site)
- Output directory: repository root

The Cloudflare Pages project deploys this Testnet branch. The existing GitHub Pages configuration and `main` branch have not been changed.

## Current state

- Responsive static website for desktop and mobile.
- Topic links to the BEYOND THE KNOWN Blogger publication.
- Explicit Testnet Preview banner to distinguish this branch from Mainnet.
- Pi App sign-in in the Testnet Pi Browser uses the official Pi SDK: `Pi.init({ version: "2.0", sandbox: true })` followed by `Pi.authenticate(["username"], ...)`.
- The frontend sends the returned access token to the Cloudflare Pages Function at `/api/pi/verify`.
- The Pages Function checks the token against Pi Platform API `GET https://api.minepi.com/v2/me`, then issues a Secure, HttpOnly session cookie after successful verification.
- The `/api/pi/session` endpoint revalidates the session token with Pi before restoring the signed-in UI; `/api/pi/logout` clears the cookie.
- This remains a Testnet identity preview, not a full user-account or membership system. Do not use it to authorize paid access until the account and entitlement model has been reviewed and tested.
- Payments, wallet transactions, memberships and user data storage are not enabled.
- No wallet passphrase, private key, or Server API Key is requested or stored in the browser code.

## Files

- `index.html` — Testnet preview homepage and Pi Sign-In entry point.
- `privacy.html` — privacy information for the current static version.
- `functions/api/pi/verify.js` — Cloudflare Pages Function that verifies the access token with Pi.
- `validation-key.txt` — Pi Developer Portal domain-validation file. Preserve it; do not publish its contents in documentation or remove it without a specific reason.
- `404.html` — custom not-found page.
- `robots.txt` — crawler guidance.
- `tests/test_static_site.py` — automated static-site and integration-structure checks.
- `.github/workflows/testnet-checks.yml` — automated checks for the Testnet branch.
- `TESTNET_RELEASE_CHECKLIST.md` — release preparation checklist.

## Pi integration and safety

The Testnet Pi App uses the Pi SDK authentication flow documented for apps running inside Pi Browser. The access token returned by `Pi.authenticate()` is verified server-side through Pi's `/v2/me` endpoint. A successful Pi approval screen alone is not proof that backend verification succeeded; the site displays the signed-in state only after the verification endpoint responds successfully.

The previous website OAuth redirect flow is not used for the in-app Testnet login because the OAuth Sign-In guide is intended for ordinary browsers with authentication taking place in Pi Browser. A fresh repeat test and negative-path tests (cancelled approval, invalid token and network failure) remain part of release validation.

The current verification endpoint does not create a server-side login session or persistent account. Do not add protected membership, paid access, or other authorization based solely on client-side session storage.

Payments and wallet transactions are not implemented. If added later, the Pi Server API Key must remain server-side and payment approval/completion must be verified server-side. Never request or collect a visitor's Pi Wallet passphrase.

Official references:
- [Pi Sign-In guide](https://developers.minepi.com/docs/use-native-features/PiSignIn)
- [Pi Platform API](https://developers.minepi.com/docs/api-reference/PlatformAPI)
- [Getting Started](https://developers.minepi.com/docs/build-first-app/GettingStarted)

## Mainnet protection

Do not switch the existing GitHub Pages publishing source to `testnet-hosting`, and do not merge this branch into `main` as part of Testnet deployment. Keep Testnet and Mainnet app configuration, URLs, and credentials separate.

## Publication

https://beyondknownstories.blogspot.com/
