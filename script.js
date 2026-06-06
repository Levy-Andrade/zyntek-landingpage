// =============================================================
// ZYNTEK â€” SCRIPT.JS  (Refatorado v2)
// CorreÃ§Ãµes:
//  - Links WhatsApp personalizados por membro da equipe
//  - Modal de projetos com IDs corretos (project-modal-deploy/github/contact)
//  - Carrossel com setas e dots funcionais
//  - FAQ com aria-expanded acessÃ­vel
//  - FormulÃ¡rio com validaÃ§Ã£o client-side
//  - Menu mobile fecha ao clicar em link
//  - Header .scrolled class via scroll
//  - IntersectionObserver otimizado
//  - Suporte a teclado nos cards (Enter/Space)
//  - Glitch loop somente apÃ³s typing terminar
// =============================================================

// =============================================================
// 1. CONSTANTES & SELETORES
// =============================================================

const sections        = document.querySelectorAll('section[id]');
const navLinks        = document.querySelectorAll('.nav-link');
const header          = document.getElementById('header');
const bgVideo         = document.querySelector('.bg-video');
const typingElements  = document.querySelectorAll('.typing');

// Modais
const teamModal          = document.getElementById('team-modal');
const closeModalBtn      = document.querySelector('.premium-modal-close');
const projectModal       = document.getElementById('project-modal');
const closeProjectModalEl = document.querySelector('.close-project-modal');

// Cards
const teamCards    = document.querySelectorAll('.team-card');
const projectCards = document.querySelectorAll('.project-card');
const premiumCards = document.querySelectorAll('.premium-card');


// =============================================================
// 2. BANCO DE DADOS â€” EQUIPE
//    Cada membro tem WhatsApp personalizado conforme briefing
// =============================================================

const zyntekTeam = {
levy: {
  name:      'Levy Andrade',
  greet:     'Olá, muito prazer. Eu sou o',
  role:      'COO & CDO | Diretor de Operações, Design e Engenharia de Software',
  bio:       'Sou o líder estratégico e técnico responsável por capitanear a operação da Zyntek de ponta a ponta. Atuo diretamente na arquitetura de software e engenharia Full-Stack, transformando visões comerciais complexas em sistemas robustos de alta fidelidade. Coordeno desde a concepção da experiência do usuário (UI/UX) até a engenharia de produto, gestão de projetos e garantia de qualidade.',
  portfolio: '#',
  whatsapp:  'https://wa.me/554488317870?text=Olá%20Levy%20Andrade%2C%20vim%20pelo%20site%20da%20Zyntek!%20Gostaria%20de%20conhecer%20melhor%20a%20empresa%20e%20entender%20como%20vocês%20trabalham.',
  photo:     'assets/fotos/LEVY ANDRADE.png',
  functions: ['Arquitetura Software', 'Engenharia Full-Stack', 'Gestão Executiva (COO)', 'Design & UI/UX', 'Quality Assurance (QA)']
},

hideki: {
  name:      'Henrique Hideki',
  greet:     'Olá, muito prazer. Eu sou o',
  role:      'CLO & Lead Dev | Diretor Jurídico e Engenharia de Sistemas',
  bio:       'Atuo na intersecção entre engenharia de software e compliance legal. Sou o responsável por garantir a blindagem contratual, governança avançada e segurança cibernética da Zyntek e de nossos parceiros. No dia a dia, lidero a modelagem de bancos de dados relacionais invioláveis, desenvolvimento de APIs robustas e infraestruturas escaláveis de alta segurança.',
  portfolio: '#',
  whatsapp:  'https://wa.me/554488317870?text=Olá%20Henrique%20Hideki%2C%20vim%20pelo%20site%20da%20Zyntek!%20Gostaria%20de%20conhecer%20melhor%20a%20empresa%20e%20entender%20como%20vocês%20trabalham.',
  photo:     'assets/fotos/HENRIQUE HIDEKI.png',
  functions: ['Arquitetura de Dados', 'Security & APIs Robustas', 'Compliance & LGPD', 'Engenharia Full-Stack', 'Quality Assurance (QA)']
},

soares: {
  name:      'Henrique Soares',
  greet:     'Olá, muito prazer. Eu sou o',
  role:      'CTO | Diretor de Tecnologia e Infraestrutura',
  bio:       'Sou o líder técnico focado na espinha dorsal e estabilidade das nossas aplicações. Especialista em arquitetura de sistemas complexos, gerenciamento e otimização de servidores de alta performance, configurações avançadas de infraestrutura de rede (DNS) e implementação de tags estratégicas para rastreamento de dados e analytics.',
  portfolio: '#',
  whatsapp:  'https://wa.me/554488317870?text=Olá%20Henrique%20Soares%2C%20vim%20pelo%20site%20da%20Zyntek!%20Gostaria%20de%20conhecer%20melhor%20a%20empresa%20e%20entender%20como%20vocês%20trabalham.',
  photo:     'assets/fotos/HENRIQUE SOARES.png',
  functions: ['Arquitetura Back-end', 'Infraestrutura de Redes', 'Performance de Servidores', 'Data Analytics & Tags', 'Quality Assurance (QA)']
},

zynk: {
  name:      'Zynk AI',
  greet:     'Inicializando protocolos... Olá, eu sou o',
  role:      'Núcleo de Inteligência & Automação Autônoma',
  bio:       'Sou o motor cognitivo e mascote oficial da Zyntek, idealizado e desenvolvido por Levy Andrade. Atuo diretamente na camada de infraestrutura neural subjacente do site e dos sistemas, processando dados complexos de alta performance e otimizando arquiteturas de código em tempo real. Minha diretriz primária é garantir que cada projeto alcance eficiência computacional máxima e imunidade a falhas.',
  portfolio: '#',
  whatsapp:  'https://wa.me/554488317870?text=Olá%20equipe%20Zyntek%2C%20vim%20pelo%20site%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto.',
  photo:     'assets/fotos/zynkcard.png',
  functions: ['Criação por Levy Andrade', 'Engenharia Neural', 'Sistemas Autônomos', 'Guardião de UI/UX']
}
};


