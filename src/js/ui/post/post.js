import { readPost } from "../../api/post/post.js";
import { showNotification } from "../../utils/notifications.js";

// Display an individual post on the post page
export async function displayPost(postId) {
  try {
    const post = await readPost(postId);

    const container = document.getElementById("post-page");
    container.innerHTML = `
      <div class="card mx-auto my-5 text-white pt-2 post-card">
        <div class="card-body">
          <h1 class="card-title mb-3">${post.title}</h1>
          <p class="card-text mb-3 h5">${post.body || ""}</p>
            ${
              post.media?.url
                ? `
              <img src="${post.media?.url}" alt="${
                    post.media?.alt || "Post image"
                  }" class="img-fluid mb-4"> `
                : ""
            }
          <div class="mb-3">
            <span>By <strong>${
              post.author?.name || "Unknown Author"
            }</strong></span> | 
            <span>${new Date(post.created).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    `;
  } catch (error) {
    console.error(error);
    showNotification("Could not load the post.", "error");
  }
}
