import { editPost } from "../../api/post/edit.js";
import { showNotification } from "../../utils/notifications.js";

// Display the edit post modal with pre-populated form fields
export function onOpenEditModal(event) {
  const postId = event.target.dataset.id;
  const postBox = event.target.closest(".post-box");
  const title = postBox.querySelector(".post-title")?.innerText;
  const body = postBox.querySelector(".post-body")?.innerText;
  const postImage = postBox.querySelector(".post-image");

  const mediaUrl = postImage?.src || "";
  const mediaAlt = postImage?.alt || "";

  const modalHtml = `
      <div class="modal fade" id="edit-post-modal" tabindex="-1">
        <div class="modal-dialog">
          <form name="editPostForm" id="edit-post-form" class="modal-content" data-id="${postId}">
            <div class="modal-header">
              <h2 class="modal-title">Edit Post</h2>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <input id="edit-title" type="text" name="title" class="form-control mb-3 rounded-3 create-form-field" value="${title}" />
              <textarea id="edit-body" name="body" class="form-control mb-3 rounded-3 create-form-field" rows="10">${body}</textarea>
              <input id="edit-media-url" type="text" name="mediaUrl" class="form-control mb-3 rounded-3 create-form-field" placeholder="Image URL (optional)" />
              <input id="edit-media-alt" type="text" name="mediaAlt" class="form-control mb-3 rounded-3 create-form-field" placeholder="Image alt text (optional)" />
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn submit-btn">Save changes</button>
            </div>
          </form>
        </div>
      </div>
    `;

  document.body.insertAdjacentHTML("beforeend", modalHtml);

  const modalElement = document.getElementById("edit-post-modal");

  // Set media url/alt input values after modal is inserted
  if (modalElement) {
    const mediaUrlInput = document.getElementById("edit-media-url");
    const mediaAltInput = document.getElementById("edit-media-alt");

    if (mediaUrlInput) mediaUrlInput.value = mediaUrl;
    if (mediaAltInput) mediaAltInput.value = mediaAlt;

    // Form submission eventListener
    const form = document.getElementById("edit-post-form");
    if (form) {
      form.addEventListener("submit", onEditPost);
    }

    new bootstrap.Modal(modalElement).show();
  }
}

// Handle form submission for editing post
export async function onEditPost(event) {
  event.preventDefault();

  const form = event.target;
  const postId = form.dataset.id;

  const title = document.getElementById("edit-title").value.trim();
  const body = document.getElementById("edit-body").value.trim();
  const mediaUrl = document.getElementById("edit-media-url").value.trim();
  const mediaAlt = document.getElementById("edit-media-alt").value.trim();

  const updatedPost = {
    title,
    body,
    media: mediaUrl ? { url: mediaUrl, alt: mediaAlt } : undefined,
  };

  try {
    await editPost(postId, updatedPost);
    showNotification("Post updated successfully!", "success");

    const modalElement = document.getElementById("edit-post-modal");
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    if (modalInstance) modalInstance.hide();

    modalElement.remove();
  } catch (error) {
    const message =
      error.message || "Something went wrong while updating the post.";
    showNotification(message, "error");
  }
}
