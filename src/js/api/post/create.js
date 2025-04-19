import { API_SOCIAL_POSTS } from "../constants.js";
import { headers } from "../headers.js";

export async function createPost({ title, body, media }) {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("You must be logged in to create a post.");
  }

  const postData = {
    title,
    body,
    media,
  };

  try {
    const requestHeaders = headers();
    requestHeaders.append("Authorization", `Bearer ${accessToken}`);

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
    throw new Error(`Failed to create post: ${error.message}`);
  }
}
