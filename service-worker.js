const s = /* @__PURE__ */ location.pathname.split("/").slice(0, -1).join("/"), d = [
  s + "/_app/immutable/entry/app.8c41ff02.js",
  s + "/_app/immutable/assets/0.e06b3622.css",
  s + "/_app/immutable/nodes/0.2dc568a6.js",
  s + "/_app/immutable/nodes/1.dcc695bd.js",
  s + "/_app/immutable/nodes/2.d3479c1b.js",
  s + "/_app/immutable/nodes/3.de1e495a.js",
  s + "/_app/immutable/nodes/4.d8b2a652.js",
  s + "/_app/immutable/nodes/5.69788843.js",
  s + "/_app/immutable/nodes/6.1868b54d.js",
  s + "/_app/immutable/nodes/7.8a68cd84.js",
  s + "/_app/immutable/chunks/db.a20cdf71.js",
  s + "/_app/immutable/chunks/index.22ea6d87.js",
  s + "/_app/immutable/chunks/index.f6623a0a.js",
  s + "/_app/immutable/chunks/methods.63081a9d.js",
  s + "/_app/immutable/chunks/navigation.ff036ab7.js",
  s + "/_app/immutable/chunks/singletons.f01a7e2a.js",
  s + "/_app/immutable/chunks/stores.81159c77.js",
  s + "/_app/immutable/chunks/translation.5fe2c811.js",
  s + "/_app/immutable/entry/start.6c1e0ac2.js"
], l = [
  s + "/android-chrome-192x192.png",
  s + "/android-chrome-512x512.png",
  s + "/apple-touch-icon.png",
  s + "/browserconfig.xml",
  s + "/de-en.json",
  s + "/de-es.json",
  s + "/de-ru.json",
  s + "/en-de.json",
  s + "/en-es.json",
  s + "/en-ru.json",
  s + "/favicon-16x16.png",
  s + "/favicon-32x32.png",
  s + "/favicon.ico",
  s + "/favicon.png",
  s + "/mstile-150x150.png",
  s + "/robots.txt",
  s + "/ru-de.json",
  s + "/ru-en.json",
  s + "/ru-es.json",
  s + "/safari-pinned-tab.svg",
  s + "/site.webmanifest",
  s + "/success.mp3",
  s + "/wrong.mp3"
], i = "1684692590841", n = self, p = `cache${i}`, r = d.concat(l), h = new Set(r);
n.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(p).then((a) => a.addAll(r)).then(() => {
      n.skipWaiting();
    })
  );
});
n.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then(async (a) => {
      for (const t of a)
        t !== p && await caches.delete(t);
      n.clients.claim();
    })
  );
});
async function u(e) {
  const a = await caches.open(`offline${i}`);
  try {
    const t = await fetch(e);
    return a.put(e, t.clone()), t;
  } catch (t) {
    const c = await a.match(e);
    if (c)
      return c;
    throw t;
  }
}
n.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET" || e.request.headers.has("range"))
    return;
  const a = new URL(e.request.url), t = a.protocol.startsWith("http"), c = a.hostname === self.location.hostname && a.port !== self.location.port, o = a.host === self.location.host && h.has(a.pathname), m = e.request.cache === "only-if-cached" && !o;
  t && !c && !m && e.respondWith(
    (async () => o && await caches.match(e.request) || u(e.request))()
  );
});
