import { API_SOCIAL_PROFILES } from "../constants.js";
import { headers } from "../headers.js";

// Sends an authenticated request to edit the profile
export async function editProfile(username, { avatar, bio }) {
  const url = `${API_SOCIAL_PROFILES}/${username}`;

  const response = await fetch(url, {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify({
      avatar,
      bio,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.errors?.[0]?.message || "Failed to update profile"
    );
  }

  return await response.json();
}
