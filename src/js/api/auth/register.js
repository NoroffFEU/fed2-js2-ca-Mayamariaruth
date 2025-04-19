import { API_AUTH_REGISTER } from "../constants.js";
import { headers } from "../headers.js";

// Registers a new user
export async function registerUser(username, email, password) {
  const userData = { name: username, email, password };

  const reqHeaders = headers();
  reqHeaders.append("Content-Type", "application/json");

  try {
    const response = await fetch(API_AUTH_REGISTER, {
      method: "POST",
      headers: reqHeaders,
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errors?.[0]?.message || "Registration failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}
