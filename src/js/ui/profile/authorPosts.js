import { readPostsByAuthor } from "../../api/profile/authorPosts.js";

// Render all author posts
export async function renderAuthorPostsPage() {
  const container = document.getElementById("author-feed-container");
  const params = new URLSearchParams(window.location.search);
  const username = params.get("username");

  const heading = document.createElement("h1");
  heading.className = "mt-4 mb-4 mx-4";
  heading.textContent = `${username}'s posts`;
  container.before(heading);

  if (!username || !container) {
    container.innerHTML = "<p>User posts not found.</p>";
    return;
  }

  try {
    const posts = await readPostsByAuthor(username);
    container.innerHTML = "";

    posts.forEach((post) => {
      const postCard = document.createElement("div");
      postCard.className = "card mx-auto mb-5 mt-4 text-white pt-1 post-card";

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
