const e = /* @__PURE__ */ location.pathname.split("/").slice(0, -1).join("/"), l = [
  e + "/_app/immutable/entry/app.cd1aee9b.js",
  e + "/_app/immutable/assets/0.e06b3622.css",
  e + "/_app/immutable/nodes/0.a1d28a62.js",
  e + "/_app/immutable/nodes/1.68edbba1.js",
  e + "/_app/immutable/nodes/2.ea94edb0.js",
  e + "/_app/immutable/nodes/3.de1e495a.js",
  e + "/_app/immutable/nodes/4.a397fb34.js",
  e + "/_app/immutable/nodes/5.25aa911f.js",
  e + "/_app/immutable/nodes/6.77ee3a84.js",
  e + "/_app/immutable/nodes/7.928924e2.js",
  e + "/_app/immutable/chunks/db.7fa7c7ca.js",
  e + "/_app/immutable/chunks/index.22ea6d87.js",
  e + "/_app/immutable/chunks/index.f6623a0a.js",
  e + "/_app/immutable/chunks/languages.52894cf0.js",
  e + "/_app/immutable/chunks/methods.63081a9d.js",
  e + "/_app/immutable/chunks/navigation.2b1ad7dd.js",
  e + "/_app/immutable/chunks/singletons.78612036.js",
  e + "/_app/immutable/chunks/stores.8d3055f5.js",
  e + "/_app/immutable/chunks/translation.23909d08.js",
  e + "/_app/immutable/entry/start.cb002482.js"
], d = [
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
], i = "1684690588061", n = self, p = `cache${i}`, m = l.concat(d), u = new Set(m);
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
  const a = new URL(s.request.url), t = a.protocol.startsWith("http"), c = a.hostname === self.location.hostname && a.port !== self.location.port, o = a.host === self.location.host && u.has(a.pathname), r = s.request.cache === "only-if-cached" && !o;
  t && !c && !r && s.respondWith(
    (async () => o && await caches.match(s.request) || h(s.request))()
  );
});
