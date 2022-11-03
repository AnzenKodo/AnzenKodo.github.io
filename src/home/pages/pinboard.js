import writeHtml from "../comp/html.js";

const pinboard = JSON.parse(Deno.readTextFileSync("../site/api/pinboard.json"));
const nav = Object.keys(pinboard)
  .map((val) =>
    `<a href="${
      val === "To-Read" ? "index" : val.toLowerCase()
    }.html">${val}</a>`
  ).join(
    "\n",
  );

const style = `nav {
  text-align: center;
  font-size: 1.5em;
  line-height: 1.5em;
  margin: 1.5em 0;
  font-weight: bold;
  word-spacing: 1em;
}
nav a { text-decoration: none }
nav a:hover { text-decoration: underline }

body header { margin-bottom: 0; }
body main { margin-bottom: 2em; }
body main h1 { margin-top: 0; }

ul {
  padding: 0;
  margin-top: 1em;
  margin-left: 1em;
}
ul li{
  font-size: 1.2em;
  line-height: 1.5em;
}
main ul li { margin-bottom: .8em; }
li a {
  color : var(--fg);
  text-decoration: underline var(--theme) 2px;
}
li a:hover { color: var(--theme) }
ul li a:visited { color: #bababa }
ul li a:visited:focus { color: var(--fg); }`;

const description =
  "My personal Pinboard. Database of everything I have read, reading and going-to-read.";

function htmlData(name, html) {
  const pageName = "Pinboard";

  if (name === "To-Read") name = "index";
  writeHtml({
    name: pageName,
    prems: name,
    description,
    theme: "#e7132f",
    content: html,
    path: name,
    style,
    header: `<nav>${nav}</nav>`,
  });
}

for (const [name, items] of Object.entries(pinboard)) {
  const list = items.map((val) =>
    `<li><a href="${Object.values(val)[0]}">${Object.keys(val)[0]}</a></li>`
  ).join("");
  htmlData(name, `<ul>${list}</ul>`);
}
