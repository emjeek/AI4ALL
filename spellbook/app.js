const canvas = document.getElementById("spell-fx");
const context = canvas.getContext("2d");
const stage = document.querySelector(".spell-stage");
const scene = document.querySelector(".grimoire-scene");
const bookObject = document.getElementById("book-object");
const spellList = document.getElementById("spell-list");
const runeOrbit = document.getElementById("rune-orbit");
const statusSpell = document.getElementById("status-spell");
const statusPage = document.getElementById("status-page");
const chargeFill = document.getElementById("charge-fill");
const spellNumber = document.getElementById("spell-number");
const spellSchool = document.getElementById("spell-school");
const spellSubtitle = document.getElementById("spell-subtitle");
const spellTitle = document.getElementById("spell-title");
const spellSummary = document.getElementById("spell-summary");
const spellEffect = document.getElementById("spell-effect");
const spellMethod = document.getElementById("spell-method");
const spellTags = document.getElementById("spell-tags");
const spellCta = document.getElementById("spell-cta");
const prevSpell = document.getElementById("prev-spell");
const nextSpell = document.getElementById("next-spell");
const castSpell = document.getElementById("cast-spell");
const castButtonSmall = document.getElementById("cast-button-small");
const spellResult = document.getElementById("spell-result");
const spellSearch = document.getElementById("spell-search");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const spells = [
  {
    id: "clarity",
    number: "01",
    rune: "CL",
    nav: "Clarity",
    school: "Starting point",
    title: "Clarity Spell",
    subtitle: "Find the first useful AI move.",
    summary: "A practical clarity session with MJ that cuts through overwhelm and finds where AI can help immediately.",
    effect: "Confusion collapses into one obvious first step, one simple workflow, and one useful experiment you can actually try.",
    method: [
      "Map the messy task, repeated frustration, or vague AI idea.",
      "Find the quickest useful win before adding more tools.",
      "Leave with plain-language next steps you can use the same day."
    ],
    tags: ["No jargon", "Fast clarity", "First step"],
    result: "Clarity spell cast. The book has marked the shortest path from overwhelm to a practical first AI move.",
    ctaLabel: "Book clarity",
    ctaHref: "mailto:Ai4All.mj@gmail.com?subject=AI4ALL%20clarity%20spell",
    color: "#f5d98f",
    hot: "#fff1b8",
    red: "#be1723",
    soft: "rgba(245, 217, 143, 0.18)",
    haze: "rgba(190, 23, 35, 0.14)",
    search: "clarity start beginner first step overwhelm no jargon"
  },
  {
    id: "prompts",
    number: "02",
    rune: "PR",
    nav: "Prompts",
    school: "Language craft",
    title: "Prompt Spell",
    subtitle: "Reusable words for repeated work.",
    summary: "Custom prompt packs built around your real work, your language, and the jobs you repeat most often.",
    effect: "Blank pages turn into reusable prompts for quotes, replies, posts, planning, notes, resources, and follow-up.",
    method: [
      "Capture the exact outputs you keep needing.",
      "Build prompt patterns in your voice, not generic AI language.",
      "Package them so you can reuse them without thinking hard every time."
    ],
    tags: ["Prompt packs", "Your voice", "Blank-page fix"],
    result: "Prompt spell cast. The page now holds reusable language patterns for work that keeps coming back.",
    ctaLabel: "Ask for prompts",
    ctaHref: "mailto:Ai4All.mj@gmail.com?subject=AI4ALL%20prompt%20spell",
    color: "#f0c46c",
    hot: "#ffe39c",
    red: "#d5222f",
    soft: "rgba(240, 196, 108, 0.2)",
    haze: "rgba(213, 34, 47, 0.16)",
    search: "prompt prompts pack words reusable content posts replies quotes notes"
  },
  {
    id: "workflow",
    number: "03",
    rune: "WF",
    nav: "Workflow",
    school: "Systems magic",
    title: "Workflow Spell",
    subtitle: "Make repeated tasks feel lighter.",
    summary: "Practical AI workflow setup for repeated admin, emails, documents, content, planning, and weekly clutter.",
    effect: "Messy input becomes a repeatable route to a useful finished output, so the same task gets easier every week.",
    method: [
      "Trace the task from rough input to finished result.",
      "Decide where AI should help and where a human should stay in control.",
      "Build a simple repeatable flow that saves time without adding chaos."
    ],
    tags: ["Admin", "Systems", "Time saved"],
    result: "Workflow spell cast. The repeated task has been bound into a clearer path with less weekly friction.",
    ctaLabel: "Build workflow",
    ctaHref: "mailto:Ai4All.mj@gmail.com?subject=AI4ALL%20workflow%20spell",
    color: "#e7a94f",
    hot: "#ffd883",
    red: "#a20f1a",
    soft: "rgba(231, 169, 79, 0.2)",
    haze: "rgba(162, 15, 26, 0.18)",
    search: "workflow system admin email documents planning repeatable process"
  },
  {
    id: "training",
    number: "04",
    rune: "TR",
    nav: "Training",
    school: "Team confidence",
    title: "Training Spell",
    subtitle: "Help a team use AI without panic.",
    summary: "Beginner-friendly AI training for schools, staff teams, churches, community groups, and busy people who need confidence.",
    effect: "Curious, overwhelmed, or cautious people get a safe starting point and practical ways to use AI well.",
    method: [
      "Start with what people are already trying to do.",
      "Show practical examples instead of abstract AI theory.",
      "Build confidence, safety, and clear boundaries for real use."
    ],
    tags: ["Teams", "Workshops", "Confidence"],
    result: "Training spell cast. The group now has a calmer, safer way to begin using AI together.",
    ctaLabel: "Plan training",
    ctaHref: "mailto:Ai4All.mj@gmail.com?subject=AI4ALL%20training%20spell",
    color: "#f5d98f",
    hot: "#fff0b0",
    red: "#cb2634",
    soft: "rgba(245, 217, 143, 0.18)",
    haze: "rgba(203, 38, 52, 0.18)",
    search: "training workshop schools teams staff church community group safety confidence"
  },
  {
    id: "examples",
    number: "05",
    rune: "EX",
    nav: "Examples",
    school: "Proof field",
    title: "Proof Spell",
    subtitle: "See what useful AI actually looks like.",
    summary: "Real-world examples for small business, everyday life, teams, schools, churches, and community work.",
    effect: "Vague AI potential becomes concrete examples: notes to emails, event plans to run sheets, ideas to finished drafts.",
    method: [
      "Translate everyday friction into specific AI use cases.",
      "Show before-and-after examples that make sense to normal people.",
      "Pick the examples that are worth turning into habits."
    ],
    tags: ["Business", "Life", "Community"],
    result: "Proof spell cast. The useful examples are glowing now: practical, visible, and easier to explain.",
    ctaLabel: "Talk examples",
    ctaHref: "mailto:Ai4All.mj@gmail.com?subject=AI4ALL%20practical%20examples",
    color: "#e6be79",
    hot: "#ffe6ab",
    red: "#b81824",
    soft: "rgba(230, 190, 121, 0.2)",
    haze: "rgba(184, 24, 36, 0.16)",
    search: "examples small business everyday life church community event run sheet"
  },
  {
    id: "about",
    number: "06",
    rune: "MJ",
    nav: "About MJ",
    school: "Guide mark",
    title: "Guide Spell",
    subtitle: "Confusing things made simple and useful.",
    summary: "MJ helps normal people make sense of AI and use it for work, life, teams, schools, churches, and community groups.",
    effect: "The technical fog clears. The focus becomes saving time, reducing clutter, and making the next useful step obvious.",
    method: [
      "Listen for the real-world problem behind the AI question.",
      "Translate technical ideas into ordinary language.",
      "Build around usefulness, not hype."
    ],
    tags: ["MJ Kemp", "Human first", "Useful over flashy"],
    result: "Guide spell cast. The book points back to the core promise: make confusing things simple and useful.",
    ctaLabel: "Meet MJ",
    ctaHref: "mailto:Ai4All.mj@gmail.com?subject=AI4ALL%20with%20MJ",
    color: "#d4aa58",
    hot: "#f5d98f",
    red: "#be1723",
    soft: "rgba(212, 170, 88, 0.18)",
    haze: "rgba(190, 23, 35, 0.16)",
    search: "about mj kemp simple useful human first ai4all"
  },
  {
    id: "contact",
    number: "07",
    rune: "GO",
    nav: "Contact",
    school: "Summoning",
    title: "Summoning Spell",
    subtitle: "Open the next conversation.",
    summary: "The easiest starting point is a free clarity call. Bring the messy problem, repeated task, or thing you wish AI could make easier.",
    effect: "The book opens a clean path to MJ: email, call, or start with a low-pressure clarity conversation.",
    method: [
      "Email Ai4All.mj@gmail.com with the thing you want AI to make easier.",
      "Call 0499 977 712 if a conversation is faster.",
      "Start small if you are not sure what you need yet."
    ],
    tags: ["Free clarity call", "0499 977 712", "Ai4All.mj@gmail.com"],
    result: "Summoning spell cast. The contact path is open: Ai4All.mj@gmail.com or 0499 977 712.",
    ctaLabel: "Email MJ",
    ctaHref: "mailto:Ai4All.mj@gmail.com?subject=Book%20an%20AI4ALL%20clarity%20call",
    color: "#ffcc75",
    hot: "#fff1b8",
    red: "#ff3142",
    soft: "rgba(255, 204, 117, 0.22)",
    haze: "rgba(255, 49, 66, 0.18)",
    search: "contact email call phone clarity call book mj ai4all"
  }
];

