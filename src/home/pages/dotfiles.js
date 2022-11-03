import writeMd from "../comp/markdown.js";

const content = await fetch(
  "https://raw.githubusercontent.com/AnzenKodo/dotfiles/master/README.md",
).then((res) => res.text());

writeMd({
  theme: "#7ebae4",
  content,
  remove: 9,
});
