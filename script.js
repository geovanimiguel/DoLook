// ===== MENU MOBILE (TOGGLE + OVERLAY) =====
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');
const overlay = document.querySelector('.overlay');

if (hamburger && nav && overlay) {
  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.contains('active');

    nav.classList.toggle('active', !isOpen);
    overlay.classList.toggle('active', !isOpen);
    document.body.style.overflow = isOpen ? '' : 'hidden';
  });

  overlay.addEventListener('click', () => {
    nav.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  });
}

// ===== SCROLL SUAVE + FECHA MENU =====
const navLinks = document.querySelectorAll('.menu a[href^="#"]');

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();

    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;

    const headerHeight = document.getElementById('header').offsetHeight;

    window.scrollTo({
      top: target.offsetTop - headerHeight,
      behavior: 'smooth'
    });

    nav.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// ===== HEADER INTELIGENTE (SCROLL) =====
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;

  if (currentScroll > lastScroll && currentScroll > 100) {
    header.classList.add('hider');
    header.classList.remove('show');
  } else {
    header.classList.remove('hider');
    header.classList.add('show');
  }

  lastScroll = currentScroll;
});

// ===== ANIMAÇÃO DOS CARDS =====
const cards = document.querySelectorAll('.card');

const cardObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

cards.forEach(card => cardObserver.observe(card));

// ===== ANIMAÇÃO DO FOOTER =====
const footer = document.querySelector('.footer');

const footerObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

footerObserver.observe(footer);

const closeMenuBtn = document.querySelector('.close-menu');

if (closeMenuBtn) {
  closeMenuBtn.addEventListener('click', () => {
    nav.classList.remove('active');
    overlay.classList.remove('active');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
  });
}

// ===== FAQ ACCORDION =====
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');

  question.addEventListener('click', () => {
    const isActive = item.classList.contains('active');

    // Fecha todos
    faqItems.forEach(i => i.classList.remove('active'));

    // Abre apenas o clicado
    if (!isActive) {
      item.classList.add('active');
    }
  });
});