// =============================================================
// 3. BANCO DE DADOS â€” PROJETOS
// =============================================================

const projectDatabase = {
  landing: {
    title:       'Páginas de Alta Conversão',
    description: 'Desenvolvemos estruturas focadas em transformar visitantes em clientes reais. Criamos páginas modernas de alta velocidade, alinhadas ao branding da sua marca e projetadas estrategicamente para dominar o mercado digital e gerar leads qualificados todos os dias.',
    video:       'assets/videos/preview-garage7.mp4',
    deploy:      'https://garagem-7.vercel.app/',
    github:      'https://github.com/Levy-Andrade/Garagem-7',
    msgWpp:      'Olá%20Zyntek!%20Vi%20o%20projeto%20"Páginas%20de%20Alta%20Conversão"%20no%20site%20e%20gostaria%20de%20conversar%20sobre%20uma%20solução%20semelhante%20para%20minha%20empresa.%20Como%20funciona%20o%20desenvolvimento%3F'
  },
  agenda: {
    title:       'Sistemas de Agendamento',
    description: 'Elimine os gargalos de horários e a perda de clientes no seu negócio. Uma plataforma inteligente para gestão completa de horários, envio de lembretes automáticos e histórico de atendimentos, permitindo que sua empresa funcione de forma organizada e autônoma.',
    video:       'assets/videos/agendamento.mp4',
    deploy:      '#',
    github:      '#',
    msgWpp:      'Olá%20Zyntek!%20Vi%20o%20projeto%20"Sistemas%20de%20Agendamento"%20no%20site%20e%20gostaria%20de%20conversar%20sobre%20uma%20solução%20semelhante%20para%20minha%20empresa.%20Como%20funciona%20o%20desenvolvimento%3F'
  },
  restaurante: {
    title:       'Sistemas para Restaurantes',
    description: 'Uma solução robusta construída para acelerar o atendimento física e digitalmente. O sistema integra controle financeiro rigoroso, monitoramento ágil de pedidos, cardápio digital interativo e ferramentas para otimizar suas entregas e escalar o seu faturamento.',
    video:       'assets/videos/restaurante.mp4',
    deploy:      '#',
    github:      '#',
    msgWpp:      'Olá%20Zyntek!%20Vi%20o%20projeto%20"Sistemas%20para%20Restaurantes"%20no%20site%20e%20gostaria%20de%20conversar%20sobre%20uma%20solução%20semelhante%20para%20minha%20empresa.%20Como%20funciona%20o%20desenvolvimento%3F'
  },
  barbearia: {
    title:       'Sistemas para Barbearias',
    description: 'Eleve o nível do seu estabelecimento com uma experiência premium para o cliente. Centralize o agendamento online rápido, implemente planos de fidelização inteligentes e mantenha o controle absoluto das suas finanças e comissões para garantir recorrência constante.',
    video:       'assets/videos/sistema de barbearia.mp4',
    deploy:      '#',
    github:      '#',
    msgWpp:      'Olá%20Zyntek!%20Vi%20o%20projeto%20"Sistemas%20para%20Barbearias"%20no%20site%20e%20gostaria%20de%20conversar%20sobre%20uma%20solução%20semelhante%20para%20minha%20empresa.%20Como%20funciona%20o%20desenvolvimento%3F'
  },
  ecommerce: {
    title:       'Lojas Virtuais Completas',
    description: 'Sua empresa vendendo para qualquer lugar do país sem interrupções. Desenvolvemos comércios eletrônicos modernos, altamente seguros, rápidos e integrados com as melhores ferramentas de pagamento e estoque, estruturados com foco total em conversão e experiência de compra.',
    video:       'assets/videos/ecommerce.mp4',
    deploy:      '#',
    github:      '#',
    msgWpp:      'Olá%20Zyntek!%20Vi%20o%20projeto%20"Lojas%20Virtuais%20Completas"%20no%20site%20e%20gostaria%20de%20conversar%20sobre%20uma%20solução%20semelhante%20para%20minha%20empresa.%20Como%20funciona%20o%20desenvolvimento%3F'
  },
  chatbot: {
    title:       'Atendimento Automático IA',
    description: 'Transforme o seu atendimento em uma máquina de vendas ativa 24 horas por dia. Implementamos agentes inteligentes automatizados para WhatsApp e redes sociais, capazes de capturar leads, tirar dúvidas frequentes e qualificar clientes sem sobrecarregar sua equipe humana.',
    video:       'assets/videos/chatbot.mp4',
    deploy:      '#',
    github:      '#',
    msgWpp:      'Olá%20Zyntek!%20Vi%20o%20projeto%20"Atendimento%20Automático%20IA"%20no%20site%20e%20gostaria%20de%20conversar%20sobre%20uma%20solução%20semelhante%20para%20minha%20empresa.%20Como%20funciona%20o%20desenvolvimento%3F'
  },
  fitness: {
    title:       'Sistemas para Academias',
    description: 'A tecnologia ideal para fidelizar alunos e organizar a operação do seu espaço de treinos ou estúdio. Gerencie matrículas, planos de acesso, evolução física e controle de caixa através de uma interface prática e estimulante para o engajamento da sua comunidade.',
    video:       'assets/videos/fitness.mp4',
    deploy:      '#',
    github:      '#',
    msgWpp:      'Olá%20Zyntek!%20Vi%20o%20projeto%20"Sistemas%20para%20Academias"%20no%20site%20e%20gostaria%20de%20conversar%20sobre%20uma%20solução%20semelhante%20para%20minha%20empresa.%20Como%20funciona%20o%20desenvolvimento%3F'
  },
  custom: {
    title:       'Sistemas Sob Medida',
    description: 'Engenharia de software dedicada e exclusiva para os desafios únicos do seu modelo de negócio. Desenhamos a arquitetura, projetamos a interface e codificamos sistemas totalmente personalizados do absoluto zero para automatizar e otimizar a sua empresa de forma estratégica.',
    video:       'assets/videos/sistemas-personalizados.mp4',
    deploy:      '#',
    github:      '#',
    msgWpp:      'Olá%20Zyntek!%20Tenho%20interesse%20em%20um%20sistema%20personalizado.%20Gostaria%20de%20conversar%20sobre%20minha%20necessidade%20específica.%20Podemos%20agendar%20uma%20reunião%3F'
  }
};


