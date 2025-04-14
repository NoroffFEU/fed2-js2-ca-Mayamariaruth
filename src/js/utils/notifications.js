// Display notifications with Bootstrap
export function showNotification(message, type = "success") {
  const notificationContainer = document.getElementById("notifications");
  if (!notificationContainer) return;

  const alertType = type === "success" ? "alert-success" : "alert-danger";

  const notification = document.createElement("div");
  notification.className = `alert ${alertType} alert-dismissible fade show`;
  notification.role = "alert";
  notification.textContent = message;

  notificationContainer.appendChild(notification);

  setTimeout(() => {
    if (notification && notification.parentNode) {
      notification.classList.remove("show");
      notification.classList.add("fade");
      setTimeout(() => notification.remove(), 150);
    }
  }, 6000);
}
