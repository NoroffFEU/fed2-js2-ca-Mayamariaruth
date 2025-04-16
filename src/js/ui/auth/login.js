import { loginUser } from "../../api/auth/login.js";
import { showNotification } from "../../utils/notifications.js";

// Login form submission logic with validation
export async function onLogin(event) {
  event.preventDefault();

  const form = event.target;
  const emailField = form.email;
  const passwordField = form.password;

  const email = emailField.value.trim().toLowerCase();
  const password = passwordField.value;

  if (!email || !password) {
    showNotification("Please enter both email and password", "error");
    return;
  }

  try {
    const user = await loginUser({ email, password });
    showNotification(`Welcome, ${user.name}!`, "success");
    window.location.href = "/";
  } catch (error) {
    showNotification(error.message, "error");
  }
}
