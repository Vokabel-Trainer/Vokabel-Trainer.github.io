const s = /* @__PURE__ */ location.pathname.split("/").slice(0, -1).join("/"), d = [
  s + "/_app/immutable/entry/app.7b5129f5.js",
  s + "/_app/immutable/assets/0.dab6b812.css",
  s + "/_app/immutable/nodes/0.22d54860.js",
  s + "/_app/immutable/nodes/1.2bceeba3.js",
  s + "/_app/immutable/nodes/2.6c330930.js",
  s + "/_app/immutable/nodes/3.4da40cba.js",
  s + "/_app/immutable/nodes/4.8e6d2139.js",
  s + "/_app/immutable/nodes/5.7bd60656.js",
  s + "/_app/immutable/nodes/6.9701d075.js",
  s + "/_app/immutable/nodes/7.2de98005.js",
  s + "/_app/immutable/chunks/db.c2c3de62.js",
  s + "/_app/immutable/chunks/index.9d9b8d81.js",
  s + "/_app/immutable/chunks/index.fd817f55.js",
  s + "/_app/immutable/chunks/languages.f5cb97a8.js",
  s + "/_app/immutable/chunks/methods.63081a9d.js",
  s + "/_app/immutable/chunks/navigation.dc4c677f.js",
  s + "/_app/immutable/chunks/singletons.896bfac2.js",
  s + "/_app/immutable/chunks/store.47891479.js",
  s + "/_app/immutable/chunks/stores.ab86a3f4.js",
  s + "/_app/immutable/entry/start.1ba7c8d9.js"
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
], i = "1684667492213", n = self, p = `cache${i}`, m = d.concat(l), u = new Set(m);
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
async function h(e) {
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
  const a = new URL(e.request.url), t = a.protocol.startsWith("http"), c = a.hostname === self.location.hostname && a.port !== self.location.port, o = a.host === self.location.host && u.has(a.pathname), r = e.request.cache === "only-if-cached" && !o;
  t && !c && !r && e.respondWith(
    (async () => o && await caches.match(e.request) || h(e.request))()
  );
});
