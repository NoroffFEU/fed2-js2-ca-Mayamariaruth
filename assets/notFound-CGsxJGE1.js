function e(){alert("The page you are trying to access cannot be found. It may not exist, or the path is incorrect."),console.error(`[Router] No matching route found.
Path: ${window.location.pathname}
Possible reasons:
- The URL does not match any defined routes in router.js
- The page/component was not built or deployed correctly
- You are missing required files (e.g., HTML partials or static assets) in the dist folder
- Using GitHub Pages? Make sure your vite.config.js has the correct \`base\` path set`)}export{e as default};
