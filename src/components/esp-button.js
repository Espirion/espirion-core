import { html, css } from "../utils/template.js";

// @element esp-button
export default class EspButton extends HTMLElement {
  static observedAttributes = [
    "disabled",
    "size",
    "variant",
    "appearance",
    "loading",
    "icon",
    "fullwidth",
  ];

  static #shadowTemplate = html`
    <template>
      <slot name="icon-left"></slot>
      <slot></slot>
      <slot name="icon-right"></slot>
    </template>
  `;

  static #shadowStyleSheet = css`
    :host {
      all: unset;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      min-height: 2rem;
      padding: var(--esp-button-padding, 0.5rem 1rem);
      border-radius: var(--esp-border-radius-lg);
      gap: var(--esp-spacing-sm);
      position: relative;
      cursor: pointer;
      transition: background 0.2s ease, color 0.2s ease, border 0.2s ease;
      font: inherit;
      user-select: none;
      text-align: center;
      white-space: nowrap;
      text-decoration: none;
    }

    :host([disabled]) {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    :host(:hover:not([disabled])) {
      opacity: 0.85;
    }

    :host([fullwidth]) {
      width: 100%;
    }

    /* Size Styles */
    :host([size="sm"]) {
      font-size: var(--esp-font-size-sm, 0.75rem);
      padding: var(--esp-button-padding-sm, 0.25rem 0.75rem);
      min-height: 1.75rem;
    }

    :host([size="md"]) {
      font-size: var(--esp-font-size-md, 0.875rem);
      padding: var(--esp-button-padding-md, 0.5rem 1rem);
      min-height: 2rem;
    }

    :host([size="lg"]) {
      font-size: var(--esp-font-size-lg, 1rem);
      padding: var(--esp-button-padding-lg, 0.75rem 1.25rem);
      min-height: 2.5rem;
    }

    /* Variant + Appearance combinations */

    /* Default Variant */
    :host([variant="default"][appearance="filled"]),
    :host([variant="default"]:not([appearance])) {
      background-color: var(--esp-color-surface);
      color: var(--esp-color-text-primary);
      border: 1px solid var(--esp-color-border-muted);
    }

    :host([variant="default"][appearance="outlined"]) {
      background: transparent;
      color: var(--esp-color-text-primary);
      border: 1px solid var(--esp-color-border-default);
    }

    /* Primary Variant */
    :host([variant="primary"][appearance="filled"]),
    :host([variant="primary"]:not([appearance])) {
      background-color: var(--esp-color-primary);
      color: var(--esp-color-text-primary);
      border: 1px solid transparent;
    }

    :host([variant="primary"][appearance="outlined"]) {
      background: transparent;
      color: var(--esp-color-primary);
      border: 1px solid var(--esp-color-border-primary);
    }

    /* Danger Variant */
    :host([variant="danger"][appearance="filled"]),
    :host([variant="danger"]:not([appearance])) {
      background-color: var(--esp-color-error);
      color: var(--esp-color-text-primary);
      border: 1px solid transparent;
    }

    :host([variant="danger"][appearance="outlined"]) {
      background: transparent;
      color: var(--esp-color-error);
      border: 1px solid var(--esp-color-border-danger);
    }

    /* Link Variant */
    :host([variant="link"]) {
      background: transparent;
      color: var(--esp-color-accent-primary);
      border: none;
      padding: 0;
      font-weight: var(--esp-font-weight-medium, 500);
      text-decoration: none;
    }

    :host([variant="link"]:hover) {
      text-decoration: underline;
    }

    /* Hover and Focus States */
    :host([variant="link"]:focus-visible) {
      text-decoration: underline;
    }

    /* Icon Handling */
    ::slotted([slot="icon-left"]),
    ::slotted([slot="icon-right"]) {
      display: inline-flex;
      width: 1em;
      height: 1em;
    }

    ::slotted([slot="icon-left"]) {
      margin-inline-end: var(--esp-spacing-xs, 0.5rem);
    }

    ::slotted([slot="icon-right"]) {
      margin-inline-start: var(--esp-spacing-xs, 0.5rem);
    }

    /* Loading Spinner */
    :host([loading])::after {
      content: "";
      position: absolute;
      right: 1rem;
      width: 1em;
      height: 1em;
      border-radius: 50%;
      border: 2px solid currentColor;
      border-top-color: transparent;
      animation: esp-spin 1s linear infinite;
    }

    @keyframes esp-spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `;

  get disabled() {
    return this.hasAttribute("disabled");
  }
  set disabled(val) {
    val ? this.setAttribute("disabled", "") : this.removeAttribute("disabled");
  }

  get variant() {
    return this.getAttribute("variant") || "default";
  }
  set variant(val) {
    const valid = ["default", "primary", "danger", "link"];
    if (valid.includes(val)) {
      this.setAttribute("variant", val);
    } else {
      this.setAttribute("variant", "default");
    }
  }

  get appearance() {
    return this.getAttribute("appearance") || "filled";
  }
  set appearance(val) {
    const valid = ["filled", "outlined"];
    if (valid.includes(val)) {
      this.setAttribute("appearance", val);
    } else {
      this.removeAttribute("appearance");
    }
  }

  get size() {
    return this.getAttribute("size") || "md";
  }
  set size(val) {
    const valid = ["sm", "md", "lg"];
    if (valid.includes(val)) {
      this.setAttribute("size", val);
    } else {
      this.setAttribute("size", "md");
    }
  }

  get loading() {
    return this.hasAttribute("loading");
  }
  set loading(val) {
    val ? this.setAttribute("loading", "") : this.removeAttribute("loading");
  }

  get fullwidth() {
    return this.hasAttribute("fullwidth");
  }
  set fullwidth(val) {
    val
      ? this.setAttribute("fullwidth", "")
      : this.removeAttribute("fullwidth");
  }

  get icon() {
    return this.getAttribute("icon");
  }
  set icon(val) {
    if (val) {
      this.setAttribute("icon", val);
    } else {
      this.removeAttribute("icon");
    }
  }

  _root = null;
  _lastTabIndex = 0;

  constructor() {
    super();
    this._root = this.attachShadow({ mode: "closed" });
    this._root.adoptedStyleSheets = [EspButton.#shadowStyleSheet];
    this._root.append(
      document.importNode(EspButton.#shadowTemplate.content, true)
    );

    for (let element of this._root.querySelectorAll("[id]")) {
      this["#" + element.id] = element;
    }

    this.addEventListener("pointerdown", (event) => this._onPointerDown(event));
    this.addEventListener("pointerenter", () => this._onPointerEnter());
    this.addEventListener("pointerleave", () => this._onPointerLeave());
    this.addEventListener("click", (event) => this._onClick(event));
    this.addEventListener("keydown", (event) => this._onKeyDown(event));
    this.addEventListener("close", (event) => this._onClose(event));
  }

  connectedCallback() {
    this._updateAccessabilityAttributes();
    this._syncState();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldValue === newValue || this.isConnected === false) {
      return;
    }
    if (oldVal !== newVal) {
      this._syncState();
    }
    if (name === "disabled") {
      this._updateAccessabilityAttributes();
    }
  }

  _updateAccessabilityAttributes() {
    this.setAttribute("role", "button");
    this.setAttribute("aria-disabled", this.disabled);

    if (this.disabled) {
      this._lastTabIndex = this.tabIndex > 0 ? this.tabIndex : 0;
      this.tabIndex = -1;
    } else {
      if (this.tabIndex < 0) {
        this.tabIndex = this._lastTabIndex > 0 ? this._lastTabIndex : 0;
      }

      this._lastTabIndex = 0;
    }
  }

  _syncState() {
    const btn = this._root.host;
    btn.classList.toggle("loading", this.loading);
    btn.classList.toggle("fullwidth", this.fullwidth);
  }

  _onPointerDown(event) {}
  _onPointerEnter() {}
  _onPointerLeave() {}
  _onClick(event) {}
  _onKeyDown(event) {}
  _onClose(event) {}
}

customElements.define("esp-button", EspButton);
