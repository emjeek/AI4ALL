import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const mobile = window.matchMedia("(max-width: 760px)").matches;
const spatialScale = mobile ? 1.1 : 1.18;
const homeCameraPosition = new THREE.Vector3(mobile ? 0 : 1.6, mobile ? 1.1 : 0.9, mobile ? 15.8 : 13.7);
const homeCameraTarget = new THREE.Vector3(0, 0.5, -1.45);

const nodes = [
  {
    id: "help", parent: null, type: "Where AI helps", index: "01 / START HERE",
    title: "Where AI can help", short: "Real-world uses",
    summary: "Start with the work, life admin, communication, or planning that already takes too much time.",
    example: "Choose a connected node to see a practical use for business, life, schools, churches, or community teams.",
    position: [-3.7, 0.65, 0.2], color: 0xd4aa58, size: 0.54
  },
  {
    id: "business", parent: "help", type: "Where AI helps", index: "01 / BUSINESS",
    title: "Small Business AI", short: "Business",
    summary: "Emails, admin, marketing, customer messages, quotes, planning, documents, and repeatable workflows.",
    example: "Turn a rough voice note into a polished quote, customer reply, task list, and follow-up email in minutes.",
    position: [-6.1, 2.7, -0.9], color: 0xf0cf7a, size: 0.32
  },
  {
    id: "life", parent: "help", type: "Where AI helps", index: "02 / LIFE",
    title: "Everyday Life AI", short: "Everyday life",
    summary: "Planning, budgeting, learning, family organisation, routines, problem solving, and making life less messy.",
    example: "Build a realistic weekly plan from your commitments, budget, priorities, and everything currently cluttering your head.",
    position: [-6.6, -1.2, 0.7], color: 0xf0cf7a, size: 0.3
  },
  {
    id: "teams", parent: "help", type: "Where AI helps", index: "03 / TEAMS",
    title: "Schools & Staff Teams", short: "Schools & teams",
    summary: "Beginner-friendly AI support for staff who are busy, curious, overwhelmed, or unsure where to start.",
    example: "Draft resources, simplify communication, and help staff get unstuck without adding more admin.",
    position: [-3.5, -2.8, -1.2], color: 0xf0cf7a, size: 0.3
  },
  {
    id: "community", parent: "help", type: "Where AI helps", index: "04 / COMMUNITY",
    title: "Churches & Community", short: "Community",
    summary: "Event planning, communication, volunteer support, resource creation, youth material, and hours saved on admin.",
    example: "Turn event notes into volunteer briefs, social posts, run sheets, and clear community updates in one workflow.",
    position: [-1.25, 2.55, -1.6], color: 0xf0cf7a, size: 0.3
  },
  {
    id: "services", parent: null, type: "Work with MJ", index: "02 / SERVICES",
    title: "Ways to work together", short: "Services",
    summary: "From one clear conversation to a complete workflow, every service is built to make AI easier tomorrow.",
    example: "Explore clarity sessions, custom prompts, workflow setup, and practical team training.",
    position: [3.7, 0.55, -0.2], color: 0xa20f1a, size: 0.54
  },
  {
    id: "clarity", parent: "services", type: "Work with MJ", index: "01 / CLARITY",
    title: "AI Clarity Session", short: "Clarity session",
    summary: "A simple one-on-one session to find where AI can help your life, work, team, or business immediately.",
    example: "Talk through what feels repetitive, messy, slow, or harder than it should be, then leave with a clear next step.",
    position: [5.75, 2.65, 0.6], color: 0xd82b38, size: 0.32,
    action: ["Book a clarity call", "mailto:Ai4All.mj@gmail.com?subject=AI%20clarity%20call"]
  },
  {
    id: "prompts", parent: "services", type: "Work with MJ", index: "02 / TOOLKIT",
    title: "Custom Prompt Packs", short: "Prompt packs",
    summary: "Reusable prompts built around your actual work, in language that makes sense.",
    example: "Get a practical toolkit for the tasks you repeat, without generic examples or prompt-engineering jargon.",
    position: [6.4, -1.1, -0.9], color: 0xd82b38, size: 0.3
  },
  {
    id: "workflows", parent: "services", type: "Work with MJ", index: "03 / SYSTEMS",
    title: "Workflow Setup", short: "Workflows",
    summary: "Practical AI systems for repeated tasks like email, documents, content, planning, admin, and communication.",
    example: "Connect the steps you already take into one simple, repeatable process that saves time every week.",
    position: [3.35, -2.7, 1.1], color: 0xd82b38, size: 0.3
  },
  {
    id: "training", parent: "services", type: "Work with MJ", index: "04 / CONFIDENCE",
    title: "Team Training", short: "Team training",
    summary: "Clear, beginner-friendly workshops that help people use AI practically, safely, and confidently.",
    example: "Give a whole team a useful starting point with examples they can put to work immediately.",
    position: [1.4, 2.85, 1.25], color: 0xd82b38, size: 0.3
  },
  {
    id: "approach", parent: null, type: "The AI4ALL method", index: "03 / APPROACH",
    title: "Simple. Useful. Yours.", short: "How it works",
    summary: "You do not need more tools. You need a clear way to use the right ones for what already takes your time.",
    example: "Find the wasted time. Build around your real work. Leave with something you can keep using.",
    position: [0, 0.15, -3.5], color: 0xe7cf96, size: 0.48
  },
  {
    id: "find", parent: "approach", type: "The AI4ALL method", index: "01 / FIND",
    title: "Find the friction", short: "Find friction",
    summary: "Look for the tasks that keep slowing you down, repeating themselves, or cluttering your head.",
    example: "We begin with your day, not with a giant list of AI tools.",
    position: [-2.15, 1.75, -5.1], color: 0xffe5a1, size: 0.27
  },
  {
    id: "build", parent: "approach", type: "The AI4ALL method", index: "02 / BUILD",
    title: "Build around you", short: "Build simply",
    summary: "Create prompts, templates, and workflows shaped around the work you actually do.",
    example: "No bloated system. Just practical help for the tasks already in front of you.",
    position: [2.1, 1.55, -5.25], color: 0xffe5a1, size: 0.27
  },
  {
    id: "use", parent: "approach", type: "The AI4ALL method", index: "03 / USE",
    title: "Use it straight away", short: "Put it to work",
    summary: "Leave knowing what to do next, with tools and systems you can keep using.",
    example: "The result should make tomorrow easier, not create another complicated project.",
    position: [0.2, -2.2, -5.15], color: 0xffe5a1, size: 0.27
  },
  {
    id: "about", parent: null, type: "About MJ Kemp", index: "04 / HUMAN FIRST",
    title: "Clear over clever", short: "About MJ",
    summary: "MJ takes complex things, breaks them down, and turns them into something normal people can use with confidence.",
    example: "AI should not belong only to technical experts. The focus is practical, patient, human-first help.",
    position: [0, 3.8, 0.25], color: 0xc27b45, size: 0.46,
    action: ["Talk to MJ", "mailto:Ai4All.mj@gmail.com?subject=Let%27s%20talk%20about%20AI"]
  },
  {
    id: "contact", parent: "about", type: "Start a conversation", index: "MJ KEMP / AI4ALL",
    title: "Ready to stop guessing?", short: "Contact MJ",
    summary: "Find the simplest way AI can save you time, reduce the clutter, and make your work easier.",
    example: "No jargon. No pressure. Just a practical conversation about what would genuinely help.",
    position: [0.1, 5.75, -0.65], color: 0xf0cf7a, size: 0.31,
    action: ["Book a clarity call", "mailto:Ai4All.mj@gmail.com?subject=Book%20an%20AI4ALL%20clarity%20call"]
  }
];

