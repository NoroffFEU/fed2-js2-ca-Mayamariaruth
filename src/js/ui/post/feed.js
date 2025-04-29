import { readPosts } from "../../api/post/feed.js";
import { onOpenDeleteModal } from "./delete.js";
import { onOpenEditModal } from "./edit.js";

// Display all posts in home feed
export async function loadPosts() {
  try {
    const posts = await readPosts();
    const container = document.getElementById("feed-post-container");
    if (!container) return;

    container.innerHTML = "";
    const currentUser = JSON.parse(localStorage.getItem("profile"))?.name;

    for (const post of posts) {
      const feedBox = document.createElement("div");
      feedBox.id = "feed-boxes";
      feedBox.className = "post-box shadow rounded-3 p-3 mb-3";

      feedBox.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-3">
          <div class="d-flex align-items-center">
            <img src="${
              post.author.avatar?.url ?? "/images/default-avatar.png"
            }" alt="${
        post.author.avatar?.alt || "User avatar"
      }" class="rounded-circle me-2 user-avatar">
            <strong>${
              post.author.name || post.author.username || "Unknown Author"
            }</strong>
          </div>
          ${
            post.author.name === currentUser
              ? `<div>
                   <button class="btn btn-sm me-2 edit-post-btn rounded-2" data-id="${post.id}"><i class="fa-solid fa-pen"></i></button>
                   <button class="btn btn-sm btn-outline-danger delete-post-btn rounded-2" data-id="${post.id}" data-title="${post.title}"><i class="fa-solid fa-trash-can"></i></button>
                 </div>`
              : ""
          }
        </div>

        <a href="post/?id=${post.id}" class="text-decoration-none text-reset">
          <div>
            <p class="post-title fw-bold h5">${post.title}</p>
            <p class="post-body">${post.body || ""}</p>
            ${
              post.media?.url
                ? `<img src="${post.media.url}" alt="${
                    post.media.alt || "Post image"
                  }" class="post-image img-fluid mt-2" />`
                : ""
            }
          </div>
        </a>
      `;

      container.appendChild(feedBox);
    }

    // Attach event listeners for edit/delete buttons after all posts are loaded
    document
      .querySelectorAll(".edit-post-btn")
      .forEach((btn) => btn.addEventListener("click", onOpenEditModal));
    document
      .querySelectorAll(".delete-post-btn")
      .forEach((btn) => btn.addEventListener("click", onOpenDeleteModal));
  } catch (error) {
    console.error("Failed to load posts:", error);
  }
}
