import { onLogin } from "../../ui/auth/login";

const form = document.forms.loginForm;

form.addEventListener("submit", onLogin);