const nodeMap = new Map(nodes.map((node) => [node.id, node]));
const meshMap = new Map();
const clickTargets = [];
let activeNode = null;
let hoveredNode = null;
let cameraTween = null;
let pointerDown = null;
let hoveredResetTarget = false;

const sceneRoot = document.getElementById("scene");
const detailPanel = document.getElementById("detail-panel");
const intro = document.getElementById("intro");
const searchLayer = document.getElementById("search-layer");
const searchInput = document.getElementById("network-search");
const resultsElement = document.getElementById("search-results");
const resultCount = document.getElementById("result-count");
const loadingScreen = document.getElementById("loading-screen");

document.getElementById("year").textContent = new Date().getFullYear();

let renderer;
let scene;
let camera;
let controls;
let composer;
let raycaster;
let pointer;
let networkGroup;
let labelsLayer;
let stars;

try {
  initScene();
  bindInterface();
  animate();
} catch (error) {
  console.error(error);
  loadingScreen.hidden = true;
  document.getElementById("fallback-message").hidden = false;
}

function initScene() {
  renderer = new THREE.WebGLRenderer({ antialias: !mobile, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.5 : 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.94;
  sceneRoot.appendChild(renderer.domElement);

  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x050403, mobile ? 0.045 : 0.038);

  camera = new THREE.PerspectiveCamera(46, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.copy(homeCameraPosition);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.055;
  controls.minDistance = 4.5;
  controls.maxDistance = 22;
  controls.enablePan = false;
  controls.autoRotate = !reducedMotion;
  controls.autoRotateSpeed = 0.18;
  controls.target.copy(homeCameraTarget);

  scene.add(new THREE.AmbientLight(0x72552f, 0.5));
  const warmLight = new THREE.PointLight(0xffd98a, 42, 24, 1.8);
  warmLight.position.set(-4, 5, 5);
  scene.add(warmLight);
  const redLight = new THREE.PointLight(0x9d0712, 35, 22, 1.8);
  redLight.position.set(5, -2, 2);
  scene.add(redLight);

  networkGroup = new THREE.Group();
  networkGroup.rotation.x = -0.06;
  scene.add(networkGroup);

  createCore();
  createNetwork();
  createStars();

  raycaster = new THREE.Raycaster();
  pointer = new THREE.Vector2(3, 3);

  composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    mobile ? 0.42 : 0.82,
    0.7,
    0.84
  );
  composer.addPass(bloom);

  window.addEventListener("resize", onResize);
  window.setTimeout(() => loadingScreen.classList.add("loaded"), 650);
  window.setTimeout(() => loadingScreen.remove(), 1450);
}

function createCore() {
  const core = new THREE.Group();
  const shell = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.15, 3),
    new THREE.MeshStandardMaterial({
      color: 0x17120c,
      emissive: 0x8b5b1d,
      emissiveIntensity: 0.62,
      metalness: 0.8,
      roughness: 0.22,
      wireframe: true,
      transparent: true,
      opacity: 0.74
    })
  );
  const inner = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.55, 2),
    new THREE.MeshBasicMaterial({ color: 0xffd982, transparent: true, opacity: 0.72 })
  );
  const ringMaterial = new THREE.MeshBasicMaterial({
    color: 0xb68a45,
    transparent: true,
    opacity: 0.34,
    side: THREE.DoubleSide
  });
  const ringA = new THREE.Mesh(new THREE.TorusGeometry(1.65, 0.012, 8, 120), ringMaterial);
  const ringB = ringA.clone();
  ringA.rotation.x = 1.15;
  ringB.rotation.set(0.4, 1.2, 0.2);
  core.add(shell, inner, ringA, ringB);
  core.position.set(0, 0.35, 0);
  core.userData.animate = (time) => {
    shell.rotation.set(time * 0.08, time * 0.11, time * 0.05);
    inner.scale.setScalar(0.94 + Math.sin(time * 1.7) * 0.06);
    ringA.rotation.z = time * 0.08;
    ringB.rotation.z = -time * 0.06;
  };
  shell.userData.resetView = true;
  inner.userData.resetView = true;
  clickTargets.push(shell, inner);
  networkGroup.add(core);
}

