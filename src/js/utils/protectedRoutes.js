import { isLoggedIn } from "./auth.js";

// Redirect to login if path requires authentication and the user is not logged in
export function protectRoutes() {
  const currentPath = window.location.pathname.replace(
    "/fed2-js2-ca-Mayamariaruth",
    ""
  );

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
    window.location.href = "/fed2-js2-ca-Mayamariaruth/auth/login/";
  }
}
