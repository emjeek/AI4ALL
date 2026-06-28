const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

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

    const versionMenu = document.createElement("details");
    versionMenu.className = "version-menu";
    versionMenu.innerHTML = `
      <summary class="version-menu-toggle" aria-label="Open website version menu">
        <span class="hamburger-lines" aria-hidden="true"><i></i><i></i><i></i></span>
        <span>Versions</span>
      </summary>
      <div class="version-menu-panel">
        <a href="/" aria-current="page">
          <strong>Simple page</strong>
          <small>Clear classic scroll</small>
        </a>
        <a href="/immersive/">
          <strong>3D version</strong>
          <small>Interactive WebGL network</small>
        </a>
        <a href="/matrix/">
          <strong>Code version</strong>
          <small>Matrix journey mode</small>
        </a>
        <a href="/terminal/">
          <strong>Terminal version</strong>
          <small>Guided command diagnostic</small>
        </a>
      </div>
    `;
    document.querySelector(".nav-links")?.append(versionMenu);

    const closeVersionMenus = (except = null) => {
      document.querySelectorAll(".version-menu[open]").forEach((menu) => {
        if (menu !== except) menu.removeAttribute("open");
      });
    };

    document.addEventListener("click", (event) => {
      const clickedMenu = event.target instanceof Element ? event.target.closest(".version-menu") : null;
      closeVersionMenus(clickedMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeVersionMenus();
    });
