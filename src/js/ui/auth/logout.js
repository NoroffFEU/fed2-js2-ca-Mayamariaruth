// Logout logic to clear storage and redirect
export function onLogout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("profile");

  window.location.href = "/fed2-js2-ca-Mayamariaruth/";
}
