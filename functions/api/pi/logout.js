export async function onRequestPost({ request }) {
  if (request.headers.get("Origin") !== "https://beyond-known-pi.pages.dev") {
    return Response.json({ ok: false, error: "Origin not allowed." }, { status: 403 });
  }
  return Response.json({ ok: true }, { headers: {
    "Cache-Control": "no-store",
    "Set-Cookie": "btk_pi_session=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0"
  }});
}
