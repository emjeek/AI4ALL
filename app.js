document.getElementById("year").textContent = new Date().getFullYear();

    const scrollProgress = document.querySelector(".scroll-progress");
    const helpCardGrid = document.querySelector(".card-grid");
    const helpCards = document.querySelectorAll(".card-grid .card");

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
