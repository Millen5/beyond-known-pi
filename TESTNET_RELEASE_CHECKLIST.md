# Testnet release checklist

## Completed in this repository branch

- [x] Dedicated `testnet-hosting` branch created from `main`.
- [x] Homepage clearly identifies itself as a Testnet preview.
- [x] Mainnet publishing source is not changed.
- [x] Existing Pi domain-validation file is preserved.
- [x] Incomplete browser-only OAuth callback disabled.
- [x] Static-site test suite and GitHub Actions workflow added.

## Still required before user testing

- [ ] Create and deploy a separate free hosting project for the Testnet branch.
- [ ] Confirm the exact public URL loads over HTTPS.
- [ ] Confirm Pi Developer Portal accepts the Testnet app's domain verification for that URL.
- [ ] Set the Testnet app's production URL and allowed OAuth redirect URI to the exact deployed URL.
- [ ] Implement official Pi authentication using a secure backend; validate tokens server-side.
- [ ] Implement payment creation and server-side completion verification only if payments are required.
- [ ] Add no secrets to the repository or browser code.
- [ ] Run the Testnet flow with test accounts and verify failure paths, replay protection, and duplicate-payment handling.
- [ ] Obtain the required Testnet A2U transactions to distinct wallets if applying for Mainnet outgoing-wallet capability.

## Important

The remaining tasks require access to the Pi Developer Portal, a working separate hosting deployment, and secure backend configuration. This repository branch alone cannot complete those external account and server-side steps. Do not describe the app as Pi-integrated or ready for payments until all checks above have passed.
