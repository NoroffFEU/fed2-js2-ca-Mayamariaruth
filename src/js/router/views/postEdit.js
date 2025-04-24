import { onEditPost } from "../../ui/post/edit.js";

const form = document.forms.editPostForm;

form.addEventListener("submit", onEditPost);
