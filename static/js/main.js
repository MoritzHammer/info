// ─── 1. NON-BLOCKING SESSION-ONCE CMY INTRO ANIMATION ───
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  try {
    if (sessionStorage.getItem('mh_intro_seen') === '1') return;
    sessionStorage.setItem('mh_intro_seen', '1');
  } catch (e) {}

  var root = document.documentElement;
  var INK = '#131313', STONE = '#f6f5f1';
  var E = 'cubic-bezier(0.22, 1, 0.36, 1)';
  var E_ORBIT = 'cubic-bezier(0.65, 0, 0.35, 1)';
  var overlay, done = false;

  function finish() {
    if (done) return;
    done = true;
    root.classList.remove('intro-active');
    if (overlay) {
      overlay.remove();
      overlay = null;
    }
  }

  function runIntro() {
    var navLogo = document.querySelector('.nav .logo');
    var navMark = navLogo && navLogo.querySelector('svg');
    var navWord = navLogo && navLogo.querySelector('.wordmark');
    if (!navMark || !navWord) return finish();

    root.classList.add('intro-active');

    var r = navLogo.getBoundingClientRect();
    var maxW = innerWidth < 640 ? innerWidth * 0.84 : innerWidth * 0.68;
    var k = Math.max(1.3, Math.min(maxW / Math.max(r.width, 195), 2.4));

    overlay = document.createElement('div');
    overlay.setAttribute('aria-hidden', 'true');
    overlay.style.cssText = 'position:fixed;inset:0;z-index:9999;display:grid;place-items:center;overflow:hidden;pointer-events:none;background:' + INK + ';will-change:opacity';

    var stage = document.createElement('div');
    stage.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:' + (14 * k) + 'px';

    var lockup = document.createElement('div');
    lockup.style.cssText = 'display:inline-flex;align-items:center;gap:' + (11 * k) + 'px;transform-origin:0 0;will-change:transform';

    var mark = navMark.cloneNode(true);
    mark.removeAttribute('class');
    mark.style.cssText = 'display:block;height:' + (26 * k) + 'px;width:' + (27 * k) + 'px;overflow:visible;transform-origin:50% 50%;flex-shrink:0;will-change:transform';

    var cYellow  = mark.querySelector('.c-yellow');
    var cCyan    = mark.querySelector('.c-cyan');
    var cMagenta = mark.querySelector('.c-magenta');
    [cYellow, cCyan, cMagenta].forEach(function (c) {
      if (c) {
        c.style.mixBlendMode = 'normal';
        c.style.opacity = '0.9';
        c.style.willChange = 'transform';
      }
    });

    var word = document.createElement('span');
    word.style.cssText = 'font-family:' + getComputedStyle(navWord).fontFamily + ';font-weight:900;font-size:' + (23 * k) + 'px;line-height:1;letter-spacing:0.02em;white-space:nowrap;color:' + STONE + ';display:inline-flex;gap:0.26em;will-change:transform,opacity';

    ['MORITZ', 'HAMMER'].forEach(function (w) {
      var wSpan = document.createElement('span');
      wSpan.style.cssText = 'display:inline-flex';
      for (var idx = 0; idx < w.length; idx++) {
        var ch = document.createElement('span');
        ch.textContent = w[idx];
        ch.style.cssText = 'display:inline-block;opacity:0;will-change:transform,opacity';
        wSpan.append(ch);
      }
      word.append(wSpan);
    });

    var sub = document.createElement('div');
    sub.textContent = 'ANWENDUNGSENTWICKLER · C# / .NET & AL';
    sub.style.cssText = 'font-family:var(--font-sans);font-size:' + Math.max(10, Math.round(7.5 * k)) + 'px;font-weight:600;letter-spacing:0.18em;color:rgba(246,245,241,0.65);opacity:0;will-change:transform,opacity';

    lockup.append(mark, word);
    stage.append(lockup, sub);
    overlay.append(stage);
    document.body.append(overlay);

    mark.animate([
      { transform: 'scale3d(0.25, 0.25, 1) rotate(-220deg)' },
      { transform: 'scale3d(1.1, 1.1, 1) rotate(-25deg)', offset: 0.65 },
      { transform: 'scale3d(1, 1, 1) rotate(0deg)' }
    ], { duration: 950, easing: E, fill: 'both' });

    if (cYellow) {
      cYellow.animate([
        { transform: 'translate3d(0px, -48px, 0) scale3d(0.75, 0.75, 1)' },
        { transform: 'translate3d(-24px, 36px, 0) scale3d(1.04, 1.04, 1)', offset: 0.5 },
        { transform: 'translate3d(0px, 0px, 0) scale3d(1, 1, 1)' }
      ], { duration: 1400, easing: E_ORBIT, fill: 'both' });
    }
    if (cCyan) {
      cCyan.animate([
        { transform: 'translate3d(-44px, 32px, 0) scale3d(0.75, 0.75, 1)' },
        { transform: 'translate3d(42px, 0px, 0) scale3d(1.04, 1.04, 1)', offset: 0.5 },
        { transform: 'translate3d(0px, 0px, 0) scale3d(1, 1, 1)' }
      ], { duration: 1400, easing: E_ORBIT, fill: 'both' });
    }
    if (cMagenta) {
      cMagenta.animate([
        { transform: 'translate3d(44px, 32px, 0) scale3d(0.75, 0.75, 1)' },
        { transform: 'translate3d(-20px, -36px, 0) scale3d(1.04, 1.04, 1)', offset: 0.5 },
        { transform: 'translate3d(0px, 0px, 0) scale3d(1, 1, 1)' }
      ], { duration: 1400, easing: E_ORBIT, fill: 'both' });
    }

    var chars = word.querySelectorAll('span > span');
    [].forEach.call(chars, function (ch, i) {
      ch.animate([
        { opacity: 0, transform: 'translate3d(0, 18px, 0)' },
        { opacity: 1, transform: 'translate3d(0, 0, 0)' }
      ], { duration: 440, delay: 380 + i * 38, easing: E, fill: 'both' });
    });

    sub.animate([
      { opacity: 0, transform: 'translate3d(0, 8px, 0)' },
      { opacity: 1, transform: 'translate3d(0, 0, 0)' }
    ], { duration: 460, delay: 920, easing: E, fill: 'both' });

    setTimeout(function () {
      if (done || !overlay) return;
      sub.animate([
        { opacity: 1, transform: 'translate3d(0, 0, 0)' },
        { opacity: 0, transform: 'translate3d(0, -6px, 0)' }
      ], { duration: 240, easing: E, fill: 'forwards' });

      var from = lockup.getBoundingClientRect();
      var to = navLogo.getBoundingClientRect();
      var dx = to.left - from.left;
      var dy = to.top - from.top;

      lockup.animate([
        { transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1)' },
        { transform: 'translate3d(' + dx + 'px, ' + dy + 'px, 0) scale3d(' + (1 / k) + ', ' + (1 / k) + ', 1)' }
      ], { duration: 680, easing: E, fill: 'forwards' });

      var fade = overlay.animate([
        { opacity: 1 },
        { opacity: 0 }
      ], { duration: 460, delay: 220, easing: 'ease-out', fill: 'forwards' });

      fade.onfinish = finish;
    }, 1680);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runIntro);
  } else {
    runIntro();
  }
  setTimeout(function () { if (!done) finish(); }, 3500);
})();

