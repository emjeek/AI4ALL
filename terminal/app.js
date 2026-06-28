const output = document.getElementById("terminal-output");
const choices = document.getElementById("choice-rail");
const form = document.getElementById("command-form");
const input = document.getElementById("command-input");
const diagnosticCard = document.getElementById("diagnostic-card");

const diagnostic = {
  audience: null,
  friction: null
};

const audienceChoices = [
  { id: "business", label: "Small business" },
  { id: "life", label: "Everyday life" },
  { id: "team", label: "Schools / staff team" },
  { id: "community", label: "Church / community" },
  { id: "unsure", label: "Not sure yet" }
];

const frictionChoices = [
  { id: "admin", label: "Admin / documents" },
  { id: "emails", label: "Emails / messages" },
  { id: "content", label: "Content / posts" },
  { id: "planning", label: "Planning / routines" },
  { id: "training", label: "Team confidence" },
  { id: "workflows", label: "Repeatable workflows" }
];

const recommendations = {
  clarity: {
    title: "Start with an AI Clarity Session",
    summary: "A simple conversation with MJ to find the clearest quick wins before building anything complicated.",
    examples: "Useful when you know AI could help, but you do not know where to start.",
    cta: "Book a clarity call"
  },
  workflow: {
    title: "Build a practical AI workflow",
    summary: "Turn repeated admin, emails, planning, quotes, documents, and follow-ups into a clear repeatable system.",
    examples: "Good for saving time every week without adding another bloated tool.",
    cta: "Ask MJ about a workflow"
  },
  prompts: {
    title: "Create a custom prompt pack",
    summary: "Reusable prompts built around your exact work, your language, and the jobs you repeat most often.",
    examples: "Good for content, customer replies, planning notes, resources, and blank-page moments.",
    cta: "Ask MJ about prompt packs"
  },
  training: {
    title: "Run beginner-friendly team training",
    summary: "Clear, practical AI training for staff, schools, churches, community teams, and busy groups.",
    examples: "Good when people are curious, overwhelmed, cautious, or unsure how to use AI safely.",
    cta: "Ask MJ about team training"
  }
};

const commandHandlers = {
  start: startDiagnostic,
  home: startDiagnostic,
  help: showHelp,
  services: showServices,
  examples: showExamples,
  about: showAbout,
  contact: showContact,
  clear: clearTerminal
};

boot();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const command = input.value.trim();
  if (!command) return;
  input.value = "";
  runCommand(command);
});

document.querySelectorAll("[data-command]").forEach((button) => {
  button.addEventListener("click", () => runCommand(button.dataset.command));
});

document.addEventListener("click", (event) => {
  const clickedMenu = event.target instanceof Element ? event.target.closest(".version-menu") : null;
  closeVersionMenus(clickedMenu);
});

document.addEventListener("keydown", (event) => {
  const inVersionMenu = event.target instanceof Element && event.target.closest(".version-menu");
  if (inVersionMenu && event.key !== "Escape") return;

  if (event.key === "Escape") {
    if (closeVersionMenus()) return;
    startDiagnostic();
  }
});

function boot() {
  clearOutput();
  appendLine("sys", "AI4ALL terminal online.");
  appendLine("mj", "I will help you find the simplest useful AI starting point. No jargon. No wasted time.");
  appendLine("sys", "Type start or choose an option below.");
  updateChoices([{ id: "start", label: "Start diagnostic" }, { id: "help", label: "Show commands" }, { id: "services", label: "View services" }], runCommand);
  updateDiagnosticCard("Waiting for input", "Use the buttons or type a command.");
}

function clearTerminal() {
  clearOutput();
  appendLine("sys", "Screen cleared.");
  appendLine("sys", "Type start, help, services, examples, about, or contact.");
  updateChoices([{ id: "start", label: "Start diagnostic" }, { id: "help", label: "Show commands" }], runCommand);
  updateDiagnosticCard("Ready", "Waiting for the next command.");
}

function startDiagnostic() {
  diagnostic.audience = null;
  diagnostic.friction = null;
  clearOutput();
  appendLine("sys", "Diagnostic started.");
  appendLine("mj", "First, where should AI4ALL make things easier?");
  updateChoices(audienceChoices, selectAudience);
  updateDiagnosticCard("Step 1 of 2", "Choose the world this needs to fit into.");
}

function selectAudience(id) {
  const choice = audienceChoices.find((item) => item.id === id);
  if (!choice) return;
  diagnostic.audience = id;
  appendLine("you", choice.label, "command");
  appendLine("mj", "Good. What feels most messy, repetitive, or slow right now?");
  updateChoices(frictionChoices, selectFriction);
  updateDiagnosticCard("Step 2 of 2", "Choose the friction point.");
}

function selectFriction(id) {
  const choice = frictionChoices.find((item) => item.id === id);
  if (!choice) return;
  diagnostic.friction = id;
  appendLine("you", choice.label, "command");
  showRecommendation();
}

