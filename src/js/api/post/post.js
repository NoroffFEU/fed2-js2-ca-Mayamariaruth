import { API_SOCIAL_POSTS } from "../constants.js";
import { headers } from "../headers.js";

// Fetch individual post from API with ID and author
export async function readPost(id) {
  const url = `${API_SOCIAL_POSTS}/${id}?_author=true`;

  const response = await fetch(url, {
    headers: headers(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.errors?.[0]?.message || "Failed to load post");
  }

  const responseData = await response.json();
  return responseData.data;
}
