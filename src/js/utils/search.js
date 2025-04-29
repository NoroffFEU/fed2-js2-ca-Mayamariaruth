import { showNotification } from "./notifications.js";
import { isLoggedIn } from "./auth.js";

// Search handler function
export async function setupSearchEvent(event) {
  event.preventDefault();
  const query = event.target.value.trim();

  if (!isLoggedIn()) {
    showNotification("You must be logged in to search.", "error");
    return;
  }

  if (query) {
    localStorage.setItem("searchQuery", query);
    window.location.href = "/index.html";
  }
}
