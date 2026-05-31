document.getElementById("year").textContent = new Date().getFullYear();

    const scrollProgress = document.querySelector(".scroll-progress");
    const helpCardGrid = document.querySelector(".card-grid");
    const helpCards = document.querySelectorAll(".card-grid .card");
    const phaseTransition = document.querySelector(".phase-transition");
    const phaseMessage = document.querySelector(".phase-message");
    const portalLinks = document.querySelectorAll(".portal-link");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const phoneLayout = window.matchMedia("(max-width: 720px)");

    const updateScrollProgress = () => {
      const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollRange > 0 ? window.scrollY / scrollRange : 0;
      scrollProgress.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
    };

    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });

    helpCards.forEach((card) => {
      const expandButton = card.querySelector(".card-expand");

      expandButton.addEventListener("click", () => {
        const willExpand = !card.classList.contains("active");

        helpCards.forEach((item) => {
          item.classList.remove("active");
          item.querySelector(".card-expand").setAttribute("aria-expanded", "false");
        });

        card.classList.toggle("active", willExpand);
        expandButton.setAttribute("aria-expanded", String(willExpand));
        helpCardGrid.classList.toggle("has-active", willExpand);
      });
    });

    const setPhaseMessage = (message) => {
      phaseMessage.replaceChildren();

      [...message].forEach((letter, index) => {
        const span = document.createElement("span");
        span.className = "phase-letter";
        span.style.setProperty("--letter-index", index);
        span.textContent = letter === " " ? "\u00a0" : letter;
        phaseMessage.append(span);
      });
    };

    portalLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        const target = document.querySelector(link.getAttribute("href"));
        if (!target || reducedMotion) return;

        event.preventDefault();
        setPhaseMessage(phoneLayout.matches ? "ROUTE LOCKED" : (link.dataset.transition || "Materialising"));
        phaseTransition.classList.add("active");

        window.setTimeout(() => {
          target.scrollIntoView({ behavior: "auto", block: "start" });
          target.classList.remove("materialising");
          void target.offsetWidth;
          target.classList.add("materialising");
        }, 1240);

        window.setTimeout(() => {
          phaseTransition.classList.remove("active");
        }, 2400);

        window.setTimeout(() => {
          target.classList.remove("materialising");
          history.replaceState(null, "", link.getAttribute("href"));
        }, 3640);
      });
    });
