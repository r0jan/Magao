/* =========================================
   MAGAO — script.js
   ========================================= */

// ---- NAVBAR scroll effect ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ---- HAMBURGER mobile menu ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// Close mobile menu when a link is clicked
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// ---- FAQ accordion ----
document.querySelectorAll('.faq-item').forEach(item => {
  const btn = item.querySelector('.faq-q');
  btn.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    // Close all
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    // Open clicked if it was closed
    if (!isOpen) item.classList.add('open');
  });
});

// ---- SCROLL REVEAL ----
const revealEls = document.querySelectorAll(
  '.step, .platform-card, .feature-card, .faq-item, .channel, .stat'
);
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => observer.observe(el));

// Stagger siblings in the same parent
function staggerReveal(parentSelector, childSelector, delay = 0.1) {
  document.querySelectorAll(parentSelector).forEach(parent => {
    parent.querySelectorAll(childSelector).forEach((child, i) => {
      child.style.transitionDelay = `${i * delay}s`;
    });
  });
}
staggerReveal('.steps', '.step', 0.12);
staggerReveal('.platforms-grid', '.platform-card', 0.08);
staggerReveal('.features-grid', '.feature-card', 0.1);
staggerReveal('.contact-channels', '.channel', 0.1);

// ---- SMOOTH SCROLL with offset for fixed nav ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ---- CHAT BUBBLE re-animation on scroll into view ----
const chatBubbles = document.querySelectorAll('.chat-bubble');
const phoneObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      chatBubbles.forEach((bubble, i) => {
        bubble.style.opacity = '0';
        bubble.style.animation = 'none';
        void bubble.offsetWidth; // reflow
        bubble.style.animation = '';
        bubble.style.animationDelay = `${0.3 + i * 0.4}s`;
        bubble.style.opacity = '';
      });
    }
  });
}, { threshold: 0.5 });

const phoneEl = document.querySelector('.phone-mockup');
if (phoneEl) phoneObserver.observe(phoneEl);

// ---- Active nav link highlight on scroll ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}, { passive: true });
