const canvas = document.getElementById("spell-particles");
const context = canvas.getContext("2d");
const shell = document.querySelector(".spellbook-shell");
const spellList = document.getElementById("spell-list");
const spellNumber = document.getElementById("spell-number");
const spellSubtitle = document.getElementById("spell-subtitle");
const spellTitle = document.getElementById("spell-title");
const spellSummary = document.getElementById("spell-summary");
const spellExample = document.getElementById("spell-example");
const spellTags = document.getElementById("spell-tags");
const spellCta = document.getElementById("spell-cta");
const prevSpell = document.getElementById("prev-spell");
const nextSpell = document.getElementById("next-spell");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const spells = [
  {
    id: "clarity",
    number: "01",
    nav: "Clarity",
    title: "Clarity Spell",
    subtitle: "Find the first useful AI move.",
    summary: "A simple AI clarity session with MJ to find where AI can help immediately, before anything gets overbuilt or confusing.",
    example: "Turn 'I know AI could help, but I do not know where to start' into one clear next step.",
    tags: ["Starting point", "No jargon", "Fast clarity"],
    ctaLabel: "Book clarity",
    ctaHref: "mailto:Ai4All.mj@gmail.com?subject=AI4ALL%20clarity%20spell"
  },
  {
    id: "prompts",
    number: "02",
    nav: "Prompts",
    title: "Prompt Spell",
    subtitle: "Reusable words for repeated work.",
    summary: "Custom prompt packs built around your actual work, your voice, and the jobs you repeat most often.",
    example: "Turn rough notes into quotes, replies, posts, outlines, task lists, and follow-up emails without staring at a blank page.",
    tags: ["Prompt packs", "Your voice", "Blank-page fix"],
    ctaLabel: "Ask for prompts",
    ctaHref: "mailto:Ai4All.mj@gmail.com?subject=AI4ALL%20prompt%20spell"
  },
  {
    id: "workflow",
    number: "03",
    nav: "Workflow",
    title: "Workflow Spell",
    subtitle: "Make repeated tasks feel lighter.",
    summary: "Practical AI workflow setup for repeated admin, emails, documents, content, planning, and weekly clutter.",
    example: "Build a simple path from messy input to useful finished output, so the same task gets easier every time.",
    tags: ["Admin", "Systems", "Time saved"],
    ctaLabel: "Build a workflow",
    ctaHref: "mailto:Ai4All.mj@gmail.com?subject=AI4ALL%20workflow%20spell"
  },
  {
    id: "training",
    number: "04",
    nav: "Training",
    title: "Training Spell",
    subtitle: "Help a team use AI without panic.",
    summary: "Beginner-friendly AI training for schools, staff teams, churches, community groups, and busy people who need practical confidence.",
    example: "Give people a safe, simple starting point so they know what AI is good for, what to avoid, and how to use it well.",
    tags: ["Teams", "Workshops", "Confidence"],
    ctaLabel: "Plan training",
    ctaHref: "mailto:Ai4All.mj@gmail.com?subject=AI4ALL%20training%20spell"
  },
  {
    id: "examples",
    number: "05",
    nav: "Examples",
    title: "Proof Spell",
    subtitle: "See what useful AI actually looks like.",
    summary: "Real-world examples for small business, everyday life, teams, schools, churches, and community work.",
    example: "One event note can become a run sheet, volunteer brief, announcement, social post, and follow-up message.",
    tags: ["Business", "Life", "Community"],
    ctaLabel: "Talk examples",
    ctaHref: "mailto:Ai4All.mj@gmail.com?subject=AI4ALL%20practical%20examples"
  },
  {
    id: "about",
    number: "06",
    nav: "About MJ",
    title: "Guide Spell",
    subtitle: "Confusing things made simple and useful.",
    summary: "MJ helps normal people make sense of AI and use it for work, life, teams, schools, churches, and community groups.",
    example: "The goal is not to sound technical. The goal is to save time, reduce clutter, and make the next step obvious.",
    tags: ["MJ Kemp", "Human first", "Useful over flashy"],
    ctaLabel: "Meet MJ",
    ctaHref: "mailto:Ai4All.mj@gmail.com?subject=AI4ALL%20with%20MJ"
  },
  {
    id: "contact",
    number: "07",
    nav: "Contact",
    title: "Summoning Spell",
    subtitle: "Open the next conversation.",
    summary: "The easiest starting point is a free clarity call. Bring the messy problem, the repeated task, or the thing you wish AI could make easier.",
    example: "Email Ai4All.mj@gmail.com or call 0499 977 712 to find a simple AI starting point.",
    tags: ["Free clarity call", "0499 977 712", "Ai4All.mj@gmail.com"],
    ctaLabel: "Email MJ",
    ctaHref: "mailto:Ai4All.mj@gmail.com?subject=Book%20an%20AI4ALL%20clarity%20call"
  }
];

