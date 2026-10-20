/* Procedia, comportamento do site. Sem dependencia externa. */
(function () {
  'use strict';
  var semMovimento = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Menu mobile */
  var burger = document.getElementById('burger');
  var drawer = document.getElementById('drawer');
  var fechar = document.getElementById('drawerFechar');
  function alternar(aberto) {
    if (!drawer) return;
    drawer.classList.toggle('aberto', aberto);
    if (burger) burger.setAttribute('aria-expanded', aberto);
    document.body.style.overflow = aberto ? 'hidden' : '';
    if (aberto) { var a = drawer.querySelector('a'); if (a) a.focus(); }
    else if (burger) burger.focus();
  }
  if (burger) burger.addEventListener('click', function () { alternar(true); });
  if (fechar) fechar.addEventListener('click', function () { alternar(false); });
  if (drawer) drawer.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { alternar(false); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && drawer && drawer.classList.contains('aberto')) alternar(false);
  });

  /* Barra fixa ganha sombra ao rolar */
  var nav = document.querySelector('.nav');
  if (nav) {
    var marcarNav = function () { nav.classList.toggle('rolou', window.scrollY > 8); };
    marcarNav();
    window.addEventListener('scroll', marcarNav, { passive: true });
  }

  /* Contagem dos numeros de resultado.
     Preserva prefixo e sufixo: "R$ 1.039", "62%", "R$ 2,71". */
  function animarNumero(el) {
    var texto = el.textContent.trim();
    var m = texto.match(/^([^\d]*)([\d.,]+)([^\d]*)$/);
    if (!m) return;
    var prefixo = m[1], bruto = m[2], sufixo = m[3];
    var decimais = 0, limpo = bruto;
    if (bruto.indexOf(',') > -1) {
      decimais = bruto.split(',')[1].length;
      limpo = bruto.replace(/\./g, '').replace(',', '.');
    } else {
      limpo = bruto.replace(/\./g, '');
    }
    var alvo = parseFloat(limpo);
    if (isNaN(alvo)) return;
    var temMilhar = bruto.indexOf('.') > -1 && decimais === 0;
    function formatar(v) {
      if (decimais > 0) return v.toFixed(decimais).replace('.', ',');
      return temMilhar ? Math.round(v).toLocaleString('pt-BR') : String(Math.round(v));
    }
    var inicio = null, dur = 900;
    function passo(t) {
      if (inicio === null) inicio = t;
      var p = Math.min((t - inicio) / dur, 1);
      var e = 1 - Math.pow(1 - p, 3);
      el.textContent = prefixo + formatar(alvo * e) + sufixo;
      if (p < 1) requestAnimationFrame(passo);
      else el.textContent = texto;
    }
    requestAnimationFrame(passo);
  }

  /* Entrada ao aparecer na tela */
  var alvos = document.querySelectorAll('.ent, .ent-grupo');
  if (semMovimento || !('IntersectionObserver' in window)) {
    alvos.forEach(function (el) { el.classList.add('visivel'); });
  } else {
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('visivel');
        en.target.querySelectorAll('.numero[data-anima]').forEach(animarNumero);
        obs.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
    alvos.forEach(function (el) { obs.observe(el); });
  }

  /* Deslocamento leve das linhas de pauta. Camada decorativa, nunca texto. */
  var pautas = document.querySelectorAll('.pauta');
  if (!semMovimento && pautas.length) {
    var pedido = false;
    window.addEventListener('scroll', function () {
      if (pedido) return;
      pedido = true;
      requestAnimationFrame(function () {
        var y = window.scrollY * 0.06;
        pautas.forEach(function (p) { p.style.backgroundPositionY = y + 'px'; });
        pedido = false;
      });
    }, { passive: true });
  }

  /* Consentimento e medicao. O pixel so carrega apos o aceite. */
  var PIXEL_ID = '1815352353148315';
  var CHAVE = 'procedia_cookies';
  var consentimento = null;
  try { consentimento = localStorage.getItem(CHAVE); } catch (e) {}

  function carregarPixel() {
    if (window.__pixelCarregado || !PIXEL_ID) return;
    window.__pixelCarregado = true;
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', PIXEL_ID); fbq('track', 'PageView');
  }
  window.medir = function (evento, dados) {
    if (window.fbq && window.__pixelCarregado) fbq('track', evento, dados || {});
  };

  function montarAviso() {
    var el = document.createElement('div');
    el.className = 'aviso';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', 'Aviso de cookies');
    el.innerHTML = '<p>Usamos cookies para melhorar o site e medir nossas campanhas. Você pode recusar os de marketing, e o site continua funcionando. Veja a <a href="privacidade.html">Política de Privacidade</a>.</p>' +
      '<div class="aviso-botoes"><button class="btn btn-secundario" data-cookie="recusado">Recusar</button><button class="btn btn-principal" data-cookie="aceito">Aceitar</button></div>';
    document.body.appendChild(el);
    requestAnimationFrame(function () { el.classList.add('visivel'); });
    el.querySelectorAll('[data-cookie]').forEach(function (b) {
      b.addEventListener('click', function () {
        var v = b.getAttribute('data-cookie');
        try { localStorage.setItem(CHAVE, v); } catch (e) {}
        el.remove();
        if (v === 'aceito') carregarPixel();
      });
    });
  }

  if (consentimento === 'aceito') carregarPixel();
  else if (consentimento !== 'recusado') montarAviso();

  /* Eventos de conversao */
  document.addEventListener('click', function (e) {
    var alvo = e.target.closest ? e.target.closest('a[href*="wa.me"]') : null;
    if (alvo) window.medir('Contact', { canal: 'whatsapp' });
  }, true);
  document.addEventListener('submit', function (e) {
    if (e.target && e.target.tagName === 'FORM') window.medir('Lead', { formulario: e.target.getAttribute('name') || 'contato' });
  }, true);
})();
