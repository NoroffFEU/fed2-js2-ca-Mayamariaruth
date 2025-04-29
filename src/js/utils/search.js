import { showNotification } from "./notifications.js";
import { isLoggedIn } from "./auth.js";
import { searchPosts } from "../api/post/search.js";
import { loadPosts } from "../ui/post/feed.js";

// Search handler function
export function setupSearch() {
  const desktopInput = document.getElementById("search-input");
  const mobileInput = document.getElementById("search-input-mobile");

  async function handleSearch(event) {
    event.preventDefault();
    const query = event.target.value.trim();

    if (!isLoggedIn()) {
      showNotification("You must be logged in to search.", "error");
      return;
    }

    if (query) {
      try {
        const posts = await searchPosts(query);
        loadPosts(posts);
      } catch (error) {
        console.error(error);
        showNotification("Failed to search posts.", "error");
      }
    }
  }

  if (desktopInput) {
    desktopInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") handleSearch(e);
    });
  }

  if (mobileInput) {
    mobileInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") handleSearch(e);
    });
  }
}
