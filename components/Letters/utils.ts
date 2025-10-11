export const select = (root, selector) =>
  Array.prototype.slice.call(root.querySelectorAll(selector));

export const loadSvg = (url) => {
  return fetch(url)
    .then((response) => response.text())
    .then((raw) =>
      new window.DOMParser().parseFromString(raw, "image/svg+xml")
    );
};
