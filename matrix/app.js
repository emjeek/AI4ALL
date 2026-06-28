const canvas = document.getElementById("matrix-rain");
const context = canvas.getContext("2d");
const panel = document.getElementById("matrix-panel");
const kicker = document.getElementById("chapter-kicker");
const chapterNumber = document.getElementById("chapter-number");
const chapterTotal = document.getElementById("chapter-total");
const title = document.getElementById("chapter-title");
const copy = document.getElementById("chapter-copy");
const body = document.getElementById("chapter-body");
const prevButton = document.getElementById("prev-chapter");
const nextButton = document.getElementById("next-chapter");
const depthLabel = document.getElementById("depth-label");
const consoleLine = document.getElementById("console-line");
const depthProgress = document.getElementById("depth-progress");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const chapters = [
  {
    kicker: "AI4ALL / Entry Point",
    title: "Make AI <em>actually useful.</em>",
    copy: "No jargon. No wasted time. Just useful AI for real life and real work.",
    console: "Waiting at the surface.",
    body: `
      <p>Move through the code to see how AI4ALL turns confusing tools into clear, practical help.</p>
      <div class="code-line">
        <span class="chip">Clear over clever</span>
        <span class="chip">Human first</span>
        <span class="chip">Simple systems</span>
      </div>
    `
  },
  {
    kicker: "01 / What I Help With",
    title: "AI that earns its place in your <em>actual day.</em>",
    copy: "You do not need more tools. You need a clear way to use the right ones for the things that already take up your time.",
    console: "Mapping real-world uses.",
    body: `
      <ul>
        <li><strong>Small Business AI</strong>Emails, admin, marketing, customer messages, quotes, planning and repeatable workflows.</li>
        <li><strong>Everyday Life AI</strong>Planning, budgeting, learning, routines, problem solving and making life less messy.</li>
        <li><strong>Schools and Staff Teams</strong>Beginner-friendly AI training for busy staff who need a simple starting point.</li>
        <li><strong>Churches and Community Groups</strong>Event planning, communication, volunteer support and hours saved on admin.</li>
      </ul>
    `
  },
  {
    kicker: "02 / How I Make AI Useful",
    title: "I do not make AI sound impressive. <em>I make it usable.</em>",
    copy: "We start with the work and problems you already have, then make the AI fit around you.",
    console: "Building a usable path.",
    body: `
      <ul>
        <li><strong>Find the friction</strong>We look at what keeps slowing you down, repeating itself or cluttering your head.</li>
        <li><strong>Build around you</strong>No bloated system. Just practical AI help for the tasks you already do.</li>
        <li><strong>Use it straight away</strong>You leave with clear prompts, templates and workflows you can keep using.</li>
      </ul>
    `
  },
  {
    kicker: "03 / Ways I Can Help",
    title: "Start simple. Build what is <em>genuinely useful.</em>",
    copy: "From one clear conversation to a complete practical workflow, the point is always to make AI easier to use tomorrow.",
    console: "Loading practical support.",
    body: `
      <ul>
        <li><strong>AI Clarity Session</strong>A one-on-one session to find where AI can help immediately.</li>
        <li><strong>Custom Prompt Packs</strong>Reusable prompts built around your actual work, in language that makes sense.</li>
        <li><strong>Workflow Setup</strong>Practical AI systems for repeated emails, documents, content, planning and admin.</li>
        <li><strong>Team Training</strong>Clear, beginner-friendly workshops for practical, safe and confident AI use.</li>
      </ul>
    `
  },
  {
    kicker: "04 / Practical Examples",
    title: "Less theory. More <em>that saved me hours.</em>",
    copy: "The best use of AI is often the annoying task that suddenly becomes easier every single week.",
    console: "Rendering saved time.",
    body: `
      <ul>
        <li><strong>Rough notes to finished work</strong>Draft quotes, follow-up emails, social posts and task lists from what is already in your head.</li>
        <li><strong>A less messy week</strong>Organise priorities, compare options, simplify budgeting and get unstuck.</li>
        <li><strong>Clear team starting points</strong>Help staff create resources and communicate without staring at a blank screen.</li>
        <li><strong>One event note, many outputs</strong>Create run sheets, volunteer briefs, announcements and follow-up communication.</li>
      </ul>
    `
  },
  {
    kicker: "05 / About MJ Kemp",
    title: "I make confusing things <em>simple and useful.</em>",
    copy: "AI should not belong only to technical experts. My focus is practical: understand what is getting in your way, then build a clear solution around your real world.",
    console: "Introducing MJ Kemp.",
    body: `
      <div class="code-line">
        <span class="chip">Useful over flashy</span>
        <span class="chip">No jargon</span>
        <span class="chip">Time saved</span>
        <span class="chip">Normal people can use it</span>
      </div>
    `
  },
  {
    kicker: "06 / Common Questions",
    title: "You do not need to know where to <em>start.</em>",
    copy: "Most people do not need more AI news or another overwhelming list of apps. They need a patient, practical conversation.",
    console: "Resolving common questions.",
    body: `
      <ul>
        <li><strong>Do I need to understand AI?</strong>No. Starting from scratch is completely fine.</li>
        <li><strong>Is this only for businesses?</strong>No. AI4ALL is for everyday people, businesses, schools, churches and teams.</li>
        <li><strong>Will AI replace our work?</strong>The goal is to improve repetitive parts, not throw everything out.</li>
        <li><strong>Can you train a whole team?</strong>Yes. Team sessions are beginner-friendly and practical.</li>
      </ul>
    `
  },
  {
    kicker: "07 / Contact",
    title: "Ready to stop <em>guessing</em> with AI?",
    copy: "Let's find the simplest way AI can save time, reduce clutter and make your work easier.",
    console: "Opening a conversation.",
    body: `
      <ul>
        <li><strong>MJ Kemp</strong>AI4ALL - Practical AI for real people.</li>
        <li><strong>Phone</strong><a href="tel:+61499977712">0499 977 712</a></li>
        <li><strong>Email</strong><a href="mailto:Ai4All.mj@gmail.com">Ai4All.mj@gmail.com</a></li>
        <li><strong>Website</strong><a href="https://ai4allwithmj.com">ai4allwithmj.com</a></li>
      </ul>
    `
  }
];

