import { loginUser } from "../../api/auth/login.js";
import { showNotification } from "../../utils/notifications.js";
import {
  showLoadingSpinner,
  hideLoadingSpinner,
} from "../global/loadingSpinner.js";

/**
 * Handle login form submission:
 * - Validates input
 * - Sends login request
 * - Shows loading spinner and notifications
 * - Redirects on success
 */
export async function onLogin(event) {
  event.preventDefault();

  const form = event.target;
  const emailField = form.email;
  const passwordField = form.password;

  const email = emailField.value.trim().toLowerCase();
  const password = passwordField.value;

  // Input validation
  if (!email || !password) {
    showNotification("Please enter both email and password", "error");
    return;
  }

  try {
    showLoadingSpinner();
    const user = await loginUser({ email, password });

    // Store success message to display after redirect
    sessionStorage.setItem(
      "notification",
      JSON.stringify({
        type: "success",
        message: `Welcome back, ${user.name}!`,
      })
    );
    window.location.href = "/fed2-js2-ca-Mayamariaruth/";
  } catch (error) {
    showNotification(error.message, "error");
  } finally {
    hideLoadingSpinner();
  }
}