let activeIndex = 0;
let isTurning = false;
let isCasting = false;
let animationFrame = 0;
let pixelRatio = 1;
let width = 0;
let height = 0;
let motes = [];
let sparks = [];
let rings = [];
let glyphs = [];
let threads = [];
let lastPointer = { x: 0.5, y: 0.5 };

function buildSpellList() {
  spells.forEach((spell, index) => {
    const button = document.createElement("button");
    const number = document.createElement("b");
    const labelWrap = document.createElement("span");
    const label = document.createElement("span");
    const school = document.createElement("small");

    button.type = "button";
    button.className = "spell-button";
    button.dataset.spell = spell.id;
    button.dataset.search = `${spell.nav} ${spell.title} ${spell.subtitle} ${spell.summary} ${spell.search}`.toLowerCase();
    button.style.setProperty("--button-glow", spell.soft);
    number.textContent = spell.number;
    label.textContent = spell.nav;
    school.textContent = spell.school;
    labelWrap.append(label, school);
    button.append(number, labelWrap);
    button.addEventListener("click", () => turnTo(index, index >= activeIndex ? 1 : -1));
    spellList.appendChild(button);
  });
}

function buildRuneOrbit() {
  runeOrbit.replaceChildren();
  spells.forEach((spell, index) => {
    const node = document.createElement("div");
    node.className = "rune-node";
    node.dataset.spell = spell.id;
    node.textContent = spell.rune;
    node.style.setProperty("--angle", `${(360 / spells.length) * index}`);
    runeOrbit.appendChild(node);
  });
  updateRuneRadius();
}

