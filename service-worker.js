const s = /* @__PURE__ */ location.pathname.split("/").slice(0, -1).join("/"), d = [
  s + "/_app/immutable/entry/app.14c3906a.js",
  s + "/_app/immutable/assets/0.dab6b812.css",
  s + "/_app/immutable/nodes/0.7b29d58a.js",
  s + "/_app/immutable/nodes/1.17d268a4.js",
  s + "/_app/immutable/nodes/2.6c330930.js",
  s + "/_app/immutable/nodes/3.f07dcaf8.js",
  s + "/_app/immutable/nodes/4.219d868b.js",
  s + "/_app/immutable/nodes/5.f6f7935e.js",
  s + "/_app/immutable/nodes/6.04853a2a.js",
  s + "/_app/immutable/nodes/7.057b8c32.js",
  s + "/_app/immutable/chunks/db.c2c3de62.js",
  s + "/_app/immutable/chunks/index.9d9b8d81.js",
  s + "/_app/immutable/chunks/index.fd817f55.js",
  s + "/_app/immutable/chunks/languages.eb18cb82.js",
  s + "/_app/immutable/chunks/methods.63081a9d.js",
  s + "/_app/immutable/chunks/navigation.569285d3.js",
  s + "/_app/immutable/chunks/singletons.b4763a04.js",
  s + "/_app/immutable/chunks/store.47891479.js",
  s + "/_app/immutable/chunks/stores.2a12fe67.js",
  s + "/_app/immutable/entry/start.4d3711d7.js"
], r = [
  s + "/android-chrome-192x192.png",
  s + "/android-chrome-512x512.png",
  s + "/apple-touch-icon.png",
  s + "/browserconfig.xml",
  s + "/de-en.json",
  s + "/de-es.json",
  s + "/de-ru.json",
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
], i = "1684621296071", n = self, p = `cache${i}`, m = d.concat(r), h = new Set(m);
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
  const a = new URL(e.request.url), t = a.protocol.startsWith("http"), c = a.hostname === self.location.hostname && a.port !== self.location.port, o = a.host === self.location.host && h.has(a.pathname), l = e.request.cache === "only-if-cached" && !o;
  t && !c && !l && e.respondWith(
    (async () => o && await caches.match(e.request) || u(e.request))()
  );
});