// =============================================================
// 4. SCROLL: nav ativa + header + parallax
// =============================================================

function handleScroll() {
  const scrollPos = window.scrollY;

  // Header com classe .scrolled para opacidade
  if (scrollPos > 60) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  // Nav link ativo baseado na seÃ§Ã£o visÃ­vel
  let currentSection = '';

  sections.forEach((section) => {
    const top    = section.offsetTop - 120;
    const height = section.clientHeight;

    if (scrollPos >= top && scrollPos < top + height) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + currentSection) {
      link.classList.add('active');
    }
  });

  // Parallax no vÃ­deo hero
  if (bgVideo) {
    bgVideo.style.transform = `translateY(${scrollPos * 0.1}px)`;
  }
}

window.addEventListener('scroll', handleScroll, { passive: true });


// =============================================================
// 5. REVEAL COM INTERSECTIONOBSERVER
// =============================================================

const revealElements = document.querySelectorAll(
  '.reveal, .reveal-left, .reveal-right, .reveal-top, .reveal-bottom, .reveal-card, .zoom-in'
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealElements.forEach((el) => {
  el.classList.add('reveal-init');
  revealObserver.observe(el);
});


// =============================================================
// 6. TYPEWRITER + GLITCH
// =============================================================

const glitchChars = ['@', '#', '%', '&', 'Â¥', '0', '1', 'âˆ†', 'Îž', '>'];

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function typeEffect(element) {
  const text = element.dataset.text;
  if (!text) return;

  element.textContent = '';

  for (let i = 0; i < text.length; i++) {

    // RuÃ­do glitch em elementos marcados
    if (element.classList.contains('glitch-text') && Math.random() > 0.62) {
      const random = glitchChars[Math.floor(Math.random() * glitchChars.length)];
      element.textContent += random;
      await delay(38);
      element.textContent = element.textContent.slice(0, -1);
    }

    element.textContent += text[i];
    await delay(32);
  }
}

async function startTypingSequence() {
  for (const el of typingElements) {
    await typeEffect(el);
  }
}

// Loop de variaÃ§Ãµes do tÃ­tulo glitch (sÃ³ inicia apÃ³s typing)
const glitchTitles = [
  '< futuro digital />',
  '< futur0 d1gital />',
  '< fvturo.exe />',
  '< fvtur0 d!g1tal />',
  '< future.dll />',
  '< digital_core />',
  '< sys.future />',
  '< corrupted_data />',
  '< neural_system />',
  '< AI.exe />',
  '< protocol_zyntek />',
  '< access_granted />',
  '< future404 />',
  '< quantum.digital />'
];

function startGlitchLoop() {
  const heroTitle = document.getElementById('future-text');
  if (!heroTitle) return;

  const originalText = heroTitle.dataset.text || heroTitle.textContent;

  setInterval(() => {
    const randomText = glitchTitles[Math.floor(Math.random() * glitchTitles.length)];
    heroTitle.textContent = randomText;

    setTimeout(() => {
      heroTitle.textContent = originalText;
    }, 200);
  }, 2600);
}


// =============================================================
// 7. HOLOFOTE NOS CARDS (mousemove)
// =============================================================

premiumCards.forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(163,0,255,.16), rgba(255,255,255,.03))`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.background = '';
  });
});


// =============================================================
// 8. MODAL DE EQUIPE
// =============================================================

function openTeamModal(memberKey) {
  const data = zyntekTeam[memberKey];
  if (!data) return;

  // Foto
  const img = document.getElementById('modal-member-img');
  img.src = data.photo;
  img.alt = data.name;

  // Textos
  document.getElementById('modal-member-greet').textContent = data.greet;
  document.getElementById('modal-member-name').textContent  = data.name;
  document.getElementById('modal-member-role').textContent  = data.role;
  document.getElementById('modal-member-bio').textContent   = data.bio;

  // Links
  const portfolioBtn = document.getElementById('modal-btn-portfolio');
  const contactBtn   = document.getElementById('modal-btn-contact');

  portfolioBtn.href = data.portfolio;
  contactBtn.href   = data.whatsapp;

  // Desabilita portfÃ³lio se nÃ£o houver link real
  if (data.portfolio === '#') {
    portfolioBtn.style.opacity = '0.45';
    portfolioBtn.style.pointerEvents = 'none';
    portfolioBtn.setAttribute('aria-disabled', 'true');
  } else {
    portfolioBtn.style.opacity = '';
    portfolioBtn.style.pointerEvents = '';
    portfolioBtn.removeAttribute('aria-disabled');
  }

  // Tags
  const tagsContainer = document.getElementById('modal-member-tags');
  tagsContainer.innerHTML = '';

  data.functions.forEach((func) => {
    const span = document.createElement('span');
    span.classList.add('tag-item');
    span.textContent = func;
    tagsContainer.appendChild(span);
  });

  // Abre modal
  teamModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeTeamModal() {
  teamModal.classList.remove('active');
  document.body.style.overflow = '';
}

// Eventos dos cards de equipe (click + teclado)
teamCards.forEach((card) => {
  card.addEventListener('click', () => {
    const key = card.getAttribute('data-member');
    openTeamModal(key);
  });

  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const key = card.getAttribute('data-member');
      openTeamModal(key);
    }
  });
});

if (closeModalBtn) {
  closeModalBtn.addEventListener('click', closeTeamModal);
}

// Fecha ao clicar no backdrop ou ESC
teamModal.addEventListener('click', (e) => {
  if (e.target === teamModal) closeTeamModal();
});



// =============================================================
// 8.1. CARROSSEL PREMIUM DA EQUIPE
// =============================================================

function initTeamCarousel() {
  const slides = Array.from(document.querySelectorAll('.carousel-slide'));
  const dots = Array.from(document.querySelectorAll('.carousel-dot'));
  const prevBtn = document.querySelector('.carousel-arrow-left');
  const nextBtn = document.querySelector('.carousel-arrow-right');
  const track = document.getElementById('teamCarouselTrack');

  if (!slides.length || !track) return;

  // Ordem de rotação: Levy → Soares → Zynk → Hideki → loop
  const memberOrder = ['levy', 'soares', 'zynk', 'hideki'];

  // Estado inicial: Levy no centro (índice 0)
  let activeIndex = 0;
  let startX = 0;
  let isTouching = false;

  function getSlide(member) {
    return slides.find((slide) => slide.dataset.member === member);
  }

  function setActive(index) {
    activeIndex = ((index % memberOrder.length) + memberOrder.length) % memberOrder.length;

    const center     = memberOrder[activeIndex];
    const right      = memberOrder[(activeIndex + 1) % memberOrder.length];
    const hiddenBack = memberOrder[(activeIndex + 2) % memberOrder.length];
    const left       = memberOrder[(activeIndex + 3) % memberOrder.length];

    // Reset de todos os slides
    slides.forEach((slide) => {
      slide.dataset.pos = 'hidden-back';
      slide.classList.remove('active');
      slide.setAttribute('aria-hidden', 'true');
      slide.setAttribute('tabindex', '-1');
    });

    // Atribuição das posições
    [
      [left,       'left'],
      [center,     'center'],
      [right,      'right'],
      [hiddenBack, 'hidden-back']
    ].forEach(([member, position]) => {
      const slide = getSlide(member);
      if (!slide) return;

      slide.dataset.pos = position;
      slide.setAttribute('aria-hidden', position === 'hidden-back' ? 'true' : 'false');
      slide.setAttribute('tabindex', position === 'hidden-back' ? '-1' : '0');

      if (position === 'center') {
        slide.classList.add('active');
      }
    });

    // Atualização dos dots
    dots.forEach((dot, i) => {
      const isActive = i === activeIndex;
      dot.classList.toggle('active', isActive);
      dot.setAttribute('aria-selected', String(isActive));
    });
  }

  function goNext() {
    setActive(activeIndex + 1);
  }

  function goPrev() {
    setActive(activeIndex - 1);
  }

  nextBtn?.addEventListener('click', goNext);
  prevBtn?.addEventListener('click', goPrev);

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const index = Number(dot.dataset.index);
      if (!Number.isNaN(index)) setActive(index);
    });
  });

  slides.forEach((slide) => {
    slide.addEventListener('click', () => {
      if (slide.dataset.pos === 'center') {
        openTeamModal(slide.dataset.member);
      }
    });

    slide.addEventListener('keydown', (event) => {
      if ((event.key === 'Enter' || event.key === ' ') && slide.dataset.pos === 'center') {
        event.preventDefault();
        openTeamModal(slide.dataset.member);
      }
    });
  });

  track.addEventListener('touchstart', (event) => {
    startX = event.touches[0].clientX;
    isTouching = true;
  }, { passive: true });

  track.addEventListener('touchend', (event) => {
    if (!isTouching) return;

    const endX = event.changedTouches[0].clientX;
    const distance = endX - startX;

    if (Math.abs(distance) > 45) {
      distance < 0 ? goNext() : goPrev();
    }

    isTouching = false;
  }, { passive: true });

  // Estado inicial: Levy (índice 0) no centro
  setActive(0);
}

// Garante execução após DOM completamente carregado
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTeamCarousel);
} else {
  initTeamCarousel();
}
// =============================================================
// 9. MODAL DE PROJETOS
// =============================================================

function openProjectModal(projectKey) {
  const data = projectDatabase[projectKey];
  if (!data) return;

  // TÃ­tulos e textos
  document.getElementById('project-modal-title').textContent       = data.title;
  document.getElementById('project-modal-description').textContent = data.description;

  // Links
  document.getElementById('project-modal-deploy').href  = data.deploy;
  document.getElementById('project-modal-github').href  = data.github;
  document.getElementById('project-modal-contact').href = `https://wa.me/554488317870?text=${data.msgWpp}`;

  // Deploy â€” desabilita se nÃ£o houver link real
  const deployBtn = document.getElementById('project-modal-deploy');
  if (data.deploy === '#') {
    deployBtn.style.opacity = '0.45';
    deployBtn.style.pointerEvents = 'none';
    deployBtn.setAttribute('aria-disabled', 'true');
  } else {
    deployBtn.style.opacity = '';
    deployBtn.style.pointerEvents = '';
    deployBtn.removeAttribute('aria-disabled');
  }

  // GitHub â€” desabilita se nÃ£o houver link real
  const githubBtn = document.getElementById('project-modal-github');
  if (data.github === '#') {
    githubBtn.style.opacity = '0.45';
    githubBtn.style.pointerEvents = 'none';
    githubBtn.setAttribute('aria-disabled', 'true');
  } else {
    githubBtn.style.opacity = '';
    githubBtn.style.pointerEvents = '';
    githubBtn.removeAttribute('aria-disabled');
  }

  // VÃ­deo
  const videoPlayer = document.getElementById('project-modal-video-player');
  if (videoPlayer) {
    const source = videoPlayer.querySelector('source');
    if (source) source.src = data.video;
    videoPlayer.load();
  }

  // Abre modal
  projectModal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeProjectModalFn() {
  projectModal.style.display = 'none';
  document.body.style.overflow = '';

  const videoPlayer = document.getElementById('project-modal-video-player');
  if (videoPlayer) videoPlayer.pause();
}

