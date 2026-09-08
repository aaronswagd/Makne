/**
 * MAKNÉ — MAIN.JS
 * Sticky navbar, smooth scroll, scroll reveal, testimonials carousel, more work carousel
 */
(function () {
  'use strict';

  const navbar = document.getElementById('navbar');

  // ========== STICKY NAVBAR ==========
  function handleScroll() {
    if (!navbar) return;
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll);

  // ========== SMOOTH SCROLL ==========
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // ========== PORTFOLIO SCROLL REVEAL ==========
  function initPortfolioReveal() {
    const projectCards = document.querySelectorAll('.project-card.reveal');
    if (projectCards.length === 0) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    projectCards.forEach((card) => observer.observe(card));
    window.addEventListener('load', () => {
      projectCards.forEach((card) => {
        if (card.getBoundingClientRect().top < window.innerHeight - 80) card.classList.add('visible');
      });
    });
  }

  // ========== EXISTING REVEAL ==========
  function initExistingReveal() {
    const revealElements = document.querySelectorAll('.service-card, .testimonial, .step');
    if (revealElements.length === 0) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.15 });
    revealElements.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(25px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
    window.addEventListener('load', () => {
      revealElements.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }
      });
    });
  }

  // ========== TESTIMONIALS CAROUSEL ==========
  function initTestimonials() {
    const track = document.getElementById('testimonialsTrack');
    const prevBtn = document.getElementById('testimonialPrev');
    const nextBtn = document.getElementById('testimonialNext');

    if (!track || !prevBtn || !nextBtn) return;

    const scrollAmount = 400;

    // Duplicar tarjetas para loop infinito
    const cards = track.querySelectorAll('.testimonial-card');
    cards.forEach(card => {
      const clone = card.cloneNode(true);
      track.appendChild(clone);
    });

    function checkLoop() {
      setTimeout(() => {
        const maxScroll = track.scrollWidth - track.clientWidth;
        if (track.scrollLeft >= maxScroll - 10) {
          track.scrollTo({ left: 0, behavior: 'instant' });
        }
        if (track.scrollLeft <= 10 && maxScroll > 0) {
          track.scrollTo({ left: maxScroll - 400, behavior: 'instant' });
        }
      }, 400);
    }

    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      checkLoop();
    });

    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      checkLoop();
    });

    track.addEventListener('scroll', () => {
      const maxScroll = track.scrollWidth - track.clientWidth;
      if (track.scrollLeft >= maxScroll - 5) {
        setTimeout(() => {
          track.scrollTo({ left: 0, behavior: 'instant' });
        }, 300);
      }
    });
  }

  // ========== MORE WORK CAROUSEL ==========
  function initMoreWorkCarousel() {
    const track = document.getElementById('carouselTrack');
    if (!track) return;
    const cards = track.querySelectorAll('.carousel-item');
    cards.forEach(card => {
      const clone = card.cloneNode(true);
      track.appendChild(clone);
    });
  }

  // ========== INIT ==========
  function init() {
    initSmoothScroll();
    initPortfolioReveal();
    initExistingReveal();
    initTestimonials();
    initMoreWorkCarousel();
    handleScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();