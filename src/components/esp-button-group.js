import { html, css } from "../utils/template.js";

// @element esp-button-group
export default class EspButtonGroup extends HTMLElement {
  static observedAttributes = ["disabled", "orientation", "size"];

  static #shadowTemplate = html`
    <template>
      <slot></slot>
    </template>
  `;

  static #shadowStyleSheet = css`
    :host {
      display: flex;
      flex-flow: row;
      align-items: center;
      justify-content: flex-start;
      box-sizing: border-box;
      width: fit-content;
    }
    :host([hidden]) {
      display: none;
    }

    :host([orientation="vertical"]) {
      flex-direction: column;
      align-items: flex-start;
    }

    ::slotted(esp-button) {
      border-radius: 0;
      margin: 0;
    }

    /* Horizontal first/last */
    :host([orientation="horizontal"]) ::slotted(esp-button:first-of-type) {
      border-top-left-radius: var(--esp-border-radius-lg);
      border-bottom-left-radius: var(--esp-border-radius-lg);
    }

    :host([orientation="horizontal"]) ::slotted(esp-button:last-of-type) {
      border-top-right-radius: var(--esp-border-radius-lg);
      border-bottom-right-radius: var(--esp-border-radius-lg);
    }

    /* Vertical first/last */
    :host([orientation="vertical"]) ::slotted(esp-button:first-of-type) {
      border-top-left-radius: var(--esp-border-radius-lg);
      border-top-right-radius: var(--esp-border-radius-lg);
    }

    :host([orientation="vertical"]) ::slotted(esp-button:last-of-type) {
      border-bottom-left-radius: var(--esp-border-radius-lg);
      border-bottom-right-radius: var(--esp-border-radius-lg);
    }

    /* Optional: Add a thin border between buttons */
    :host([orientation="horizontal"]) ::slotted(esp-button:not(:last-of-type)) {
      border-right: none;
    }

    :host([orientation="vertical"]) ::slotted(esp-button:not(:last-of-type)) {
      border-bottom: none;
    }
  `;

  get disabled() {
    return this.hasAttribute("disabled");
  }
  set disabled(val) {
    val ? this.setAttribute("disabled", "") : this.removeAttribute("disabled");
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

  _root = null;

  constructor() {
    super();

    this._root = this.attachShadow({ mode: "closed" });
    this._root.adoptedStyleSheets = [EspButtonGroup.#shadowStyleSheet];
    this._root.append(
      document.importNode(EspButtonGroup.#shadowTemplate.content, true)
    );

    this._updateSizeAttribute();

    this.addEventListener("click", (event) => this._onClick(event), true);
    this.addEventListener("keydown", (event) => this._onKeyDown(event));
  }

  connectedCallback() {
    this.setAttribute("role", "group");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    } else if (name === "size") {
      this._updateSizeAttribute();
    }
  }

  _updateSizeAttribute() {
    const size = this.size;
    console.log(size);
    const buttons = this._getButtons();
    buttons.forEach((button) => {
      button.size = size;
    });
  }

  _getButtons() {
    return [
      ...this.querySelectorAll(
        ":scope > esp-button, :scope > esp-box > esp-button"
      ),
    ];
  }

  _onClick(event) {}
  _onKeyDown(event) {}
}

customElements.define("esp-button-group", EspButtonGroup);
