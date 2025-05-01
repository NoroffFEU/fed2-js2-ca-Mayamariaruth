import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  appType: "mpa",
  base: "/fed2-js2-ca-Mayamariaruth/",
  build: {
    target: "esnext",
    rollupOptions: {
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
