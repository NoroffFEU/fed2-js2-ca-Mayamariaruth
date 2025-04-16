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
  const links = document.querySelectorAll(".navbar .nav-link");
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
function updateNavbarLinks() {
  const loginLink = document.getElementById("login-link");
  const registerLink = document.getElementById("register-link");
  const profileLink = document.getElementById("profile-link");
  const logoutLink = document.getElementById("logout-link");

  if (isLoggedIn()) {
    // Logged-in user, show profile and logout options
    loginLink.style.display = "none";
    registerLink.style.display = "none";
    profileLink.style.display = "block";
    logoutLink.style.display = "block";
  } else {
    // Not logged-in user, show login and register options
    loginLink.style.display = "block";
    registerLink.style.display = "block";
    profileLink.style.display = "none";
    logoutLink.style.display = "none";
  }
}
