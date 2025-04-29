import { API_SOCIAL_POSTS } from "../constants.js";
import { headers } from "../headers.js";

// Fetch individual post from API
export async function readPost(id) {
  const url = `${API_SOCIAL_POSTS}/${id}`;

  url.searchParams.append("_author", "true");

  const response = await fetch(url, {
    headers: headers(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.errors?.[0]?.message || "Failed to load post");
  }

  return await response.json();
}
