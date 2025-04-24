import { API_SOCIAL_POSTS } from "../constants.js";
import { headers } from "../headers.js";

// Authenticates edit post logic with API
export async function editPost(id, { title, body, media }) {
  const url = `${API_SOCIAL_POSTS}/${id}`;

  const response = await fetch(url, {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify({
      title,
      body,
      media,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.errors?.[0]?.message || "Failed to update post");
  }

  return await response.json();
}