function updateRuneRadius() {
  const radius = Math.max(128, Math.min(window.innerWidth * 0.37, 410));
  document.querySelectorAll(".rune-node").forEach((node) => {
    node.style.setProperty("--orbit-radius", `${radius}px`);
    node.style.setProperty("--orbit-offset", `${radius * -1}px`);
  });
}

function setTheme(spell) {
  stage.dataset.spell = spell.id;
  document.documentElement.style.setProperty("--spell", spell.color);
  document.documentElement.style.setProperty("--spell-hot", spell.hot);
  document.documentElement.style.setProperty("--spell-red", spell.red);
  document.documentElement.style.setProperty("--spell-soft", spell.soft);
  document.documentElement.style.setProperty("--spell-haze", spell.haze);
}

function renderSpell(index, instant = false) {
  activeIndex = (index + spells.length) % spells.length;
  const spell = spells[activeIndex];
  setTheme(spell);

  statusSpell.textContent = spell.title;
  statusPage.textContent = `${spell.number} / ${String(spells.length).padStart(2, "0")}`;
  spellNumber.textContent = spell.number;
  spellSchool.textContent = spell.school;
  spellSubtitle.textContent = spell.subtitle;
  spellTitle.textContent = spell.title;
  spellSummary.textContent = spell.summary;
  spellEffect.textContent = spell.effect;
  spellCta.textContent = spell.ctaLabel;
  spellCta.href = spell.ctaHref;
  castButtonSmall.textContent = instant ? "Ready to ignite" : "Page locked";

  spellMethod.replaceChildren();
  spell.method.forEach((line) => {
    const item = document.createElement("li");
    item.textContent = line;
    spellMethod.appendChild(item);
  });

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

  document.querySelectorAll(".rune-node").forEach((node) => {
    node.classList.toggle("is-active", node.dataset.spell === spell.id);
    node.classList.remove("is-hot");
  });

  prevSpell.disabled = false;
  nextSpell.textContent = activeIndex === spells.length - 1 ? "First page" : "Turn page";

  if (instant) {
    spellResult.textContent = "The spellbook is awake. Choose a spell or press Cast Spell to light the runes.";
  } else {
    spellResult.textContent = `${spell.title} is open. Press Cast Spell to ignite the page.`;
  }
}

