import { readProfile } from "../../api/profile/read.js";
import { getUserName } from "../../utils/auth.js";

// Fetches and displays user profile data on the profile page
export async function displayUserProfile() {
  const username = getUserName();
  if (!username) return;

  try {
    // Fetch the user's profile data from the API using the username
    const user = await readProfile(username);

    const profileUsername = document.getElementById("profile-username");
    const profileEmail = document.getElementById("profile-email");
    const profileBio = document.getElementById("profile-bio");
    const profileAvatar = document.getElementById("profile-avatar");

    // Set the profile data into the corresponding HTML elements
    if (profileUsername) profileUsername.textContent = user.name;
    if (profileEmail) profileEmail.textContent = user.email;
    if (profileBio) profileBio.textContent = user.bio || "No bio provided";
    if (profileAvatar) {
      profileAvatar.src = user.avatar?.url || "/public/images/avatar.png";
      profileAvatar.alt = user.avatar?.alt || "User avatar";
    }
  } catch (error) {
    console.error("Error loading profile:", error);
  }
}
