if (!self.define) {
  let e,
    a = {};
  const c = (c, s) => (
    (c = new URL(c + ".js", s).href),
    a[c] ||
      new Promise((a) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = c), (e.onload = a), document.head.appendChild(e);
        } else (e = c), importScripts(c), a();
      }).then(() => {
        let e = a[c];
        if (!e) throw new Error(`Module ${c} didn’t register its module`);
        return e;
      })
  );
  self.define = (s, n) => {
    const i =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (a[i]) return;
    let t = {};
    const r = (e) => c(e, i),
      f = { module: { uri: i }, exports: t, require: r };
    a[i] = Promise.all(s.map((e) => f[e] || r(e))).then((e) => (n(...e), t));
  };
}
define(["./workbox-f1770938"], function (e) {
  "use strict";
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/_next/static/LanxVX3kTJiTZsqiA6oJW/_buildManifest.js",
          revision: "8d9be1d6f9aa7d8075003d64a6e7f48e",
        },
        {
          url: "/_next/static/LanxVX3kTJiTZsqiA6oJW/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        {
          url: "/_next/static/chunks/1571-d92c15c2d3e0126c.js",
          revision: "d92c15c2d3e0126c",
        },
        {
          url: "/_next/static/chunks/1646.a93085a0445ba909.js",
          revision: "a93085a0445ba909",
        },
        {
          url: "/_next/static/chunks/2227-5388c0de0a5900b8.js",
          revision: "5388c0de0a5900b8",
        },
        {
          url: "/_next/static/chunks/2619-04bc32f026a0d946.js",
          revision: "04bc32f026a0d946",
        },
        {
          url: "/_next/static/chunks/2816-cd748362c96e22ec.js",
          revision: "cd748362c96e22ec",
        },
        {
          url: "/_next/static/chunks/2937-e7b671ec1946c50e.js",
          revision: "e7b671ec1946c50e",
        },
        {
          url: "/_next/static/chunks/2996-48c0170e07483be9.js",
          revision: "48c0170e07483be9",
        },
        {
          url: "/_next/static/chunks/3582-f573fa1b2a5079bc.js",
          revision: "f573fa1b2a5079bc",
        },
        {
          url: "/_next/static/chunks/4119-151aa75e08f8f88c.js",
          revision: "151aa75e08f8f88c",
        },
        {
          url: "/_next/static/chunks/4273-5a02b425ed553dc4.js",
          revision: "5a02b425ed553dc4",
        },
        {
          url: "/_next/static/chunks/4545-139f2142ff311f37.js",
          revision: "139f2142ff311f37",
        },
        {
          url: "/_next/static/chunks/4696-7570922b091a0ed8.js",
          revision: "7570922b091a0ed8",
        },
        {
          url: "/_next/static/chunks/4bd1b696-100b9d70ed4e49c1.js",
          revision: "100b9d70ed4e49c1",
        },
        {
          url: "/_next/static/chunks/5139.e4ff9cc3669129ed.js",
          revision: "e4ff9cc3669129ed",
        },
        {
          url: "/_next/static/chunks/5476-fe05decf3477041b.js",
          revision: "fe05decf3477041b",
        },
        {
          url: "/_next/static/chunks/7027-03adba1e5fc3ad44.js",
          revision: "03adba1e5fc3ad44",
        },
        {
          url: "/_next/static/chunks/735-15cadd88c8ac4215.js",
          revision: "15cadd88c8ac4215",
        },
        {
          url: "/_next/static/chunks/798-9b0aa27727474736.js",
          revision: "9b0aa27727474736",
        },
        {
          url: "/_next/static/chunks/8620-2a5a8f3efa79b2b6.js",
          revision: "2a5a8f3efa79b2b6",
        },
        {
          url: "/_next/static/chunks/8700-acea54910209cdf8.js",
          revision: "acea54910209cdf8",
        },
        {
          url: "/_next/static/chunks/9011-38f792b520ccbef5.js",
          revision: "38f792b520ccbef5",
        },
        {
          url: "/_next/static/chunks/9511-e48007c389bf0337.js",
          revision: "e48007c389bf0337",
        },
        {
          url: "/_next/static/chunks/app/_not-found/page-94ea56993bca85da.js",
          revision: "94ea56993bca85da",
        },
        {
          url: "/_next/static/chunks/app/about/page-1e7faf27acc707d1.js",
          revision: "1e7faf27acc707d1",
        },
        {
          url: "/_next/static/chunks/app/admin/dashboard/page-0adfb9c1440f55a5.js",
          revision: "0adfb9c1440f55a5",
        },
        {
          url: "/_next/static/chunks/app/admin/order/%5Bid%5D/edit/page-97ae164ed1c199de.js",
          revision: "97ae164ed1c199de",
        },
        {
          url: "/_next/static/chunks/app/admin/order/page-8912831125cf01e2.js",
          revision: "8912831125cf01e2",
        },
        {
          url: "/_next/static/chunks/app/admin/product/%5Bid%5D/page-0c39f1c211698c0c.js",
          revision: "0c39f1c211698c0c",
        },
        {
          url: "/_next/static/chunks/app/admin/product/page-022fbc8214028999.js",
          revision: "022fbc8214028999",
        },
        {
          url: "/_next/static/chunks/app/api/auth/login/route-1e7faf27acc707d1.js",
          revision: "1e7faf27acc707d1",
        },
        {
          url: "/_next/static/chunks/app/api/auth/logout/route-1e7faf27acc707d1.js",
          revision: "1e7faf27acc707d1",
        },
        {
          url: "/_next/static/chunks/app/api/auth/me/route-1e7faf27acc707d1.js",
          revision: "1e7faf27acc707d1",
        },
        {
          url: "/_next/static/chunks/app/api/auth/register/route-1e7faf27acc707d1.js",
          revision: "1e7faf27acc707d1",
        },
        {
          url: "/_next/static/chunks/app/api/contact/route-1e7faf27acc707d1.js",
          revision: "1e7faf27acc707d1",
        },
        {
          url: "/_next/static/chunks/app/api/dashboard/route-1e7faf27acc707d1.js",
          revision: "1e7faf27acc707d1",
        },
        {
          url: "/_next/static/chunks/app/api/order-items/route-1e7faf27acc707d1.js",
          revision: "1e7faf27acc707d1",
        },
        {
          url: "/_next/static/chunks/app/api/orders/%5Bid%5D/route-1e7faf27acc707d1.js",
          revision: "1e7faf27acc707d1",
        },
        {
          url: "/_next/static/chunks/app/api/orders/route-1e7faf27acc707d1.js",
          revision: "1e7faf27acc707d1",
        },
        {
          url: "/_next/static/chunks/app/api/product/%5Bid%5D/route-1e7faf27acc707d1.js",
          revision: "1e7faf27acc707d1",
        },
        {
          url: "/_next/static/chunks/app/api/product/route-1e7faf27acc707d1.js",
          revision: "1e7faf27acc707d1",
        },
        {
          url: "/_next/static/chunks/app/cart/page-a2664ca0d9cc8695.js",
          revision: "a2664ca0d9cc8695",
        },
        {
          url: "/_next/static/chunks/app/checkout/page-dc166d94eb73e62a.js",
          revision: "dc166d94eb73e62a",
        },
        {
          url: "/_next/static/chunks/app/contact/page-77eda6aa8dbcb1fb.js",
          revision: "77eda6aa8dbcb1fb",
        },
        {
          url: "/_next/static/chunks/app/layout-73ebf7de113b50df.js",
          revision: "73ebf7de113b50df",
        },
        {
          url: "/_next/static/chunks/app/login/page-c08f2e9b95b6f0aa.js",
          revision: "c08f2e9b95b6f0aa",
        },
        {
          url: "/_next/static/chunks/app/menu/page-5b0ad5e47c985b84.js",
          revision: "5b0ad5e47c985b84",
        },
        {
          url: "/_next/static/chunks/app/order-history/page-59104f289cd0c7a8.js",
          revision: "59104f289cd0c7a8",
        },
        {
          url: "/_next/static/chunks/app/order-success/page-a853c174598b70b6.js",
          revision: "a853c174598b70b6",
        },
        {
          url: "/_next/static/chunks/app/orders/page-66ad28f5bf698cd1.js",
          revision: "66ad28f5bf698cd1",
        },
        {
          url: "/_next/static/chunks/app/page-5b49bbe7e8475bb5.js",
          revision: "5b49bbe7e8475bb5",
        },
        {
          url: "/_next/static/chunks/app/register/page-683616a3926890bc.js",
          revision: "683616a3926890bc",
        },
        {
          url: "/_next/static/chunks/framework-32492dd9c4fc5870.js",
          revision: "32492dd9c4fc5870",
        },
        {
          url: "/_next/static/chunks/main-7c64fc0f46ccc81f.js",
          revision: "7c64fc0f46ccc81f",
        },
        {
          url: "/_next/static/chunks/main-app-fcb8a9ff9c099380.js",
          revision: "fcb8a9ff9c099380",
        },
        {
          url: "/_next/static/chunks/pages/_app-e8b861c87f6f033c.js",
          revision: "e8b861c87f6f033c",
        },
        {
          url: "/_next/static/chunks/pages/_error-c8f84f7bd11d43d4.js",
          revision: "c8f84f7bd11d43d4",
        },
        {
          url: "/_next/static/chunks/polyfills-42372ed130431b0a.js",
          revision: "846118c33b2c0e922d7b3a7676f81f6f",
        },
        {
          url: "/_next/static/chunks/webpack-6a01eb86d9805c69.js",
          revision: "6a01eb86d9805c69",
        },
        {
          url: "/_next/static/css/f8e60ee5154c7112.css",
          revision: "f8e60ee5154c7112",
        },
        {
          url: "/_next/static/media/bibimbap.e26ab404.jpg",
          revision: "049918f059bff2febc9dfee202d70914",
        },
        {
          url: "/_next/static/media/bulgogi.ff6715a4.jpg",
          revision: "dba4fcc361d70b7cf8176fbe76cc445e",
        },
        {
          url: "/_next/static/media/kimchi-jjigae.6be18032.jpg",
          revision: "f8e966de09ffca049c6998d99848860b",
        },
        {
          url: "/bpi-bank-qr-code-for-payment.png",
          revision: "1914f37afef88ee3df7ca779eea84c65",
        },
        { url: "/file.svg", revision: "d09f95206c3fa0bb9bd9fefabfd0ea71" },
        {
          url: "/gcash-qr-code-for-payment.jpg",
          revision: "2a75ed454ce116bc57e2d13b39e451da",
        },
        { url: "/globe.svg", revision: "2aaafa6a49b6563925fe440891e32717" },
        {
          url: "/header/subtle-pattern.jpg",
          revision: "bc089e680a1e806968a2f0bd751be597",
        },
        {
          url: "/hero-korean-food.jpg",
          revision: "a12a8eb2147033127c4cdd9b0b28dfc1",
        },
        {
          url: "/icon512_maskable.png",
          revision: "7a146948c4dab7d05c1f0b333dd055d3",
        },
        {
          url: "/icon512_rounded.png",
          revision: "217ee1e72a92c8bd77b16466ae484b8a",
        },
        {
          url: "/images/abic-logo.png",
          revision: "04244b867e156a6dd0288ef8ee7ce791",
        },
        {
          url: "/images/newbanner.png",
          revision: "c1ef51389554028c84b1bf6c97c4871c",
        },
        {
          url: "/korean-bbq-grilled-meat-with-side-dishes.jpg",
          revision: "71f9846fd4a29a26bc444454dad32a81",
        },
        {
          url: "/korean-bibimbap-rice-bowl-with-vegetables-and-beef.jpg",
          revision: "68feeca125fdec1080d101d8b4ef912e",
        },
        {
          url: "/korean-kimchi-stew-jjigae-in-stone-pot.jpg",
          revision: "6f4f9b2b07e5e1af4a813a81c2109636",
        },
        { url: "/manifest.json", revision: "ac0eb56deb98b2aac47323a385788ef0" },
        {
          url: "/maya-digital-wallet-qr-code-for-payment.png",
          revision: "aba06f6af045bd08bbd02c9123352ff2",
        },
        { url: "/next.svg", revision: "8e061864f388b47f33a1c3780831193e" },
        {
          url: "/paypal-qr-code-for-payment.png",
          revision: "a44432fe943e6a27b3a81ea185b3e2a9",
        },
        {
          url: "/swe-worker-5c72df51bb1f6ee0.js",
          revision: "76fdd3369f623a3edcf74ce2200bfdd0",
        },
        { url: "/vercel.svg", revision: "c0af2f507b369b085b35ef4bbe3bcf1e" },
        { url: "/window.svg", revision: "a2760511c65806022ad20adf74370ff3" },
      ],
      { ignoreURLParametersMatching: [/^utm_/, /^fbclid$/] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: function (e) {
              var a = e.response;
              return _async_to_generator(function () {
                return _ts_generator(this, function (e) {
                  return [
                    2,
                    a && "opaqueredirect" === a.type
                      ? new Response(a.body, {
                          status: 200,
                          statusText: "OK",
                          headers: a.headers,
                        })
                      : a,
                  ];
                });
              })();
            },
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 2592e3 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/static.+\.js$/i,
      new e.CacheFirst({
        cacheName: "next-static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp4|webm)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 48, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      function (e) {
        var a = e.sameOrigin,
          c = e.url.pathname;
        return !(
          !a ||
          c.startsWith("/api/auth/callback") ||
          !c.startsWith("/api/")
        );
      },
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      function (e) {
        var a = e.request,
          c = e.url.pathname,
          s = e.sameOrigin;
        return (
          "1" === a.headers.get("RSC") &&
          "1" === a.headers.get("Next-Router-Prefetch") &&
          s &&
          !c.startsWith("/api/")
        );
      },
      new e.NetworkFirst({
        cacheName: "pages-rsc-prefetch",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      function (e) {
        var a = e.request,
          c = e.url.pathname,
          s = e.sameOrigin;
        return "1" === a.headers.get("RSC") && s && !c.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "pages-rsc",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      function (e) {
        var a = e.url.pathname;
        return e.sameOrigin && !a.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "pages",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      function (e) {
        return !e.sameOrigin;
      },
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      "GET"
    ),
    (self.__WB_DISABLE_DEV_LOGS = !0);
});
