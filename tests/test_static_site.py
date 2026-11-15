from pathlib import Path
import re
import unittest
from html.parser import HTMLParser

ROOT = Path(__file__).resolve().parents[1]

class LinkParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag in {"a", "script", "link", "img"}:
            key = "href" if tag in {"a", "link"} else "src"
            value = attrs.get(key)
            if value:
                self.links.append(value)

class StaticSiteTests(unittest.TestCase):
    def test_required_pages_and_api_exist(self):
        for name in ("index.html", "privacy.html", "terms.html", "404.html", "robots.txt",
                     "signin/callback.html", "functions/api/pi/verify.js"):
            with self.subTest(name=name):
                self.assertTrue((ROOT / name).is_file())

    def test_homepage_uses_documented_pi_oauth_signin(self):
        html = (ROOT / "index.html").read_text(encoding="utf-8")
        self.assertIn("Testnet Preview", html)
        self.assertIn('href="privacy.html"', html)
        self.assertIn('href="terms.html"', html)
        self.assertIn("does not currently process Pi payments", html)
        self.assertIn("Pi Wallet passphrase", html)
        self.assertIn('id="pi-signin"', html)
        self.assertIn("https://accounts.pinet.com/oauth/authorize", html)
        self.assertIn('searchParams.set("response_type","token")', html)
        self.assertIn('searchParams.set("client_id",PI_CLIENT_ID)', html)
        self.assertIn('searchParams.set("redirect_uri",PI_REDIRECT_URI)', html)
        self.assertIn('searchParams.set("scope","username")', html)
        self.assertIn('searchParams.set("state",state)', html)
        self.assertIn("window.location.assign(authorize.toString())", html)
        self.assertIn("btk_pi_oauth_state", html)
        self.assertIn("https://beyond-known-pi.pages.dev/signin/callback.html", html)
        self.assertNotIn("window.Pi.authenticate(", html)
        self.assertNotIn("window.Pi.signIn(", html)
    def test_callback_validates_state_and_calls_backend(self):
        html = (ROOT / "signin/callback.html").read_text(encoding="utf-8")
        self.assertIn('sessionStorage.getItem("btk_pi_oauth_state")', html)
        self.assertIn('returnedState!==expected', html)
        self.assertIn('fetch("/api/pi/verify"', html)
        self.assertIn('accessToken:token', html)
        self.assertIn('history.replaceState(null,"",location.pathname)', html)

    def test_backend_verifies_token_with_pi_and_does_not_expose_secrets(self):
        js = (ROOT / "functions/api/pi/verify.js").read_text(encoding="utf-8")
        self.assertIn("https://api.minepi.com/v2/me", js)
        self.assertIn("HttpOnly; Secure; SameSite=Lax", js)
        self.assertIn("Authorization", js)
        self.assertIn("Origin", js)
        self.assertNotIn("Server API Key", js)

    def test_login_logout_session_endpoints_exist(self):
        for name in ("functions/api/pi/session.js", "functions/api/pi/logout.js"):
            with self.subTest(name=name):
                self.assertTrue((ROOT / name).is_file())
        html = (ROOT / "index.html").read_text(encoding="utf-8")
        self.assertIn('fetch("/api/pi/session"', html)
        self.assertIn('fetch("/api/pi/logout"', html)
        self.assertIn('piButton.textContent="Log out"', html)

    def test_no_obvious_secret_material(self):
        for path in ROOT.rglob("*"):
            if not path.is_file() or ".git" in path.parts or path.name == "validation-key.txt":
                continue
            if path.suffix.lower() not in {".html", ".js", ".json", ".yml", ".yaml", ".md", ".py"}:
                continue
            content = path.read_text(encoding="utf-8", errors="ignore")
            self.assertNotRegex(content, r"-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----")
            self.assertNotRegex(content, r"(?i)(?:api[_-]?secret|private[_-]?key)\s*[:=]\s*['\"][^'\"]{12,}")

    def test_local_links_resolve(self):
        for page in (ROOT / "index.html", ROOT / "privacy.html", ROOT / "terms.html", ROOT / "404.html", ROOT / "signin/callback.html"):
            parser = LinkParser()
            parser.feed(page.read_text(encoding="utf-8"))
            for href in parser.links:
                if href.startswith(("https://", "http://", "mailto:", "tel:", "data:", "#", "javascript:")):
                    continue
                target = href.split("#", 1)[0].split("?", 1)[0]
                if not target:
                    continue
                with self.subTest(page=str(page.relative_to(ROOT)), href=href):
                    self.assertTrue((page.parent / target).resolve().exists(), f"Broken local reference: {href}")

if __name__ == "__main__":
    unittest.main(verbosity=2)