function turnTo(index, direction = 1) {
  if (isTurning || isCasting) return;
  const target = (index + spells.length) % spells.length;

  if (target === activeIndex) {
    castActiveSpell();
    return;
  }

  if (reducedMotion) {
    renderSpell(target);
    emitPageDust(direction);
    return;
  }

  isTurning = true;
  scene.classList.remove("is-arriving", "is-turning", "is-turning-back");
  void scene.offsetWidth;
  scene.classList.add(direction >= 0 ? "is-turning" : "is-turning-back");
  emitPageDust(direction);

  window.setTimeout(() => {
    renderSpell(target);
  }, 360);

  window.setTimeout(() => {
    scene.classList.remove("is-turning", "is-turning-back");
    scene.classList.add("is-arriving");
    isTurning = false;
  }, 920);

  window.setTimeout(() => {
    scene.classList.remove("is-arriving");
  }, 1540);
}

function next() {
  turnTo(activeIndex + 1, 1);
}

function previous() {
  turnTo(activeIndex - 1, -1);
}

function castActiveSpell() {
  if (isCasting || isTurning) return;

  const spell = spells[activeIndex];
  isCasting = true;
  scene.classList.remove("is-casting");
  void scene.offsetWidth;
  scene.classList.add("is-casting");
  spellResult.textContent = "Casting...";
  castButtonSmall.textContent = "Runes charging";
  setCharge(0);
  igniteRuneWave();

  const started = performance.now();
  const duration = reducedMotion ? 350 : 1320;

  function charge(now) {
    const progress = Math.min(1, (now - started) / duration);
    const eased = easeOutCubic(progress);
    setCharge(Math.round(eased * 100));

    if (!reducedMotion && progress > 0.16 && progress < 0.92) {
      if (Math.random() < 0.48) emitSpark(spell, 1 + progress * 2);
      if (Math.random() < 0.18) emitGlyph(spell);
    }

    if (progress < 1) {
      window.requestAnimationFrame(charge);
      return;
    }

    emitCastBurst(spell);
    spellResult.textContent = spell.result;
    castButtonSmall.textContent = "Spell cast";

    window.setTimeout(() => {
      scene.classList.remove("is-casting");
      document.querySelectorAll(".rune-node").forEach((node) => node.classList.remove("is-hot"));
      setCharge(0);
      castButtonSmall.textContent = "Cast again";
      isCasting = false;
    }, reducedMotion ? 250 : 720);
  }

  window.requestAnimationFrame(charge);
}

function setCharge(value) {
  const clamped = Math.max(0, Math.min(100, value));
  chargeFill.style.width = `${clamped}%`;
  document.documentElement.style.setProperty("--charge", `${clamped}%`);
}

function igniteRuneWave() {
  const nodes = [...document.querySelectorAll(".rune-node")];
  nodes.forEach((node, index) => {
    window.setTimeout(() => {
      node.classList.add("is-hot");
    }, reducedMotion ? 0 : index * 90);
  });
}

