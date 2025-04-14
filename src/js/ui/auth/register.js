import { registerUser } from "../../api/auth/register";
import { showNotification } from "../../utils/notifications.js";

// Register form submission logic with validation
export async function onRegister(event) {
  event.preventDefault();

  const form = event.target;
  const usernameField = form.username;
  const emailField = form.email;
  const passwordField = form.password;

  const username = usernameField.value.trim();
  const email = emailField.value.trim();
  const password = passwordField.value;

  [usernameField, emailField, passwordField].forEach((field) =>
    field.classList.remove("is-invalid")
  );

  let hasError = false;

  // Check for empty fields
  if (!username) {
    usernameField.classList.add("is-invalid");
    hasError = true;
  }
  if (!email) {
    emailField.classList.add("is-invalid");
    hasError = true;
  }
  if (!password) {
    passwordField.classList.add("is-invalid");
    hasError = true;
  }

  if (hasError) {
    showNotification("Please fill in all fields", "error");
    return;
  }

  // Username validation
  const punctuationMatches = username.match(/[^\w\s]/g);
  if (
    punctuationMatches &&
    punctuationMatches.length > 0 &&
    !username.includes("_")
  ) {
    usernameField.classList.add("is-invalid");
    showNotification(
      "Username can only contain letters, numbers, and underscores",
      "error"
    );
    return;
  }

  // Email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email) || !email.endsWith("@stud.noroff.no")) {
    emailField.classList.add("is-invalid");
    showNotification("Email must be a valid @stud.noroff.no address", "error");
    return;
  }

  // Password validation
  if (password.length < 8) {
    passwordField.classList.add("is-invalid");
    showNotification("Password must be at least 8 characters", "error");
    return;
  }

  try {
    const result = await registerUser(username, email, password);
    if (result) {
      showNotification("Registered successfully!", "success");
      window.location.href = "/auth/login/";
    }
  } catch (error) {
    showNotification(error.message, "error");
  }
}
