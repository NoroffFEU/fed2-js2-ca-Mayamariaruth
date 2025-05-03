import { showNotification } from "./notifications.js";
import { isLoggedIn } from "./auth.js";

// Search handler function to check if user is logged in and save the search query in local storage
export async function setupSearchEvent(query) {
  if (!isLoggedIn()) {
    showNotification("You must be logged in to search.", "error");
    return;
  }

  if (query) {
    localStorage.setItem("searchQuery", query);
    window.location.href = "/fed2-js2-ca-Mayamariaruth/index.html";
  }
}
