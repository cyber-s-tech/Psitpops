function initHeader() {
  const headerSearchBtn = document.getElementById("headerSearchBtn");
  const searchInput = document.getElementById("searchInput");
  const mobileBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const links = document.querySelectorAll(".nav-link");
   const overlay = document.getElementById("menu-overlay");
  const closeBtn = document.getElementById("close-menu");

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

 
  if (headerSearchBtn && searchInput) {
  let open = false;

  headerSearchBtn.onclick = () => {

    //  DO NOTHING on mobile
    if (window.innerWidth < 768) return;

    open = !open;

    if (open) {
      searchInput.classList.remove("md:w-0", "md:opacity-0");
      searchInput.classList.add("md:w-46", "md:opacity-100", "ml-2");
      searchInput.focus();
    } else {
      searchInput.classList.add("md:w-0", "md:opacity-0");
      searchInput.classList.remove("md:w-46", "md:opacity-100", "ml-2");
    }
  };
}

  // MOBILE MENU
  if (mobileBtn && mobileMenu) {
    mobileBtn.onclick = () => {
      mobileMenu.classList.toggle("hidden");
    };
  }
  function toggleMenu() {
    mobileMenu.classList.toggle("translate-x-full");
    overlay.classList.toggle("hidden");
  }

  if (mobileBtn && mobileMenu && overlay && closeBtn) {
    mobileBtn.addEventListener("click", toggleMenu);
    closeBtn.addEventListener("click", toggleMenu);
    overlay.addEventListener("click", toggleMenu);
  }
}

