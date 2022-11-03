import writeMd from "../comp/markdown.js";

const content = await fetch(
  "https://raw.githubusercontent.com/AnzenKodo/pen/master/README.md",
).then((res) => res.text());

writeMd({
  theme: "#0057b7",
  content: content,
  remove: 3,
});
