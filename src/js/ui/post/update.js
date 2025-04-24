import { updatePost } from "../../api/post/update.js";

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
          <form id="edit-post-form" class="modal-content" data-id="${postId}">
            <div class="modal-header">
              <h2 class="modal-title">Edit Post</h2>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <input type="text" name="title" class="form-control mb-3 rounded-3 create-form-field" value="${title}" />
              <textarea name="body" class="form-control mb-3 rounded-3 create-form-field" rows="10">${body}</textarea>
              <input type="text" name="mediaUrl" class="form-control mb-3 rounded-3 create-form-field" placeholder="Image URL (optional)" />
              <input type="text" name="mediaAlt" class="form-control mb-3 rounded-3 create-form-field" placeholder="Image alt text (optional)" />
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn submit-btn">Save changes</button>
            </div>
          </form>
        </div>
      </div>
    `;

  document.body.insertAdjacentHTML("beforeend", modalHtml);
  // Set mediaUrl and mediaAlt input values after modal is inserted
  const modalElement = document.getElementById("edit-post-modal");
  modalElement.querySelector('input[name="mediaUrl"]').value = mediaUrl;
  modalElement.querySelector('input[name="mediaAlt"]').value = mediaAlt;

  new bootstrap.Modal(document.getElementById("edit-post-modal")).show();

  document
    .getElementById("edit-post-form")
    .addEventListener("submit", onUpdatePost);
}

export async function onUpdatePost(event) {}
