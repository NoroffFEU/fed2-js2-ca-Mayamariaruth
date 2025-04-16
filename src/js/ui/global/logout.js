import { onLogout } from "../auth/logout.js";
import { isLoggedIn } from "../../utils/auth.js";

// Add logout icons to navbar when user logs in
export function setLogoutListener() {
  if (!isLoggedIn()) return;

  // Add to desktop navbar
  const logoutLinkDesktop = document.createElement("a");
  logoutLinkDesktop.href = "#";
  logoutLinkDesktop.className = "nav-link text-white";
  logoutLinkDesktop.innerHTML = `
    <span class="icon-wrapper d-inline-block position-relative">
      <i class="fa-solid fa-right-from-bracket nav-icon-desktop"></i>
    </span>
  `;

  logoutLinkDesktop.addEventListener("click", onLogout);

  const desktopIcons = document.querySelector(".navbar .d-flex.gap-3");
  if (desktopIcons) desktopIcons.appendChild(logoutLinkDesktop);

  // Add to mobile navbar
  const mobileLogout = document.createElement("li");
  mobileLogout.className = "nav-item";
  mobileLogout.innerHTML = `
    <a class="nav-link text-white" href="#">
      <i class="fa-solid fa-right-from-bracket me-2"></i>Logout
    </a>
  `;

  mobileLogout.addEventListener("click", onLogout);

  const mobileMenu = document.querySelector("#mobile-menu ul");
  if (mobileMenu) mobileMenu.appendChild(mobileLogout);
}
