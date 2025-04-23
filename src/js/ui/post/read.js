import { readPosts } from "../../api/post/read.js";

// Display all posts in home feed
export async function loadPosts() {
  try {
    const posts = await readPosts();
    const container = document.getElementById("feed-post-container");
    if (!container) return;

    for (const post of posts) {
      const feedBox = document.createElement("div");
      feedBox.id = "feed-boxes";
      feedBox.className = "post-box shadow rounded p-3 mb-4";

      const author = post.author || {};
      const avatarUrl =
        post.author?.avatar?.url ?? "/images/default-avatar.png";
      const avatarAlt = post.author?.avatar?.alt || "User avatar";
      const authorName = author.name || author.username || "Unknown Author";

      feedBox.innerHTML = `
    <div class="d-flex align-items-center mb-3">
      <img src="${avatarUrl}" alt="${avatarAlt}" class="rounded-circle me-2" width="40" height="40">
      <strong>${authorName}</strong>
    </div>
    <div>
      <p class="fw-bold h5">${post.title}</p>
      <p>${post.body || ""}</p>
      ${
        post.media?.url
          ? `<img src="${post.media.url}" alt="${
              post.media.alt || "Post image"
            }" class="img-fluid mt-2" />`
          : ""
      }
    </div>
  `;

      container.appendChild(feedBox);
    }
  } catch (error) {
    console.error("Failed to load posts:", error);
  }
}
