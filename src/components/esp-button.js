// src/components/esp-button.js
import { html, css } from "../utils/template.js";

// @element esp-button
export default class EspButton extends HTMLElement {
  static observedAttributes = [
    "variant",
    "disabled",
    "type",
    "size",
    "loading",
  ];

  static #shadowTemplate = html`
    <template>
      <span class="content">
        <slot></slot>
      </span>
      <span class="spinner"></span>
    </template>
  `;

  static #shadowStyleSheet = css`
    /* :host styles the custom element itself, which is now our button */
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--esp-border-radius-sm);
      font-family: var(--esp-font-family);
      cursor: pointer;
      border: 1px solid transparent;
      transition: var(--esp-transition-ease);
      text-align: center;
      white-space: nowrap;
      position: relative;
      overflow: hidden;
      box-sizing: border-box;
      outline: none;
      -webkit-tap-highlight-color: transparent;

      /* --- DEFAULT SIZE: MEDIUM --- */
      padding: var(--esp-spacing-sm) var(--esp-spacing-md);
      font-size: var(--esp-font-size-base);

      /* --- DEFAULT VARIANT (PRIMARY) --- */
      background-color: var(--esp-color-primary);
      color: var(--esp-color-white);
      border-color: var(--esp-color-primary);
    }

    /* Styles for the content wrapper within the button */
    .content {
      display: flex;
      align-items: center;
      gap: var(--esp-spacing-xs);
    }

    /* --- SIZES --- */
    :host([size="small"]) {
      padding: var(--esp-spacing-xs) var(--esp-spacing-sm);
      font-size: var(--esp-font-size-sm);
    }

    :host([size="large"]) {
      padding: var(--esp-spacing-md) var(--esp-spacing-lg);
      font-size: var(--esp-font-size-lg);
    }

    /* Hover and Focus States for the default (primary) variant */
    :host(:hover:not([disabled]):not([loading])),
    :host(:focus-visible:not([disabled]):not([loading])) {
      background-color: var(--esp-color-primary-dark);
      border-color: var(--esp-color-primary-dark);
    }

    /* --- SECONDARY VARIANT --- */
    :host([variant="secondary"]) {
      background-color: var(--esp-color-secondary);
      color: var(--esp-color-white);
      border-color: var(--esp-color-secondary);
    }

    :host([variant="secondary"]:hover:not([disabled]):not([loading])),
    :host([variant="secondary"]:focus-visible:not([disabled]):not([loading])) {
      background-color: var(--esp-color-secondary-dark);
      border-color: var(--esp-color-secondary-dark);
    }

    /* --- DANGER VARIANT --- */
    :host([variant="danger"]) {
      background-color: var(--esp-color-danger);
      color: var(--esp-color-white);
      border-color: var(--esp-color-danger);
    }

    :host([variant="danger"]:hover:not([disabled]):not([loading])),
    :host([variant="danger"]:focus-visible:not([disabled]):not([loading])) {
      background-color: var(--esp-color-danger-dark);
      border-color: var(--esp-color-danger-dark);
    }

    /* --- OUTLINE VARIANT --- */
    :host([variant="outline"]) {
      background-color: transparent;
      color: var(--esp-color-primary);
      border-color: var(--esp-color-primary);
    }

    :host([variant="outline"]:hover:not([disabled]):not([loading])),
    :host([variant="outline"]:focus-visible:not([disabled]):not([loading])) {
      background-color: var(--esp-color-primary);
      color: var(--esp-color-white);
    }

    /* --- INVISIBLE VARIANT --- */
    :host([variant="invisible"]) {
      background-color: transparent;
      color: var(--esp-color-text);
      border-color: transparent;
    }

    :host([variant="invisible"]:hover:not([disabled]):not([loading])),
    :host([variant="invisible"]:focus-visible:not([disabled]):not([loading])) {
      background-color: var(--esp-color-hover-light);
      color: var(--esp-color-primary);
      border-color: transparent;
    }

    /* --- Disabled State for the host element --- */
    :host([disabled]) {
      opacity: 0.6;
      cursor: not-allowed;
      background-color: var(--esp-color-secondary);
      border-color: var(--esp-color-secondary);
      color: var(--esp-color-text-disabled);
    }

    /* Specific disabled styles for variants */
    :host([variant="primary"][disabled]) {
      background-color: var(--esp-color-primary);
      border-color: var(--esp-color-primary);
      color: var(--esp-color-white);
    }

    :host([variant="danger"][disabled]) {
      background-color: var(--esp-color-danger);
      border-color: var(--esp-color-danger);
      color: var(--esp-color-white);
    }

    :host([variant="outline"][disabled]) {
      background-color: transparent;
      border-color: var(--esp-color-primary);
      color: var(--esp-color-primary);
    }

    /* Disabled state for the invisible variant */
    :host([variant="invisible"][disabled]) {
      background-color: transparent;
      color: var(--esp-color-text);
      border-color: transparent;
      opacity: 0.4;
    }

    /* --- Loading State --- */
    :host([loading]) {
      pointer-events: none;
      cursor: default;
      opacity: 0.8;
      position: relative;
    }

    /* Hide content and show spinner when loading */
    :host([loading]) .content {
      visibility: hidden;
    }

    :host([loading]) .spinner {
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    /* --- Spinner Styles --- */
    .spinner {
      display: none;
      width: 1em;
      height: 1em;
      border: 2px solid transparent;
      border-top-color: var(--esp-color-white);
      border-radius: 50%;
      animation: esp-spinner-animation 0.8s linear infinite;
    }

    /* Spinner color for outline and invisible variants */
    :host([variant="outline"]) .spinner,
    :host([variant="invisible"]) .spinner {
      border-top-color: var(--esp-color-primary);
    }

    /* Ripple effect needs to be above spinner (z-index) */
    .ripple {
      position: absolute;
      border-radius: 50%;
      transform: scale(0);
      opacity: 1;
      background-color: var(--esp-color-ripple-on-dark);
      pointer-events: none;
      animation: esp-ripple-animation 0.6s linear forwards;
      z-index: 1;
    }

    :host([variant="outline"]) .ripple,
    :host([variant="invisible"]) .ripple {
      background-color: var(--esp-color-ripple-on-light);
    }

    @keyframes esp-ripple-animation {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }

    @keyframes esp-spinner-animation {
      to {
        transform: translate(-50%, -50%) rotate(360deg);
      }
    }

    /* --- Icon-Only Button Styles --- */
    :host([icon-only]) {
      padding: var(--esp-spacing-xs);
      min-width: calc(1em + var(--esp-spacing-xs) * 2);
      min-height: calc(1em + var(--esp-spacing-xs) * 2);
      justify-content: center;
    }

    :host([icon-only]) .content {
      gap: 0;
    }

    :host([icon-only][size="small"]) {
      padding: var(--esp-spacing-xxs);
      min-width: calc(0.8em + var(--esp-spacing-xxs) * 2);
      min-height: calc(0.8em + var(--esp-spacing-xxs) * 2);
    }

    :host([icon-only][size="large"]) {
      padding: var(--esp-spacing-sm);
      min-width: calc(1.2em + var(--esp-spacing-sm) * 2);
      min-height: calc(1.2em + var(--esp-spacing-sm) * 2);
    }
  `;

  shadowRoot = null;

  constructor() {
    super();

    this.shadowRoot = this.attachShadow({ mode: "closed" });
    this.shadowRoot.adoptedStyleSheets = [EspButton.#shadowStyleSheet];
    this.shadowRoot.append(
      document.importNode(EspButton.#shadowTemplate.content, true)
    );

    this.addEventListener("click", this._handleClick.bind(this));
  }

  get loading() {
    return this.hasAttribute("loading");
  }
  set loading(value) {
    if (value) {
      this.setAttribute("loading", "");
    } else {
      this.removeAttribute("loading");
    }
  }

  get size() {
    return this.getAttribute("size") || "medium";
  }
  set size(value) {
    if (value) {
      this.setAttribute("size", value);
    } else {
      this.removeAttribute("size");
    }
  }

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

  get disabled() {
    return this.hasAttribute("disabled");
  }
  set disabled(value) {
    if (value) {
      this.setAttribute("disabled", "");
    } else {
      this.removeAttribute("disabled");
    }
  }

  get type() {
    return this.getAttribute("type") || "button";
  }
  set type(value) {
    if (value) {
      this.setAttribute("type", value);
    } else {
      this.removeAttribute("type");
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }

    if (name === "disabled" || name === "loading") {
      if (this.disabled || this.loading) {
        this.setAttribute("aria-disabled", "true");
        this.setAttribute("aria-busy", this.loading ? "true" : "false");
        this.removeAttribute("tabindex");
      } else {
        this.removeAttribute("aria-disabled");
        this.removeAttribute("aria-busy");
        this.setAttribute("tabindex", "0");
      }
    }
  }

  connectedCallback() {
    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "button");
    }
    if (this.disabled || this.loading) {
      this.setAttribute("aria-disabled", "true");
      this.setAttribute("aria-busy", this.loading ? "true" : "false");
      this.removeAttribute("tabindex");
    } else {
      this.removeAttribute("aria-busy");
      this.removeAttribute("aria-disabled");
      if (!this.hasAttribute("tabindex")) {
        this.setAttribute("tabindex", "0");
      }
    }

    // Add slotchange listener to detect content changes for icon-only state
    const slot = this.shadowRoot.querySelector("slot");
    if (slot) {
      slot.addEventListener("slotchange", this.#handleSlotChange.bind(this));
    }
    // Initial check on connection
    this.#handleSlotChange();

    this.addEventListener("keydown", this._handleKeyDown.bind(this));
  }

  disconnectedCallback() {
    const slot = this.shadowRoot.querySelector("slot");
    if (slot) {
      slot.removeEventListener("slotchange", this.#handleSlotChange.bind(this));
    }
    this.removeEventListener("keydown", this._handleKeyDown.bind(this));
  }

  /**
   * Determines if the button contains only an esp-icon and toggles the 'icon-only' attribute.
   */
  #handleSlotChange() {
    const slot = this.shadowRoot.querySelector("slot");
    const assignedNodes = slot.assignedNodes({ flatten: true });

    let hasOnlyOneIcon = false;
    let hasOtherSignificantContent = false;

    if (assignedNodes.length === 0) {
      hasOnlyOneIcon = false;
    } else {
      let iconCount = 0;
      for (const node of assignedNodes) {
        if (
          node.nodeType === Node.ELEMENT_NODE &&
          node.tagName === "ESP-ICON"
        ) {
          iconCount++;
        } else if (
          node.nodeType === Node.TEXT_NODE &&
          node.textContent.trim().length > 0
        ) {
          hasOtherSignificantContent = true;
          break;
        } else if (
          node.nodeType === Node.ELEMENT_NODE &&
          node.tagName !== "ESP-ICON"
        ) {
          hasOtherSignificantContent = true;
          break;
        }
      }
      if (iconCount === 1 && !hasOtherSignificantContent) {
        hasOnlyOneIcon = true;
      }
    }

    if (hasOnlyOneIcon) {
      this.setAttribute("icon-only", "");
    } else {
      this.removeAttribute("icon-only");
    }
  }

  _handleKeyDown(event) {
    if (this.disabled || this.loading) {
      event.preventDefault();
      return;
    }

    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      this.click();
    }
  }

  _handleClick(event) {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this._createRipple(event);
  }

  _createRipple(event) {
    const hostElement = this;
    const rect = hostElement.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const size = Math.max(hostElement.offsetWidth, hostElement.offsetHeight);

    const ripple = document.createElement("span");
    ripple.classList.add("ripple");

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x - size / 2}px`;
    ripple.style.top = `${y - size / 2}px`;

    this.shadowRoot.appendChild(ripple);

    ripple.addEventListener(
      "animationend",
      () => {
        ripple.remove();
      },
      { once: true }
    );
  }
}

customElements.define("esp-button", EspButton);