function filterSpells() {
  const query = spellSearch.value.trim().toLowerCase();
  let firstVisible = null;

  document.querySelectorAll(".spell-button").forEach((button) => {
    const visible = !query || button.dataset.search.includes(query);
    button.hidden = !visible;
    if (visible && firstVisible === null) {
      firstVisible = button.dataset.spell;
    }
  });

  if (query && firstVisible) {
    const targetIndex = spells.findIndex((spell) => spell.id === firstVisible);
    if (targetIndex !== activeIndex) {
      renderSpell(targetIndex);
    }
  }
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

function resizeCanvas() {
  pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * pixelRatio);
  canvas.height = Math.floor(height * pixelRatio);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  updateRuneRadius();

  const moteCount = width < 680 ? 120 : 220;
  motes = Array.from({ length: moteCount }, createMote);
  threads = Array.from({ length: width < 680 ? 12 : 22 }, createThread);
}

function createMote() {
  const spell = spells[activeIndex] || spells[0];
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: -0.16 + Math.random() * 0.32,
    vy: reducedMotion ? 0 : -0.08 - Math.random() * 0.34,
    radius: 0.4 + Math.random() * 1.9,
    alpha: 0.08 + Math.random() * 0.42,
    pulse: Math.random() * Math.PI * 2,
    color: Math.random() > 0.72 ? spell.red : spell.hot
  };
}

function createThread() {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    length: 80 + Math.random() * 220,
    speed: reducedMotion ? 0 : 0.1 + Math.random() * 0.28,
    alpha: 0.04 + Math.random() * 0.1,
    phase: Math.random() * Math.PI * 2
  };
}

function emitPageDust(direction) {
  if (reducedMotion) return;
  const spell = spells[activeIndex];
  const originX = direction >= 0 ? width * 0.58 : width * 0.42;
  const originY = height * 0.48;

  for (let i = 0; i < 46; i += 1) {
    sparks.push({
      x: originX + (-40 + Math.random() * 80),
      y: originY + (-120 + Math.random() * 240),
      vx: direction * (1.4 + Math.random() * 4.2),
      vy: -1.2 + Math.random() * 2.4,
      radius: 0.8 + Math.random() * 2.1,
      life: 0,
      ttl: 520 + Math.random() * 520,
      color: Math.random() > 0.3 ? spell.hot : spell.red
    });
  }

  rings.push({
    x: originX,
    y: originY,
    radius: 8,
    speed: 7,
    life: 0,
    ttl: 700,
    alpha: 0.5,
    color: spell.hot
  });
}

function emitSpark(spell, power = 1) {
  const center = getBookCenter();
  sparks.push({
    x: center.x + (-80 + Math.random() * 160),
    y: center.y + (-30 + Math.random() * 70),
    vx: (-2.2 + Math.random() * 4.4) * power,
    vy: (-4.6 - Math.random() * 3.2) * power,
    gravity: 0.075,
    radius: 1 + Math.random() * 2.8,
    life: 0,
    ttl: 520 + Math.random() * 680,
    color: Math.random() > 0.36 ? spell.hot : spell.red
  });
}

function emitGlyph(spell) {
  const center = getBookCenter();
  const text = spell.rune;
  glyphs.push({
    text,
    x: center.x + (-170 + Math.random() * 340),
    y: center.y + (-140 + Math.random() * 160),
    vx: -0.35 + Math.random() * 0.7,
    vy: -0.85 - Math.random() * 0.8,
    rotation: -0.35 + Math.random() * 0.7,
    scale: 0.8 + Math.random() * 1.4,
    life: 0,
    ttl: 900 + Math.random() * 520,
    color: Math.random() > 0.4 ? spell.hot : spell.red
  });
}

