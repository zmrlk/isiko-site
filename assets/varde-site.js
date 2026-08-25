(function () {
  "use strict";

  var root = document.documentElement;
  var header = document.querySelector(".site-header");
  var revealTargets = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));
  var privacyNotice = document.querySelector("[data-privacy-notice]");
  var privacyDismiss = document.querySelector("[data-privacy-dismiss]");
  var scrollFrame = 0;

  root.classList.add("js");

  function markReady() {
    requestAnimationFrame(function () {
      root.classList.add("is-ready");
    });
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(markReady);
  } else {
    markReady();
  }

  function updateHeader() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 48);
  }

  function updateScrollState() {
    scrollFrame = 0;
    updateHeader();
  }

  function requestScrollUpdate() {
    if (scrollFrame) return;
    scrollFrame = requestAnimationFrame(updateScrollState);
  }

  updateHeader();
  window.addEventListener("scroll", requestScrollUpdate, { passive: true });

  if (privacyNotice) {
    var privacyKey = "varde_privacy_notice_v1";
    var wasDismissed = false;

    try {
      wasDismissed = window.localStorage.getItem(privacyKey) === "dismissed";
    } catch (error) {
      wasDismissed = false;
    }

    privacyNotice.hidden = wasDismissed;

    if (privacyDismiss) {
      privacyDismiss.addEventListener("click", function () {
        privacyNotice.hidden = true;
        try {
          window.localStorage.setItem(privacyKey, "dismissed");
        } catch (error) {
          /* The notice can still be closed when storage is unavailable. */
        }
      });
    }
  }

  if (!("IntersectionObserver" in window)) {
    revealTargets.forEach(function (target) { target.classList.add("is-visible"); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: .12 });

    revealTargets.forEach(function (target) { revealObserver.observe(target); });
  }
})();
