// Helper function to check if the user is logged in
export function isLoggedIn() {
  return !!localStorage.getItem("accessToken");
}

// Get the logged-in user's name from localStorage
export function getUserName() {
  const profile = JSON.parse(localStorage.getItem("profile"));
  return profile?.name || null;
}