let activeIndex = 0;
let depth = 0;
let columns = [];
let animationFrame = 0;
let lastFrame = 0;
let travelling = false;

chapterTotal.textContent = String(chapters.length).padStart(2, "0");

function resizeCanvas() {
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(window.innerWidth * pixelRatio);
  canvas.height = Math.floor(window.innerHeight * pixelRatio);
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

  const columnWidth = window.innerWidth < 680 ? 18 : 22;
  const count = Math.ceil(window.innerWidth / columnWidth);
  columns = Array.from({ length: count }, (_, index) => ({
    x: index * columnWidth,
    y: Math.random() * -window.innerHeight,
    speed: reducedMotion ? 0.35 : 1.3 + Math.random() * 2.8,
    size: window.innerWidth < 680 ? 13 + Math.random() * 5 : 15 + Math.random() * 7,
    red: Math.random() > 0.72
  }));
}

function drawMatrix(time = 0) {
  const delta = Math.min(42, time - lastFrame || 16);
  lastFrame = time;

  context.fillStyle = `rgba(4, 3, 2, ${reducedMotion ? 0.18 : 0.095})`;
  context.fillRect(0, 0, window.innerWidth, window.innerHeight);
  context.font = "700 16px Consolas, monospace";
  context.textAlign = "center";

  const alphabet = "AI4ALL0123456789MAKEUSEFULMJ<>/{}[]PROMPTWORKFLOW";
  const depthBoost = 1 + depth * 0.18;

  columns.forEach((column, columnIndex) => {
    const trail = 8 + Math.floor(depth * 2);
    for (let step = 0; step < trail; step += 1) {
      const character = alphabet[(columnIndex * 13 + step * 7 + Math.floor(time / 90)) % alphabet.length];
      const y = column.y - step * column.size * 1.2;
      if (y < -30 || y > window.innerHeight + 30) continue;

      const alpha = Math.max(0, 1 - step / trail);
      const isHead = step === 0;
      context.font = `${isHead ? 900 : 700} ${column.size}px Consolas, monospace`;
      context.fillStyle = column.red
        ? `rgba(190, 23, 35, ${0.16 + alpha * 0.58})`
        : `rgba(245, 217, 143, ${0.12 + alpha * 0.72})`;
      context.shadowColor = column.red ? "rgba(190, 23, 35, 0.52)" : "rgba(212, 170, 88, 0.52)";
      context.shadowBlur = isHead ? 16 : 4;
      context.fillText(character, column.x, y);
    }

    column.y += column.speed * depthBoost * (delta / 16);
    if (column.y - trail * column.size > window.innerHeight) {
      column.y = Math.random() * -220;
      column.speed = reducedMotion ? 0.35 : 1.3 + Math.random() * 2.8;
      column.red = Math.random() > 0.72;
    }
  });

  context.shadowBlur = 0;
  animationFrame = window.requestAnimationFrame(drawMatrix);
}

function renderChapter(index, instant = false) {
  activeIndex = Math.max(0, Math.min(chapters.length - 1, index));
  depth = activeIndex;
  const chapter = chapters[activeIndex];

  const apply = () => {
    kicker.textContent = chapter.kicker;
    chapterNumber.textContent = String(activeIndex + 1).padStart(2, "0");
    title.innerHTML = chapter.title;
    copy.textContent = chapter.copy;
    body.innerHTML = chapter.body;
    depthLabel.textContent = `DEPTH ${String(activeIndex).padStart(2, "0")}`;
    consoleLine.textContent = chapter.console;
    depthProgress.style.width = `${((activeIndex + 1) / chapters.length) * 100}%`;
    prevButton.disabled = activeIndex === 0;
    nextButton.textContent = activeIndex === 0
      ? "Enter the code"
      : activeIndex === chapters.length - 1
        ? "Back to surface"
        : "Travel deeper";
    panel.classList.remove("is-travelling");
    travelling = false;
  };

  if (instant || reducedMotion) {
    apply();
    return;
  }

  travelling = true;
  panel.classList.add("is-travelling");
  window.setTimeout(apply, 260);
}

function goNext() {
  if (travelling) return;
  if (activeIndex === chapters.length - 1) {
    renderChapter(0);
    return;
  }
  renderChapter(activeIndex + 1);
}

function goPrevious() {
  if (travelling) return;
  renderChapter(activeIndex - 1);
}

nextButton.addEventListener("click", goNext);
prevButton.addEventListener("click", goPrevious);

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === "ArrowRight" || event.key === "PageDown") {
    event.preventDefault();
    goNext();
  }
  if (event.key === "ArrowLeft" || event.key === "PageUp") {
    event.preventDefault();
    goPrevious();
  }
  if (event.key === "Escape") {
    event.preventDefault();
    renderChapter(0);
  }
});

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
renderChapter(0, true);
animationFrame = window.requestAnimationFrame(drawMatrix);

window.addEventListener("beforeunload", () => {
  window.cancelAnimationFrame(animationFrame);
});
