/* ============================================================
   Bavila Homes — marketing tags (Google Analytics 4 + Meta Pixel)
   ------------------------------------------------------------
   EDIT THE TWO IDs BELOW. Nothing else needs to change.
   This one file is loaded by every page, so the IDs live in
   exactly one place.

   GA4_ID   Google Analytics → Admin → Data Streams → your web
            stream. Looks like "G-XXXXXXXXXX".
   PIXEL_ID Meta Events Manager → Data Sources → your pixel.
            A ~15-digit number, e.g. "1234567890123456".

   Leave an ID as an empty string ("") to disable that tag.
   An ID that is blank or still a placeholder is simply skipped —
   the page stays error-free either way.
   ============================================================ */

var GA4_ID   = "G-MEDW00XNWN";
var PIXEL_ID = "2175155379749975";

(function () {
  "use strict";

  /* An ID counts as real if it matches the right shape AND isn't the
     placeholder. Note: real GA4 IDs can legitimately contain an "X",
     so the placeholder is matched exactly, not by looking for X's. */
  var hasGA    = /^G-[A-Z0-9]{6,}$/i.test(GA4_ID) && GA4_ID !== "G-XXXXXXXXXX";
  var hasPixel = /^[0-9]{10,20}$/.test(PIXEL_ID);

  /* ---------- Google Analytics 4 ---------- */
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  if (hasGA) {
    var ga = document.createElement("script");
    ga.async = true;
    ga.src = "https://www.googletagmanager.com/gtag/js?id=" + GA4_ID;
    document.head.appendChild(ga);

    gtag("js", new Date());
    gtag("config", GA4_ID);
  }

  /* ---------- Meta Pixel ---------- */
  if (hasPixel) {
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n; n.loaded = true; n.version = "2.0"; n.queue = [];
      t = b.createElement(e); t.async = true;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");

    fbq("init", PIXEL_ID);
    fbq("track", "PageView");
  }

  /* ---------- helpers ---------- */
  function metaTrack(event, params) {
    if (hasPixel && window.fbq) fbq("track", event, params || {});
  }
  function googleTrack(event, params) {
    if (hasGA) gtag("event", event, params || {});
  }

  /* ---------- conversion: form submitted ----------
     The Netlify contact form redirects to thanks.html on a
     successful submission, so reaching that page IS the lead. */
  if (/thanks(\.html)?$/i.test(location.pathname)) {
    metaTrack("Lead", { content_name: "Estimate request" });
    googleTrack("generate_lead", { form_name: "contact" });
  }

  /* ---------- conversion: phone number tapped ---------- */
  document.addEventListener("click", function (e) {
    var link = e.target.closest ? e.target.closest('a[href^="tel:"]') : null;
    if (!link) return;
    metaTrack("Contact", { content_name: "Phone tap" });
    googleTrack("phone_call_click", { link_url: link.getAttribute("href") });
  }, true);

  /* ---------- soft signal: reached the estimate form ---------- */
  if (/contact(\.html)?$/i.test(location.pathname)) {
    metaTrack("InitiateCheckout", { content_name: "Estimate form viewed" });
    googleTrack("view_contact_form");
  }
})();
