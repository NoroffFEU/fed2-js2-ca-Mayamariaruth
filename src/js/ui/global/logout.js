import { onLogout } from "../auth/logout.js";
import { updateNavbarLinks } from "../../utils/nav.js";
import { isLoggedIn } from "../../utils/auth.js";

/**
 * Handles the logout process:
 * - Calls onLogout to clear session and user data.
 * - Updates the navbar links to reflect the logged-out state.
 * - Displays a success notification.
 * - Redirects to the homepage after logout.
 */
async function handleLogout(event) {
  event.preventDefault();

  onLogout();
  updateNavbarLinks();

  // Set a notification to inform the user that they have logged out
  sessionStorage.setItem(
    "notification",
    JSON.stringify({
      type: "success",
      message: "Logged out successfully!",
    })
  );

  window.location.href = "/fed2-js2-ca-Mayamariaruth/";
}

// Attach logout listeners for desktop and mobile
export function setLogoutListener() {
  if (!isLoggedIn()) return;

  const logoutLinks = [
    document.querySelector("#logout-link"),
    document.querySelector("#logout-link-mobile"),
  ];

  logoutLinks.forEach((link) => {
    if (link) {
      link.addEventListener("click", handleLogout);
    }
  });
}
