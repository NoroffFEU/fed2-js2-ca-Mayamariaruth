import { API_SOCIAL_PROFILES } from "../constants.js";
import { headers } from "../headers.js";

// Fetch logged in user data from API
export async function readProfile(username) {
  const res = await fetch(`${API_SOCIAL_PROFILES}/${username}`, {
    headers: headers(),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to load profile");
  }

  const { data } = await res.json();
  return data;
}
