import { API_AUTH_LOGIN } from "../constants.js";
import { headers } from "../headers.js";

// Authenticates login and returns a valid access token
export async function loginUser({ email, password }) {
  const credentials = { email, password };

  const reqHeaders = headers();

  try {
    const response = await fetch(API_AUTH_LOGIN, {
      method: "POST",
      headers: reqHeaders,
      body: JSON.stringify(credentials),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.errors?.[0]?.message || "Login failed");
    }

    // Store access token and user data
    localStorage.setItem("accessToken", data.data.accessToken);
    localStorage.setItem("profile", JSON.stringify(data.data));

    return data.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
}
