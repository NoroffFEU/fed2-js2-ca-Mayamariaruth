import { Modal } from "bootstrap";

// Load the modal HTML into the DOM
export async function loadAboutModal() {
  const response = await fetch(
    "/fed2-js2-ca-Mayamariaruth/components/aboutModal.html"
  );
  const modalHTML = await response.text();
  document.body.insertAdjacentHTML("beforeend", modalHTML);
}

// Set up click event on the About icons
export function aboutModalTrigger() {
  const aboutLinks = document.querySelectorAll(
    "#about-link-desktop, #about-link-mobile"
  );
  const modalElement = document.querySelector("#about-modal");

  if (aboutLinks.length && modalElement) {
    const modal = new Modal(modalElement);

    aboutLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        modal.show();
      });
    });

    // Fix the aria-hidden issue on the modal backdrop when it's shown
    modalElement.addEventListener("shown.bs.modal", () => {
      const backdrop = document.querySelector(".modal-backdrop");
      if (backdrop) {
        backdrop.removeAttribute("aria-hidden");
      }
    });
  }
}
