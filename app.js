document.getElementById("year").textContent = new Date().getFullYear();

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealItems = document.querySelectorAll(".reveal");
    const scrollProgress = document.querySelector(".scroll-progress");
    const helpCardGrid = document.querySelector(".card-grid");
    const helpCards = document.querySelectorAll(".card-grid .card");

    if (reducedMotion || !("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("visible"));
    } else {
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.12 });

      revealItems.forEach((item) => revealObserver.observe(item));
    }

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
