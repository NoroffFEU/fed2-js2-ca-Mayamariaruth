// Helper function for logged in status
export function isLoggedIn() {
  return !!localStorage.getItem("accessToken");
}
