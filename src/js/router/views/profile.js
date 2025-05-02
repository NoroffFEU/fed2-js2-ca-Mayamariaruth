import { displayUserProfile } from "@ui/profile/read.js";
import { onOpenEditProfileModal } from "@ui/profile/edit.js";

displayUserProfile();

const editProfileBtn = document.getElementById("edit-profile-btn");
editProfileBtn.addEventListener("click", onOpenEditProfileModal);