function emitCastBurst(spell) {
  if (reducedMotion) return;
  const center = getBookCenter();

  for (let i = 0; i < 118; i += 1) {
    const angle = (Math.PI * 2 * i) / 118 + Math.random() * 0.18;
    const speed = 2.2 + Math.random() * 6.4;
    sparks.push({
      x: center.x,
      y: center.y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      gravity: 0.015,
      radius: 1 + Math.random() * 3,
      life: 0,
      ttl: 900 + Math.random() * 760,
      color: Math.random() > 0.42 ? spell.hot : spell.red
    });
  }

  for (let i = 0; i < 4; i += 1) {
    rings.push({
      x: center.x,
      y: center.y,
      radius: 18 + i * 20,
      speed: 9 + i * 4,
      life: 0,
      ttl: 980 + i * 240,
      alpha: 0.82 - i * 0.12,
      color: i % 2 ? spell.red : spell.hot
    });
  }

  for (let i = 0; i < 22; i += 1) {
    window.setTimeout(() => emitGlyph(spell), i * 28);
  }
}

function getBookCenter() {
  const rect = bookObject.getBoundingClientRect();
  return {
    x: rect.left + rect.width * 0.5,
    y: rect.top + rect.height * 0.54
  };
}

function draw(time = 0) {
  context.clearRect(0, 0, width, height);
  context.globalCompositeOperation = "lighter";

  drawThreads(time);
  drawMotes(time);
  drawRings();
  drawSparks();
  drawGlyphs();

  context.globalCompositeOperation = "source-over";
  animationFrame = window.requestAnimationFrame(draw);
}

function drawThreads(time) {
  const spell = spells[activeIndex];
  threads.forEach((thread) => {
    thread.y -= thread.speed;
    thread.x += Math.sin(time * 0.0004 + thread.phase) * 0.18;
    if (thread.y < -thread.length) {
      Object.assign(thread, createThread(), { y: height + thread.length });
    }

    const gradient = context.createLinearGradient(thread.x, thread.y, thread.x, thread.y + thread.length);
    gradient.addColorStop(0, "rgba(245, 217, 143, 0)");
    gradient.addColorStop(0.45, rgba(spell.hot, thread.alpha));
    gradient.addColorStop(1, "rgba(190, 23, 35, 0)");
    context.strokeStyle = gradient;
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(thread.x, thread.y);
    context.lineTo(thread.x + Math.sin(thread.phase) * 22, thread.y + thread.length);
    context.stroke();
  });
}

function drawMotes(time) {
  motes.forEach((mote) => {
    mote.x += mote.vx + Math.sin(time * 0.0008 + mote.pulse) * 0.06;
    mote.y += mote.vy;
    mote.pulse += 0.018;

    if (mote.y < -16 || mote.x < -16 || mote.x > width + 16) {
      Object.assign(mote, createMote(), { y: height + 16 });
    }

    const pulse = 0.65 + Math.sin(mote.pulse) * 0.35;
    context.beginPath();
    context.fillStyle = rgba(mote.color, mote.alpha * pulse);
    context.shadowColor = rgba(mote.color, 0.55);
    context.shadowBlur = 14;
    context.arc(mote.x, mote.y, mote.radius * (0.8 + pulse), 0, Math.PI * 2);
    context.fill();
  });
  context.shadowBlur = 0;
}

function drawRings() {
  rings = rings.filter((ring) => {
    ring.life += 16.7;
    ring.radius += ring.speed;
    const progress = ring.life / ring.ttl;
    if (progress >= 1) return false;

    context.beginPath();
    context.strokeStyle = rgba(ring.color, ring.alpha * (1 - progress));
    context.lineWidth = 1 + (1 - progress) * 2;
    context.shadowColor = rgba(ring.color, 0.65);
    context.shadowBlur = 20;
    context.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2);
    context.stroke();
    return true;
  });
  context.shadowBlur = 0;
}

function drawSparks() {
  sparks = sparks.filter((spark) => {
    spark.life += 16.7;
    const progress = spark.life / spark.ttl;
    if (progress >= 1) return false;

    spark.x += spark.vx;
    spark.y += spark.vy;
    spark.vy += spark.gravity || 0;
    spark.vx *= 0.992;

    const alpha = 1 - progress;
    context.beginPath();
    context.fillStyle = rgba(spark.color, alpha);
    context.shadowColor = rgba(spark.color, 0.78);
    context.shadowBlur = 18;
    context.arc(spark.x, spark.y, spark.radius * (0.4 + alpha), 0, Math.PI * 2);
    context.fill();

    context.beginPath();
    context.strokeStyle = rgba(spark.color, alpha * 0.42);
    context.lineWidth = Math.max(0.5, spark.radius * 0.7);
    context.moveTo(spark.x, spark.y);
    context.lineTo(spark.x - spark.vx * 4, spark.y - spark.vy * 4);
    context.stroke();
    return true;
  });
  context.shadowBlur = 0;
}

