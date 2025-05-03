import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  appType: "mpa",
  base: "/fed2-js2-ca-Mayamariaruth/", // Base path for the project
  build: {
    target: "esnext",
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Create a chunk per view file so Vite bundles the views files
          if (id.includes("src/js/router/views")) {
            const viewName = id.split("/").pop().split(".")[0];
            return viewName;
          }
        },
      },
      input: {
        main: resolve(__dirname, "index.html"),
        login: resolve(__dirname, "auth/login/index.html"),
        register: resolve(__dirname, "auth/register/index.html"),
        profile: resolve(__dirname, "profile/index.html"),
        authorPosts: resolve(__dirname, "profile/authorPosts/index.html"),
        post: resolve(__dirname, "post/index.html"),
      },
    },
  },
});