function createNetwork() {
  const labelContainer = document.createElement("div");
  labelContainer.className = "node-labels";
  document.body.appendChild(labelContainer);
  labelsLayer = labelContainer;

  nodes.forEach((data, index) => {
    const group = new THREE.Group();
    group.position.copy(getScenePosition(data));
    group.userData.node = data;
    group.userData.phase = index * 0.71;

    const glow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: makeGlowTexture(data.color),
      color: data.color,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    }));
    glow.scale.setScalar(data.size * 4.2);

    const sphere = new THREE.Mesh(
      new THREE.IcosahedronGeometry(data.size, data.size > 0.4 ? 3 : 2),
      new THREE.MeshStandardMaterial({
        color: data.color,
        emissive: data.color,
        emissiveIntensity: data.parent ? 0.75 : 1.05,
        metalness: 0.25,
        roughness: 0.35
      })
    );
    sphere.userData.node = data;
    clickTargets.push(sphere);

    const orbit = new THREE.Mesh(
      new THREE.TorusGeometry(data.size * 1.7, 0.008, 5, 64),
      new THREE.MeshBasicMaterial({ color: data.color, transparent: true, opacity: 0.36 })
    );
    orbit.rotation.set(Math.PI * 0.42, index * 0.6, 0);
    group.add(glow, sphere, orbit);
    networkGroup.add(group);
    meshMap.set(data.id, group);

    const label = document.createElement("button");
    label.className = `node-label ${data.parent ? "node-label-small" : ""}`;
    label.type = "button";
    label.dataset.node = data.id;
    group.userData.labelOffset = data.id === "approach" ? { x: 0, y: 58 } : { x: 0, y: 0 };
    label.innerHTML = `<i style="--label-color:#${data.color.toString(16).padStart(6, "0")}"></i><span>${data.short}</span>`;
    label.addEventListener("click", () => selectNode(data));
    labelContainer.appendChild(label);
    group.userData.label = label;
  });

  nodes.filter((node) => node.parent).forEach((data, index) => {
    const parent = nodeMap.get(data.parent);
    createConnection(parent.position, data.position, data.color, index);
  });

  [["help", "about"], ["services", "about"], ["help", "approach"], ["services", "approach"]].forEach(([a, b], index) => {
    createConnection(nodeMap.get(a).position, nodeMap.get(b).position, 0x806b45, index + 10, true);
  });
}

