const BASE_PATH = "/fed2-js2-ca-Mayamariaruth";

export default async function router(pathname = window.location.pathname) {
  const path = pathname.replace(BASE_PATH, "") || "/";
  const normalizedPath = path.replace(/\/index\.html$|\/$/g, "") || "/";

  switch (normalizedPath) {
    case "":
    case "/":
      console.log("📦 Loading feed view");
      await import("./views/feed.js");
      break;
    case "/auth/login":
      await import("./views/login.js");
      break;
    case "/auth/register":
      await import("./views/register.js");
      break;
    case "/post":
      await import("./views/post.js");
      break;
    case "/profile":
      await import("./views/profile.js");
      break;
    case "/profile/authorPosts":
      await import("./views/authorPosts.js");
      break;
    default:
      console.warn("⚠️ Route not found:", normalizedPath);
      await import("./views/notFound.js");
  }
}
