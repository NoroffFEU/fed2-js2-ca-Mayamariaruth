import { readProfile } from "../../api/profile/read.js";

// Display user data on profile page
export async function displayUserProfile() {
  const profile = JSON.parse(localStorage.getItem("profile"));
  const username = profile?.name;
  if (!username) return;

  try {
    const user = await readProfile(username);

    document.getElementById("profile-username").textContent = user.name;
    document.getElementById("profile-email").textContent = user.email;
    document.getElementById("profile-bio").textContent =
      user.bio || "No bio provided";
    document.getElementById("profile-avatar").src =
      user.avatar?.url || "/images/default-avatar.png";
    document.getElementById("profile-avatar").alt =
      user.avatar?.alt || "User avatar";
  } catch (error) {
    console.error("Error loading profile:", error);
  }
}
