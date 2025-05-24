import Espirion from "../classes/espirion.js";

import { iconMap } from "../utils/icon.js";
import { html, css } from "../utils/template.js";

// @element esp-icon
export default class EspIcon extends HTMLElement {
  static observedAttributes = ["name"];

  static #shadowTemplate = html`
    <template>
      <svg
        id="svg"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
        width="16"
        height="16"
      ></svg>
    </template>
  `;

  static #shadowStyleSheet = css`
    :host {
      display: block;
      color: currentColor;
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--esp-font-size-base);
      height: var(--esp-font-size-base);
    }
    :host([disabled]) {
      opacity: 0.5;
    }
    :host([hidden]) {
      display: none;
    }

    #svg {
      width: 100%;
      height: 100%;
      fill: currentColor;
      stroke: none;
      overflow: inherit;
      /* @bugfix: pointerOverEvent.relatedTarget leaks shadow DOM of <x-icon> */
      pointer-events: none;
    }
  `;

  get name() {
    return this.hasAttribute("name") ? this.getAttribute("name") : "";
  }
  set name(name) {
    this.setAttribute("name", name);
  }
  get disabled() {
    return this.hasAttribute("disabled");
  }
  set disabled(disabled) {
    disabled
      ? this.setAttribute("disabled", "")
      : this.removeAttribute("disabled");
  }

  _root = null;
  _svg = null;
  _defaultIconsChangeListener = null;

  constructor() {
    super();

    this._root = this.attachShadow({ mode: "closed" });
    this._root.adoptedStyleSheets = [EspIcon.#shadowStyleSheet];
    this._root.append(
      document.importNode(EspIcon.#shadowTemplate.content, true)
    );

    this._svg = this._root.querySelector("#svg");

    for (let element of this._root.querySelectorAll("[id]")) {
      this["#" + element.id] = element;
    }

    this.addEventListener("pointerenter", () => this._onPointerEnter());
    this.addEventListener("pointerleave", () => this._onPointerLeave());
  }

  connectedCallback() {
    Espirion.addEventListener(
      "iconschange",
      (this._defaultIconsChangeListener = () => {
        this._update();
      })
    );
  }

  disconnectedCallback() {
    Espirion.removeEventListener(
      "iconschange",
      this._defaultIconsChangeListener
    );
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue && name === "name") {
      this._update();
    }
  }

  _onPointerEnter() {
    let tooltip = this.querySelector(":scope > esp-tooltip");

    if (tooltip && tooltip.disabled === false) {
      tooltip.open(this);
    }
  }

  _onPointerLeave() {
    let tooltip = this.querySelector(":scope > esp-tooltip");

    if (tooltip) {
      tooltip.close();
    }
  }

  async _update() {
    let name = this.name.trim();
    const iconPath = iconMap[name];

    this._svg.innerHTML = iconPath;
  }
}

customElements.define("esp-icon", EspIcon);
