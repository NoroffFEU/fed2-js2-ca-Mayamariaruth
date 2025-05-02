import { isLoggedIn } from "./auth.js";

// Redirect to login if path requires authentication and the user is not logged in
export function protectRoutes() {
  const currentPath = window.location.pathname;

  const protectedPaths = [
    "/",
    "/index.html",
    "/post/index.html",
    "/profile/",
    "/profile/authorPosts/",
  ];

  const needsAuth = protectedPaths.includes(currentPath);

  if (needsAuth && !isLoggedIn()) {
    sessionStorage.setItem(
      "notification",
      JSON.stringify({
        message: "You must be logged in to access this page",
        type: "error",
      })
    );
    window.location.href = "/auth/login/";
  }
}