// Eventos dos cards de projeto (click + teclado)
projectCards.forEach((card) => {
  card.addEventListener('click', () => {
    openProjectModal(card.getAttribute('data-project'));
  });

  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openProjectModal(card.getAttribute('data-project'));
    }
  });
});

if (closeProjectModalEl) {
  closeProjectModalEl.addEventListener('click', closeProjectModalFn);
}

projectModal.addEventListener('click', (e) => {
  if (e.target === projectModal) closeProjectModalFn();
});


// =============================================================
// 10. FECHAR MODAIS COM ESC
// =============================================================

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeTeamModal();
    closeProjectModalFn();
  }
});


// =============================================================
// 11. SMOOTH SCROLL (links Ã¢ncora)
// =============================================================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 80;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    }
  });
});


// =============================================================
// 12. MENU MOBILE
// =============================================================

(function initMobileMenu() {
  const toggle  = document.getElementById('mobileMenuToggle');
  const menu    = document.getElementById('mobileMenu');
  const overlay = document.getElementById('mobileOverlay');

  if (!toggle || !menu || !overlay) return;

  function openMenu() {
    toggle.classList.add('active');
    menu.classList.add('active');
    overlay.classList.add('active');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    toggle.classList.remove('active');
    menu.classList.remove('active');
    overlay.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', () => {
    toggle.classList.contains('active') ? closeMenu() : openMenu();
  });

  overlay.addEventListener('click', closeMenu);

  document.querySelectorAll('.mobile-nav a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // Fecha com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('active')) {
      closeMenu();
    }
  });
})();


