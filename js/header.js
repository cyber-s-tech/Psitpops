function initHeader() {
  const searchBtn = document.getElementById("searchBtn");
  const searchInput = document.getElementById("searchInput");
  const mobileBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const links = document.querySelectorAll(".nav-link");

  // AUTO ACTIVE NAV
  const currentPath = window.location.pathname;

  links.forEach(link => {
    link.classList.remove("bg-white/20", "text-white");
    link.classList.add("text-white/80");

    const linkPath = link.getAttribute("href");

    if (
      currentPath === linkPath ||
      (currentPath === "/" && linkPath === "/") ||
      (currentPath.includes(linkPath) && linkPath !== "/")
    ) {
      link.classList.add("bg-white/20", "text-white");
      link.classList.remove("text-white/80");
    }
  });

  // SEARCH
  if (searchBtn && searchInput) {
    let open = false;

    searchBtn.onclick = () => {
      open = !open;

      if (open) {
        searchInput.classList.remove("w-0", "opacity-0");
        searchInput.classList.add("w-56", "opacity-100", "ml-2");
        searchInput.focus();
      } else {
        searchInput.classList.add("w-0", "opacity-0");
        searchInput.classList.remove("w-56", "opacity-100", "ml-2");
      }
    };
  }

  // MOBILE MENU
  if (mobileBtn && mobileMenu) {
    mobileBtn.onclick = () => {
      mobileMenu.classList.toggle("hidden");
    };
  }
}

