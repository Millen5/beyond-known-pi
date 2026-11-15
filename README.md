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
- Pi Sign-In uses the official Pi Sign-In OAuth helper (`Pi.signIn`) with the registered Testnet client ID and callback URL.
- The callback validates the returned OAuth `state`, reads the short-lived access token from the URL fragment, removes the fragment from browser history, and sends the token to the Cloudflare Pages Function at `/api/pi/verify`.
- The Pages Function checks the token against Pi Platform API `GET https://api.minepi.com/v2/me` and returns only the verified app-specific UID and username.
- The browser displays the verified username for the current tab session. This is a Testnet identity preview, not yet a full account/session system; do not use browser session storage alone to protect private content or authorize payments.
- Payments, wallet transactions, memberships and user data storage are not enabled.
- No wallet passphrase, private key, or Server API Key is requested or stored in the browser code.

## Files

- `index.html` — Testnet preview homepage and Pi Sign-In entry point.
- `privacy.html` — privacy information for the current static version.
- `signin/callback.html` — OAuth callback, state validation and server-side identity verification request.
- `functions/api/pi/verify.js` — Cloudflare Pages Function that verifies the access token with Pi.
- `validation-key.txt` — Pi Developer Portal domain-validation file. Preserve it; do not publish its contents in documentation or remove it without a specific reason.
- `404.html` — custom not-found page.
- `robots.txt` — crawler guidance.
- `tests/test_static_site.py` — automated static-site and integration-structure checks.
- `.github/workflows/testnet-checks.yml` — automated checks for the Testnet branch.
- `TESTNET_RELEASE_CHECKLIST.md` — release preparation checklist.

## Pi integration and safety

The official Pi Sign-In OAuth flow currently uses the implicit flow. The browser must validate the returned `state` before accepting the response. The access token is then verified server-side through Pi's `/v2/me` endpoint. A successful approval screen alone is not proof that the backend verification succeeded; the final success message is shown only after the verification endpoint responds successfully.

This implementation has been exercised in Pi Browser, where the user approved the requested identity and username permissions and the site displayed a verified username. A fresh repeat test and negative-path tests (cancelled approval, invalid token, network failure and state mismatch) remain part of release validation.

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
