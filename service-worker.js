const e = /* @__PURE__ */ location.pathname.split("/").slice(0, -1).join("/"), l = [
  e + "/_app/immutable/entry/app.4a8194ab.js",
  e + "/_app/immutable/assets/0.dab6b812.css",
  e + "/_app/immutable/nodes/0.38edef40.js",
  e + "/_app/immutable/nodes/1.95e66d14.js",
  e + "/_app/immutable/nodes/2.6c330930.js",
  e + "/_app/immutable/nodes/3.f07dcaf8.js",
  e + "/_app/immutable/nodes/4.219d868b.js",
  e + "/_app/immutable/nodes/5.275ebdbe.js",
  e + "/_app/immutable/nodes/6.c16b9d87.js",
  e + "/_app/immutable/nodes/7.057b8c32.js",
  e + "/_app/immutable/chunks/db.c2c3de62.js",
  e + "/_app/immutable/chunks/index.9d9b8d81.js",
  e + "/_app/immutable/chunks/index.fd817f55.js",
  e + "/_app/immutable/chunks/languages.eb18cb82.js",
  e + "/_app/immutable/chunks/methods.63081a9d.js",
  e + "/_app/immutable/chunks/navigation.cf5913aa.js",
  e + "/_app/immutable/chunks/singletons.26a0525e.js",
  e + "/_app/immutable/chunks/store.47891479.js",
  e + "/_app/immutable/chunks/stores.07106eeb.js",
  e + "/_app/immutable/entry/start.afd42d7a.js"
], r = [
  e + "/android-chrome-192x192.png",
  e + "/android-chrome-512x512.png",
  e + "/apple-touch-icon.png",
  e + "/browserconfig.xml",
  e + "/de-en.json",
  e + "/de-es.json",
  e + "/de-ru.json",
  e + "/favicon-16x16.png",
  e + "/favicon-32x32.png",
  e + "/favicon.ico",
  e + "/favicon.png",
  e + "/mstile-150x150.png",
  e + "/robots.txt",
  e + "/safari-pinned-tab.svg",
  e + "/site.webmanifest",
  e + "/success.mp3",
  e + "/wrong.mp3"
], i = "1684621243625", n = self, p = `cache${i}`, m = l.concat(r), h = new Set(m);
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
async function u(s) {
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
  const a = new URL(s.request.url), t = a.protocol.startsWith("http"), c = a.hostname === self.location.hostname && a.port !== self.location.port, o = a.host === self.location.host && h.has(a.pathname), d = s.request.cache === "only-if-cached" && !o;
  t && !c && !d && s.respondWith(
    (async () => o && await caches.match(s.request) || u(s.request))()
  );
});
