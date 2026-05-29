// =============================================================
// ZYNTEK — SCRIPT.JS
// Organização:
//   1. Seletores de DOM
//   2. Banco de dados (Equipe + Projetos)
//   3. Scroll: nav ativa + header + parallax
//   4. Reveal com IntersectionObserver
//   5. Typewriter + Glitch
//   6. Micro-interações (cursor glow, botões, holofote nos cards)
//   7. Modal de Equipe
//   8. Modal de Projetos
//   9. Smooth scroll
//  10. Inicialização
// =============================================================


// =============================================================
// 1. SELETORES DE DOM
// =============================================================

const sections       = document.querySelectorAll("section");
const navLinks       = document.querySelectorAll(".nav-link");
const header         = document.getElementById("header");
const bgVideo        = document.querySelector(".bg-video");
const buttons        = document.querySelectorAll(".btn-primary, .btn-header");
const cards          = document.querySelectorAll(".premium-card");
const typingElements = document.querySelectorAll(".typing, .typewriter");

// Modal equipe
const teamCards    = document.querySelectorAll(".team-card");
const teamModal    = document.getElementById("team-modal");
const closeModalBtn = document.querySelector(".premium-modal-close");
const modalImg     = document.getElementById("modal-member-img");
const modalName    = document.getElementById("modal-member-name");
const modalRole    = document.getElementById("modal-member-role");

// Modal projetos
const projectCards       = document.querySelectorAll(".project-card");
const projectModal       = document.getElementById("project-modal");
const closeProjectModal  = document.querySelector(".close-project-modal");


// =============================================================
// 2. BANCO DE DADOS
// =============================================================

// -- Equipe --
const zyntekTeam = {
  levy: {
    name:      "Levy Andrade",
    greet:     "Olá, eu me chamo",
    role:      "COO & CDO | Diretor de Operações, Design e Engenharia de Software",
    bio:       "Líder estratégico e técnico responsável por capitanear a operação da Zyntek de ponta a ponta. Atuo diretamente na arquitetura de software e engenharia Full-Stack, transformando visões comerciais complexas em sistemas robustos de alta fidelidade. Coordeno desde a concepção da experiência do usuário (UI/UX) e prototipagem até a gestão de projetos e garantia de qualidade (QA), assegurando excelência técnica e entregas ágeis.",
    portfolio: "https://portfolio.levy.com",
    whatsapp:  "https://wa.me/5500000000000",
    functions: ["Arquitetura de Software", "Full-Stack Dev", "Gestão de Projetos (COO)", "UI/UX Design & Figma", "Quality Assurance (QA)"]
  },

  hideki: {
    name:      "Henrique Hideki",
    greet:     "Olá, eu me chamo",
    role:      "CLO & Lead Dev | Diretor Jurídico",
    bio:       "Responsável pela blindagem contratual e governança de dados da empresa e de nossos parceiros. No ecossistema de desenvolvimento, atua como líder focado na modelagem de bancos de dados relacionais seguros, desenvolvimento de APIs robustas e arquitetura de sistemas escaláveis.",
    portfolio: "https://portfolio.hideki.com",
    whatsapp:  "https://wa.me/5500000000000",
    functions: ["Modelagem de Dados", "Security & APIs", "Estrutura Contratual", "Full-Stack Dev", "Quality Assurance (QA)"]
  },

  soares: {
    name:      "Henrique Soares",
    greet:     "Olá, eu me chamo",
    role:      "CTO | Diretor de Tecnologia e Infraestrutura",
    bio:       "Líder técnico focado na espinha dorsal tecnológica das aplicações. Especialista em arquitetura de sistemas, gerenciamento e otimização de servidores/hospedagens, configurações avançadas de infraestrutura de rede (DNS) e implementação de tags estratégicas de rastreamento de dados e analytics.",
    portfolio: "https://portfolio.soares.com",
    whatsapp:  "https://wa.me/5500000000000",
    functions: ["Arquitetura Back-end", "Infraestrutura & DNS", "Servidores / Deploy", "Data Analytics", "Quality Assurance (QA)"]
  },

  zynk: {
    name:      "Zynk AI",
    greet:     "Saudações, eu sou o",
    role:      "Núcleo de Inteligência e Automação",
    bio:       "O motor cognitivo e mascote oficial da Zyntek. Atuo nos bastidores dos sistemas processando dados de alta performance, otimizando arquiteturas de código em tempo real e garantindo que os padrões de qualidade e segurança fiquem sempre no nível máximo de eficiência.",
    portfolio: "#",
    whatsapp:  "https://wa.me/5500000000000",
    functions: ["Processamento Neural", "Otimização de Código", "Automação de Fluxos", "Guardião de UI/UX"]
  }
};

