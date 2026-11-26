// ─── 1. NON-BLOCKING SESSION-ONCE BAUHAUS FARBLICHTSPIEL ENTRANCE ───
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var E_ORBIT = 'cubic-bezier(0.22, 1, 0.36, 1)';

  function runIntro() {
    if (document.body && (document.body.classList.contains('legal-page') || document.body.classList.contains('error-page'))) {
      return;
    }
    try {
      if (sessionStorage.getItem('mh_intro_seen') === '1') return;
      sessionStorage.setItem('mh_intro_seen', '1');
    } catch (e) {}

    var cYellow  = document.querySelector('.nav .mark .c-yellow');
    var cCyan    = document.querySelector('.nav .mark .c-cyan');
    var cMagenta = document.querySelector('.nav .mark .c-magenta');

    if (cYellow && cYellow.animate) {
      cYellow.animate([
        { transform: 'translate3d(0px, -36px, 0) scale(0.75)' },
        { transform: 'translate3d(0px, 0px, 0) scale(1)' }
      ], { duration: 900, easing: E_ORBIT });
    }
    if (cCyan && cCyan.animate) {
      cCyan.animate([
        { transform: 'translate3d(-34px, 24px, 0) scale(0.75)' },
        { transform: 'translate3d(0px, 0px, 0) scale(1)' }
      ], { duration: 900, easing: E_ORBIT });
    }
    if (cMagenta && cMagenta.animate) {
      cMagenta.animate([
        { transform: 'translate3d(34px, 24px, 0) scale(0.75)' },
        { transform: 'translate3d(0px, 0px, 0) scale(1)' }
      ], { duration: 900, easing: E_ORBIT });
    }

    var sY = document.getElementById('sphere-yellow');
    var sB = document.getElementById('sphere-cyan');
    var sR = document.getElementById('sphere-magenta');
    if (sY && sY.animate) {
      sY.animate([
        { transform: 'translate3d(0px, -42px, 0) scale(0.82)' },
        { transform: 'translate3d(0px, 0px, 0) scale(1)' }
      ], { duration: 1100, easing: E_ORBIT });
    }
    if (sB && sB.animate) {
      sB.animate([
        { transform: 'translate3d(-42px, 28px, 0) scale(0.82)' },
        { transform: 'translate3d(0px, 0px, 0) scale(1)' }
      ], { duration: 1100, easing: E_ORBIT });
    }
    if (sR && sR.animate) {
      sR.animate([
        { transform: 'translate3d(42px, 28px, 0) scale(0.82)' },
        { transform: 'translate3d(0px, 0px, 0) scale(1)' }
      ], { duration: 1100, easing: E_ORBIT });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runIntro);
  } else {
    runIntro();
  }
})();

// ─── 2. STICKY NAVBAR, MOBILE MENU & DE/EN LANGUAGE SWITCHER ───
(function () {
  var nav = document.getElementById('main-nav');
  if (nav) {
    var compact = false;
    var ticking = false;
    function updateNav() {
      var y = window.scrollY;
      var next = compact ? y > 18 : y > 54;
      if (next !== compact) {
        compact = next;
        nav.classList.toggle('compact', compact);
      }
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(updateNav);
        ticking = true;
      }
    }, { passive: true });
    updateNav();
  }

  var menuBtn = document.getElementById('menu-btn');
  var mobileMenu = document.getElementById('mobile-menu');
  if (menuBtn && mobileMenu) {
    function closeMenu() {
      menuBtn.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('open');
    }
    menuBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var exp = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', String(!exp));
      mobileMenu.classList.toggle('open', !exp);
    });
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
    document.addEventListener('click', function (e) {
      if (mobileMenu.classList.contains('open') && !mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
        closeMenu();
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        closeMenu();
      }
    });
  }

  // Preserve anchor hash & remember chosen language on DE/EN links
  document.querySelectorAll('[data-lang-link]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetLang = link.getAttribute('data-lang-link');
      try {
        if (targetLang) localStorage.setItem('mh_lang', targetLang);
      } catch (err) {}
      if (window.location.hash && !link.getAttribute('aria-current')) {
        var base = link.getAttribute('href') || '/';
        if (base.indexOf('#') === -1) {
          e.preventDefault();
          window.location.href = base + window.location.hash;
        }
      }
    });
  });
})();

