// Mobile navigation toggle
(function () {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector("#primary-menu");
  if (!toggle || !menu) return;

  const setOpen = (open) => {
    menu.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };

  toggle.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  // Close the menu after choosing a destination
  menu.addEventListener("click", (e) => {
    if (e.target.closest(".nav-link")) setOpen(false);
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });

  // Reset state when resizing back up to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) setOpen(false);
  });
})();

// Sliding photo show (About Us)
(function () {
  const root = document.querySelector("[data-slideshow]");
  if (!root) return;

  const track = root.querySelector(".slideshow__track");
  const slides = Array.from(track.children);
  const dotsWrap = root.querySelector(".slideshow__dots");
  const prevBtn = root.querySelector(".slideshow__btn--prev");
  const nextBtn = root.querySelector(".slideshow__btn--next");
  if (slides.length === 0) return;

  let index = 0;
  let timer = null;
  const INTERVAL = 4500;

  // Build a dot for each slide
  const dots = slides.map((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "slideshow__dot";
    dot.setAttribute("aria-label", "Go to photo " + (i + 1));
    dot.addEventListener("click", () => {
      goTo(i);
      restart();
    });
    dotsWrap.appendChild(dot);
    return dot;
  });

  const update = () => {
    track.style.transform = "translateX(-" + index * 100 + "%)";
    dots.forEach((d, i) => d.classList.toggle("is-active", i === index));
  };

  const goTo = (i) => {
    index = (i + slides.length) % slides.length;
    update();
  };
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  const start = () => {
    timer = window.setInterval(next, INTERVAL);
  };
  const stop = () => {
    window.clearInterval(timer);
    timer = null;
  };
  const restart = () => {
    stop();
    start();
  };

  nextBtn.addEventListener("click", () => {
    next();
    restart();
  });
  prevBtn.addEventListener("click", () => {
    prev();
    restart();
  });

  // Pause while the visitor is looking / hovering
  root.addEventListener("mouseenter", stop);
  root.addEventListener("mouseleave", start);

  update();
  start();
})();

