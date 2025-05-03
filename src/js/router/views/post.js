import { displayPost } from "../../ui/post/post.js";

const params = new URLSearchParams(window.location.search);
const postId = params.get("id");

if (postId) {
  displayPost(postId);
} else {
  console.error("No post ID found in URL.");
}
