// src/components/esp-button.js
import { html } from "../utils/template.js";

// @element esp-button
class EspButton extends HTMLElement {
  static get observedAttributes() {
    return ["variant", "size", "disabled", "loading"];
  }

  static #shadowTemplate = html`
    <template>
      <span class="spinner" hidden></span>
      <span class="content"><slot></slot></span>
    </template>
  `;

  static #shadowStyleSheet = new CSSStyleSheet();

  static {
    EspButton.#shadowStyleSheet.replaceSync(`
    /* :host styles the custom element itself, which is now our button */
      :host {
        --esp-btn-bg: #007bff;
        --esp-btn-color: white;
        --esp-btn-font-size: 0.875rem;
        --esp-btn-padding: 0.5rem 1rem;

        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-family: inherit;
        cursor: pointer;
        text-align: center;
        white-space: nowrap;
        position: relative;
        overflow: hidden;
        box-sizing: border-box;
        outline: none;
        -webkit-tap-highlight-color: transparent;
        user-select: none;
        border: none;
        border-radius: 6px;
        font-weight: 600;
        transition: background-color 0.2s ease, color 0.2s ease, text-decoration 0.2s ease;

        /* --- DEFAULT SIZE: MEDIUM --- */
        padding: var(--esp-btn-padding);
        font-size: var(--esp-btn-font-size);

        /* --- DEFAULT VARIANT (PRIMARY) --- */
        background-color: var(--esp-btn-bg);
        color: var(--esp-btn-color);
        border-color: var(--esp-btn-bg);
      }

      /* Styles for the content wrapper within the button */
      .content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      /* --- Disabled State for the host element --- */
      :host([disabled]) {
        opacity: 0.6;
        cursor: not-allowed;
        background-color: #eff2f5;
        color: #818b98;
      }

      :host([variant="ghost"]) {
        background-color: transparent;
        color: #1f2328;
      }

      :host([variant="outline"]) {
        background-color: transparent;
        color: var(--esp-btn-bg);
        border: 1px solid var(--esp-btn-bg);
      }

      :host([variant="link"]) {
        background-color: transparent;
        padding: 0;
        font-weight: 500;
        border-radius: 0;
        color: #0969da;
      }

      :host([variant="link"]) :hover {
        text-decoration: underline;
      }

      :host([icon-only]) {
        padding: 0.5rem;
        border-radius: 50%;
        width: 2.5rem;
        height: 2.5rem;
        justify-content: center;
      }

      /* --- Loading State --- */
      :host([loading]) {
        pointer-events: none;
        cursor: default;
        opacity: 0.8;
        position: relative;
        gap: 0.5rem;
      }

      .spinner {
        width: 1em;
        height: 1em;
        border: 2px solid currentColor;
        border-top: 2px solid transparent;
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
        z-index: 1;
      }

      @keyframes spin {
        to { transform: rotate(345deg); }
      }
    `);
  }

  _shadowRoot = null;
  _spinner = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "closed" });
    this._shadowRoot.adoptedStyleSheets = [EspButton.#shadowStyleSheet];
    this._shadowRoot.append(
      document.importNode(EspButton.#shadowTemplate.content, true)
    );

    this._spinner = this._shadowRoot.querySelector(".spinner");
  }

  connectedCallback() {
    this.setAttribute("role", "button");
    this.setAttribute("tabindex", "0");
    this._update();
    this.addEventListener("click", this._handleClick);
  }

  disconnectedCallback() {
    this.removeEventListener("click", this._handleClick);
  }

  attributeChangedCallback() {
    this._update();
  }

  _update() {
    const loading = this.hasAttribute("loading");
    const disabled = this.hasAttribute("disabled");
    const variant = this.getAttribute("variant") || "primary";
    const size = this.getAttribute("size") || "medium";

    this.setAttribute("aria-disabled", disabled);
    this.setAttribute("aria-busy", loading);

    this._spinner.hidden = !loading;

    if (variant !== "link") {
      this.style.setProperty("--esp-btn-bg", this._getBgColor(variant));
      this.style.setProperty("--esp-btn-font-size", this._getFontSize(size));
      this.style.setProperty("--esp-btn-padding", this._getPadding(size));
      this.style.setProperty("--esp-btn-color", "white");
    } else {
      this.style.setProperty("--esp-btn-bg", "transparent");
      this.style.setProperty("--esp-btn-font-size", this._getFontSize(size));
      this.style.setProperty("--esp-btn-padding", "0");
      this.style.setProperty("--esp-btn-color", "#0969da");
    }
  }

  get isDisabled() {
    return this.hasAttribute("disabled") || this.hasAttribute("loading");
  }

  _handleClick = (e) => {
    if (this.isDisabled) {
      e.preventDefault();
      return;
    }

    this.dispatchEvent(
      new CustomEvent("esp-click", {
        detail: { originalEvent: e },
        bubbles: true,
        composed: true,
      })
    );
  };

  _getBgColor(variant) {
    return (
      {
        primary: "#0969da",
        secondary: "#59636e",
        error: "#cf222e",
        success: "#1f883d",
        ghost: "#ffffff00",
        outline: "#0969da",
      }[variant] || "#0969da"
    );
  }

  _getFontSize(size) {
    return (
      {
        small: "0.75rem",
        medium: "0.875rem",
        large: "1rem",
      }[size] || "0.875rem"
    );
  }

  _getPadding(size) {
    return (
      {
        small: "0.25rem 0.5rem",
        medium: "0.5rem 1rem",
        large: "0.75rem 1.5rem",
      }[size] || "0.5rem 1rem"
    );
  }
}

customElements.define("esp-button", EspButton);