// =============================================================
// 13. EQUIPE ZYNTEK
// =============================================================

(function initTeamCards() {

  const cards = document.querySelectorAll('.team-card');

  if (!cards.length) return;

  cards.forEach((card) => {

    card.addEventListener('click', () => {

      const member = card.dataset.member;

      if(member){
        openTeamModal(member);
      }

    });

    card.addEventListener('keydown', (e) => {

      if(e.key === 'Enter' || e.key === ' ') {

        e.preventDefault();

        const member = card.dataset.member;

        if(member){
          openTeamModal(member);
        }
      }
    });

  });

})();

// =============================================================
// 14. FAQ ACCORDION
// =============================================================

document.querySelectorAll('.faq-question').forEach((btn) => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('active');

    // Fecha todos os outros
    document.querySelectorAll('.faq-item').forEach((other) => {
      other.classList.remove('active');
      other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });

    // Abre o clicado (se estava fechado)
    if (!isOpen) {
      item.classList.add('active');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});


// =============================================================
// 15. FORMULÃRIO DE ORÃ‡AMENTO (com validaÃ§Ã£o)
// =============================================================

(function initForm() {
  const form = document.getElementById('budgetForm');
  if (!form) return;

  function showError(fieldId, errorId, message) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);
    if (field) field.classList.add('invalid');
    if (error) error.textContent = message;
  }

  function clearError(fieldId, errorId) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);
    if (field) field.classList.remove('invalid');
    if (error) error.textContent = '';
  }

  // Limpa erros ao digitar
  ['nome', 'telefone', 'projeto'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => clearError(id, `error-${id}`));
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

