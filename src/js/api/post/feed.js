import { API_SOCIAL_POSTS } from "../constants.js";
import { headers } from "../headers.js";

// Fetch all created posts from API
export async function readPosts() {
  const url = new URL(API_SOCIAL_POSTS);

  url.searchParams.append("_author", "true");

  const response = await fetch(url, {
    headers: headers(),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to load posts");
  }

  const { data } = await response.json();
  return data;
}

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

// Fetch posts related to a search query
export async function searchPosts(query) {
  const url = new URL(`${API_SOCIAL_POSTS}/search`);
  url.searchParams.append("q", query);
  url.searchParams.append("_author", "true");

  const response = await fetch(url, {
    headers: headers(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.errors?.[0]?.message || "Failed to search posts");
  }

  return await response.json();
}
