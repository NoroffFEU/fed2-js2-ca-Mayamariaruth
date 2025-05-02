import { onLogout } from "../auth/logout.js";
import { updateNavbarLinks } from "../../utils/nav.js";
import { isLoggedIn } from "../../utils/auth.js";

// Logout logic clearing the session, updating navbar and displaying notification
function handleLogout(event) {
  event.preventDefault();

  onLogout();
  updateNavbarLinks();

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
