import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/style.css";

// Clear search query if not on the feed page
(function clearSearchQuery() {
  const path = window.location.pathname;
  const isFeedPage =
    path === "/fed2-js2-ca-Mayamariaruth" ||
    path === "/fed2-js2-ca-Mayamariaruth/" ||
    path === "/fed2-js2-ca-Mayamariaruth/index.html";

  if (!isFeedPage) {
    localStorage.removeItem("searchQuery");
  }
})();

// Clear searchQuery if home or logo is clicked
document
  .querySelectorAll("#nav-home-desktop, #nav-home-mobile, .logo")
  .forEach((el) => {
    el.addEventListener("click", () => {
      localStorage.removeItem("searchQuery");
    });
  });

// Router
import router from "./js/router/index.js";

// Utilities
import { protectRoutes } from "./js/utils/protectedRoutes.js";
import { setActiveLink, updateNavbarLinks } from "./js/utils/nav.js";
import { showNotification } from "./js/utils/notifications.js";
import { setupSearchEvent } from "./js/utils/search.js";

// Global UI
import { setLogoutListener } from "./js/ui/global/logout.js";
import {
  loadAboutModal,
  aboutModalTrigger,
} from "./js/ui/global/aboutModal.js";

// Restrict access to protected pages before routing
protectRoutes();

// Route and load the current page
try {
  await router(window.location.pathname);
} catch (err) {
  console.error("Routing error:", err);
  showNotification("Page failed to load.", "error");
}

// Clear search query when clicking away
document.querySelectorAll('a[href="/"]').forEach((link) => {
  link.addEventListener("click", () => {
    localStorage.removeItem("searchQuery");
  });
});

// Global event listeners and UI updates
setLogoutListener();
updateNavbarLinks();
setActiveLink();
await loadAboutModal();
aboutModalTrigger();

// Display notifications from showNotification function on all pages
const stored = sessionStorage.getItem("notification");
if (stored) {
  const { type, message } = JSON.parse(stored);
  showNotification(message, type);
  sessionStorage.removeItem("notification");
}

// Search input event listener
function setupSearchListeners() {
  const desktopInput = document.getElementById("search-input");
  const mobileInput = document.getElementById("search-input-mobile");

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const query = e.target.value.trim();
      setupSearchEvent(query);
    }
  };

  if (desktopInput) {
    desktopInput.addEventListener("keydown", handleEnter);
  }

  if (mobileInput) {
    mobileInput.addEventListener("keydown", handleEnter);
  }
}

setupSearchListeners();

// Clear search query when clicking the back-to-feed link
document
  .querySelectorAll('a[href="/fed2-js2-ca-Mayamariaruth/index.html"]')
  .forEach((link) => {
    link.addEventListener("click", () => {
      localStorage.removeItem("searchQuery");
    });
  });
