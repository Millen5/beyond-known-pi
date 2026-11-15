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
- Pi authentication, payments, wallet transactions, and memberships are not active.
- The Pi Sign-In callback page is a disabled information page; it does not read OAuth tokens or call Pi APIs.
- No wallet passphrase, private key, or server secret is requested or stored by this static site.
- The public Testnet preview was checked after deployment; homepage, Privacy Policy, custom 404 page, and inspected blog links loaded successfully.

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

Pi authentication and payments are not implemented in this static preview. A secure server-side integration, correct Testnet app configuration, registered redirect URI, and end-to-end tests are required before enabling them. The Pi Server API Key must remain server-side and must never be committed or placed in browser JavaScript. Never request or collect a visitor's Pi Wallet passphrase.

The frontend SDK alone is not sufficient: the backend must verify authentication with the Pi Platform API and handle payment approval and completion securely. See the official [Pi developer documentation](https://developers.minepi.com/docs/build-first-app/GettingStarted).

## Mainnet protection

Do not switch the existing GitHub Pages publishing source to `testnet-hosting`, and do not merge this branch into `main` as part of Testnet deployment. Keep Testnet and Mainnet app configuration, URLs, and credentials separate.

## Publication

https://beyondknownstories.blogspot.com/
