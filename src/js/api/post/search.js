import { API_SOCIAL_POSTS } from "../constants.js";
import { headers } from "../headers.js";

// Fetch posts related to search query
export async function searchPosts(query) {
  const url = `${API_SOCIAL_POSTS}/search?q=${encodeURIComponent(query)}`;

  const response = await fetch(url, {
    headers: headers(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.errors?.[0]?.message || "Failed to search posts");
  }

  return await response.json();
}
