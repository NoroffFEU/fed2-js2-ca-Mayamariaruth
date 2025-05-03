import { isLoggedIn } from "./auth.js";

// Update active styling class on navbar links
export function setActiveLink() {
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
      currentPath === "/fed2-js2-ca-Mayamariaruth/auth/login" ||
      currentPath === "/fed2-js2-ca-Mayamariaruth/auth/register" ||
      currentPath.startsWith("/fed2-js2-ca-Mayamariaruth/profile");

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

// Specifically set home icon as active (to ensure its active on searches etc)
export function setHomeActive() {
  const homeDesktop = document.querySelector("#nav-home-desktop");
  const homeMobile = document.querySelector("#nav-home-mobile");

  const currentPath = window.location.pathname.replace(/\/+$/, "");
  if (currentPath === "/fed2-js2-ca-Mayamariaruth/index.html") {
    if (homeDesktop) homeDesktop.classList.add("active");
    if (homeMobile) homeMobile.classList.add("active");
  }
}