// ─── 3. PERIODIC 3-CIRCLE BAUHAUS SIGNET ORBIT ───
(function () {
  var svg = document.querySelector('[data-spin] svg');
  if (!svg) return;
  var ease = 'cubic-bezier(0.65, 0, 0.35, 1)';
  function spinMarks() {
    if (document.hidden) return;
    var cY = svg.querySelector('.c-yellow');
    var cC = svg.querySelector('.c-cyan');
    var cM = svg.querySelector('.c-magenta');
    if (!cY || !cC || !cM) return;
    cY.animate([
      { transform: 'translate3d(0, 0, 0)', easing: ease },
      { transform: 'translate3d(-25px, 43px, 0)', offset: 0.35, easing: ease },
      { transform: 'translate3d(25px, 43px, 0)', offset: 0.7, easing: ease },
      { transform: 'translate3d(0, 0, 0)' }
    ], { duration: 1600 });
    cC.animate([
      { transform: 'translate3d(0, 0, 0)', easing: ease },
      { transform: 'translate3d(50px, 0px, 0)', offset: 0.35, easing: ease },
      { transform: 'translate3d(25px, -43px, 0)', offset: 0.7, easing: ease },
      { transform: 'translate3d(0, 0, 0)' }
    ], { duration: 1600 });
    cM.animate([
      { transform: 'translate3d(0, 0, 0)', easing: ease },
      { transform: 'translate3d(-25px, -43px, 0)', offset: 0.35, easing: ease },
      { transform: 'translate3d(-50px, 0px, 0)', offset: 0.7, easing: ease },
      { transform: 'translate3d(0, 0, 0)' }
    ], { duration: 1600 });
  }
  setInterval(spinMarks, 14000);
})();

// ─── 4. ROTATING SERIF HEADLINE PHRASE (DE / EN DATA-DRIVEN, BAUHAUS PRIMARIES) ───
(function () {
  var el = document.getElementById('rotating-phrase');
  if (!el) return;
  var items = [
    { text: 'für C# & AL.',               color: 'var(--red)' },
    { text: 'im .NET-Ökosystem.',         color: 'var(--blue)' },
    { text: 'für Business Central.',      color: 'var(--yellow-deep)' },
    { text: 'aus der Region Stuttgart.',  color: 'var(--red)' }
  ];
  try {
    var raw = el.getAttribute('data-phrases');
    if (raw) {
      var parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) items = parsed;
    }
  } catch (e) {}

  var idx = 0;
  setInterval(function () {
    if (document.hidden) return;
    el.style.opacity = '0';
    el.style.transform = 'translate3d(0, 8px, 0)';
    setTimeout(function () {
      idx = (idx + 1) % items.length;
      el.textContent = items[idx].text;
      el.style.color = items[idx].color;
      el.style.opacity = '1';
      el.style.transform = 'translate3d(0, 0, 0)';
    }, 230);
  }, 4000);
})();

// ─── 5. DAY / NIGHT SWITCH & INTERACTIVE BAUHAUS FARBLICHTSPIEL STAGE ───
function syncThemeButtons(night) {
  ['btn-day', 'btn-day-mob'].forEach(function (id) {
    var b = document.getElementById(id);
    if (b) b.setAttribute('aria-pressed', String(!night));
  });
  ['btn-night', 'btn-night-mob'].forEach(function (id) {
    var b = document.getElementById(id);
    if (b) b.setAttribute('aria-pressed', String(night));
  });
}

function setNightMode(night) {
  document.body.classList.toggle('is-night', night);
  syncThemeButtons(night);
  try {
    localStorage.setItem('mh_theme', night ? 'night' : 'day');
  } catch (e) {}
}

