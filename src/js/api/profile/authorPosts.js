import { API_SOCIAL_PROFILES } from "../constants.js";
import { headers } from "../headers.js";

// Fetch all created posts by one author from API
export async function readPostsByAuthor(username) {
  const url = `${API_SOCIAL_PROFILES}/${username}/posts?_author=true`;

  const response = await fetch(url, {
    headers: headers(),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      error.errors?.[0]?.message || "Failed to fetch user's posts"
    );
  }

  return result.data;
}
