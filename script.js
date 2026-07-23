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
