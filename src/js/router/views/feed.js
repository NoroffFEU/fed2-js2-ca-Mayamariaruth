import { renderCreatePostForm } from "../../ui/post/create.js";
import { loadPosts } from "../../ui/post/feed.js";
import { searchPosts } from "../../api/post/search.js";

const query = localStorage.getItem("searchQuery");

if (query) {
  searchPosts(query)
    .then((response) => {
      loadPosts(response.data);
      localStorage.removeItem("searchQuery");
    })
    .catch((error) => {
      console.error("Failed to load search results:", error);
    });
} else {
  loadPosts();
}

renderCreatePostForm();
loadPosts();
