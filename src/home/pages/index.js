import writeMd from "../comp/markdown.js";
import { DATA } from "../comp/data.js";

const content = await fetch(
  "https://raw.githubusercontent.com/AnzenKodo/AnzenKodo/master/README.md",
).then((res) => res.text());

writeMd({
  name: `AK(${DATA.username})`,
  description: DATA.description,
  type: "profile",
  theme: "#f20544",
  content,
  remove: 1,
  style: `body main, body header { max-width: 51rem }

details pre {
  line-height: 1.1em;
  word-spacing: 0em;
  letter-spacing: 0em;
}

img[alt^="Logo of"] { margin: 1em; margin-right: 0 }

main > pre {
  margin-top: 0em;
  font-weight: bold;
}

main > pre a {
 text-decoration: none;
}
main > pre a:hover {
  text-decoration: underline;
}`,
});
