import { API_SOCIAL_POSTS } from "../constants.js";
import { headers } from "../headers.js";

// Sends an authenticated request to delete a post
export async function deletePost(id) {
  const url = `${API_SOCIAL_POSTS}/${id}`;

  const response = await fetch(url, {
    method: "DELETE",
    headers: headers(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.errors?.[0]?.message || "Failed to delete post");
  }

  return true;
}
