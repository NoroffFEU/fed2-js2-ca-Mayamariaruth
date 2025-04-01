import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  appType: "mpa",
  base: "",
  build: {
    target: "esnext",
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "./index.html"),
        login: path.resolve(__dirname, "./auth/login/index.html"),
        register: path.resolve(__dirname, "./auth/register/index.html"),
        profile: path.resolve(__dirname, "./profile/index.html"),
        post: path.resolve(__dirname, "./post/index.html"),
        editPost: path.resolve(__dirname, "./post/edit/index.html"),
        createPost: path.resolve(__dirname, "./post/create/index.html"),
      },
    },
  },
});
