import { onLogin } from "../../ui/auth/login.js";

const form = document.forms.loginForm;

form.addEventListener("submit", onLogin);