// ─── 2. STICKY NAVBAR & MOBILE MENU ───
(function () {
  var nav = document.getElementById('main-nav');
  if (!nav) return;
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

  var menuBtn = document.getElementById('menu-btn');
  var mobileMenu = document.getElementById('mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function () {
      var exp = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', String(!exp));
      mobileMenu.classList.toggle('open', !exp);
    });
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menuBtn.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('open');
      });
    });
  }
})();

// ─── 3. PERIODIC 3-CIRCLE CMY LOGO ORBIT ───
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

// ─── 4. ROTATING SERIF HEADLINE PHRASE ───
(function () {
  var items = [
    { text: 'für C# & AL.',               color: 'var(--magenta)' },
    { text: 'im .NET-Ökosystem.',         color: 'var(--cyan)' },
    { text: 'für Business Central.',      color: 'var(--yellow-deep)' },
    { text: 'aus der Region Stuttgart.',  color: 'var(--violet)' }
  ];
  var idx = 0;
  var el = document.getElementById('rotating-phrase');
  if (!el) return;
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

// ─── 5. DAY / NIGHT SWITCH & DRAGGABLE CMY SPHERE ───
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

  var mag = document.getElementById('sphere-magenta');
  if (!mag) return;
  var dragging = false, startX = 0, startY = 0, curX = 0, curY = 0;

  mag.addEventListener('pointerdown', function (e) {
    dragging = true;
    startX = e.clientX - curX;
    startY = e.clientY - curY;
    mag.setPointerCapture(e.pointerId);
    mag.style.transition = 'none';
  });

  mag.addEventListener('pointermove', function (e) {
    if (!dragging) return;
    curX = Math.max(-150, Math.min(110, e.clientX - startX));
    curY = Math.max(-110, Math.min(90, e.clientY - startY));
    mag.style.transform = 'translate3d(' + curX + 'px, ' + curY + 'px, 0)';
    var dist = Math.hypot(curX + 40, curY + 26);
    if (dist < 24) {
      setNightMode(true);
    }
  });

  window.addEventListener('pointerup', function () {
    if (!dragging) return;
    dragging = false;
    mag.style.transition = 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)';
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
