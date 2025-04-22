import { readProfile } from "../../api/profile/read.js";

// Display user data on profile page
export async function displayUserProfile() {
  const profile = JSON.parse(localStorage.getItem("profile"));
  const username = profile?.name;
  if (!username) return;

  try {
    const user = await readProfile(username);

    const profileUsername = document.getElementById("profile-username");
    const profileEmail = document.getElementById("profile-email");
    const profileBio = document.getElementById("profile-bio");
    const profileAvatar = document.getElementById("profile-avatar");

    if (profileUsername) profileUsername.textContent = user.name;
    if (profileEmail) profileEmail.textContent = user.email;
    if (profileBio) profileBio.textContent = user.bio || "No bio provided";
    if (profileAvatar) {
      profileAvatar.src = user.avatar?.url || "/images/default-avatar.png";
      profileAvatar.alt = user.avatar?.alt || "User avatar";
    }
  } catch (error) {
    console.error("Error loading profile:", error);
  }
}
