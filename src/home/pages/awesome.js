import writeMd from "../comp/markdown.js";
import { writeInOutput } from "../comp/utils.js";

const content = await fetch(
  "https://raw.githubusercontent.com/AnzenKodo/awesome-ak/main/README.md",
).then((res) => res.text());

const description = content.match(/(?<=^\n)[\w\s'.]+(?=\n)/gm)[0];

writeMd({
  name: "awesome",
  description,
  theme: "#cca6c4",
  content: content,
  remove: 9,
});

const bookmarks = await fetch(
  "https://raw.githubusercontent.com/AnzenKodo/awesome-ak/main/bookmark.html",
).then((res) => res.text());

writeInOutput("awesome/bookmark.html", bookmarks);
