const s = /* @__PURE__ */ location.pathname.split("/").slice(0, -1).join("/"), l = [
  s + "/_app/immutable/entry/app.b4c0f15c.js",
  s + "/_app/immutable/assets/0.dab6b812.css",
  s + "/_app/immutable/nodes/0.56fd1454.js",
  s + "/_app/immutable/nodes/1.c13875cb.js",
  s + "/_app/immutable/nodes/2.6c330930.js",
  s + "/_app/immutable/nodes/3.4da40cba.js",
  s + "/_app/immutable/nodes/4.27ddafae.js",
  s + "/_app/immutable/nodes/5.26576040.js",
  s + "/_app/immutable/nodes/6.b426199e.js",
  s + "/_app/immutable/nodes/7.b27ecd74.js",
  s + "/_app/immutable/chunks/db.c2c3de62.js",
  s + "/_app/immutable/chunks/index.9d9b8d81.js",
  s + "/_app/immutable/chunks/index.fd817f55.js",
  s + "/_app/immutable/chunks/languages.fcb9fc98.js",
  s + "/_app/immutable/chunks/methods.63081a9d.js",
  s + "/_app/immutable/chunks/navigation.dde6af1b.js",
  s + "/_app/immutable/chunks/singletons.e9190e4a.js",
  s + "/_app/immutable/chunks/store.47891479.js",
  s + "/_app/immutable/chunks/stores.97cb49b7.js",
  s + "/_app/immutable/entry/start.1f48d297.js"
], r = [
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
  s + "/safari-pinned-tab.svg",
  s + "/site.webmanifest",
  s + "/success.mp3",
  s + "/wrong.mp3"
], i = "1684666292271", n = self, p = `cache${i}`, m = l.concat(r), h = new Set(m);
n.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(p).then((a) => a.addAll(m)).then(() => {
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
  const a = new URL(e.request.url), t = a.protocol.startsWith("http"), c = a.hostname === self.location.hostname && a.port !== self.location.port, o = a.host === self.location.host && h.has(a.pathname), d = e.request.cache === "only-if-cached" && !o;
  t && !c && !d && e.respondWith(
    (async () => o && await caches.match(e.request) || u(e.request))()
  );
});
