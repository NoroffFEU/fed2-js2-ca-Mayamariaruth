import { readPost } from "../../api/post/post.js";
import { showNotification } from "../../utils/notifications.js";

// Display an individual post on the post page
export async function displayPost(postId) {
  try {
    const post = await readPost(postId);

    const container = document.getElementById("post-page");
    container.innerHTML = `
      <div class="card mx-auto my-5 shadow-lg">
        <div class="card-body">
          <h1 class="card-title h2 mb-3">${post.title}</h1>
          <div class="mb-3 text-muted small">
            <span>By ${post.author?.name || "Unknown Author"}</span> | 
            <span>${new Date(post.created).toLocaleDateString()}</span>
          </div>
            ${
              post.media?.url
                ? `
              <img src="${post.media?.url}" alt="${
                    post.media?.alt || "Post image"
                  }" class="img-fluid mb-4"> `
                : ""
            }
          <p class="card-text">${post.body || ""}</p>
        </div>
      </div>
    `;
  } catch (error) {
    console.error(error);
    showNotification("Could not load the post.", "error");
  }
}
