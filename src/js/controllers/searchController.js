import { readPosts, searchPosts } from "../api/post/feed.js";
import { loadPosts } from "../ui/post/feed.js";
import { showNotification } from "../utils/notifications.js";
import { setHomeActive } from "../utils/nav.js";
import { isLoggedIn } from "../utils/auth.js";

// Handle search query saved in localstorage
export async function handleFeedSearch() {
  const query = localStorage.getItem("searchQuery");

  if (query) {
    try {
      const response = await searchPosts(query);
      loadPosts(response.data);
      setHomeActive();
    } catch (error) {
      console.error("Failed to load search results:", error);
      showNotification("Failed to search posts.", "error");
    }
  } else {
    loadPosts();
    setHomeActive();
  }
}

// Handle search process and UI updates in feed
export async function searchFeed() {
  const query = localStorage.getItem("searchQuery");
  const feedback = document.getElementById("search-feedback");
  const createPostForm = document.getElementById("create-post-container");

  try {
    // If user is not logged in and no search, skip loading posts
    if (!isLoggedIn() && !query) {
      if (feedback) {
        feedback.textContent = "Please log in to view posts.";
      }
      return;
    }

    // Variable that will hold either all posts or filtered search results
    let posts;

    if (query) {
      const response = await searchPosts(query);
      posts = response.data;

      // Display search feedback (e.g., no results or results message)
      if (feedback) {
        feedback.textContent =
          posts.length === 0
            ? "No posts found. Try searching for words in the title or body."
            : `Showing results for "${query}"`;
      }

      if (createPostForm) {
        createPostForm.classList.add("d-none");
      }
    } else {
      posts = await readPosts();
    }

    loadPosts(posts);
    setHomeActive();

    // Show the "Clear Search" button if there's a query; reset feed and UI when clicked
    const clearBtn = document.getElementById("clear-search-btn");
    if (clearBtn) {
      clearBtn.classList.toggle("d-none", !query);

      clearBtn.onclick = async () => {
        if (feedback) feedback.textContent = "";
        clearBtn.classList.add("d-none");

        const allPosts = await readPosts();
        loadPosts(allPosts);
        setHomeActive();

        if (createPostForm) {
          createPostForm.classList.remove("d-none");
        }

        const desktopInput = document.getElementById("search-input");
        const mobileInput = document.getElementById("search-input-mobile");
        if (desktopInput) desktopInput.value = "";
        if (mobileInput) mobileInput.value = "";
      };
    }
  } catch (error) {
    console.error("Failed to load feed:", error);
    showNotification("Failed to load posts.", "error");
  }
}
