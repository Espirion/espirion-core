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
