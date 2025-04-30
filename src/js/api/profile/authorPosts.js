import { API_SOCIAL_PROFILES } from "../constants.js";
import { headers } from "../headers.js";

// Fetch all created posts by one author from API
export async function readPostsByAuthor(username) {
  const url = `${API_SOCIAL_PROFILES}/${username}/posts?_author=true`;

  const response = await fetch(url, {
    headers: headers(),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      error.errors?.[0]?.message || "Failed to fetch user's posts"
    );
  }

  return await response.json();
}
