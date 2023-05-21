const e = /* @__PURE__ */ location.pathname.split("/").slice(0, -1).join("/"), r = [
  e + "/_app/immutable/entry/app.77f00986.js",
  e + "/_app/immutable/assets/0.e06b3622.css",
  e + "/_app/immutable/nodes/0.2b4d397a.js",
  e + "/_app/immutable/nodes/1.a04ea64a.js",
  e + "/_app/immutable/nodes/2.ea94edb0.js",
  e + "/_app/immutable/nodes/3.de1e495a.js",
  e + "/_app/immutable/nodes/4.dde0dd91.js",
  e + "/_app/immutable/nodes/5.b6d51b79.js",
  e + "/_app/immutable/nodes/6.b9ad68cd.js",
  e + "/_app/immutable/nodes/7.3c658557.js",
  e + "/_app/immutable/chunks/db.7fa7c7ca.js",
  e + "/_app/immutable/chunks/index.22ea6d87.js",
  e + "/_app/immutable/chunks/index.f6623a0a.js",
  e + "/_app/immutable/chunks/languages.9dc151c8.js",
  e + "/_app/immutable/chunks/methods.63081a9d.js",
  e + "/_app/immutable/chunks/navigation.d260aa2c.js",
  e + "/_app/immutable/chunks/singletons.de684e2f.js",
  e + "/_app/immutable/chunks/stores.5da1ebdc.js",
  e + "/_app/immutable/chunks/translation.23909d08.js",
  e + "/_app/immutable/entry/start.37f0cea6.js"
], l = [
  e + "/android-chrome-192x192.png",
  e + "/android-chrome-512x512.png",
  e + "/apple-touch-icon.png",
  e + "/browserconfig.xml",
  e + "/de-en.json",
  e + "/de-es.json",
  e + "/de-ru.json",
  e + "/en-de.json",
  e + "/en-es.json",
  e + "/en-ru.json",
  e + "/favicon-16x16.png",
  e + "/favicon-32x32.png",
  e + "/favicon.ico",
  e + "/favicon.png",
  e + "/mstile-150x150.png",
  e + "/robots.txt",
  e + "/ru-de.json",
  e + "/ru-en.json",
  e + "/ru-es.json",
  e + "/safari-pinned-tab.svg",
  e + "/site.webmanifest",
  e + "/success.mp3",
  e + "/wrong.mp3"
], i = "1684691493526", n = self, p = `cache${i}`, d = r.concat(l), u = new Set(d);
n.addEventListener("install", (s) => {
  s.waitUntil(
    caches.open(p).then((a) => a.addAll(d)).then(() => {
      n.skipWaiting();
    })
  );
});
n.addEventListener("activate", (s) => {
  s.waitUntil(
    caches.keys().then(async (a) => {
      for (const t of a)
        t !== p && await caches.delete(t);
      n.clients.claim();
    })
  );
});
async function h(s) {
  const a = await caches.open(`offline${i}`);
  try {
    const t = await fetch(s);
    return a.put(s, t.clone()), t;
  } catch (t) {
    const c = await a.match(s);
    if (c)
      return c;
    throw t;
  }
}
n.addEventListener("fetch", (s) => {
  if (s.request.method !== "GET" || s.request.headers.has("range"))
    return;
  const a = new URL(s.request.url), t = a.protocol.startsWith("http"), c = a.hostname === self.location.hostname && a.port !== self.location.port, o = a.host === self.location.host && u.has(a.pathname), m = s.request.cache === "only-if-cached" && !o;
  t && !c && !m && s.respondWith(
    (async () => o && await caches.match(s.request) || h(s.request))()
  );
});
