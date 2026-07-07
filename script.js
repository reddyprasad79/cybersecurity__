// STACKLY SECURITY — shared behavior

document.addEventListener('DOMContentLoaded', () => {

  // mobile nav toggle
  const toggle = document.querySelector('.menu-toggle');
  const navRow = document.querySelector('.nav-row');
  if (toggle && navRow) {
    toggle.addEventListener('click', () => navRow.classList.toggle('open'));
  }

  // mark active nav link
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });

  // incident ticker (hero)
  const tickerText = document.getElementById('tickerText');
  if (tickerText) {
    const events = [
      'Blocked credential-stuffing attempt — origin: 41.22x.x.x',
      'Endpoint isolated — WKSTN-1187 flagged for anomalous process tree',
      'Patch verified — CVE-2026-3312 remediated across 214 hosts',
      'Phishing payload quarantined — 3 recipients protected',
      'Firewall rule auto-updated — new indicator ingested',
      'MFA challenge passed — no anomalies on session'
    ];
    let i = 0;
    const render = () => { tickerText.textContent = events[i % events.length]; i++; };
    render();
    setInterval(render, 3200);
  }

  // animated stat counters
  const counters = document.querySelectorAll('.num[data-count]');
  if (counters.length) {
    const animate = (el) => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const dur = 1400;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = target * eased;
        el.textContent = (target % 1 === 0 ? Math.round(val) : val.toFixed(1)) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { animate(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.4 });
    counters.forEach(c => io.observe(c));
  }

  // contact form (static demo — no backend)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Message received';
      btn.disabled = true;
      setTimeout(() => { btn.textContent = original; btn.disabled = false; contactForm.reset(); }, 2200);
    });
  }

  // signin / register forms (static demo — no backend)
  ['signinForm','registerForm'].forEach(id => {
    const f = document.getElementById(id);
    if (f) {
      f.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = f.querySelector('button[type="submit"]');
        const original = btn.textContent;
        btn.textContent = 'Verifying…';
        setTimeout(() => { btn.textContent = original; }, 1600);
      });
    }
  });

});
