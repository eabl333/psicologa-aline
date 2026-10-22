(() => {
  const PHONE = '5575992622417';
  const MSG = 'Olá, Aline! Gostaria de agendar uma primeira conversa.';
  const wa = t => `https://wa.me/${PHONE}?text=${encodeURIComponent(t)}`;

  // WhatsApp flutuante
  document.querySelectorAll('[data-wa]').forEach(a => a.href = wa(MSG));

  // Ano
  document.getElementById('ano').textContent = new Date().getFullYear();

  // Menu mobile
  const burger = document.querySelector('.burger'), menu = document.getElementById('menu');
  const toggle = open => { menu.classList.toggle('open', open); burger.setAttribute('aria-expanded', open); };
  burger.addEventListener('click', () => toggle(!menu.classList.contains('open')));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggle(false)));

  // Imagens: se não existir o arquivo, mostra o espaço reservado
  document.querySelectorAll('.slot img').forEach(img => {
    const miss = () => img.closest('.slot').classList.add('missing');
    img.addEventListener('error', miss);
    if (img.complete && img.naturalWidth === 0) miss();
  });

  // Revelar ao rolar
  const els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: .15 });
    els.forEach(el => io.observe(el));
  } else els.forEach(el => el.classList.add('in'));

  // Formulário -> WhatsApp
  const form = document.getElementById('form');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const nome = form.nome.value.trim(), msg = form.msg.value.trim();
    document.getElementById('err-nome').textContent = nome ? '' : 'Informe seu nome.';
    document.getElementById('err-msg').textContent = msg ? '' : 'Escreva uma breve mensagem.';
    if (!nome || !msg) return;
    window.open(wa(`Olá, Aline! Meu nome é ${nome}. ${msg}`), '_blank', 'noopener');
  });
})();