import { Modal } from "bootstrap";
import { deletePost } from "../../api/post/delete.js";
import { searchPosts } from "../../api/post/feed.js";
import { loadPosts } from "./feed.js";
import { showNotification } from "../../utils/notifications.js";
import {
  showLoadingSpinner,
  hideLoadingSpinner,
} from "../global/loadingSpinner.js";

// Displays the delete confirmation modal
export function onOpenDeleteModal(event) {
  const button = event.currentTarget;
  const postId = button.dataset.id;
  const postBox = event.target.closest(".post-box");
  const title = postBox.querySelector(".post-title")?.innerText || "this post";

  const modalHtml = `
      <div class="modal fade" id="delete-post-modal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content rounded-3">
            <div class="modal-header">
              <h3 class="modal-title">Confirm Deletion</h3>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              Are you sure you want to delete your post <strong>${title}</strong>?
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-light rounded-2" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-danger rounded-2" id="confirm-delete-btn" data-id="${postId}">Delete</button>
            </div>
          </div>
        </div>
      </div>
    `;

  // Insert modal into the body
  document.body.insertAdjacentHTML("beforeend", modalHtml);

  const modalElement = document.getElementById("delete-post-modal");

  if (modalElement) {
    // Event listener for the confirm button
    const confirmDeleteBtn = document.getElementById("confirm-delete-btn");
    if (confirmDeleteBtn) {
      confirmDeleteBtn.addEventListener("click", onDeletePost);
    }

    const modal = new Modal(modalElement);
    modal.show();
  }
}

// Handles the deletion of a post when confirmed
async function onDeletePost(event) {
  const button = event.currentTarget;
  const postId = button.dataset.id;

  showLoadingSpinner();

  try {
    await deletePost(postId);
    showNotification("Post deleted successfully!", "success");

    // Close and remove the modal
    const modalElement = document.getElementById("delete-post-modal");
    const modal = new Modal(modalElement);
    modal.hide();
    modalElement.remove();

    const query = localStorage.getItem("searchQuery");
    if (query) {
      const response = await searchPosts(query);
      loadPosts(response.data);
    } else {
      await loadPosts();
    }
  } catch (error) {
    const message =
      error.message || "Something went wrong while deleting the post.";
    showNotification(message, "error");
  } finally {
    hideLoadingSpinner();
  }
}