let activeIndex = 0;
let particles = [];
let burstPower = 0;
let animationFrame = 0;
let castTimer = 0;

function buildSpellList() {
  spells.forEach((spell, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "spell-button";
    button.dataset.spell = spell.id;
    button.innerHTML = `<b>${spell.number}</b><span>${spell.nav}</span>`;
    button.addEventListener("click", () => selectSpell(index));
    spellList.appendChild(button);
  });
}

function resizeCanvas() {
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(window.innerWidth * pixelRatio);
  canvas.height = Math.floor(window.innerHeight * pixelRatio);
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

  const count = window.innerWidth < 680 ? 82 : 138;
  particles = Array.from({ length: count }, createParticle);
}

function createParticle() {
  return {
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    radius: 0.7 + Math.random() * 2.2,
    speed: reducedMotion ? 0 : 0.18 + Math.random() * 0.55,
    drift: -0.25 + Math.random() * 0.5,
    alpha: 0.16 + Math.random() * 0.56,
    red: Math.random() > 0.7
  };
}

function drawParticles() {
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);
  context.globalCompositeOperation = "lighter";

  particles.forEach((particle) => {
    particle.y -= particle.speed + burstPower * 2;
    particle.x += particle.drift * (1 + burstPower * 2.8);

    if (particle.y < -20 || particle.x < -20 || particle.x > window.innerWidth + 20) {
      Object.assign(particle, createParticle(), { y: window.innerHeight + 20 });
    }

    const alpha = Math.min(1, particle.alpha + burstPower * 0.42);
    context.beginPath();
    context.fillStyle = particle.red
      ? `rgba(190, 23, 35, ${alpha})`
      : `rgba(245, 217, 143, ${alpha})`;
    context.shadowColor = particle.red ? "rgba(190, 23, 35, 0.72)" : "rgba(245, 217, 143, 0.72)";
    context.shadowBlur = 14 + burstPower * 28;
    context.arc(particle.x, particle.y, particle.radius + burstPower * 1.6, 0, Math.PI * 2);
    context.fill();
  });

  context.shadowBlur = 0;
  context.globalCompositeOperation = "source-over";
  burstPower *= 0.92;
  animationFrame = window.requestAnimationFrame(drawParticles);
}

function selectSpell(index, instant = false) {
  activeIndex = (index + spells.length) % spells.length;
  const spell = spells[activeIndex];

  spellNumber.textContent = spell.number;
  spellSubtitle.textContent = spell.subtitle;
  spellTitle.textContent = spell.title;
  spellSummary.textContent = spell.summary;
  spellExample.textContent = spell.example;
  spellCta.textContent = spell.ctaLabel;
  spellCta.href = spell.ctaHref;

  spellTags.replaceChildren();
  spell.tags.forEach((tag) => {
    const item = document.createElement("span");
    item.textContent = tag;
    spellTags.appendChild(item);
  });

  document.querySelectorAll(".spell-button").forEach((button) => {
    const isActive = button.dataset.spell === spell.id;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  nextSpell.textContent = activeIndex === spells.length - 1 ? "First spell" : "Next spell";

  if (!instant && !reducedMotion) {
    cast();
  }
}

function cast() {
  window.clearTimeout(castTimer);
  burstPower = 1;
  shell.classList.remove("is-casting");
  void shell.offsetWidth;
  shell.classList.add("is-casting");
  castTimer = window.setTimeout(() => shell.classList.remove("is-casting"), 680);
}

function next() {
  selectSpell(activeIndex + 1);
}

function previous() {
  selectSpell(activeIndex - 1);
}

function closeVersionMenus(except = null) {
  let closed = false;
  document.querySelectorAll(".version-menu[open]").forEach((menu) => {
    if (menu === except) return;
    menu.removeAttribute("open");
    closed = true;
  });
  return closed;
}

prevSpell.addEventListener("click", previous);
nextSpell.addEventListener("click", next);

document.addEventListener("click", (event) => {
  const clickedMenu = event.target instanceof Element ? event.target.closest(".version-menu") : null;
  closeVersionMenus(clickedMenu);
});

document.addEventListener("keydown", (event) => {
  const inVersionMenu = event.target instanceof Element && event.target.closest(".version-menu");
  if (inVersionMenu && event.key !== "Escape") return;

  if (event.key === "ArrowRight" || event.key === "PageDown") {
    event.preventDefault();
    next();
  }

  if (event.key === "ArrowLeft" || event.key === "PageUp") {
    event.preventDefault();
    previous();
  }

  if (event.key === "Escape") {
    event.preventDefault();
    closeVersionMenus();
  }
});

window.addEventListener("resize", resizeCanvas);
buildSpellList();
resizeCanvas();
selectSpell(0, true);
animationFrame = window.requestAnimationFrame(drawParticles);

window.addEventListener("beforeunload", () => {
  window.cancelAnimationFrame(animationFrame);
  window.clearTimeout(castTimer);
});
