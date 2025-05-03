import { API_KEY } from "./constants";

// Constructs and returns the headers for API requests
export function headers() {
  const headers = new Headers();

  if (API_KEY) {
    headers.append("X-Noroff-API-Key", API_KEY);
  }

  const token = localStorage.getItem("accessToken");
  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }

  headers.append("Content-Type", "application/json");

  return headers;
}