function createConnection(startArray, endArray, color, index, subtle = false) {
  const start = new THREE.Vector3(...startArray).multiplyScalar(spatialScale);
  const end = new THREE.Vector3(...endArray).multiplyScalar(spatialScale);
  const mid = start.clone().lerp(end, 0.5);
  mid.z += 0.5 + (index % 3) * 0.16;
  const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
  const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(42));
  const material = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity: subtle ? 0.13 : 0.3,
    blending: THREE.AdditiveBlending
  });
  const line = new THREE.Line(geometry, material);
  line.userData.pulse = index * 0.6;
  networkGroup.add(line);

  if (!subtle) {
    const pulse = new THREE.Mesh(
      new THREE.SphereGeometry(0.035, 8, 8),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9 })
    );
    pulse.userData.curve = curve;
    pulse.userData.offset = index * 0.17;
    networkGroup.add(pulse);
  }
}

function createStars() {
  const count = mobile ? 850 : 1700;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const gold = new THREE.Color(0xd4aa58);
  const ember = new THREE.Color(0x6c1720);
  for (let i = 0; i < count; i += 1) {
    const radius = 12 + Math.random() * 35;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi) - 5;
    const color = Math.random() > 0.88 ? ember : gold;
    colors.set([color.r, color.g, color.b], i * 3);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  stars = new THREE.Points(
    geometry,
    new THREE.PointsMaterial({
      size: mobile ? 0.025 : 0.034,
      transparent: true,
      opacity: 0.62,
      vertexColors: true,
      sizeAttenuation: true
    })
  );
  scene.add(stars);
}

function makeGlowTexture(color) {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext("2d");
  const gradient = context.createRadialGradient(64, 64, 0, 64, 64, 64);
  const hex = `#${color.toString(16).padStart(6, "0")}`;
  gradient.addColorStop(0, hex);
  gradient.addColorStop(0.12, `${hex}dd`);
  gradient.addColorStop(0.35, `${hex}66`);
  gradient.addColorStop(1, `${hex}00`);
  context.fillStyle = gradient;
  context.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(canvas);
}

function bindInterface() {
  renderer.domElement.addEventListener("pointermove", onPointerMove);
  renderer.domElement.addEventListener("pointerdown", (event) => {
    pointerDown = { x: event.clientX, y: event.clientY };
    controls.autoRotate = false;
  });
  renderer.domElement.addEventListener("pointerup", (event) => {
    if (!pointerDown) return;
    const moved = Math.hypot(event.clientX - pointerDown.x, event.clientY - pointerDown.y);
    pointerDown = null;
    if (moved < 6) pickNode();
  });

  document.querySelectorAll("[data-focus]").forEach((button) => {
    button.addEventListener("click", () => selectNode(nodeMap.get(button.dataset.focus)));
  });
  document.querySelectorAll("[data-action='reset']").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      resetView();
    });
  });

  document.getElementById("panel-close").addEventListener("click", resetView);
  document.getElementById("next-node").addEventListener("click", () => {
    if (!activeNode) return;
    const index = nodes.findIndex((node) => node.id === activeNode.id);
    selectNode(nodes[(index + 1) % nodes.length]);
  });
  document.getElementById("search-open").addEventListener("click", openSearch);
  document.querySelectorAll("[data-action='close-search']").forEach((button) => button.addEventListener("click", closeSearch));
  searchInput.addEventListener("input", renderSearchResults);

  document.addEventListener("keydown", (event) => {
    if (event.key === "/" && document.activeElement !== searchInput) {
      event.preventDefault();
      openSearch();
    }
    if (event.key === "Escape") {
      if (searchLayer.classList.contains("open")) closeSearch();
      else if (detailPanel.classList.contains("open")) resetView();
    }
  });
}

