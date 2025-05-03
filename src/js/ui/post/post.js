import { readPost } from "../../api/post/post.js";
import { showNotification } from "../../utils/notifications.js";

// Displays an individual post on the post page
export async function displayPost(postId) {
  try {
    const post = await readPost(postId);

    // Create the post HTML
    const container = document.getElementById("post-page");
    container.innerHTML = `
      <div class="card mx-auto mb-5 mt-4 text-white pt-1 post-card">
        <div class="card-body">
          <h1 class="card-title mb-3">${post.title}</h1>
          <p class="card-text mb-3 h5">${post.body || ""}</p>
            ${
              post.media?.url
                ? `
              <img src="${post.media?.url}" alt="${
                    post.media?.alt || "Post image"
                  }" class="post-image img-fluid mb-4"> `
                : ""
            }
          <div class="mb-2">
            <span>By
              <a href="/fed2-js2-ca-Mayamariaruth/profile/authorPosts/index.html?username=${
                post.author?.name
              }" class="author-link text-white text-decoration-underline">
                <strong>${post.author?.name || "Unknown Author"}</strong>
              </a>
            </span> -
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
