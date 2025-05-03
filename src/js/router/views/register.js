import { onRegister } from "../../ui/auth/register.js";

const form = document.forms.registerForm;
form.addEventListener("submit", onRegister);