function onPointerMove(event) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const hit = raycaster.intersectObjects(clickTargets, false)[0];
  hoveredResetTarget = Boolean(hit?.object.userData.resetView);
  const nextHovered = hit?.object.userData.node || null;
  if (nextHovered?.id === hoveredNode?.id) {
    renderer.domElement.style.cursor = hoveredNode || hoveredResetTarget ? "pointer" : "grab";
    return;
  }

  if (hoveredNode) setNodeState(hoveredNode.id, false, activeNode?.id === hoveredNode.id);
  hoveredNode = nextHovered;
  if (hoveredNode) setNodeState(hoveredNode.id, true, activeNode?.id === hoveredNode.id);
  renderer.domElement.style.cursor = hoveredNode || hoveredResetTarget ? "pointer" : "grab";
}

function pickNode() {
  raycaster.setFromCamera(pointer, camera);
  const hit = raycaster.intersectObjects(clickTargets, false)[0];
  if (hit?.object.userData.resetView) {
    resetView();
    return;
  }
  if (hit?.object.userData.node) selectNode(hit.object.userData.node);
}

function selectNode(data) {
  if (!data) return;
  if (activeNode?.id === data.id) {
    resetView();
    return;
  }
  activeNode = data;
  controls.autoRotate = false;
  intro.classList.add("minimised");
  document.getElementById("scene-hint").classList.add("hidden");

  meshMap.forEach((group, id) => setNodeState(id, id === data.id, id === data.id));
  document.querySelectorAll(".node-label").forEach((label) => label.classList.toggle("active", label.dataset.node === data.id));

  document.getElementById("panel-index").textContent = data.index;
  document.getElementById("panel-type").textContent = data.type;
  document.getElementById("panel-title").textContent = data.title;
  document.getElementById("panel-summary").textContent = data.summary;
  document.getElementById("panel-example").textContent = data.example;
  document.getElementById("panel-position").textContent = `NODE ${String(nodes.indexOf(data) + 1).padStart(2, "0")} · ACTIVE`;

  const links = document.getElementById("panel-links");
  links.replaceChildren();
  if (data.action) {
    const anchor = document.createElement("a");
    anchor.href = data.action[1];
    anchor.innerHTML = `${data.action[0]} <span>↗</span>`;
    links.appendChild(anchor);
  } else {
    const anchor = document.createElement("a");
    anchor.href = "mailto:Ai4All.mj@gmail.com?subject=Could%20AI4ALL%20help%20with%20this%3F";
    anchor.innerHTML = "Ask MJ about this <span>↗</span>";
    links.appendChild(anchor);
  }

  detailPanel.classList.add("open");
  detailPanel.setAttribute("aria-hidden", "false");
  detailPanel.removeAttribute("inert");

  const target = getScenePosition(data);
  const direction = target.clone().normalize();
  if (direction.lengthSq() < 0.01) direction.set(0, 0, 1);
  const offset = mobile
    ? new THREE.Vector3(0, 0.4, 8.4)
    : new THREE.Vector3(3.7, 1.1, 5.4);
  const destination = target.clone().add(offset);
  cameraTween = {
    start: performance.now(),
    duration: reducedMotion ? 1 : 1150,
    fromPosition: camera.position.clone(),
    toPosition: destination,
    fromTarget: controls.target.clone(),
    toTarget: target
  };
}

function setNodeState(id, highlighted, selected = false) {
  const group = meshMap.get(id);
  if (!group) return;
  const sphere = group.children[1];
  const glow = group.children[0];
  const scale = selected ? 1.42 : highlighted ? 1.24 : 1;
  sphere.scale.setScalar(scale);
  sphere.material.emissiveIntensity = selected ? 1.45 : highlighted ? 1.2 : (group.userData.node.parent ? 0.75 : 1.05);
  glow.material.opacity = selected ? 0.95 : highlighted ? 0.78 : 0.55;
}

function closePanel() {
  if (!detailPanel.classList.contains("open")) return;
  detailPanel.classList.remove("open");
  detailPanel.setAttribute("aria-hidden", "true");
  detailPanel.setAttribute("inert", "");
  if (activeNode) setNodeState(activeNode.id, false, false);
  activeNode = null;
}

