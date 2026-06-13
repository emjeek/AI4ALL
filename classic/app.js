const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

    const freeCallHref = "mailto:Ai4All.mj@gmail.com?subject=Free%2015-minute%20AI%20clarity%20call";
    const heroCopy = document.querySelector(".hero-copy");
    if (heroCopy) {
      heroCopy.innerHTML = "I help you turn <strong>messy thoughts, notes, emails, meetings, and admin into clear finished work — faster.</strong> Practical AI for your life, business, team, school, church, or organisation.";
    }

    document.querySelectorAll('a[href^="mailto:Ai4All.mj@gmail.com"][href*="clarity"]').forEach((link) => {
      link.href = freeCallHref;
      if (link.classList.contains("button-gold")) {
        link.innerHTML = 'Book a free 15-minute AI clarity call <span aria-hidden="true">&rarr;</span>';
      }
    });

    const serviceOffers = [
      ["Free starting point", "A free 15-minute conversation to identify where AI could help and what to do next."],
      ["Custom quote", "A focused toolkit shaped around the work and prompts you actually need."],
      ["Priced to scope", "A practical system designed around the size and complexity of your workflow."],
      ["Custom quote", "Beginner-friendly training shaped around your team, examples, and goals."]
    ];

    document.querySelectorAll(".services-grid .service").forEach((service, index) => {
      const copy = service.querySelector("p");
      const offer = serviceOffers[index];
      if (!copy || !offer) return;
      if (index === 0) service.querySelector("h3").textContent = "Free AI Clarity Call";
      copy.textContent = offer[1];
      const badge = document.createElement("span");
      badge.className = "service-offer";
      badge.textContent = offer[0];
      service.querySelector(".service-top")?.append(badge);
    });

    const contactRole = document.querySelector(".contact-role");
    if (contactRole) contactRole.textContent = "Practical AI guide · AI4ALL";

    const scrollProgress = document.querySelector(".scroll-progress");
    const helpCardGrid = document.querySelector(".card-grid");
    const helpCards = document.querySelectorAll(".card-grid .card");
    const phaseTransition = document.querySelector(".phase-transition");
    const phaseMessage = document.querySelector(".phase-message");
    const portalLinks = document.querySelectorAll(".portal-link");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const phoneLayout = window.matchMedia("(max-width: 720px)");

    const updateScrollProgress = () => {
      if (!scrollProgress) return;

      const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollRange > 0 ? window.scrollY / scrollRange : 0;
      scrollProgress.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
    };

    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });

    helpCards.forEach((card) => {
      const expandButton = card.querySelector(".card-expand");
      if (!expandButton) return;

      expandButton.addEventListener("click", () => {
        const willExpand = !card.classList.contains("active");

        helpCards.forEach((item) => {
          item.classList.remove("active");
          item.querySelector(".card-expand")?.setAttribute("aria-expanded", "false");
        });

        card.classList.toggle("active", willExpand);
        expandButton.setAttribute("aria-expanded", String(willExpand));
        helpCardGrid?.classList.toggle("has-active", willExpand);
      });
    });

    const setPhaseMessage = (message) => {
      if (!phaseMessage) return;

      phaseMessage.replaceChildren();

      [...message].forEach((letter, index) => {
        const span = document.createElement("span");
        span.className = "phase-letter";
        span.style.setProperty("--letter-index", index);
        span.textContent = letter === " " ? "\u00a0" : letter;
        phaseMessage.append(span);
      });
    };

    const lockViewport = () => {
      const scrollY = window.scrollY;
      document.body.dataset.lockedScrollY = scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.classList.add("phase-locked");
    };

    const releaseViewport = (target) => {
      const targetTop = target.getBoundingClientRect().top + Number(document.body.dataset.lockedScrollY || 0);
      document.body.classList.remove("phase-locked");
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      delete document.body.dataset.lockedScrollY;
      window.scrollTo({ top: targetTop, behavior: "auto" });
    };

    portalLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        const href = link.getAttribute("href");
        const target = href?.startsWith("#") ? document.querySelector(href) : null;
        if (!target || !phaseTransition || reducedMotion) return;

        event.preventDefault();
        if (document.body.classList.contains("phase-locked")) return;

        setPhaseMessage(phoneLayout.matches ? "ROUTE LOCKED" : (link.dataset.transition || "Materialising"));
        lockViewport();
        phaseTransition.classList.add("active");

        window.setTimeout(() => {
          phaseTransition.classList.remove("active");
          releaseViewport(target);
          target.classList.remove("materialising");
          void target.offsetWidth;
          target.classList.add("materialising");
        }, 2400);

        window.setTimeout(() => {
          target.classList.remove("materialising");
          history.replaceState(null, "", href);
        }, 3640);
      });
    });

    const immersiveSwitch = document.createElement("a");
    immersiveSwitch.href = "/";
    immersiveSwitch.className = "immersive-switch";
    immersiveSwitch.setAttribute("aria-label", "Switch to the immersive 3D experience");
    immersiveSwitch.innerHTML = "<span>✦</span> Immersive view";
    document.body.append(immersiveSwitch);