(function () {
  try {
    if (localStorage.getItem('mh_theme') === 'night') {
      setNightMode(true);
    }
  } catch (e) {}

  ['btn-day', 'btn-day-mob'].forEach(function (id) {
    var b = document.getElementById(id);
    if (b) b.addEventListener('click', function () { setNightMode(false); });
  });
  ['btn-night', 'btn-night-mob'].forEach(function (id) {
    var b = document.getElementById(id);
    if (b) b.addEventListener('click', function () { setNightMode(true); });
  });

  var coordsEl = document.getElementById('stage-coords');
  var spheres = [].slice.call(document.querySelectorAll('#celestial-body .cmy-sphere'));
  if (!spheres.length) return;

  spheres.forEach(function (sphere) {
    var dragging = false, startX = 0, startY = 0, curX = 0, curY = 0;

    sphere.addEventListener('pointerdown', function (e) {
      dragging = true;
      startX = e.clientX - curX;
      startY = e.clientY - curY;
      sphere.setPointerCapture(e.pointerId);
      sphere.style.transition = 'none';
    });

    sphere.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      curX = Math.max(-72, Math.min(72, Math.round(e.clientX - startX)));
      curY = Math.max(-72, Math.min(72, Math.round(e.clientY - startY)));
      sphere.style.transform = 'translate3d(' + curX + 'px, ' + curY + 'px, 0)';
      if (coordsEl) {
        coordsEl.textContent = 'ΔX ' + (curX >= 0 ? '+' : '') + curX + ' · ΔY ' + (curY >= 0 ? '+' : '') + curY;
      }
      if (sphere.id === 'sphere-magenta') {
        var dist = Math.hypot(curX + 34, curY + 24);
        if (dist < 18) {
          setNightMode(true);
        }
      }
    });

    function endDrag() {
      if (!dragging) return;
      dragging = false;
      sphere.style.transition = 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)';
    }

    sphere.addEventListener('pointerup', endDrag);
    sphere.addEventListener('pointercancel', endDrag);
    sphere.addEventListener('dblclick', function () {
      curX = 0;
      curY = 0;
      sphere.style.transition = 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)';
      sphere.style.transform = 'translate3d(0px, 0px, 0)';
      if (coordsEl) coordsEl.textContent = '0° · 90° // M 1:1';
    });
  });
})();

// ─── 6. MULTI-ZONE STUDIO CLOCK ───
(function () {
  var hm = document.getElementById('clock-hm');
  var off = document.getElementById('clock-off');
  if (!hm || !off) return;
  var btns = [].slice.call(document.querySelectorAll('.zone-switch button'));
  var activeZone = 'Europe/Berlin';

  function tick() {
    var now = new Date();
    try {
      hm.textContent = new Intl.DateTimeFormat('de-DE', {
        timeZone: activeZone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).format(now);
      var parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: activeZone,
        timeZoneName: 'shortOffset'
      }).formatToParts(now);
      var tz = parts.find(function (p) { return p.type === 'timeZoneName'; });
      off.textContent = tz ? tz.value.replace('GMT', 'UTC') : '';
    } catch (e) {
      hm.textContent = now.toTimeString().slice(0, 5);
    }
  }

  btns.forEach(function (b) {
    b.addEventListener('click', function () {
      activeZone = b.getAttribute('data-zone');
      btns.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      tick();
    });
  });

  tick();
  setInterval(tick, 15000);
})();

// ─── 7. ANTI-HARVESTER LEGAL CONTACT HYDRATION ───
(function () {
  function decodeB64(str) {
    if (!str) return '';
    try {
      var bin = atob(str);
      var bytes = new Uint8Array(bin.length);
      for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      return new TextDecoder('utf-8').decode(bytes);
    } catch (e) {
      return '';
    }
  }

  document.querySelectorAll('[data-mh-b64]').forEach(function (el) {
    var val = decodeB64(el.getAttribute('data-mh-b64'));
    if (val) el.textContent = val;
  });

  document.querySelectorAll('[data-mh-mail-u][data-mh-mail-d]').forEach(function (el) {
    var u = decodeB64(el.getAttribute('data-mh-mail-u'));
    var d = decodeB64(el.getAttribute('data-mh-mail-d'));
    if (u && d) {
      var addr = u + '@' + d;
      el.textContent = addr;
      el.setAttribute('href', 'mailto:' + addr);
    }
  });
})();
