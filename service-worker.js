const e = /* @__PURE__ */ location.pathname.split("/").slice(0, -1).join("/"), l = [
  e + "/_app/immutable/entry/app.faf77f04.js",
  e + "/_app/immutable/assets/0.dab6b812.css",
  e + "/_app/immutable/nodes/0.e9f774a7.js",
  e + "/_app/immutable/nodes/1.31f0818e.js",
  e + "/_app/immutable/nodes/2.6c330930.js",
  e + "/_app/immutable/nodes/3.4da40cba.js",
  e + "/_app/immutable/nodes/4.8e6d2139.js",
  e + "/_app/immutable/nodes/5.6aeccbf3.js",
  e + "/_app/immutable/nodes/6.526fe8a5.js",
  e + "/_app/immutable/nodes/7.2de98005.js",
  e + "/_app/immutable/chunks/db.c2c3de62.js",
  e + "/_app/immutable/chunks/index.9d9b8d81.js",
  e + "/_app/immutable/chunks/index.fd817f55.js",
  e + "/_app/immutable/chunks/languages.f5cb97a8.js",
  e + "/_app/immutable/chunks/methods.63081a9d.js",
  e + "/_app/immutable/chunks/navigation.0213a5d7.js",
  e + "/_app/immutable/chunks/singletons.6eb725e9.js",
  e + "/_app/immutable/chunks/store.47891479.js",
  e + "/_app/immutable/chunks/stores.48ea8832.js",
  e + "/_app/immutable/entry/start.15fadf13.js"
], u = [
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
], i = "1684667092253", n = self, p = `cache${i}`, m = l.concat(u), d = new Set(m);
n.addEventListener("install", (s) => {
  s.waitUntil(
    caches.open(p).then((a) => a.addAll(m)).then(() => {
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
  const a = new URL(s.request.url), t = a.protocol.startsWith("http"), c = a.hostname === self.location.hostname && a.port !== self.location.port, o = a.host === self.location.host && d.has(a.pathname), r = s.request.cache === "only-if-cached" && !o;
  t && !c && !r && s.respondWith(
    (async () => o && await caches.match(s.request) || h(s.request))()
  );
});
