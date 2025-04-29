import { isLoggedIn } from "../../utils/auth.js";
import { createPost } from "../../api/post/create.js";
import { readProfile } from "../../api/profile/read.js";
import { loadPosts } from "./feed.js";
import { showNotification } from "../../utils/notifications.js";

// Render the create post form on home page for logged in users
export async function renderCreatePostForm() {
  if (!isLoggedIn()) return;

  const container = document.getElementById("create-post-container");
  if (!container) return;

  const profile = JSON.parse(localStorage.getItem("profile"));
  const username = profile?.name;
  if (!username) return;
  const user = await readProfile(username);

  container.innerHTML = `
    <div id="feed-boxes" class="rounded-3 mt-4 mb-3">
      <div class="d-flex align-items-center mb-3">
        <img src="${user.avatar?.url || "/images/default-avatar.png"}" alt="${
    user.avatar?.alt || "User avatar"
  }" class="rounded-circle me-2 user-avatar">
        <strong class="h5 mb-0">${user.name}</strong>
      </div>
      <div>
        <input type="text" class="form-control rounded-3 create-form-field" placeholder="What's on your mind?" data-bs-toggle="modal" data-bs-target="#create-post-modal" readonly />
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="create-post-modal" tabindex="-1" aria-labelledby="create-post-modal-label">
      <div class="modal-dialog">
        <form id="create-post-form" class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title" id="create-post-modal-label">Create Post</h2>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <input type="text" name="title" class="form-control mb-3 rounded-3 create-form-field" placeholder="Title" />
            <textarea name="body" class="form-control mb-3 rounded-3 create-form-field" placeholder="Write your post..." rows="10"></textarea>
            <input type="text" name="mediaUrl" class="form-control mb-3 rounded-3 create-form-field" placeholder="Image URL (optional)" />
            <input type="text" name="mediaAlt" class="form-control mb-3 rounded-3 create-form-field" placeholder="Image alt text (optional)" />
          </div>
          <div class="modal-footer">
            <button type="submit" class="submit-btn">Post</button>
          </div>
        </form>
      </div>
    </div>
  `;

  const form = document.getElementById("create-post-form");
  if (form) {
    form.addEventListener("submit", onCreatePost);
  }
}

// Create post form submission logic
export async function onCreatePost(event) {
  event.preventDefault();

  const form = event.target;
  const title = form.title.value.trim();
  const body = form.body.value.trim();
  const mediaUrl = form.mediaUrl.value.trim();
  const mediaAlt = form.mediaAlt.value.trim();

  const errors = [];

  // Title validation
  if (!title || title.length < 3) {
    errors.push("Title must be at least 3 characters long.");
  }

  // Body text validation
  if (!body || body.length < 3) {
    errors.push("Post text must be at least 3 characters long.");
  }

  // Image URL and alt text validation
  if (mediaUrl && mediaAlt) {
    try {
      new URL(mediaUrl);
    } catch {
      errors.push("Image URL must be a valid URL.");
    }
  } else if (mediaUrl || mediaAlt) {
    errors.push("Both image URL and alt text are required if one is provided.");
  }

  // Display all errors in the notification
  if (errors.length > 0) {
    showNotification(errors.join(" "), "error");
    return;
  }

  const postData = {
    title,
    body,
  };

  if (mediaUrl && mediaAlt) {
    postData.media = {
      url: mediaUrl,
      alt: mediaAlt,
    };
  }

  try {
    await createPost(postData);
    showNotification("Post created successfully!", "success");
    form.reset();
    bootstrap.Modal.getInstance(
      document.getElementById("create-post-modal")
    ).hide();
    await loadPosts();
  } catch (error) {
    showNotification(error.message, "error");
  }
}
