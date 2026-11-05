"use strict";
// IMPORTANTE: configure apenas os dígitos com DDI e DDD. Exemplo fictício: "5531999999999".
const WHATSAPP_NUMBER = ""; // Insira o número do WhatsApp Business de BH: 55 + 31 + número, só dígitos.
const whatsappUrl = (message) => {
  const text = encodeURIComponent(message);
  return WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`
    : `https://api.whatsapp.com/send?text=${text}`;
};

document.querySelectorAll('[data-wa]').forEach((link) => {
    const service = link.dataset.service || 'um projeto digital';
    const plan = link.dataset.plan;
    const price = link.dataset.price;

    const choice = plan
        ? `${service} — plano ${plan}${price ? ` (${price})` : ''}`
        : service;

    const message = `Olá, Patrick! Visitei seu site e tenho interesse em ${choice}. Gostaria de saber como funciona a contratação e quais são os próximos passos.`;

    link.href = whatsappUrl(message);
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', `Conversar no WhatsApp sobre ${choice}`);
});

const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
if (toggle && nav) {
  const closeMenu = () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded','false');
    toggle.setAttribute('aria-label','Abrir menu');
  };
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
  document.addEventListener('click',e=>{if(!nav.contains(e.target) && !toggle.contains(e.target))closeMenu()});
}

document.querySelectorAll('.flip-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.service-card');
    const isFlipped = card.classList.toggle('is-flipped');
    btn.setAttribute('aria-pressed',String(isFlipped));
    btn.textContent = isFlipped ? '↶ Ver exemplo' : '↻ Ver vantagens';
  });
});

document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
