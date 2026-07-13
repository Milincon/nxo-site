(function () {
  'use strict';
  var el = document.getElementById('footer-include');
  if (!el) return;

  el.innerHTML =
    '<div class="footer-top">' +
      '<div>' +
        '<div class="footer-logo">' +
          '<svg class="logo-svg" viewBox="0 0 1740 695" role="img" aria-label="NXO Agência"><use href="#nxoLogo" width="1740" height="695"/></svg>' +
        '</div>' +
      '</div>' +
      '<div class="footer-col">' +
        '<h4>Navegação</h4>' +
        '<ul class="footer-links">' +
          '<li><a href="index.html">Início</a></li>' +
          '<li><a href="servicos.html">Serviços</a></li>' +
          '<li><a href="portfolio.html">Portfólio</a></li>' +
          '<li><a href="contato.html">Contato</a></li>' +
        '</ul>' +
      '</div>' +
      '<div class="footer-col">' +
        '<h4>Contato</h4>' +
        '<ul class="footer-links">' +
          '<li><a href="mailto:nxoagmkt@gmail.com">nxoagmkt@gmail.com</a></li>' +
          '<li><a href="https://wa.me/5583994028974" target="_blank" rel="noopener">(83) 99402-8974</a></li>' +
        '</ul>' +
      '</div>' +
      '<div class="footer-col">' +
        '<h4>Redes sociais</h4>' +
        '<div class="footer-socials">' +
          '<a href="https://www.instagram.com/nxoagencia" target="_blank" rel="noopener" data-social aria-label="Instagram">' +
            '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.1.4.3 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.1-1 .3-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.1-.4-.3-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.1 1-.3 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 3.2A6.6 6.6 0 1 0 18.6 12 6.6 6.6 0 0 0 12 5.4Zm0 10.9A4.3 4.3 0 1 1 16.3 12 4.3 4.3 0 0 1 12 16.3Zm6.8-11.1a1.5 1.5 0 1 0 1.5 1.5 1.5 1.5 0 0 0-1.5-1.5Z"/></svg>' +
          '</a>' +
          '<a href="https://www.tiktok.com/@nxo.agncia" target="_blank" rel="noopener" data-social aria-label="TikTok">' +
            '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 3c.3 2 1.5 3.6 3.5 4v2.6c-1.3 0-2.6-.4-3.6-1.1v6.3a5.7 5.7 0 1 1-5.7-5.7c.3 0 .6 0 .9.1v2.7a3 3 0 1 0 2.1 2.9V3h2.8Z"/></svg>' +
          '</a>' +
          '<a href="https://www.facebook.com/share/1ENPEMtaMt/" target="_blank" rel="noopener" data-social aria-label="Facebook">' +
            '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-8h2.6l.4-3h-3V8.1c0-.9.3-1.5 1.6-1.5H17V3.9c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H8.2v3h2.6v8h2.7Z"/></svg>' +
          '</a>' +
          '<a href="https://www.linkedin.com/in/nxo-ag%C3%AAncia-996ba7411" target="_blank" rel="noopener" data-social aria-label="LinkedIn">' +
            '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.9 8.5H3.7V21h3.2V8.5ZM5.3 3.2a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8ZM20.3 21v-6.8c0-3.6-1.9-5.3-4.5-5.3a3.9 3.9 0 0 0-3.5 1.9V8.5H9.1V21h3.2v-6.5c0-1.7.3-3.3 2.4-3.3s2.1 1.9 2.1 3.4V21h3.5Z"/></svg>' +
          '</a>' +
          '<a href="https://wa.me/5583994028974" target="_blank" rel="noopener" aria-label="WhatsApp">' +
            '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.4-.1-.6.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-1.6-.8-2.7-1.4-3.8-3.2-.3-.5 0-.8.2-1 .2-.2.3-.3.5-.5.1-.2.2-.3.2-.5 0-.2-.6-1.5-.9-2.1-.2-.5-.5-.5-.6-.5h-.5c-.2 0-.5.1-.8.4-.3.3-1 1-.9 2.4.1 1.4 1 2.7 1.2 2.9.2.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.2-.1-.4-.2-.7-.3z"/><path d="M12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.7 1.5 5.2L2 22l4.9-1.5C8.3 21.5 10.1 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.3c-1.8 0-3.5-.5-4.9-1.4l-.4-.2-3 .8.8-2.9-.2-.4c-1-1.5-1.5-3.2-1.5-4.9 0-4.5 3.7-8.3 8.3-8.3s8.3 3.7 8.3 8.3-3.8 8-8.4 8z"/></svg>' +
          '</a>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="footer-copy">' +
      '<span>© 2026 NXO Agência. Todos os direitos reservados.</span>' +
      '<span><a href="mailto:nxoagmkt@gmail.com">nxoagmkt@gmail.com</a> · <a href="https://wa.me/5583994028974" target="_blank" rel="noopener">(83) 99402-8974</a></span>' +
    '</div>';
})();
