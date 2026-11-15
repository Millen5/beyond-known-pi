# BEYOND THE KNOWN — Testnet Preview

This branch, `testnet-hosting`, is the separate Testnet preview deployment. It is not the Mainnet deployment.

## Live Testnet preview

- URL: https://beyond-known-pi.pages.dev/
- Hosting: Cloudflare Pages (free project)
- GitHub repository: `Millen5/beyond-known-pi`
- Production branch: `testnet-hosting`
- Build command: none (static site)
- Output directory: repository root (`/`)

The Cloudflare Pages project is connected only to this repository. The existing GitHub Pages configuration and `main` branch were not changed.

## Current state

- Responsive static website for desktop and mobile.
- Topic links to the BEYOND THE KNOWN Blogger publication.
- Explicit Testnet Preview banner to distinguish this branch from Mainnet.
- Pi Testnet Sign-In uses the official Pi SDK and a Cloudflare Pages Function to verify access tokens with the Pi Platform API. This is an identity-verification preview only; payments, wallet transactions, and memberships are not active.
- The legacy OAuth callback route remains disabled; the homepage uses the official Pi SDK flow instead.
- No wallet passphrase, private key, or server secret is requested or stored by this static site.
- The public Testnet preview was checked after deployment. The homepage and Pi SDK readiness status loaded; Pi approval still needs a fresh end-to-end test in Pi Browser.

## Files

- `index.html` — Testnet preview homepage.
- `privacy.html` — privacy information for the current static version.
- `signin/callback.html` — disabled Pi Sign-In information page; not an active OAuth callback.
- `validation-key.txt` — Pi Developer Portal domain-validation file. Preserve it; do not publish its contents in documentation or remove it without a specific reason.
- `404.html` — custom not-found page.
- `robots.txt` — crawler guidance.
- `tests/test_static_site.py` — static-site checks.
- `.github/workflows/testnet-checks.yml` — automated checks for the Testnet branch.
- `TESTNET_RELEASE_CHECKLIST.md` — release preparation checklist.

## Pi integration and safety

Pi Sign-In is wired as a Testnet identity-verification preview using the official SDK and a server-side `/api/pi/verify` function. The UI reports when approval is pending, when a token is being verified, and if the SDK does not return within 60 seconds. End-to-end testing inside Pi Browser is still required. Payments and wallet transactions are not implemented. The Pi Server API Key must remain server-side and must never be committed or placed in browser JavaScript. Never request or collect a visitor's Pi Wallet passphrase.

The frontend SDK alone is not sufficient: the backend must verify authentication with the Pi Platform API and handle payment approval and completion securely. See the official [Pi developer documentation](https://developers.minepi.com/docs/build-first-app/GettingStarted).

## Mainnet protection

Do not switch the existing GitHub Pages publishing source to `testnet-hosting`, and do not merge this branch into `main` as part of Testnet deployment. Keep Testnet and Mainnet app configuration, URLs, and credentials separate.

## Publication

https://beyondknownstories.blogspot.com/
