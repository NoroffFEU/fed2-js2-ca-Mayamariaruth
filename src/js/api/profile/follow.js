import { API_SOCIAL_PROFILES } from "../constants.js";
import { headers } from "../headers.js";

// Follow a specific user
export async function readProfile(username) {
  const url = `${API_SOCIAL_PROFILES}/${username}/follow`;

  const response = await fetch(url, {
    method: "PUT",
    headers: headers(),
  });

  if (!response.ok) {
    throw new Error(result.errors?.[0]?.message || "Failed to follow profile");
  }

  return await response.json();
}

// Unfollow a specific user
export async function readProfile(username) {
  const url = `${API_SOCIAL_PROFILES}/${username}/unfollow`;

  const response = await fetch(url, {
    method: "PUT",
    headers: headers(),
  });

  if (!response.ok) {
    throw new Error(result.errors?.[0]?.message || "Failed to follow profile");
  }

  return await response.json();
}
