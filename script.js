/* =========================================
   MAGAO — script.js
   ========================================= */

// ---- NAVBAR scroll effect ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ---- HAMBURGER mobile menu ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// ---- FAQ accordion ----
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-q').addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ---- SCROLL REVEAL (generic cards) ----
const revealEls = document.querySelectorAll(
  '.step, .platform-card, .feature-card, .faq-item, .channel, .stat'
);
revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => revealObserver.observe(el));

// Stagger siblings
function staggerReveal(parentSel, childSel, delay = 0.1) {
  document.querySelectorAll(parentSel).forEach(parent => {
    parent.querySelectorAll(childSel).forEach((child, i) => {
      child.style.transitionDelay = `${i * delay}s`;
    });
  });
}
staggerReveal('.steps', '.step', 0.12);
staggerReveal('.platforms-grid', '.platform-card', 0.08);
staggerReveal('.features-grid', '.feature-card', 0.1);
staggerReveal('.contact-channels', '.channel', 0.08);

// ---- JOURNEY NODE animate-in on scroll ----
const journeyNodes = document.querySelectorAll('.journey-node');
const journeyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const idx = parseInt(entry.target.dataset.index || 0);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 180);
      journeyObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
journeyNodes.forEach(node => journeyObserver.observe(node));

// Also stagger dot animations per connector
document.querySelectorAll('.journey-connector').forEach((connector, ci) => {
  connector.querySelectorAll('.jdot').forEach((dot, di) => {
    dot.style.animationDelay = `${ci * 0.3 + di * 0.15}s`;
  });
  const icon = connector.querySelector('.journey-moving-icon');
  if (icon) icon.style.animationDelay = `${ci * 0.4}s`;
});

// ---- CHAT BUBBLE re-animation ----
const chatBubbles = document.querySelectorAll('.chat-bubble');
const phoneObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      chatBubbles.forEach((bubble, i) => {
        bubble.style.opacity = '0';
        bubble.style.animation = 'none';
        void bubble.offsetWidth;
        bubble.style.animation = '';
        bubble.style.animationDelay = `${0.3 + i * 0.4}s`;
        bubble.style.opacity = '';
      });
    }
  });
}, { threshold: 0.5 });
const phoneEl = document.querySelector('.phone-mockup');
if (phoneEl) phoneObserver.observe(phoneEl);

// ---- SMOOTH SCROLL with offset ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 88;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ---- Active nav highlight ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
}, { passive: true });

// ---- Pay step toggle animation in CTA ----
const paySteps = document.querySelectorAll('.pay-step');
if (paySteps.length === 2) {
  let toggle = false;
  setInterval(() => {
    toggle = !toggle;
    paySteps[0].classList.toggle('pay-active', !toggle);
    paySteps[1].classList.toggle('pay-active', toggle);
  }, 2000);
}