function drawGlyphs() {
  context.textAlign = "center";
  context.textBaseline = "middle";
  glyphs = glyphs.filter((glyph) => {
    glyph.life += 16.7;
    const progress = glyph.life / glyph.ttl;
    if (progress >= 1) return false;

    glyph.x += glyph.vx;
    glyph.y += glyph.vy;
    glyph.rotation += 0.004;
    const alpha = Math.sin(Math.PI * progress);

    context.save();
    context.translate(glyph.x, glyph.y);
    context.rotate(glyph.rotation);
    context.scale(glyph.scale, glyph.scale);
    context.font = "900 24px Consolas, monospace";
    context.fillStyle = rgba(glyph.color, alpha * 0.75);
    context.shadowColor = rgba(glyph.color, 0.7);
    context.shadowBlur = 22;
    context.fillText(glyph.text, 0, 0);
    context.restore();
    return true;
  });
  context.shadowBlur = 0;
}

function rgba(hex, alpha) {
  if (hex.startsWith("rgba")) return hex;
  const value = hex.replace("#", "");
  const bigint = Number.parseInt(value, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function easeOutCubic(value) {
  return 1 - Math.pow(1 - value, 3);
}

function handlePointerMove(event) {
  if (window.innerWidth < 940 || reducedMotion) return;
  const rect = bookObject.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width;
  const y = (event.clientY - rect.top) / rect.height;
  lastPointer = { x, y };
  const tiltY = (x - 0.5) * 8;
  const tiltX = (0.5 - y) * 5;
  scene.style.setProperty("--book-tilt-y", `${tiltY.toFixed(2)}deg`);
  scene.style.setProperty("--book-tilt-x", `${tiltX.toFixed(2)}deg`);
}

function calmBookTilt() {
  if (window.innerWidth < 940 || reducedMotion) return;
  lastPointer = { x: 0.5, y: 0.5 };
  scene.style.setProperty("--book-tilt-y", "0deg");
  scene.style.setProperty("--book-tilt-x", "0deg");
}

prevSpell.addEventListener("click", previous);
nextSpell.addEventListener("click", next);
castSpell.addEventListener("click", castActiveSpell);
spellSearch.addEventListener("input", filterSpells);
bookObject.addEventListener("pointermove", handlePointerMove);
bookObject.addEventListener("pointerleave", calmBookTilt);

document.addEventListener("click", (event) => {
  const clickedMenu = event.target instanceof Element ? event.target.closest(".version-menu") : null;
  closeVersionMenus(clickedMenu);
});

document.addEventListener("keydown", (event) => {
  const target = event.target instanceof Element ? event.target : null;
  const inInput = target?.matches("input, textarea, select");
  const inVersionMenu = target?.closest(".version-menu");

  if (inInput) {
    if (event.key === "Escape") {
      event.preventDefault();
      spellSearch.blur();
      closeVersionMenus();
    }
    return;
  }

  if (inVersionMenu && event.key !== "Escape") return;

  if (event.key === "ArrowRight" || event.key === "PageDown") {
    event.preventDefault();
    next();
  }

  if (event.key === "ArrowLeft" || event.key === "PageUp") {
    event.preventDefault();
    previous();
  }

  if (event.key === "Enter") {
    event.preventDefault();
    castActiveSpell();
  }

  if (event.key === "Escape") {
    event.preventDefault();
    closeVersionMenus();
  }
});

window.addEventListener("resize", resizeCanvas);

buildSpellList();
buildRuneOrbit();
resizeCanvas();
renderSpell(0, true);
animationFrame = window.requestAnimationFrame(draw);

window.addEventListener("beforeunload", () => {
  window.cancelAnimationFrame(animationFrame);
});
