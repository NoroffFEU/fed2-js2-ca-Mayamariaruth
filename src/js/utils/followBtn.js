import { followUser, unfollowUser } from "../api/post/follow.js";
import { getUserName } from "./auth.js";

// Create follow/unfollow button with event listener
export function createFollowButton(profileName) {
  if (profileName === getUserName()) return null;

  const btn = document.createElement("button");
  btn.className = "follow-btn text-primary";
  btn.textContent = isFollowing(profileName) ? "Unfollow" : "Follow";
  btn.dataset.username = profileName;

  btn.addEventListener("click", async () => {
    try {
      if (btn.textContent === "Follow") {
        await followUser(profileName);
        btn.textContent = "Unfollow";
        updateFollowingList(profileName, "add");
        updateAllFollowButtons(profileName, true);
      } else {
        await unfollowUser(profileName);
        btn.textContent = "Follow";
        updateFollowingList(profileName, "remove");
        updateAllFollowButtons(profileName, false);
      }
    } catch (err) {
      console.error("Failed to follow/unfollow", err);
    }
  });

  return btn;
}

// Check if the current user is following a specific user
function isFollowing(username) {
  const followingList = JSON.parse(localStorage.getItem("followingList")) || [];
  return followingList.includes(username);
}

// Update localStorage when follow/unfollow happens
function updateFollowingList(username, action) {
  let followingList = JSON.parse(localStorage.getItem("followingList")) || [];

  if (action === "add" && !followingList.includes(username)) {
    followingList.push(username);
  } else if (action === "remove") {
    followingList = followingList.filter((name) => name !== username);
  }

  localStorage.setItem("followingList", JSON.stringify(followingList));
}

// Update all follow buttons for a given username
export function updateAllFollowButtons(username, isFollowing) {
  const buttons = document.querySelectorAll(
    `.follow-btn[data-username="${username}"]`
  );

  buttons.forEach((btn) => {
    btn.textContent = isFollowing ? "Unfollow" : "Follow";
  });
}
