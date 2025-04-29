import { API_SOCIAL_PROFILES } from "../constants.js";
import { headers } from "../headers.js";

// Sends an authenticated request to edit the profile
export async function editProfile(username, { avatar, bio }) {
  const url = `${API_SOCIAL_PROFILES}/${username}`;
  const avatarAlt = "User's avatar";

  const response = await fetch(url, {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify({
      avatar: {
        url: avatar,
        alt: avatarAlt,
      },
      bio,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.errors?.[0]?.message || "Failed to update profile");
  }

  return result.data;
}
