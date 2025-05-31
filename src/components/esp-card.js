// src/components/esp-card.js
import { html, css } from "../utils/template.js";

// @element esp-card
// @slot header - Content for the card's header (title, etc.).
// @slot image - An image for the card.
// @slot - Default slot for the card's main content.
// @slot footer - Content for the card's footer (buttons, etc.).
export default class EspCard extends HTMLElement {
  // Added 'shape' to observedAttributes
  static observedAttributes = ["variant", "clickable", "shape"];

  static styles = css`
    :host {
      display: block;
      background-color: var(--esp-color-surface);
      border: 1px solid transparent;
      border-radius: var(--esp-border-radius-md); /* Default 'square' shape */
      box-shadow: var(--esp-shadow-md);
      color: var(--esp-color-text);
      font-family: var(--esp-font-family);
      box-sizing: border-box;
      overflow: hidden;
      transition: var(--esp-transition-ease);
      user-select: none;
    }

    /* Slot Styles */
    ::slotted([slot="header"]) {
      padding: var(--esp-spacing-md);
      font-size: var(--esp-font-size-lg);
      font-weight: var(--esp-font-weight-semibold);
      margin: 0;
    }

    ::slotted([slot="image"]) {
      display: block;
      width: 100%;
      aspect-ratio: 16 / 9;
      object-fit: cover;
    }

    /* Main content slot */
    ::slotted(:not([slot])) {
      padding: var(--esp-spacing-md);
    }

    ::slotted([slot="footer"]) {
      padding: var(--esp-spacing-md);
      padding-top: 0;
      display: flex;
      gap: var(--esp-spacing-sm);
      justify-content: flex-end;
    }

    /* --- VARIANTS --- */
    /* Default (no variant attribute) - Already defined in :host */

    /* Outline Variant */
    :host([variant="outline"]) {
      background-color: transparent;
      box-shadow: none;
      border: 1px solid var(--esp-color-border);
    }

    /* Elevated Variant */
    :host([variant="elevated"]) {
      box-shadow: var(--esp-shadow-lg);
    }

    /* --- SHAPES --- */
    /* 'square' is default (border-radius-md) defined in :host */
    :host([shape="rounded"]) {
      border-radius: var(
        --esp-border-radius-lg
      ); /* Larger radius for 'rounded' */
    }

    /* --- CLICKABLE --- */
    :host([clickable]) {
      cursor: pointer;
    }

    /* Clickable Hover Effect - Subtle elevation change */
    :host([clickable]:hover) {
      box-shadow: var(--esp-shadow-lg);
      transform: translateY(-2px);
    }

    /* Clickable Focus */
    :host([clickable]:focus-visible) {
      outline: var(--esp-outline-width) solid var(--esp-color-primary);
      outline-offset: var(--esp-outline-offset);
    }
  `;

  static template = html`
    <template>
      <slot name="image"></slot>
      <slot name="header"></slot>
      <slot></slot>
      <slot name="footer"></slot>
    </template>
  `;

  shadowRoot = null;

  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: "closed" });
    this.shadowRoot.adoptedStyleSheets = [EspCard.styles];
    this.shadowRoot.appendChild(
      document.importNode(EspCard.template.content, true)
    );
  }

  connectedCallback() {
    this._applyClickableAccessibility();
  }

  disconnectedCallback() {}

  get variant() {
    return this.getAttribute("variant") || "default";
  }

  set variant(value) {
    if (value) {
      this.setAttribute("variant", value);
    } else {
      this.removeAttribute("variant");
    }
  }

  get clickable() {
    return this.hasAttribute("clickable");
  }

  set clickable(value) {
    if (value) {
      this.setAttribute("clickable", "");
    } else {
      this.removeAttribute("clickable");
    }
  }

  // NEW: Getter for 'shape' attribute
  get shape() {
    return this.getAttribute("shape") || "square"; // Default shape is "square"
  }

  // NEW: Setter for 'shape' attribute
  set shape(value) {
    if (value === "rounded") {
      this.setAttribute("shape", value);
    } else {
      this.removeAttribute("shape"); // Any other value or false reverts to "square" default
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    if (name === "clickable") {
      this._applyClickableAccessibility();
    }
  }

  _applyClickableAccessibility() {
    if (this.clickable) {
      if (!this.hasAttribute("tabindex")) {
        this.setAttribute("tabindex", "0");
      }
      if (!this.hasAttribute("role")) {
        this.setAttribute("role", "button");
      }
    } else {
      this.removeAttribute("tabindex");
      this.removeAttribute("role");
    }
  }
}

customElements.define("esp-card", EspCard);
