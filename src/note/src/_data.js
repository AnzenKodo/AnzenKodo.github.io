import setInput from "./_includes/utils/input.js";

// export const url = "./";
export const templateEngine = ["md", "njk"];
export const layout = "layouts/base.jsx";

export function url(page) {
  const path = page.src.path; // The path name without extension (ex: /blog/2022-05-01_first-post/index)
  const url = setInput(path);
  if (page.src.ext !== ".md") return url + page.src.ext;
  return url + ".html";
}
