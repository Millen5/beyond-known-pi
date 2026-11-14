# BEYOND THE KNOWN — Testnet Preview

This branch, `testnet-hosting`, is a separate preview build intended for Pi Testnet preparation and review. It is not the Mainnet deployment.

## Current state

- Responsive static website for desktop and mobile.
- Topic links to the BEYOND THE KNOWN Blogger publication.
- Explicit Testnet Preview banner to distinguish this branch from Mainnet.
- Pi authentication, payments, wallet transactions, and memberships are not active.
- No wallet passphrase, private key, or secret is requested or stored by this static site.

## Files

- `index.html` — Testnet preview homepage.
- `privacy.html` — privacy information for the current static version.
- `signin/callback.html` — OAuth callback scaffold only; not production-ready and must not be treated as an active sign-in integration.
- `validation-key.txt` — Pi Developer Portal domain-validation file. Preserve it; do not publish its contents in documentation or remove it without a specific reason.

## Hosting note

GitHub Pages for a repository uses one configured publishing source at a time. The existing Mainnet site uses the `main` branch. Do not switch that publishing source to `testnet-hosting`, because doing so could replace the Mainnet website.

A separate Testnet deployment needs a separate hosting project or a separate repository/site. Cloudflare Pages setup has not yet been completed. The free GitHub Pages project URL for the Mainnet site is not automatically a separate verified Testnet domain.

## Pi integration and safety

Pi authentication and payments are not implemented in this static preview. A secure server-side integration, correct Testnet app configuration, registered redirect URI, and end-to-end tests are required before enabling them. Never request or collect a visitor's Pi Wallet passphrase.

## Publication

https://beyondknownstories.blogspot.com/
