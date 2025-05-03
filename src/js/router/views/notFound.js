// Handles unmatched routes by alerting the user and logging debug info
export default function notFoundView() {
  alert(
    "The page you are trying to access cannot be found. It may not exist, or the path is incorrect."
  );

  console.error(
    "[Router] No matching route found.\n" +
      `Path: ${window.location.pathname}\n` +
      "Possible reasons:\n" +
      "- The URL does not match any defined routes in router.js\n" +
      "- The page/component was not built or deployed correctly\n" +
      "- You are missing required files (e.g., HTML partials or static assets) in the dist folder\n" +
      "- Using GitHub Pages? Make sure your vite.config.js has the correct `base` path set"
  );
}
