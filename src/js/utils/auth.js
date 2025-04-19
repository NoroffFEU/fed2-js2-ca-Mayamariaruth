// Helper function to check if the user is logged in
export function isLoggedIn() {
  return !!localStorage.getItem("accessToken");
}
