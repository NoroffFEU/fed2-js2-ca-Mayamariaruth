import "./css/style.css";
import router from "./js/router";
import { setLogoutListener } from "./js/ui/global/logout.js";
import { isLoggedIn } from "./js/utils/auth.js";

await router(window.location.pathname);
setLogoutListener();
updateNavbarLinks();
setActiveLink();

// Helper function to update active class on navbar links
function setActiveLink() {
  const links = document.querySelectorAll(".navbar .nav-link");
  const currentPath = window.location.pathname.replace(/\/+$/, "");

  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#")) return;

    const linkPath = new URL(
      link.href,
      window.location.origin
    ).pathname.replace(/\/+$/, "");

    if (linkPath === currentPath) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

function updateNavbarLinks() {
  const profileLinks = document.querySelectorAll('a[href="#profile"]');

  profileLinks.forEach((link) => {
    if (isLoggedIn()) {
      link.setAttribute("href", "/profile/");
    } else {
      link.setAttribute("href", "/auth/login/");
    }
  });
}