function showRecommendation() {
  const recommendation = recommendations[getRecommendationKey()];
  appendLine("result", recommendation.title);
  appendLine("mj", recommendation.summary);
  appendLine("use", recommendation.examples);
  appendLine("next", `<a href="mailto:Ai4All.mj@gmail.com?subject=${encodeURIComponent(recommendation.cta)}">${recommendation.cta}</a> or type start to run the diagnostic again.`, "result", true);
  updateChoices([{ id: "contact", label: "Contact MJ" }, { id: "start", label: "Run again" }, { id: "services", label: "See services" }], runCommand);
  updateDiagnosticCard(recommendation.title, recommendation.summary);
}

function getRecommendationKey() {
  if (diagnostic.audience === "team" || diagnostic.audience === "community" || diagnostic.friction === "training") return "training";
  if (diagnostic.friction === "content") return "prompts";
  if (["admin", "emails", "planning", "workflows"].includes(diagnostic.friction)) return "workflow";
  return "clarity";
}

function showHelp() {
  appendLine("sys", "Commands: start, help, services, examples, about, contact, clear, home.");
  appendLine("mj", "You can also click the choices. That is usually faster on mobile.");
  updateChoices([{ id: "start", label: "Start diagnostic" }, { id: "services", label: "Services" }, { id: "contact", label: "Contact" }], runCommand);
  updateDiagnosticCard("Help loaded", "Choose a command or type into the prompt.");
}

function showServices() {
  appendLine("sys", "AI4ALL service paths loaded.");
  appendLine("01", "AI Clarity Session - find the clearest quick wins.");
  appendLine("02", "Custom Prompt Packs - reusable prompts for your real work.");
  appendLine("03", "Workflow Setup - practical systems for repeated tasks.");
  appendLine("04", "Team Training - beginner-friendly AI confidence for groups.");
  updateChoices([{ id: "start", label: "Find my best fit" }, { id: "examples", label: "Show examples" }, { id: "contact", label: "Contact MJ" }], runCommand);
  updateDiagnosticCard("Services loaded", "Run the diagnostic to choose a practical starting point.");
}

function showExamples() {
  appendLine("business", "Turn rough notes into quotes, customer replies, task lists, and follow-up emails.");
  appendLine("life", "Make a messy week clearer with realistic plans, priorities, and routines.");
  appendLine("teams", "Help staff draft resources, simplify communication, and get unstuck.");
  appendLine("community", "Turn event notes into run sheets, volunteer briefs, posts, and updates.");
  updateChoices([{ id: "start", label: "Run diagnostic" }, { id: "services", label: "Services" }], runCommand);
  updateDiagnosticCard("Examples loaded", "These map back to real AI4ALL help paths.");
}

function showAbout() {
  appendLine("mj", "MJ makes confusing things simple and useful.");
  appendLine("mj", "The focus is practical AI for real people, businesses, schools, churches, and community teams.");
  appendLine("sys", "Values: clear over clever, useful over flashy, human first, no jargon.");
  updateChoices([{ id: "start", label: "Start diagnostic" }, { id: "contact", label: "Contact MJ" }], runCommand);
  updateDiagnosticCard("About MJ", "Practical help, plain language, useful systems.");
}

function showContact() {
  appendLine("next", '<a href="mailto:Ai4All.mj@gmail.com?subject=Book%20an%20AI4ALL%20clarity%20call">Email MJ: Ai4All.mj@gmail.com</a>', "result", true);
  appendLine("next", '<a href="tel:+61499977712">Call: 0499 977 712</a>', "result", true);
  appendLine("mj", "A free clarity call is the easiest starting point if you are unsure.");
  updateChoices([{ id: "start", label: "Run diagnostic" }, { id: "services", label: "Services" }], runCommand);
  updateDiagnosticCard("Contact ready", "Email MJ or run the diagnostic first.");
}

function runCommand(rawCommand) {
  const command = rawCommand.toLowerCase().trim();

  const audience = audienceChoices.find((item) => matchesCommand(command, item));
  if (!diagnostic.audience && audience) {
    selectAudience(audience.id);
    return;
  }

  const friction = frictionChoices.find((item) => matchesCommand(command, item));
  if (diagnostic.audience && !diagnostic.friction && friction) {
    selectFriction(friction.id);
    return;
  }

  appendLine("you", command, "command");

  const handler = commandHandlers[command];
  if (handler) {
    handler();
    return;
  }

  appendLine("err", `Command not recognised: ${rawCommand}. Type help or click a choice.`, "error");
}

function matchesCommand(command, item) {
  return command === item.id || item.label.toLowerCase().includes(command);
}

function updateChoices(items, handler) {
  choices.replaceChildren();
  items.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = item.label;
    button.addEventListener("click", () => handler(item.id));
    choices.appendChild(button);
  });
}

function appendLine(label, text, type = "", html = false) {
  const line = document.createElement("p");
  line.className = `terminal-line ${type}`.trim();

  const tag = document.createElement("b");
  tag.textContent = label;
  const message = document.createElement("span");
  if (html) message.innerHTML = text;
  else message.textContent = text;

  line.append(tag, message);
  output.appendChild(line);
  output.scrollTop = output.scrollHeight;
}

function clearOutput() {
  output.replaceChildren();
}

function updateDiagnosticCard(title, detail) {
  diagnosticCard.innerHTML = `
    <span>Current route</span>
    <strong>${title}</strong>
    <small>${detail}</small>
  `;
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
