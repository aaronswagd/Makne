/* ============================================================
   lang-detect.js
   Detecta el idioma del navegador y redirige a /es/ o /
   Debe cargarse en el <head> para evitar parpadeo.
   ============================================================ */

(function () {
  'use strict';

  function reveal() {
    document.documentElement.style.visibility = '';
  }

  try {
    // En local con doble clic (file://) no redirigimos.
    if (location.protocol === 'file:') {
      reveal();
      return;
    }

    var pref = localStorage.getItem('makne-lang');
    var path = location.pathname;
    var inEs = /\/es(\/|$)/.test(path);

    // Nombre del archivo actual (index.html, cv.html…)
    var filename = 'index.html';
    var lastSlash = path.lastIndexOf('/');
    if (lastSlash >= 0) {
      var last = path.substring(lastSlash + 1);
      if (last && last !== 'es') filename = last;
    }

    // Idioma del navegador
    var nav = (navigator.language || (navigator.languages && navigator.languages[0]) || 'en').toLowerCase();
    var isEs = nav.indexOf('es') === 0;

    // Base relativa (funciona en GitHub Pages y en servidor local)
    var base = inEs
      ? path.replace(/\/es\/[^\/]*$/, '/')
      : path.replace(/\/[^\/]*$/, '/');

    var target = null;

    if (pref === 'es' && !inEs) {
      target = base + 'es/' + filename;
    } else if (pref === 'en' && inEs) {
      target = base + filename;
    } else if (!pref) {
      if (isEs && !inEs) target = base + 'es/' + filename;
      else if (!isEs && inEs) target = base + filename;
    }

    if (target && target !== path) {
      location.replace(target);
      return;
    }
  } catch (e) {
    /* silencioso */
  }

  reveal();
})();