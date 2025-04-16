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

  // Mobile logout
  const logoutLinkMobile = document.querySelector("#logout-link-mobile");
  if (logoutLinkMobile) {
    logoutLinkMobile.addEventListener("click", (event) => {
      event.preventDefault();
      onLogout();
      updateNavbarLinks();
      if (typeof showNotification === "function") {
        showNotification("success", "Logged out successfully");
      }
      window.location.href = "/";
    });
  }
}