// -- Projetos --
const projectDatabase = {
  landing:    { title: "Landing Page",           description: "Páginas modernas focadas em performance, branding e conversão.",                            video: "videos/demo.mp4", deploy: "#", github: "#" },
  agenda:     { title: "Sistema de Agendamento", description: "Sistema inteligente para gestão completa de clientes e horários.",                          video: "videos/demo.mp4", deploy: "#", github: "#" },
  restaurante:{ title: "Sistema Restaurante",    description: "Gestão financeira, operacional e dashboards inteligentes.",                                  video: "videos/demo.mp4", deploy: "#", github: "#" },
  barbearia:  { title: "Sistema Barbearia",      description: "Experiência premium para gestão e fidelização de clientes.",                                 video: "videos/demo.mp4", deploy: "#", github: "#" },
  ecommerce:  { title: "E-commerce",             description: "Lojas virtuais modernas e escaláveis para vendas online.",                                   video: "videos/demo.mp4", deploy: "#", github: "#" },
  chatbot:    { title: "Chatbot Inteligente",    description: "Automação inteligente de atendimento e vendas.",                                             video: "videos/demo.mp4", deploy: "#", github: "#" },
  fitness:    { title: "Gestão Fitness",         description: "Academia, treino, dieta e alta performance em um sistema completo.",                         video: "videos/demo.mp4", deploy: "#", github: "#" },
  custom:     { title: "Sistemas Personalizados",description: "Projetos exclusivos desenvolvidos sob demanda.",                                              video: "videos/demo.mp4", deploy: "#", github: "#" }
};


// =============================================================
// 3. SCROLL: nav ativa + header + parallax
// =============================================================

window.addEventListener("scroll", () => {
  const scrollPos = window.scrollY;

  // Destaca o link de navegação da seção visível
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop    = section.offsetTop - 180;
    const sectionHeight = section.clientHeight;

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(currentSection)) {
      link.classList.add("active");
    }
  });

  // Aumenta opacidade do header ao rolar para dar profundidade
  if (scrollPos > 50) {
    header.style.background  = "rgba(0,0,0,.92)";
    header.style.boxShadow   = "0 8px 30px rgba(0,0,0,.35)";
  } else {
    header.style.background  = "rgba(0,0,0,.72)";
    header.style.boxShadow   = "none";
  }

  // Parallax suave no vídeo de fundo da hero
  if (bgVideo) {
    bgVideo.style.transform = `translateY(${scrollPos * 0.12}px)`;
  }
});


// =============================================================
// 4. REVEAL COM INTERSECTIONOBSERVER
//    Adiciona .reveal-active nos elementos ao entrarem no viewport
// =============================================================

const revealElements = document.querySelectorAll(
  ".reveal, .reveal-left, .reveal-right, .reveal-top, .reveal-bottom, .reveal-card, .zoom-in"
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-active");
        // Desconecta após revelar para não re-observar desnecessariamente
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((el) => {
  el.classList.add("reveal-init");
  revealObserver.observe(el);
});


// =============================================================
// 5. TYPEWRITER + GLITCH
//    Digita letra por letra; insere caractere glitch aleatório
//    antes da letra real para criar ruído visual momentâneo
// =============================================================

const glitchChars = ["@", "#", "%", "&", "¥", "0", "1", "∆", "Ξ", ">"];

/**
 * @param {HTMLElement} element — elemento com data-text
 * Digita o texto do atributo data-text com efeito de ruído glitch.
 */
async function typeEffect(element) {
  const originalText = element.dataset.text;
  if (!originalText) return;

  element.textContent = "";

  for (let i = 0; i < originalText.length; i++) {

    // 40% de chance de inserir ruído glitch antes da letra real
    if (element.classList.contains("glitch-text") && Math.random() > 0.6) {
      const randomChar = glitchChars[Math.floor(Math.random() * glitchChars.length)];
      element.textContent += randomChar;
      await delay(40);
      element.textContent = element.textContent.slice(0, -1);
    }

    element.textContent += originalText[i];
    await delay(35);
  }
}

/**
 * Executa a sequência de typing em ordem para todos os elementos.
 * Aguarda cada elemento terminar antes de iniciar o próximo.
 */
async function startTypingSequence() {
  for (const element of typingElements) {
    await typeEffect(element);
  }
}

/** Utilitário: promessa que resolve após `ms` milissegundos */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// =============================================================
// GLITCH LOOP DINÂMICO DO TÍTULO HERO
// =============================================================

const glitchTitles = [
  "< futuro digital />",
  "< futur0 d1gital />",
  "< fvturo.exe />",
  "< fvtur0 d!g1tal />",
  "< future.dll />",
  "< digital_core />",
  "< sys.future />",
  "< corrupted_data />",
  "< neural_system />",
  "< AI.exe />",
  "< protocol_zyntek />",
  "< access_granted />",
  "< future404 />",
  "< quantum.digital />"
];

function startGlitchLoop() {

  const heroTitle = document.querySelector(".glitch-text");

  if (!heroTitle) return;

  const originalText = heroTitle.dataset.text || heroTitle.textContent;

  setInterval(() => {

    const randomText =
      glitchTitles[Math.floor(Math.random() * glitchTitles.length)];

    // troca para texto glitch
    heroTitle.innerHTML = randomText;

    // volta para original
  setTimeout(() => {
  heroTitle.innerHTML = originalText;
}, 200);

  }, 2500);
}


// =============================================================
// 6. MICRO-INTERAÇÕES
// =============================================================

// -- Cursor glow: partícula roxa que segue o mouse --
let glowTimeout;

document.addEventListener("mousemove", (event) => {
  clearTimeout(glowTimeout);

  const glow = document.createElement("div");
  glow.classList.add("cursor-glow");
  glow.style.left = `${event.pageX}px`;
  glow.style.top  = `${event.pageY}px`;
  document.body.appendChild(glow);

  // Remove após a duração da animação CSS
  glowTimeout = setTimeout(() => glow.remove(), 120);
});

// -- Feedback tátil nos botões (escala ao clicar) --
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    button.style.transform = "scale(.96)";
    setTimeout(() => { button.style.transform = ""; }, 120);
  });
});

