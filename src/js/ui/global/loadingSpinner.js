// Create and show the loading spinner
export function showLoadingSpinner() {
  if (document.getElementById("loading-spinner")) return;

  const spinnerContainer = document.createElement("div");
  spinnerContainer.id = "loading-spinner";

  const spinner = document.createElement("div");
  spinner.classList.add("spinner-border", "text-success-emphasis");
  spinner.setAttribute("role", "status");

  spinnerContainer.appendChild(spinner);

  document.body.appendChild(spinnerContainer);
}

// Hide the loading spinner
export function hideLoadingSpinner() {
  const spinnerContainer = document.getElementById("loading-spinner");
  if (spinnerContainer) {
    spinnerContainer.remove();
  }
}
