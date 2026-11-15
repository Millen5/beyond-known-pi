# BEYOND THE KNOWN — Pi authentication Worker

This Cloudflare Worker verifies Pi Browser access tokens against the official Pi Platform API.

## Routes

- `GET /health` — basic service health check.
- `POST /auth/verify` — accepts JSON `{"accessToken":"..."}`, validates it with `GET https://api.minepi.com/v2/me`, and returns only the verified Pi UID and username.

## Security notes

- The Pi access token is sent only to this Worker and then to Pi's official `/v2/me` endpoint.
- Tokens are not logged, stored, or returned.
- No Pi Server API Key is needed for the `/me` endpoint.
- CORS is restricted to the configured `APP_ORIGIN`.
- This Worker does not create a persistent login session or store personal data.

## Free deployment

1. In Cloudflare Dashboard, open Workers & Pages and create a Worker named `beyond-known-pi-auth`.
2. Paste the contents of `src/index.js` into the Worker editor and deploy.
3. In Worker Settings → Variables, add `APP_ORIGIN` with the exact production app origin: `https://millen5.github.io`.
4. Test `GET /health` and confirm it returns `{"ok":true,...}`.
5. Do not put API keys or access tokens in GitHub Pages source code.

The app frontend must be connected to the deployed Worker URL only after deployment and health-check verification. Keep this Worker on the separate `pi-auth-backend` branch until reviewed; do not merge it into Mainnet automatically.
