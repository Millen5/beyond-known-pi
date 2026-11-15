# Testnet release checklist

## Completed
- [x] Dedicated `testnet-hosting` branch kept separate from `main`.
- [x] Cloudflare Pages Testnet project deployed at https://beyond-known-pi.pages.dev/.
- [x] Cloudflare production deployment confirmed for the current Testnet commit.
- [x] Homepage clearly identifies itself as a Testnet preview.
- [x] Existing Pi domain-validation file is preserved.
- [x] Incomplete legacy OAuth callback remains disabled.
- [x] Official Pi SDK initialization and `Pi.authenticate(["username"])` flow are present.
- [x] Cloudflare Pages Function sends the access token to Pi `/v2/me` for server-side identity verification.
- [x] Sign-in UI now has clearer progress messages and a 60-second timeout for a non-returning SDK promise.
- [x] Static-site tests and GitHub Actions checks are configured.

## Still required before declaring Pi Sign-In ready
- [ ] Confirm the Testnet app's Developer Portal URL/domain verification matches `https://beyond-known-pi.pages.dev`.
- [ ] Confirm the deployed Testnet app is configured for this exact host and Testnet environment.
- [ ] Run a fresh end-to-end approval in Pi Browser and confirm the SDK returns an access token.
- [ ] Confirm the Cloudflare Function successfully verifies the token with Pi `/v2/me`.
- [ ] Confirm the UI displays the verified Pi username and handles cancellation, timeout, invalid tokens and network failures.
- [ ] Review privacy/session handling before using Pi identity for accounts or membership.

## Payments and Mainnet
- [ ] Implement payment creation and server-side approval/completion only if the app will accept payments.
- [ ] Add replay protection, idempotency and duplicate-payment handling before any payment testing.
- [ ] Obtain the required successful Testnet App-to-User transactions to distinct wallets if applying for Mainnet outgoing-wallet capability.
- [ ] Keep Mainnet credentials and configuration separate; do not enable Mainnet payments until approved and tested.

## Important
The public Testnet site is deployed, but a successful production deployment does not prove Pi authentication works. Do not describe Pi Sign-In as complete, enable payments, or request wallet passphrases. The app must verify identity server-side before treating a Pioneer as signed in.
