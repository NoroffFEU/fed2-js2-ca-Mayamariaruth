import { readPosts } from "../../api/post/feed.js";
import { getUserName } from "../../utils/auth.js";
import { onOpenDeleteModal } from "./delete.js";
import { onOpenEditModal } from "./edit.js";

// Display all posts in home feed
export async function loadPosts(searchPosts = null) {
  try {
    const container = document.getElementById("feed-post-container");
    if (!container) return;

    container.innerHTML = "";

    const posts = searchPosts || (await readPosts());

    const currentUser = getUserName();

    for (const post of posts) {
      const feedBox = document.createElement("div");
      feedBox.id = "feed-boxes";
      feedBox.className = "post-box shadow rounded-3 p-3 mb-3";

      feedBox.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-3">
          <div class="d-flex align-items-center">
            <img src="${
              post.author?.avatar?.url ?? "/public/images/avatar.png"
            }" alt="${
        post.author?.avatar?.alt || "User avatar"
      }" class="rounded-circle me-2 user-avatar">
            <strong class="h5 mb-0">${
              post.author?.name || post.author?.username || "Unknown Author"
            }</strong>
          </div>
          ${
            post.author?.name === currentUser
              ? `<div>
                   <button class="btn btn-sm me-2 edit-post-btn rounded-2" data-id="${post.id}"><i class="fa-solid fa-pen"></i></button>
                   <button class="btn btn-sm btn-outline-danger delete-post-btn rounded-2" data-id="${post.id}" data-title="${post.title}"><i class="fa-solid fa-trash-can"></i></button>
                 </div>`
              : ""
          }
        </div>

        <a href="post/index.html?id=${
          post.id
        }" class="text-decoration-none text-reset">
          <div class="mb-3">
            <p class="post-title fw-bold h4">${post.title}</p>
            <p class="post-body">${post.body || ""}</p>
            ${
              post.media?.url
                ? `<img src="${post.media.url}" alt="${
                    post.media.alt || "Post image"
                  }" class="post-image img-fluid mt-2" />`
                : ""
            }
          </div>
          <span>Posted on <strong>${new Date(
            post.created
          ).toLocaleDateString()}</strong></span>
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
