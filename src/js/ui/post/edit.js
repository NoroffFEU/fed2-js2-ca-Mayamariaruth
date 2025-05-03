import { Modal } from "bootstrap";
import { editPost } from "../../api/post/edit.js";
import { showNotification } from "../../utils/notifications.js";
import {
  showLoadingSpinner,
  hideLoadingSpinner,
} from "../global/loadingSpinner.js";

/**
 * Opens a modal pre-filled with post data for editing.
 * Extracts post content and metadata from the DOM and injects a modal with a form.
 * Attaches a submit listener to handle the post update logic.
 *
 * @function onOpenEditModal
 * @param {MouseEvent} event - The click event from the "Edit" button; used to locate the post data in the DOM.
 * @returns {void} Does not return anything directly. Creates and shows a Bootstrap modal dynamically.
 *
 * @example
 * document.querySelector('.edit-post-btn').addEventListener('click', onOpenEditModal);
 */
export function onOpenEditModal(event) {
  const postId = event.currentTarget.dataset.id;
  const postBox = event.target.closest(".post-box");
  const title = postBox.querySelector(".post-title")?.innerText;
  const body = postBox.querySelector(".post-body")?.innerText;
  const postImage = postBox.querySelector(".post-image");

  const mediaUrl = postImage?.src || "";
  const mediaAlt = postImage?.alt || "";

  // Create the modal HTML
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

  // Insert modal into the body
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

    const modal = new Modal(modalElement);
    modal.show();
  }
}

/**
 * Handles the submission of the Edit Post form.
 * Validates input fields, sends the updated post to the API, updates the post DOM, and closes the modal.
 *
 * @async
 * @function onEditPost
 * @param {Event} event - The form submission event. Prevents default behavior and triggers the post update.
 *
 * @returns {Promise<void>} A Promise that resolves after the post is edited, DOM is updated, and modal is closed.
 *
 * @throws {Error} If the update request fails or invalid input is provided, a notification is shown with the error.
 *
 * @example
 * // Attach event listener to the form submit button
 * document.getElementById("edit-post-form").addEventListener("submit", onEditPost);
 */
export async function onEditPost(event) {
  event.preventDefault();

  const form = event.target;
  const postId = form.dataset.id;

  const title = document.getElementById("edit-title").value.trim();
  const body = document.getElementById("edit-body").value.trim();
  const mediaUrl = document.getElementById("edit-media-url").value.trim();
  const mediaAlt = document.getElementById("edit-media-alt").value.trim();

  const errors = [];

  // Validate title and body content exists
  if (!title || !body) {
    errors.push("Title and body are required.");
  }

  // Validate media URL and alt text
  if (mediaUrl && mediaAlt) {
    try {
      new URL(mediaUrl);
    } catch {
      errors.push("Image URL must be a valid URL.");
    }
  } else if (mediaUrl || mediaAlt) {
    errors.push("Both image URL and alt text are required if one is provided.");
  }

  if (errors.length) {
    showNotification(errors.join(" "), "error");
    return;
  }

  const updatedPost = {
    title,
    body,
    media: mediaUrl ? { url: mediaUrl, alt: mediaAlt } : undefined,
  };

  showLoadingSpinner();

  try {
    await editPost(postId, updatedPost);
    showNotification("Post updated successfully!", "success");

    // Update the post DOM
    const postBox = document
      .querySelector(`.edit-post-btn[data-id="${postId}"]`)
      ?.closest(".post-box");

    if (postBox) {
      postBox.querySelector(".post-title").innerText = title;
      postBox.querySelector(".post-body").innerText = body;

      const image = postBox.querySelector(".post-image");

      if (mediaUrl) {
        if (image) {
          image.src = mediaUrl;
          image.alt = mediaAlt || "Post image";
        } else {
          const newImage = document.createElement("img");
          newImage.src = mediaUrl;
          newImage.alt = mediaAlt || "Post image";
          newImage.className = "post-image img-fluid mt-2";
          postBox.appendChild(newImage);
        }
      } else if (image) {
        image.remove();
      }
    }

    // Close the modal
    const modalElement = document.getElementById("edit-post-modal");
    const modal = new Modal(modalElement);
    modal.hide();
    modalElement.remove();
  } catch (error) {
    const message =
      error.message || "Something went wrong while updating the post.";
    showNotification(message, "error");
  } finally {
    hideLoadingSpinner();
  }
}
