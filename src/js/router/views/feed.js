import { onCreatePost } from "../../ui/post/create.js";

const form = document.forms.createPostForm;

form.addEventListener("submit", onCreatePost);