function resetView() {
  closePanel();
  intro.classList.remove("minimised");
  document.getElementById("scene-hint").classList.remove("hidden");
  controls.autoRotate = !reducedMotion;
  cameraTween = {
    start: performance.now(),
    duration: reducedMotion ? 1 : 1100,
    fromPosition: camera.position.clone(),
    toPosition: homeCameraPosition.clone(),
    fromTarget: controls.target.clone(),
    toTarget: homeCameraTarget.clone()
  };
}

function getScenePosition(data) {
  return new THREE.Vector3(...data.position).multiplyScalar(spatialScale);
}

function openSearch() {
  searchLayer.classList.add("open");
  searchLayer.setAttribute("aria-hidden", "false");
  searchInput.value = "";
  renderSearchResults();
  window.setTimeout(() => searchInput.focus(), 80);
}

function closeSearch() {
  searchLayer.classList.remove("open");
  searchLayer.setAttribute("aria-hidden", "true");
  document.getElementById("search-open").focus();
}

function renderSearchResults() {
  const query = searchInput.value.trim().toLowerCase();
  const matches = query
    ? nodes.filter((node) => `${node.title} ${node.short} ${node.summary} ${node.example} ${node.type}`.toLowerCase().includes(query))
    : nodes.filter((node) => !node.parent);

  resultCount.textContent = query ? `${matches.length} connected ${matches.length === 1 ? "node" : "nodes"} found` : "Suggested entry points";
  resultsElement.replaceChildren();

  if (!matches.length) {
    resultsElement.innerHTML = `<p class="no-results">No exact node found. Try “business”, “planning”, “team”, or “admin”.</p>`;
    return;
  }

  matches.slice(0, 8).forEach((data) => {
    const button = document.createElement("button");
    button.type = "button";
    button.innerHTML = `
      <span class="result-index">${data.index.split("/")[0]}</span>
      <span><strong>${highlightMatch(data.title, query)}</strong><small>${data.type} · ${data.summary}</small></span>
      <b>→</b>
    `;
    button.addEventListener("click", () => {
      closeSearch();
      selectNode(data);
    });
    resultsElement.appendChild(button);
  });
}

function highlightMatch(text, query) {
  if (!query) return text;
  const index = text.toLowerCase().indexOf(query);
  if (index < 0) return text;
  return `${text.slice(0, index)}<mark>${text.slice(index, index + query.length)}</mark>${text.slice(index + query.length)}`;
}

function updateLabels() {
  nodes.forEach((data) => {
    const group = meshMap.get(data.id);
    const label = group.userData.label;
    const position = group.getWorldPosition(new THREE.Vector3()).project(camera);
    const visible = position.z < 1 && position.z > -1;
    const offset = group.userData.labelOffset;
    const x = (position.x * 0.5 + 0.5) * window.innerWidth + offset.x;
    const y = (-position.y * 0.5 + 0.5) * window.innerHeight + offset.y;
    label.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
    label.style.opacity = visible ? "1" : "0";
    label.style.pointerEvents = visible ? "auto" : "none";
  });
}

function animate(time = 0) {
  requestAnimationFrame(animate);
  const seconds = time * 0.001;

  if (cameraTween) {
    const elapsed = performance.now() - cameraTween.start;
    const progress = Math.min(1, elapsed / cameraTween.duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    camera.position.lerpVectors(cameraTween.fromPosition, cameraTween.toPosition, eased);
    controls.target.lerpVectors(cameraTween.fromTarget, cameraTween.toTarget, eased);
    if (progress >= 1) cameraTween = null;
  }

  controls.update();
  networkGroup.children.forEach((object) => {
    if (object.userData.animate) object.userData.animate(seconds);
    if (object.userData.curve) {
      const progress = (seconds * 0.12 + object.userData.offset) % 1;
      object.position.copy(object.userData.curve.getPoint(progress));
    }
    if (object.userData.node) {
      const baseY = object.userData.node.position[1] * spatialScale;
      object.position.y = baseY + Math.sin(seconds * 0.65 + object.userData.phase) * 0.06;
      object.rotation.y = seconds * 0.08 + object.userData.phase;
    }
  });

  if (stars && !reducedMotion) stars.rotation.y = seconds * 0.003;
  updateLabels();
  document.getElementById("coordinate-readout").textContent =
    `X ${camera.position.x.toFixed(1)} / Y ${camera.position.y.toFixed(1)} / Z ${camera.position.z.toFixed(1)}`;
  composer.render();
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 760 ? 1.5 : 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
}
