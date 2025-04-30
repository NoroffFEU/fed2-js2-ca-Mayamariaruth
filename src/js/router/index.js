// This function controls which JavaScript file is loaded on which page
// In order to add additional pages, you will need to implement them below
// You may change the behaviour or approach of this file if you choose
export default async function router(pathname = window.location.pathname) {
  switch (pathname) {
    case "/index.html":
    case "/":
      await import("./views/feed.js");
      break;
    case "/auth/login/":
      await import("./views/login.js");
      break;
    case "/auth/register/":
      await import("./views/register.js");
      break;
    case "/post/index.html":
      await import("./views/post.js");
      break;
    case "/profile/":
      await import("./views/profile.js");
      break;
    case "/profile/authors/":
      await import("./views/authorPosts.js");
      break;
    default:
      await import("./views/notFound.js");
  }
}
