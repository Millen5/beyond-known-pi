function getSessionToken(request) {
  const cookie = request.headers.get("Cookie") || "";
  const match = cookie.match(/(?:^|;\\s*)btk_pi_session=([^;]+)/);
  if (!match) return "";
  try { return decodeURIComponent(match[1]); } catch { return ""; }
}
export async function onRequestGet({ request }) {
  const token = getSessionToken(request);
  if (!token) return Response.json({ verified: false }, { status: 401, headers: { "Cache-Control": "no-store" } });
  try {
    const upstream = await fetch("https://api.minepi.com/v2/me", {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
    });
    if (!upstream.ok) return Response.json({ verified: false }, { status: 401, headers: {
      "Cache-Control": "no-store", "Set-Cookie": "btk_pi_session=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0"
    }});
    const user = await upstream.json();
    if (!user || typeof user.uid !== "string" || !user.uid) throw new Error("Invalid Pi identity");
    return Response.json({ verified: true, user: { uid: user.uid, username: typeof user.username === "string" ? user.username : "" } }, {
      headers: { "Cache-Control": "no-store" }
    });
  } catch {
    return Response.json({ verified: false, error: "Pi session check unavailable." }, { status: 502, headers: { "Cache-Control": "no-store" } });
  }
}