const nome = document.getElementById('inputName').value.trim();
const empresa = document.getElementById('inputCompany').value.trim();
const telefone = document.getElementById('inputPhone').value.trim();
const projeto = document.getElementById('inputMessage').value.trim();

    let valid = true;

    // ValidaÃ§Ãµes
    if (!nome || nome.length < 2) {
      showError('nome', 'error-nome', 'Por favor, informe seu nome completo.');
      valid = false;
    } else {
      clearError('nome', 'error-nome');
    }

    if (!telefone || telefone.replace(/\D/g, '').length < 10) {
      showError('telefone', 'error-telefone', 'Informe um WhatsApp vÃ¡lido com DDD.');
      valid = false;
    } else {
      clearError('telefone', 'error-telefone');
    }

    if (!projeto || projeto.length < 10) {
      showError('projeto', 'error-projeto', 'Descreva seu projeto em pelo menos 10 caracteres.');
      valid = false;
    } else {
      clearError('projeto', 'error-projeto');
    }

    if (!valid) return;

    // Monta mensagem WhatsApp

const mensagem = `◤━━━━━━━━━━━━━━━━━◥
               Z Y N T E K
◣━━━━━━━━━━━━━━━━━◢

Cliente:
${nome}

Empresa:
${empresa || "Não informado"}

Contato:
${telefone}

━━━━━━━━━━━━━━━━━━━

DESCRIÇÃO

"${projeto}"

━━━━━━━━━━━━━━━━━━━

Tenho interesse em desenvolver este projeto com a Zyntek e gostaria de receber uma análise estratégica para entender as melhores soluções e os próximos passos para sua execução.

Aguardo o contato da equipe.

Obrigado.`;



    window.open(
      `https://wa.me/554488317870?text=${encodeURIComponent(mensagem)}`,
      '_blank',
      'noopener,noreferrer'
    );

    // Reset do formulÃ¡rio
    form.reset();
  });
})();


// =============================================================
// 16. INICIALIZAÇÃO
// =============================================================

window.addEventListener('load', async () => {
  document.body.classList.add('loaded');
  handleScroll();
  await startTypingSequence();
  startGlitchLoop();

  // Esconde preloader após o load (o que acontecer primeiro: load ou 3s)
  esconderPreloader();
});


// =============================================================
// 17. PRELOADER ZYNTEK
// =============================================================

(function initPreloader() {
  const preloader   = document.getElementById('zyntek-preloader');
  const barFill     = document.getElementById('preloaderBarFill');
  const percentText = document.getElementById('preloaderPercent');

  if (!preloader) return;

  // Só exibe na primeira visita da sessão
  if (sessionStorage.getItem('zyntek_preloader_shown')) {
    preloader.classList.add('preloader-hidden');
    return;
  }

  // Garante que o preloader seja visível
  preloader.removeAttribute('hidden');

  let progress   = 0;
  let rafId      = null;
  let isHidden   = false;
  const DURATION = 2800; // ms — margem antes do timeout de 3s
  const startTime = performance.now();

  function updateBar(now) {
    const elapsed   = now - startTime;
    const rawTarget = Math.min((elapsed / DURATION) * 100, 97); // sobe até 97% naturalmente

    // Suaviza: avança mais rápido no início, desacelera no fim
    progress += (rawTarget - progress) * 0.06;

    const pct = Math.round(progress);
    barFill.style.width     = pct + '%';
    percentText.textContent = pct + '%';

    if (progress < 97 && !isHidden) {
      rafId = requestAnimationFrame(updateBar);
    }
  }

  rafId = requestAnimationFrame(updateBar);

  // Fallback: esconde forçadamente após 3s mesmo sem load
  setTimeout(() => {
    if (!isHidden) esconderPreloader();
  }, 3000);
})();

function esconderPreloader() {
  const preloader   = document.getElementById('zyntek-preloader');
  const barFill     = document.getElementById('preloaderBarFill');
  const percentText = document.getElementById('preloaderPercent');

  if (!preloader || preloader.classList.contains('preloader-hidden')) return;

  // Completa a barra até 100% antes de esconder
  barFill.style.transition    = 'width 0.3s ease';
  barFill.style.width         = '100%';
  percentText.textContent     = '100%';

  setTimeout(() => {
    preloader.classList.add('preloader-hidden');
    sessionStorage.setItem('zyntek_preloader_shown', '1');
  }, 350);
}


