import { readPostsByAuthor } from "../../api/profile/authorPosts.js";

// Renders the author's posts on the profile page based on the "username" query parameter
export async function renderAuthorPostsPage() {
  const container = document.getElementById("author-feed-container");
  if (!container) return;

  // Extract the "username" query parameter from the URL
  const params = new URLSearchParams(window.location.search);
  const username = params.get("username");

  if (!username) {
    container.innerHTML = "<p>User posts not found.</p>";
    return;
  }

  try {
    const posts = await readPostsByAuthor(username);
    container.innerHTML = "";

    // Add heading and post count
    const heading = document.createElement("h1");
    heading.className = "mt-4 mb-2 mx-4";
    heading.textContent = `${username}'s posts`;
    const postCount = document.createElement("p");
    postCount.className = "mx-4 mb-4";
    postCount.textContent = `${posts.length} post${
      posts.length !== 1 ? "s" : ""
    }`;

    container.appendChild(heading);
    container.appendChild(postCount);

    // Loop through all the posts and create a card for each post
    posts.forEach((post) => {
      const postCard = document.createElement("div");
      postCard.className = "card mx-auto mt-4 text-white pt-1 post-card";

      // Create the HTML content
      postCard.innerHTML = `
          <div class="card-body">
            <h2 class="card-title mb-3">${post.title}</h2>
            <p class="card-text mb-3 h5">${post.body || ""}</p>
            ${
              post.media?.url
                ? `<img src="${post.media.url}" alt="${
                    post.media.alt || "Post image"
                  }" class="post-image img-fluid mb-4">`
                : ""
            }
            <div class="mb-2">
              <span>By <strong>${
                post.author?.name || "Unknown Author"
              }</strong></span> |
              <span>${new Date(post.created).toLocaleDateString()}</span>
            </div>
          </div>
        `;

      container.appendChild(postCard);
    });
  } catch (error) {
    console.error("Failed to render author's posts:", error);
    container.innerHTML = "<p>Something went wrong while loading posts.</p>";
  }
}
