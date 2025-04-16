import { onLogout } from "../auth/logout.js";
import { updateNavbarLinks } from "../../../app.js";
import { isLoggedIn } from "../../utils/auth.js";

// Update desktop navbar dropdown menu with logout option
// Add logout icon to mobile navbar
export function setLogoutListener() {
  if (!isLoggedIn()) return;

  // Desktop logout logic
  const logoutLink = document.querySelector("#logout-link");

  if (!logoutLink) return;

  logoutLink.addEventListener("click", (event) => {
    event.preventDefault();

    onLogout();
    updateNavbarLinks();

    if (typeof showNotification === "function") {
      showNotification("success", "Logged out successfully");
    }

    window.location.href = "/";
  });

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
