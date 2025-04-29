import { showNotification } from "./notifications.js";
import { isLoggedIn } from "./auth.js";
import { searchPosts } from "../api/post/search.js";
import { readPosts } from "../api/post/feed.js";
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
        const response = await searchPosts(query);
        const posts = response.data;
        loadPosts(posts);
        // Hide create post form
        const createPostForm = document.getElementById("create-post-container");
        if (createPostForm) {
          createPostForm.classList.add("d-none");
        }

        const feedback = document.getElementById("search-feedback");

        // Show "no posts found" message
        if (posts.length === 0) {
          feedback.textContent =
            "No posts found. Try searching for words in the title or body.";
        } else {
          feedback.textContent = "";
        }

        // Add Clear Search button
        let clearBtn = document.getElementById("clear-search-btn");
        if (!clearBtn) {
          feedback.parentElement.appendChild(clearBtn);
        }

        clearBtn.classList.remove("d-none");
        clearBtn.onclick = async () => {
          feedback.textContent = "";
          clearBtn.classList.add("d-none");

          // Clear the search input fields
          if (desktopInput) desktopInput.value = "";
          if (mobileInput) mobileInput.value = "";

          const allPosts = await readPosts();
          loadPosts(allPosts);
          // Display the create post form again
          const createPostForm = document.getElementById(
            "create-post-container"
          );
          if (createPostForm) {
            createPostForm.classList.remove("d-none");
          }
        };
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
