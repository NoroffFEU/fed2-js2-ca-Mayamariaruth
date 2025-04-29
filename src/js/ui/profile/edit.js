import { editProfile } from "../../api/profile/edit.js";
import { displayUserProfile } from "./read.js";
import { showNotification } from "../../utils/notifications.js";

// Display the edit profile modal
export async function onOpenEditProfileModal() {
  const avatarUrl = document.getElementById("profile-avatar").src;
  const bio = document.getElementById("profile-bio").textContent;

  // Create the modal HTML
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

// Handles the editing of profile details when confirmed
async function onEditProfile(event) {
  event.preventDefault();

  const username = document.getElementById("profile-username").textContent;
  const avatar = document.getElementById("avatar-url").value;
  const bio = document.getElementById("bio").value;

  try {
    const updatedProfile = await editProfile(username, { avatar, bio });

    // Update localStorage
    const storedProfile = JSON.parse(localStorage.getItem("profile")) || {};
    const newProfile = {
      ...storedProfile,
      avatar: updatedProfile.avatar,
      bio: updatedProfile.bio,
    };
    localStorage.setItem("profile", JSON.stringify(newProfile));

    // Refresh the profile view
    await displayUserProfile();

    // Close the modal
    const modalInstance = bootstrap.Modal.getInstance(
      document.getElementById("edit-profile-modal")
    );
    modalInstance.hide();
    document.getElementById("edit-profile-modal").remove();

    showNotification("Profile updated successfully!", "success");
  } catch (error) {
    showNotification(error.message || "Failed to update profile.", "error");
  }
}
