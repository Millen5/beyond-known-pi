# BEYOND THE KNOWN — Monetization Plan

## Product model

Use a freemium model: keep discovery and general educational articles accessible to everyone, then charge for genuinely additional value. Do not put basic public-interest information behind a paywall.

## Free access

- Browse the public website and general blog articles.
- Read introductory explainers and learning resources.
- Create a Pi-linked identity only after the secure account-session flow is completed and tested.
- No payment is required to use the basic site.

## Paid offers to build later

1. **Premium membership** — deeper research briefings, curated learning paths, downloadable resources and member-only educational sessions.
2. **Digital products** — original eBooks, workbooks, research reports and templates sold individually.
3. **Courses** — structured courses in AI, blockchain, cryptocurrency and financial-market education. Keep VELOCITY TRADING INSTITUTE as a clearly identified course brand where appropriate.
4. **Sponsored content and advertising** — clearly label paid placements; vet advertisers and disclose commercial relationships.
5. **Affiliate partnerships** — recommend only relevant products/services, disclose commissions and avoid promises of investment returns.

## Proposed pricing for validation (not yet live)

- Free membership: 0 Pi.
- Premium membership: test a low-cost monthly tier, initially 5 Pi/month as a hypothesis.
- Individual reports: test from 2 Pi each, depending on length and research effort.
- Courses: price separately after calculating production effort and validating demand.

These are hypotheses for user research, not confirmed market prices. Do not activate checkout until users understand the price, billing period, cancellation/refund terms and what they receive.

## Implementation order

### Phase 1 — Trust and audience
- Finish and test Pi Sign-In with server-side sessions.
- Publish useful, accurate free content consistently.
- Add a transparent privacy policy, terms, contact channel and clear editorial/financial-risk disclaimers.
- Add analytics only with an appropriate privacy notice and consent where required.

### Phase 2 — Premium foundation
- Design Free and Premium account states.
- Build a server-side entitlement check; never rely on a browser-only flag to unlock paid content.
- Add a member dashboard and clear subscription status.
- Keep all paid features in preview until the payment lifecycle is implemented and tested.

### Phase 3 — Pi payments (Testnet first)
- Implement the official Pi payment flow with server-side creation, approval and completion verification.
- Verify every payment with the Pi Platform API on the server.
- Add idempotency, replay protection, duplicate-payment handling, cancellation and error recovery.
- Grant paid entitlements only after verified completion.
- Test refunds/disputes and support procedures before Mainnet launch.
- Keep Mainnet credentials and payment configuration separate from Testnet.

### Phase 4 — Revenue expansion
- Launch digital products and courses after validating demand.
- Add carefully screened sponsorships and affiliate partnerships.
- Review conversion, retention, support load and operating costs before changing prices.

## Safety and operating rules

- Never ask for a Pi Wallet passphrase or private keys.
- Never put Pi server API keys or other secrets in frontend code or Git.
- Never claim guaranteed trading profits or investment returns.
- Do not accept payments while the server-side verification and entitlement system is incomplete.
- Clearly label sponsored articles and affiliate links.
- Keep the Mainnet branch isolated from Testnet development.

## Current status

This document is a product and engineering plan only. It does not mean memberships, subscriptions, ads, affiliate tracking or Pi payments are currently active. The existing Testnet preview must remain non-commercial until the relevant features are built, reviewed and tested.
