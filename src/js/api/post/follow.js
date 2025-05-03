import { API_SOCIAL_PROFILES } from "../constants.js";
import { headers } from "../headers.js";

// Follow a specific user
export async function followUser(username) {
  const url = `${API_SOCIAL_PROFILES}/${username}/follow`;

  const response = await fetch(url, {
    method: "PUT",
    headers: headers(),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.errors?.[0]?.message || "Failed to follow user");
  }

  return result;
}

// Unfollow a specific user
export async function unfollowUser(username) {
  const url = `${API_SOCIAL_PROFILES}/${username}/unfollow`;

  const response = await fetch(url, {
    method: "PUT",
    headers: headers(),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.errors?.[0]?.message || "Failed to unfollow user");
  }

  return result;
}