// -- Holofote de luz nos cards: gradiente que segue o cursor --
cards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    card.style.background = `
      radial-gradient(
        circle at ${x}px ${y}px,
        rgba(216,0,255,.18),
        rgba(255,255,255,.03)
      )
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.background = "rgba(255,255,255,.04)";
  });
});


// =============================================================
// 7. MODAL DE EQUIPE
// =============================================================

/**
 * Popula e abre o modal com os dados do membro clicado.
 * Reutiliza getElementById em vez de repetir querySelector para
 * cada campo — centraliza os seletores do modal em uma função.
 */
function openTeamModal(memberKey) {
  const data = zyntekTeam[memberKey];
  if (!data) return;

  // Foto: usa a imagem já carregada no card como fonte
  const card = document.querySelector(`[data-member="${memberKey}"]`);
  modalImg.src = card.querySelector("img").src;

  // Textos
  document.getElementById("modal-member-greet").textContent = data.greet;
  document.getElementById("modal-member-name").textContent  = data.name;
  document.getElementById("modal-member-role").textContent  = data.role;
  document.getElementById("modal-member-bio").textContent   = data.bio;

  // Links
  document.getElementById("modal-btn-portfolio").href = data.portfolio;
  document.getElementById("modal-btn-contact").href   = data.whatsapp;

  // Tags de habilidade — geradas dinamicamente
  const tagsContainer = document.getElementById("modal-member-tags");
  tagsContainer.innerHTML = "";

  data.functions.forEach((func) => {
    const span = document.createElement("span");
    span.classList.add("tag-item");
    span.textContent = func;
    tagsContainer.appendChild(span);
  });

  teamModal.classList.add("active");
}

function closeTeamModal() {
  teamModal.classList.remove("active");
}

// Abre ao clicar em um card
teamCards.forEach((card) => {
  card.addEventListener("click", () => openTeamModal(card.getAttribute("data-member")));
});

// Fecha pelo botão ×, pelo overlay e pela tecla ESC
if (closeModalBtn) closeModalBtn.addEventListener("click", closeTeamModal);

window.addEventListener("click",   (e) => { if (e.target === teamModal) closeTeamModal(); });
window.addEventListener("keydown", (e) => { if (e.key === "Escape") closeTeamModal(); });


// =============================================================
// 8. MODAL DE PROJETOS
// =============================================================

/**
 * Popula e abre o modal com os dados do projeto clicado.
 * Centraliza a lógica que antes estava espalhada no forEach.
 */
function openProjectModal(projectKey) {
  const data = projectDatabase[projectKey];
  if (!data) return;

  document.getElementById("project-modal-title").textContent       = data.title;
  document.getElementById("project-modal-description").textContent = data.description;
  document.getElementById("project-modal-deploy").href             = data.deploy;
  document.getElementById("project-modal-github").href             = data.github;

  // Recarrega o vídeo do projeto ao trocar a src
  const videoPlayer = document.getElementById("project-modal-video-player");
  videoPlayer.querySelector("source").src = data.video;
  videoPlayer.load();

  projectModal.style.display = "flex";
}

function closeProjectModalFn() {
  projectModal.style.display = "none";
}

projectCards.forEach((card) => {
  card.addEventListener("click", () => openProjectModal(card.getAttribute("data-project")));
});

if (closeProjectModal) closeProjectModal.addEventListener("click", closeProjectModalFn);

window.addEventListener("click", (e) => {
  if (e.target === projectModal) closeProjectModalFn();
});


// =============================================================
// 9. SMOOTH SCROLL
//    Intercepta todos os links âncora e rola suavemente
//    com offset para compensar a altura do header fixo
// =============================================================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();

    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      window.scrollTo({ top: target.offsetTop - 90, behavior: "smooth" });
    }
  });
});


// =============================================================
// 10. INICIALIZAÇÃO
//     Aguarda o carregamento completo da página antes de
//     disparar a animação de typing para garantir que todos
//     os elementos já estejam no DOM
// =============================================================

window.addEventListener("load", async () => {
  document.body.classList.add("loaded");

  // espera o typing terminar
  await startTypingSequence();

  // só depois inicia o glitch loop
  startGlitchLoop();
});