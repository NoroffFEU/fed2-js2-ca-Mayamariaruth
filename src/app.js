// Global styles
import "./css/style.css";
import "../dist/assets/app-CRIsK6_n.css";

// Utilities
import router from "./js/router/index.js";
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
await router(window.location.pathname);

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
