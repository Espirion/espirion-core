let templateElement = document.createElement("template");

// @type () => HTMLElement || DocumentFragment
//
// Template string tag used to parse HTML strings.
export let html = (strings, ...expressions) => {
  let parts = [];

  for (let i = 0; i < strings.length; i += 1) {
    parts.push(strings[i]);
    if (expressions[i] !== undefined) parts.push(expressions[i]);
  }

  let innerHTML = parts.join("");
  templateElement.innerHTML = innerHTML;
  let fragment = document.importNode(templateElement.content, true);

  if (fragment.children.length === 1) {
    return fragment.firstElementChild;
  } else {
    return fragment;
  }
};

// @type () => CSSStyleSheet
//
// Template string tag used to parse CSS strings.
export let css = (strings, ...expressions) => {
  let parts = [];

  for (let i = 0; i < strings.length; i += 1) {
    parts.push(strings[i]);
    if (expressions[i] !== undefined) parts.push(expressions[i]);
  }

  let cssText = parts.join("");
  let stylesheet = new CSSStyleSheet();
  stylesheet.replaceSync(cssText);
  return stylesheet;
};

// Cache for SVG content to prevent redundant fetches
const svgCache = new Map();

// Base path for your SVG icons
const ICON_BASE_PATH = "/src/assets/icons/"; // Adjust this path if your icons are elsewhere

// Helper function to fetch and cache SVG
export async function fetchSvg(iconName) {
  if (svgCache.has(iconName)) {
    return svgCache.get(iconName);
  }

  const url = `${ICON_BASE_PATH}${iconName}.svg`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Failed to load icon: ${url}`, response.statusText);
      return ""; // Return empty string on error
    }
    const svgText = await response.text();
    svgCache.set(iconName, svgText);
    return svgText;
  } catch (error) {
    console.error(`Error fetching icon ${iconName}:`, error);
    return "";
  }
}
