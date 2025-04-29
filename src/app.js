// Global styles
import "./css/style.css";

// Utilities
import router from "./js/router";
import { protectRoutes } from "./js/utils/protectedRoutes.js";
import { isLoggedIn } from "./js/utils/auth.js";
import { showNotification } from "./js/utils/notifications.js";
import { setupSearch } from "./js/utils/search.js";

// Global UI
import { setLogoutListener } from "./js/ui/global/logout.js";
import {
  loadAboutModal,
  aboutModalTrigger,
} from "./js/ui/global/aboutModal.js";

// Restrict access to protected pages before routing
protectRoutes();

// Route and load the current page
await router(window.location.pathname);

// Global event listeners and UI updates
setLogoutListener();
updateNavbarLinks();
setActiveLink();
await loadAboutModal();
aboutModalTrigger();
setupSearch();

// Update active styling class on navbar links
function setActiveLink() {
  const links = document.querySelectorAll(".nav-link");
  const currentPath = window.location.pathname.replace(/\/+$/, "");

  // Highlight matching nav links
  links.forEach((link) => {
    const linkPath = new URL(link.href).pathname.replace(/\/+$/, "");
    if (linkPath === currentPath && link.getAttribute("href") !== "#") {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Set profile icon as active on login/register and profile page
  const profileIcon = document.querySelector("#profile-dropdown");

  if (profileIcon) {
    const highlightProfile =
      currentPath === "/auth/login" ||
      currentPath === "/auth/register" ||
      currentPath.startsWith("/profile");

    if (highlightProfile) {
      profileIcon.classList.add("active");
    } else {
      profileIcon.classList.remove("active");
    }
  }
}

// Display different dropdown links depending on whether the user is logged in or not
export function updateNavbarLinks() {
  const isLogged = isLoggedIn();

  const desktop = {
    login: document.getElementById("login-link"),
    register: document.getElementById("register-link"),
    profile: document.getElementById("profile-link"),
    logout: document.getElementById("logout-link"),
  };

  const mobile = {
    login: document.getElementById("login-wrapper-mobile"),
    register: document.getElementById("register-wrapper-mobile"),
    profile: document.getElementById("profile-wrapper-mobile"),
    logout: document.getElementById("logout-wrapper-mobile"),
  };

  [desktop, mobile].forEach((group) => {
    if (group.login) group.login.style.display = isLogged ? "none" : "block";
    if (group.register)
      group.register.style.display = isLogged ? "none" : "block";
    if (group.profile)
      group.profile.style.display = isLogged ? "block" : "none";
    if (group.logout) group.logout.style.display = isLogged ? "block" : "none";
  });
}

// Display notifications from showNotification function on all pages
const stored = sessionStorage.getItem("notification");
if (stored) {
  const { type, message } = JSON.parse(stored);
  showNotification(message, type);
  sessionStorage.removeItem("notification");
}