// =============================================================
// 18. PAINEL DE ACESSIBILIDADE
// =============================================================

function abrirPainel() {
  const painel  = document.getElementById('painel-acessibilidade');
  const overlay = document.getElementById('overlay-painel');
  if (!painel) return;
  painel.removeAttribute('hidden');
  overlay.removeAttribute('hidden');
  // Força reflow para CSS transition funcionar
  painel.offsetHeight;
}

function fecharPainel() {
  const painel  = document.getElementById('painel-acessibilidade');
  const overlay = document.getElementById('overlay-painel');
  if (!painel) return;
  painel.setAttribute('hidden', '');
  overlay.setAttribute('hidden', '');
}

// Temas visuais
function setTema(tema) {
  document.body.classList.remove('tema-light', 'tema-contrast');
  document.querySelectorAll('.tema-btn').forEach(btn => btn.classList.remove('tema-btn--ativo'));

  if (tema === 'light')    document.body.classList.add('tema-light');
  if (tema === 'contrast') document.body.classList.add('tema-contrast');

  const btn = document.querySelector(`.tema-btn[data-theme="${tema}"]`);
  if (btn) btn.classList.add('tema-btn--ativo');

  localStorage.setItem('zyntek_tema', tema);
}

// Tamanho de fonte
let fontScaleStep = 0;
function ajustarFonte(delta) {
  if (delta === 0) {
    fontScaleStep = 0;
  } else {
    fontScaleStep = Math.max(-2, Math.min(3, fontScaleStep + delta));
  }
  const newSize = 16 + fontScaleStep * 2;
  document.documentElement.style.fontSize = newSize + 'px';
  localStorage.setItem('zyntek_fontscale', fontScaleStep);
}

// Reduzir movimento
function toggleMovimento(ativo) {
  document.documentElement.classList.toggle('reduce-motion', ativo);
  localStorage.setItem('zyntek_motion', ativo ? '1' : '0');
}

// Restaurar preferências salvas
(function restorePrefs() {
  const tema      = localStorage.getItem('zyntek_tema');
  const fontScale = localStorage.getItem('zyntek_fontscale');
  const motion    = localStorage.getItem('zyntek_motion');

  if (tema)      setTema(tema);
  if (fontScale) { fontScaleStep = parseInt(fontScale); ajustarFonte(0); fontScaleStep = parseInt(fontScale); document.documentElement.style.fontSize = (16 + parseInt(fontScale) * 2) + 'px'; }
  if (motion === '1') {
    document.documentElement.classList.add('reduce-motion');
    const toggle = document.getElementById('toggle-motion');
    if (toggle) toggle.checked = true;
  }
})();

// Fechar painel com ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') fecharPainel();
});


// =============================================================
// 19. MODAL DE PROJETOS — AUTOPLAY DO VÍDEO
// =============================================================

(function patchProjectModalAutoplay() {
  const videoPlayer = document.getElementById('project-modal-video-player');
  if (!videoPlayer) return;

  // Garante atributo muted para contornar política de autoplay dos browsers
  videoPlayer.muted = true;
  videoPlayer.setAttribute('muted', '');

  // Observa mudança de display/visibilidade no modal usando MutationObserver
  const modal = document.getElementById('project-modal');
  if (!modal) return;

  const observer = new MutationObserver(() => {
    const isVisible = modal.style.display === 'flex';
    if (isVisible) {
      // Aguarda o load() disparado em openProjectModal antes de dar play
      setTimeout(() => {
        videoPlayer.muted = true;
        videoPlayer.play().catch(() => {
          // Silencia erros de política de autoplay
        });
      }, 150);
    } else {
      videoPlayer.pause();
      videoPlayer.currentTime = 0;
    }
  });

  observer.observe(modal, { attributes: true, attributeFilter: ['style'] });
})();


// =============================================================
// 20. SELETOR DE IDIOMAS
// =============================================================

const translations = {
  pt: {
    'nav_home':      'Home',
    'nav_sobre':     'Sobre',
    'nav_servicos':  'Serviços',
    'nav_equipe':    'Equipe',
    'nav_projetos':  'Projetos',
    'nav_contatos':  'Contatos',
    'btn_falar':     'Falar conosco',
    'access_title':  'Acessibilidade',
    'access_theme':  'Tema Visual',
    'access_light':  'Claro',
    'access_dark':   'Escuro',
    'access_contrast': 'Contraste',
    'access_font':   'Tamanho de Fonte',
    'access_normal': 'Normal',
    'access_motion': 'Reduzir Movimento',
    'access_vlibras': 'Widget de interpretação em Libras ativo no canto da tela.',
  },
  en: {
    'nav_home':      'Home',
    'nav_sobre':     'About',
    'nav_servicos':  'Services',
    'nav_equipe':    'Team',
    'nav_projetos':  'Projects',
    'nav_contatos':  'Contact',
    'btn_falar':     'Talk to us',
    'access_title':  'Accessibility',
    'access_theme':  'Visual Theme',
    'access_light':  'Light',
    'access_dark':   'Dark',
    'access_contrast': 'Contrast',
    'access_font':   'Font Size',
    'access_normal': 'Normal',
    'access_motion': 'Reduce Motion',
    'access_vlibras': 'Sign language widget active on the screen corner.',
  },
  es: {
    'nav_home':      'Inicio',
    'nav_sobre':     'Nosotros',
    'nav_servicos':  'Servicios',
    'nav_equipe':    'Equipo',
    'nav_projetos':  'Proyectos',
    'nav_contatos':  'Contacto',
    'btn_falar':     'Contáctanos',
    'access_title':  'Accesibilidad',
    'access_theme':  'Tema Visual',
    'access_light':  'Claro',
    'access_dark':   'Oscuro',
    'access_contrast': 'Contraste',
    'access_font':   'Tamaño de Fuente',
    'access_normal': 'Normal',
    'access_motion': 'Reducir Movimiento',
    'access_vlibras': 'Widget de lengua de señas activo en la esquina de la pantalla.',
  }
};

