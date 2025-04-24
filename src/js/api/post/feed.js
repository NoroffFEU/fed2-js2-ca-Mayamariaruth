import { API_SOCIAL_POSTS } from "../constants.js";
import { headers } from "../headers.js";

// Fetch individual post from API
export async function readPost(id) {}

// Fetch all created posts from API
export async function readPosts() {
  const url = new URL(API_SOCIAL_POSTS);

  url.searchParams.append("_author", "true");

  const res = await fetch(url, {
    headers: headers(),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to load posts");
  }

  const { data } = await res.json();
  return data;
}

export async function readPostsByUser(username, limit = 12, page = 1, tag) {}
