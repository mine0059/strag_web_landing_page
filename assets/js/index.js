/* ================================================================
   STRAG — Smart Transport Grid Ltd
   JavaScript: assets/js/index.js
   ================================================================ */

/* ─── FAQ Accordion ─────────────────────────────── */
/**
 * Toggles a single FAQ item open or closed.
 * Closes all other open items first (accordion behaviour).
 * @param {HTMLElement} questionEl - The clicked .faq-q element
 */
function toggleFaq(questionEl) {
  const clickedItem = questionEl.parentElement;
  const allItems    = document.querySelectorAll('.faq-item');

  allItems.forEach(function (item) {
    if (item !== clickedItem) {
      item.classList.remove('open');
    }
  });

  clickedItem.classList.toggle('open');
}

/* ─── Journey Tabs ──────────────────────────────── */
/**
 * Shows the selected journey panel and highlights the active tab.
 * @param {string}      id    - Journey panel suffix (passenger | driver | government | enforcement)
 * @param {HTMLElement} tabEl - The clicked tab button element
 */
function showJourney(id, tabEl) {
  /* Hide all journey panels */
  document.querySelectorAll('[id^="journey-"]').forEach(function (panel) {
    panel.style.display = 'none';
  });

  /* Remove active class from all tabs */
  document.querySelectorAll('.journey-tab').forEach(function (tab) {
    tab.classList.remove('active');
  });

  /* Show selected panel and mark tab active */
  var target = document.getElementById('journey-' + id);
  if (target) {
    target.style.display = 'grid';
  }

  tabEl.classList.add('active');
}

/* ─── Scroll-triggered Fade-In ──────────────────── */
/**
 * Uses IntersectionObserver to animate cards into view
 * when they enter the viewport.
 */
function initScrollAnimations() {
  var animatableSelectors = [
    '.solution-card',
    '.challenge-card',
    '.stakeholder-card',
    '.phase-card',
    '.value-card',
    '.leader-card',
    '.trust-card',
    '.vmv-card',
    '.traction-stat',
    '.hero-mini-card',
    '.arch-step',
    '.journey-step',
  ].join(', ');

  var elements = document.querySelectorAll(animatableSelectors);

  elements.forEach(function (el) {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  elements.forEach(function (el) {
    observer.observe(el);
  });
}

/* ─── Mobile Navigation Toggle ──────────────────── */
/**
 * Toggles the mobile nav drawer open and closed.
 */
function initMobileNav() {
  var toggle   = document.getElementById('nav-toggle');
  var navLinks = document.getElementById('nav-links');

  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', function () {
    navLinks.classList.toggle('open');
    var isOpen = navLinks.classList.contains('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  /* Close the drawer when any nav link is clicked */
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ─── Sticky Nav Shadow ─────────────────────────── */
/**
 * Adds a subtle shadow to the nav when the page is scrolled.
 */
function initNavShadow() {
  var nav = document.querySelector('nav');
  if (!nav) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 10) {
      nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
    } else {
      nav.style.boxShadow = 'none';
    }
  });
}

/* ─── Smooth Anchor Scroll Offset ───────────────── */
/**
 * Offsets anchor scroll by the nav height so content
 * is not hidden under the sticky navigation bar.
 */
function initAnchorOffset() {
  var navHeight = 68;

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = anchor.getAttribute('href').slice(1);
      var target   = document.getElementById(targetId);

      if (!target) return;

      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
}

/* ─── Active Nav Link Highlighting ─────────────── */
/**
 * Highlights the correct nav link based on the
 * current scroll position using IntersectionObserver.
 */
function initActiveNavLinks() {
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  if (!sections.length || !navLinks.length) return;

  var sectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          navLinks.forEach(function (link) {
            link.style.color = '';
            link.style.fontWeight = '';
            if (link.getAttribute('href') === '#' + id) {
              link.style.color      = 'var(--blue)';
              link.style.fontWeight = '700';
            }
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach(function (section) {
    sectionObserver.observe(section);
  });
}

/* ─── Ticker Pause on Hover ─────────────────────── */
/**
 * Pauses the scrolling ticker when the user hovers over it.
 */
function initTickerPause() {
  var tickerTrack = document.querySelector('.ticker-track');
  if (!tickerTrack) return;

  tickerTrack.addEventListener('mouseenter', function () {
    tickerTrack.style.animationPlayState = 'paused';
  });

  tickerTrack.addEventListener('mouseleave', function () {
    tickerTrack.style.animationPlayState = 'running';
  });
}

/* ─── Back to Top Button ────────────────────────── */
/**
 * Injects and controls a back-to-top button that appears
 * when the user scrolls down 400px.
 */
function initBackToTop() {
  var btn = document.createElement('button');
  btn.id            = 'back-to-top';
  btn.textContent   = '↑';
  btn.title         = 'Back to top';
  btn.setAttribute('aria-label', 'Scroll back to top');

  Object.assign(btn.style, {
    position:     'fixed',
    bottom:       '32px',
    right:        '32px',
    width:        '44px',
    height:       '44px',
    borderRadius: '50%',
    background:   'var(--blue)',
    color:        'white',
    border:       'none',
    fontSize:     '1.1rem',
    cursor:       'pointer',
    display:      'none',
    alignItems:   'center',
    justifyContent: 'center',
    boxShadow:    '0 4px 16px rgba(0,0,0,0.2)',
    zIndex:       '200',
    transition:   'opacity 0.3s ease, transform 0.3s ease',
  });

  document.body.appendChild(btn);

  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      btn.style.display = 'flex';
    } else {
      btn.style.display = 'none';
    }
  });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ─── Initialise Everything on DOM Ready ────────── */
document.addEventListener('DOMContentLoaded', function () {
  initScrollAnimations();
  initMobileNav();
  initNavShadow();
  initAnchorOffset();
  initActiveNavLinks();
  initTickerPause();
  initBackToTop();
});