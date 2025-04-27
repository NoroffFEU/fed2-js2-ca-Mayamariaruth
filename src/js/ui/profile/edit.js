import { editProfile } from "../../api/profile/edit.js";

export async function onOpenEditProfileModal() {
  const avatarUrl = document.getElementById("profile-avatar").src;
  const bio = document.getElementById("profile-bio").textContent;
  const username = document.getElementById("profile-username").textContent;
  const email = document.getElementById("profile-email").textContent;

  // Create the edit profile modal HTML
  const modalHtml = `
    <div class="modal fade" id="edit-profile-modal" tabindex="-1" aria-labelledby="edit-profile-modal-label" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content rounded-3">
          <div class="modal-header">
            <h2 class="modal-title" id="edit-profile-modal-label">Edit Profile</h2>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="edit-profile-form">
              <div class="mb-3">
                <label for="edit-username" class="form-label">Username</label>
                <input type="text" class="form-control" id="edit-username" name="username" placeholder="Enter your username" value="${username}">
              </div>
              <div class="mb-3">
                <label for="edit-email" class="form-label">Email</label>
                <input type="email" class="form-control" id="edit-email" name="email" placeholder="Enter your email" value="${email}">
              </div>
              <div class="mb-3">
                <label for="avatar-url" class="form-label">Avatar URL</label>
                <input type="text" class="form-control" id="avatar-url" name="avatar" placeholder="Enter avatar image URL" value="${avatarUrl}">
              </div>
              <div class="mb-3">
                <label for="bio" class="form-label">Bio</label>
                <textarea class="form-control" id="bio" name="bio" rows="6" placeholder="Enter your bio">${bio}</textarea>
              </div>
              <button type="submit" class="btn submit-btn">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;

  // Insert the modal into the body
  document.body.insertAdjacentHTML("beforeend", modalHtml);

  const modalElement = new bootstrap.Modal(
    document.getElementById("edit-profile-modal")
  );
  modalElement.show();

  // Form submission eventListener
  const form = document.getElementById("edit-profile-form");
  if (form) {
    form.addEventListener("submit", onEditProfile);
  }
}

async function onEditProfile(event) {
  event.preventDefault();
}