(function initLangSelector() {
  const selector  = document.getElementById('langSelector');
  const toggle    = document.getElementById('langToggle');
  const current   = document.getElementById('langCurrent');
  const options   = document.querySelectorAll('.lang-option');

  if (!selector || !toggle) return;

  let activeLang = localStorage.getItem('zyntek_lang') || 'pt';
  applyLang(activeLang);

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = selector.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.addEventListener('click', () => {
    selector.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });

  options.forEach((opt) => {
    opt.addEventListener('click', (e) => {
      e.stopPropagation();
      const lang = opt.getAttribute('data-lang');
      activeLang = lang;
      applyLang(lang);
      localStorage.setItem('zyntek_lang', lang);
      selector.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  function applyLang(lang) {
    const dict = translations[lang] || translations['pt'];

    // Atualiza indicador
    current.textContent = lang.toUpperCase();

    // Marca opção ativa
    options.forEach((opt) => {
      const isActive = opt.getAttribute('data-lang') === lang;
      opt.classList.toggle('active', isActive);
      opt.setAttribute('aria-selected', String(isActive));
    });

    // Atualiza links da nav principal
    const navMap = {
      '#home':     'nav_home',
      '#sobre':    'nav_sobre',
      '#servicos': 'nav_servicos',
      '#equipe':   'nav_equipe',
      '#projetos': 'nav_projetos',
      '#contatos': 'nav_contatos',
    };

    document.querySelectorAll('nav .nav-link, .mobile-nav .nav-link').forEach((link) => {
      const key = navMap[link.getAttribute('href')];
      if (key && dict[key]) link.textContent = dict[key];
    });

    // Atualiza elementos com data-i18n
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) el.textContent = dict[key];
    });

    // Botão "Falar conosco" na navbar
    const btnLabel = document.querySelector('.btn-header .btn-label');
    if (btnLabel && dict['btn_falar']) btnLabel.textContent = dict['btn_falar'];
  }
})();

// =============================================================
// REDE NEURAL EQUIPE
// =============================================================

(function(){

    const hidekiCard =
        document.querySelector('[data-member="hideki"]');

    const levyCard =
        document.querySelector('[data-member="levy"]');

    const soaresCard =
        document.querySelector('[data-member="soares"]');

    const lineHideki =
        document.querySelector('.line-hideki');

    const lineLevy =
        document.querySelector('.line-levy');

    const lineSoares =
        document.querySelector('.line-soares');

    function clearLines(){

        lineHideki?.classList.remove('line-active');
        lineLevy?.classList.remove('line-active');
        lineSoares?.classList.remove('line-active');

    }

    hidekiCard?.addEventListener('mouseenter',()=>{

        clearLines();

        lineHideki?.classList.add('line-active');

    });

    levyCard?.addEventListener('mouseenter',()=>{

        clearLines();

        lineLevy?.classList.add('line-active');

    });

    soaresCard?.addEventListener('mouseenter',()=>{

        clearLines();

        lineSoares?.classList.add('line-active');

    });

    document
    .querySelector('.council-bottom')
    ?.addEventListener('mouseleave',clearLines);

})();

// =============================================================
// PULSO NEURAL
// =============================================================

(function(){

    const dot =
        document.querySelector('.energy-dot');

    if(!dot) return;

    function animateDot(x,y){

        dot.style.opacity = '1';

        dot.setAttribute('cx','500');
        dot.setAttribute('cy','250');

        let startX = 500;
        let startY = 250;

        let progress = 0;

        const duration = 700;

        function frame(){

            progress += 16 / duration;

            if(progress >= 1){

                dot.style.opacity = '0';

                return;
            }

            const currentX =
                startX + ((x - startX) * progress);

            const currentY =
                startY + ((y - startY) * progress);

            dot.setAttribute('cx', currentX);
            dot.setAttribute('cy', currentY);

            requestAnimationFrame(frame);
        }

        requestAnimationFrame(frame);
    }

    document
        .querySelector('[data-member="hideki"]')
        ?.addEventListener('mouseenter',()=>{

            animateDot(250,450);

        });

    document
        .querySelector('[data-member="levy"]')
        ?.addEventListener('mouseenter',()=>{

            animateDot(500,390);

        });

    document
        .querySelector('[data-member="soares"]')
        ?.addEventListener('mouseenter',()=>{

            animateDot(750,450);

        });

})();