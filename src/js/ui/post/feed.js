import { readPosts } from "../../api/post/feed.js";
import { getUserName } from "../../utils/auth.js";
import { onOpenDeleteModal } from "./delete.js";
import { onOpenEditModal } from "./edit.js";
import { createFollowButton } from "../../utils/followBtn.js"; // Import the new follow button helper

/**
 * Loads and displays posts in the home feed. If search results are provided, it displays them; otherwise, it fetches all posts.
 * Each post is rendered with the author's details, title, body, and any associated media. Additionally, the function
 * conditionally displays a follow/unfollow button based on whether the post author is the current user, and provides
 * options to edit or delete the post if the current user is the author.
 *
 * @async
 * @function loadPosts
 * @param {Array<Object>|null} [searchPosts=null] - The array of posts to be displayed. If null, the function fetches all posts using the `readPosts` API function.
 * @returns {Promise<void>} A Promise that resolves when the posts are loaded and displayed. If an error occurs, it is logged to the console.
 *
 * @throws {Error} If there is an issue loading the posts (e.g., network issues or incorrect data format), an error is logged to the console.
 */
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
            <div>
              <strong class="h5 mb-0">
                <a href="/profile/authorPosts/?username=${
                  post.author?.name
                }" class="text-decoration-none text-white">
                  ${post.author?.name || "Unknown Author"}
                </a>
              </strong>
            <!-- Conditionally show Follow/Unfollow button -->
            ${
              post.author?.name !== currentUser
                ? '<div class="follow-btn-container"></div>'
                : ""
            }
            </div>
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
          <span class="posted-on">Posted on <strong>${new Date(
            post.created
          ).toLocaleDateString()}</strong></span>
        </a>
      `;

      // Add the Follow/Unfollow button if it's not the current user
      const followButton = createFollowButton(post.author?.name);
      const followBtnContainer = feedBox.querySelector(".follow-btn-container");
      if (followButton && followBtnContainer) {
        followBtnContainer.appendChild(followButton);
      }

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
