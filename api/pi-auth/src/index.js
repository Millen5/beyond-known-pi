const PI_ME_URL = "https://api.minepi.com/v2/me";

function json(data, status = 200, origin = "*") {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "access-control-allow-origin": origin,
      "access-control-allow-methods": "POST, OPTIONS, GET",
      "access-control-allow-headers": "content-type",
      "vary": "Origin"
    }
  });
}

export default {
  async fetch(request, env) {
    const requestOrigin = request.headers.get("Origin") || "";
    const allowedOrigin = env.APP_ORIGIN || "";
    const corsOrigin = requestOrigin === allowedOrigin ? allowedOrigin : "null";
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      if (!allowedOrigin || requestOrigin !== allowedOrigin) {
        return new Response(null, { status: 403 });
      }
      return new Response(null, {
        status: 204,
        headers: {
          "access-control-allow-origin": allowedOrigin,
          "access-control-allow-methods": "POST, OPTIONS, GET",
          "access-control-allow-headers": "content-type",
          "access-control-max-age": "86400",
          "vary": "Origin"
        }
      });
    }

    if (url.pathname === "/health" && request.method === "GET") {
      return json({ ok: true, service: "beyond-known-pi-auth" }, 200, corsOrigin);
    }

    if (url.pathname !== "/auth/verify" || request.method !== "POST") {
      return json({ error: "Not found" }, 404, corsOrigin);
    }

    if (!allowedOrigin || requestOrigin !== allowedOrigin) {
      return json({ error: "Origin not allowed" }, 403, "null");
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: "Invalid JSON body" }, 400, corsOrigin);
    }

    const accessToken = typeof body?.accessToken === "string" ? body.accessToken.trim() : "";
    if (!accessToken || accessToken.length > 4096) {
      return json({ error: "A valid Pi access token is required" }, 400, corsOrigin);
    }

    try {
      const piResponse = await fetch(PI_ME_URL, {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}`, Accept: "application/json" }
      });

      if (piResponse.status === 401 || piResponse.status === 403) {
        return json({ error: "Pi access token was rejected" }, 401, corsOrigin);
      }
      if (!piResponse.ok) {
        return json({ error: "Pi verification service is temporarily unavailable" }, 502, corsOrigin);
      }

      const data = await piResponse.json();
      const user = data?.user || data;
      if (typeof user?.uid !== "string" || typeof user?.username !== "string") {
        return json({ error: "Unexpected response from Pi verification service" }, 502, corsOrigin);
      }

      return json({
        authenticated: true,
        user: { uid: user.uid, username: user.username }
      }, 200, corsOrigin);
    } catch {
      return json({ error: "Could not reach Pi verification service" }, 502, corsOrigin);
    }
  }
};
