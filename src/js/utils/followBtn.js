import { followUser, unfollowUser } from "../api/profile/follow.js";
import { getUserName } from "./auth.js";

export function createFollowButton(profileName, isFollowing = false) {
  if (profileName === getUserName()) return null;

  const btn = document.createElement("button");
  btn.className = "follow-btn text-primary";
  btn.textContent = isFollowing ? "Unfollow" : "Follow";

  btn.addEventListener("click", async () => {
    try {
      if (btn.textContent === "Follow") {
        await followUser(profileName);
        btn.textContent = "Unfollow";
      } else {
        await unfollowUser(profileName);
        btn.textContent = "Follow";
      }
    } catch (err) {
      console.error("Failed to follow/unfollow", err);
    }
  });

  return btn;
}
