(function () {
  'use strict';

  /* NAV scroll */
  var nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
    if (window.scrollY > 40) nav.classList.add('scrolled');
  }

  /* Mobile drawer */
  var drawer = document.getElementById('drawer');
  var burger = document.getElementById('burger');
  var drawerClose = document.getElementById('drawerClose');
  if (drawer && burger) {
    burger.addEventListener('click', function () { drawer.classList.add('open'); });
    if (drawerClose) drawerClose.addEventListener('click', function () { drawer.classList.remove('open'); });
    drawer.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { drawer.classList.remove('open'); });
    });
  }

  /* Marca link ativo na nav conforme a página atual */
  var current = (window.location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.nav-links a, .drawer a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* Reveal on scroll */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) {
        en.target.classList.add('in');
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  /* WhatsApp tracking */
  document.querySelectorAll('a[href*="wa.me"]').forEach(function (a) {
    a.addEventListener('click', function () {
      try { if (window.fbq) fbq('track', 'Lead', { content_name: 'clique-whatsapp' }); } catch (e) {}
      try { if (window.gtag) gtag('event', 'whatsapp_click', { event_category: 'contato' }); } catch (e) {}
      try { if (window.dataLayer) window.dataLayer.push({ event: 'whatsapp_click' }); } catch (e) {}
    });
  });

  /* Filtro de portfólio */
  var filterBtns = document.querySelectorAll('.case-filter button');
  var caseCards = document.querySelectorAll('.case-card');
  if (filterBtns.length && caseCards.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var f = btn.dataset.filter;
        caseCards.forEach(function (card) {
          var show = f === 'all' || card.dataset.category === f;
          card.style.display = show ? '' : 'none';
        });
      });
    });
  }

  /* Formulário de contato (demonstrativo — sem backend configurado) */
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('.btn-submit');
      var success = document.getElementById('formSuccess');
      btn.disabled = true;
      btn.textContent = 'Enviando...';

      try { if (window.fbq) fbq('track', 'Lead', { content_name: 'formulario-contato' }); } catch (err) {}
      try { if (window.gtag) gtag('event', 'form_submit', { event_category: 'contato' }); } catch (err) {}

      var nome = encodeURIComponent(form.nome.value || '');
      var servico = encodeURIComponent(form.servico ? form.servico.value : '');
      var mensagem = encodeURIComponent(form.mensagem.value || '');
      var texto = 'Olá! Meu nome é ' + decodeURIComponent(nome) +
        (servico ? '. Tenho interesse em: ' + decodeURIComponent(servico) : '') +
        (mensagem ? '. Mensagem: ' + decodeURIComponent(mensagem) : '');

      setTimeout(function () {
        form.style.display = 'none';
        if (success) success.classList.add('show');
        var waLink = document.getElementById('waFallback');
        if (waLink) waLink.href = 'https://wa.me/5583994028974?text=' + encodeURIComponent(texto);
      }, 700);
    });
  }

})();
