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

// ===== CONFIG =====
const menu = document.querySelector('.menu');
const menuLinks = document.querySelectorAll('.menu a');
const sections = document.querySelectorAll('section[id]');

// ===== CRIAR INDICADOR DINAMICAMENTE =====
const indicator = document.createElement('div');
indicator.classList.add('menu-indicator');
menu.appendChild(indicator);

// ===== MOVER INDICADOR =====
function moveIndicator(link) {

  // desativa no mobile
  if (window.innerWidth <= 768) return;

  const rect = link.getBoundingClientRect();
  const parentRect = menu.getBoundingClientRect();

  indicator.style.width = rect.width + "px";
  indicator.style.left = (rect.left - parentRect.left) + "px";
}

// ===== ATUALIZAR LINK ATIVO =====
function setActiveLink() {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop - 150) {
      current = section.getAttribute("id");
    }
  });

  menuLinks.forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
      moveIndicator(link);
    }
  });
}

// ===== SCROLL SUAVE =====
menuLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));

    if (!target) return;

    const headerHeight = document.getElementById('header').offsetHeight;

    window.scrollTo({
      top: target.offsetTop - headerHeight,
      behavior: 'smooth'
    });

    menuLinks.forEach(l => l.classList.remove('active'));
    this.classList.add('active');

    moveIndicator(this);
  });
});

// ===== EVENTOS =====
window.addEventListener('scroll', setActiveLink);

window.addEventListener('load', () => {
  setActiveLink();

  const active = document.querySelector('.menu a.active');
  if (active) moveIndicator(active);
});

// ===== AJUSTAR AO REDIMENSIONAR =====
window.addEventListener('resize', () => {
  const active = document.querySelector('.menu a.active');
  if (active) moveIndicator(active);
});

window.addEventListener("resize", () => {

  const active = document.querySelector(".menu a.active");

  if (active) moveIndicator(active);

});
