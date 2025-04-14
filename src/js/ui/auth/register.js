import { registerUser } from "../../api/auth/register";

// Register form submission logic
export async function onRegister(event) {
  event.preventDefault();

  const form = event.target;
  const username = form.username.value.trim();
  const email = form.email.value.trim();
  const password = form.password.value;

  if (!username || !email || !password) {
    showNotification("Please fill in all fields", "error");
    return;
  }

  const result = await registerUser(username, email, password);

  if (result) {
    showNotification("Registered successfully!", "success");
    window.location.href = "/auth/login/";
  }
}
