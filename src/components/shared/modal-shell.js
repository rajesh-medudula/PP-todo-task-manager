// assets
import { getGlobalAsset } from "../../assets/svg/global.js";

// global modal shell (template).
export const createModalShell = ({ title, content, onClose, variant }) => {
  // overlay
  const overlay = document.createElement("div");
  overlay.className = `modal-overlay modal-overlay--${variant}`;

  // modal
  const modal = document.createElement("section");
  modal.className = `modal-shell modal-shell--${variant}`;

  // header
  const header = document.createElement("div");
  header.className = `modal-shell__header modal-shell__header--${variant}`;

  // header content
  const heading = document.createElement("h3");
  heading.classList = `modal-shell__title modal-shell__title--${variant}`;
  heading.textContent = title;

  const closeBtn = document.createElement("button");
  closeBtn.className = `modal-shell__close-btn modal-shell__close--${variant}`;
  closeBtn.innerHTML = getGlobalAsset("close-icon");

  closeBtn.addEventListener("click", () => {
    onClose(overlay);
  });
  // main content by developer
  const body = document.createElement("div");
  body.className = `modal-shell__content modal-shell__content--${variant}`;

  // when a modal doesnt have a close(x icon) functionality.
  if (onClose !== null) {
    // if has append closeBtn functionality.
    header.append(heading, closeBtn);
  } else {
    // if no then only append heading.
    header.append(heading);
  }

  body.append(content);
  modal.append(header, body);
  overlay.append(modal);

  return overlay;
};
