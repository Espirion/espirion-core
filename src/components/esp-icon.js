// src/components/esp-icon.js
import { html, css, fetchSvg } from "../utils/template.js";

// @element esp-icon
export default class EspIcon extends HTMLElement {
  static observedAttributes = ["name", "size", "color"];

  // Using a direct style sheet for the Shadow DOM
  static #shadowStyleSheet = css`
    :host {
      display: inline-flex; /* Use inline-flex to wrap content and allow alignment */
      align-items: center;
      justify-content: center;
      line-height: 1; /* Prevent extra space around icon */
    }

    /* Styles for the SVG itself */
    svg {
      display: block; /* Remove extra space below SVG */
      width: 100%;
      height: 100%;
      overflow: inherit;
    }

    /* --- SIZING (using em for scalability) --- */
    :host([size="small"]) svg {
      width: 0.8em; /* Example small size */
      height: 0.8em;
    }
    :host([size="medium"]) svg {
      width: 1em; /* Default */
      height: 1em;
    }
    :host([size="large"]) svg {
      width: 1.2em; /* Example large size */
      height: 1.2em;
    }

    /* Allow direct CSS variable override for size */
    :host([style*="--icon-size"]) svg {
      width: var(--icon-size);
      height: var(--icon-size);
    }

    /* Allow direct CSS variable override for color */
    :host([style*="--icon-color"]) svg {
      fill: var(--icon-color);
      stroke: var(--icon-color); /* Apply to stroke as well if needed */
    }

    :host([disabled]) {
      opacity: 0.5;
    }
    :host([hidden]) {
      display: none;
    }
  `;

  shadowRoot = null;
  #iconName = "";

  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: "closed" });
    this.shadowRoot.adoptedStyleSheets = [EspIcon.#shadowStyleSheet];

    // Initially hide the content until SVG is loaded to prevent FOUC
    this.style.visibility = "hidden";
  }

  // Getter/Setter for 'name' attribute
  get name() {
    return this.getAttribute("name");
  }
  set name(value) {
    if (value) {
      this.setAttribute("name", value);
    } else {
      this.removeAttribute("name");
    }
  }

  // Getter/Setter for 'size' attribute
  get size() {
    return this.getAttribute("size");
  }
  set size(value) {
    if (value) {
      this.setAttribute("size", value);
    } else {
      this.removeAttribute("size");
    }
  }

  // Getter/Setter for 'color' attribute
  get color() {
    return this.getAttribute("color");
  }
  set color(value) {
    if (value) {
      // Set as inline style or CSS variable for dynamic coloring
      this.style.setProperty("--icon-color", value);
    } else {
      this.style.removeProperty("--icon-color");
    }
  }

  async connectedCallback() {
    this.#updateIcon();
    // Set aria-hidden for decorative icons by default
    if (!this.hasAttribute("aria-label") && !this.hasAttribute("role")) {
      this.setAttribute("aria-hidden", "true");
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }
    if (name === "name") {
      this.#updateIcon();
    } else if (name === "size") {
      // Size is handled by CSS, but can also set inline style variable for custom sizes
      // If newValue is a direct length (e.g., "24px"), set it as a CSS variable
      if (newValue && ["small", "medium", "large"].indexOf(newValue) === -1) {
        this.style.setProperty("--icon-size", newValue);
      } else {
        this.style.removeProperty("--icon-size");
      }
    } else if (name === "color") {
      this.color = newValue; // Use the setter to apply the style
    }
  }

  async #updateIcon() {
    const iconName = this.name;
    if (!iconName) {
      this.shadowRoot.innerHTML = "";
      this.style.visibility = "visible"; // Show empty space if no icon
      return;
    }

    this.style.visibility = "hidden"; // Hide while loading new icon
    const svgContent = await fetchSvg(iconName);
    if (svgContent) {
      // Inject SVG content directly into Shadow DOM
      this.shadowRoot.innerHTML = svgContent;
      // Apply size/color to the SVG element (if not handled by CSS already)
      // The CSS takes care of it via :host styles, but if you want direct control
      // you might re-fetch the SVG or clone and modify it here.
      // For now, relies on :host styles affecting the direct child SVG.
    } else {
      this.shadowRoot.innerHTML = ""; // Clear if SVG failed to load
    }
    this.style.visibility = "visible"; // Show after content is loaded or cleared
  }
}

customElements.define("esp-icon", EspIcon);
