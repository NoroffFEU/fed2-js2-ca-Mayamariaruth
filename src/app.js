import "./css/style.css";
import router from "./js/router";
import { setLogoutListener } from "./js/ui/global/logout.js";
import { isLoggedIn } from "./js/utils/auth.js";

await router(window.location.pathname);
setLogoutListener();
updateNavbarLinks();
setActiveLink();

// Update active styling class on navbar links
function setActiveLink() {
  const links = document.querySelectorAll(".nav-link");
  const currentPath = window.location.pathname.replace(/\/+$/, "");

  links.forEach((link) => {
    const linkPath = new URL(link.href).pathname.replace(/\/+$/, ""); // Normalize href

    // Only set active if the current path exactly matches the link path
    if (linkPath === currentPath && link.getAttribute("href") !== "#") {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Add active state for profile icon
  const profileIcon = document.querySelector("#profile-dropdown");
  if (currentPath.includes("/profile")) {
    profileIcon.classList.add("active");
  } else {
    profileIcon.classList.remove("active");
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
