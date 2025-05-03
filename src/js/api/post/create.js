import { API_SOCIAL_POSTS } from "../constants.js";
import { headers } from "../headers.js";

// Creates a new post with title, body, and optional media (with access token)
export async function createPost({ title, body, media }) {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("You must be logged in to create a post.");
  }

  const postData = {
    title,
    body,
  };

  if (media && media.url) {
    postData.media = media;
  }

  try {
    const requestHeaders = headers();

    const response = await fetch(API_SOCIAL_POSTS, {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const responseData = await response.json();
    return responseData.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw new Error(`Failed to create post: ${error.message}`);
  }
}
