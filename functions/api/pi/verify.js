const ALLOWED_ORIGIN = "https://beyond-known-pi.pages.dev";

export async function onRequestPost({ request }) {
  if (request.headers.get("Origin") !== ALLOWED_ORIGIN) {
    return Response.json({ verified: false, error: "Origin not allowed." }, { status: 403 });
  }
  if (!(request.headers.get("Content-Type") || "").toLowerCase().includes("application/json")) {
    return Response.json({ verified: false, error: "Expected JSON." }, { status: 415 });
  }
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ verified: false, error: "Invalid JSON." }, { status: 400 });
  }
  const accessToken = body && typeof body.accessToken === "string" ? body.accessToken : "";
  if (!accessToken || accessToken.length > 4096 || /\s/.test(accessToken)) {
    return Response.json({ verified: false, error: "Invalid access token." }, { status: 400 });
  }
  try {
    const upstream = await fetch("https://api.minepi.com/v2/me", {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}`, Accept: "application/json" }
    });
    if (!upstream.ok) {
      return Response.json({ verified: false, error: "Pi rejected the access token." }, {
        status: upstream.status === 401 ? 401 : 502,
        headers: { "Cache-Control": "no-store" }
      });
    }
    const user = await upstream.json();
    if (!user || typeof user.uid !== "string" || !user.uid) {
      return Response.json({ verified: false, error: "Pi returned an invalid identity." }, { status: 502 });
    }
    return Response.json({
      verified: true,
      user: { uid: user.uid, username: typeof user.username === "string" ? user.username : "" }
    }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ verified: false, error: "Pi verification service is temporarily unavailable." }, {
      status: 502,
      headers: { "Cache-Control": "no-store" }
    });
  }
}
