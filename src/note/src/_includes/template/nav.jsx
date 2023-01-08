import setInput, { input } from "../utils/input.js";
import { formatName } from "../utils/format.js";

import dirTree from "npm:directory-tree@3.4.0";

let funcUrl;
let propUrl = "";

function createHtmlList(obj) {
  let output = "";

  const arr = Object.keys(obj);
  for (let i = 0; i <= arr.length; i++) {
    const key = arr[i];

    if (parseInt(key) || key === "0") {
      output += createHtmlList(obj[key]);
    } else {
      if (key !== "name") continue;
      if (/^_/.test(obj["name"])) continue;

      const ogUrl = setInput(obj["path"], "src");
      const url = funcUrl(ogUrl, true);
      const name = formatName(obj["name"], obj["path"]);
      const active = propUrl === ogUrl + ".html" ||
          propUrl.replace(/\/$/, "") === url
        ? "active"
        : "not-active";

      if (obj["children"]) {
        const index = obj["children"].findIndex((v) => v.name === "index.md");

        if (index !== -1) {
          if (index === 0) {
            output += `<li class="${active}"><a href="${url}">` + name +
              "</a></li>";
          } else {
            output += `<details><summary class="${active}"><a href="${url}">` +
              name +
              "</a></summary>";
          }
        } else {
          output += `<details><summary class="not-active">` + name +
            "</summary>";
        }

        output += createHtmlList(obj["children"]);
        output += "</details>";
      } else {
        if (obj["name"] === "index.md") continue;
        output += `<li class="${active}"><a href="${url}">` + name +
          "</a></li>";
      }
    }
  }
  return output;
}

function sortFiles(obj) {
  Object.keys(obj).map((a) =>
    obj[a].children ? sortFiles(obj[a].children) : obj[a]
  );

  obj = obj.sort((a, b) => a.name.localeCompare(b.name));

  return obj.sort((a, b) => {
    if (a.children) {
      return 1;
    }
    if (b.children) return -1;
  });
}

export default function (props) {
  propUrl = props.url;
  funcUrl = props.funcUrl;
  const active = propUrl === "/" ? "active" : "not-active";

  const files = dirTree(`src/${input}`, { extensions: /\.(md)$/ });
  const sortedFiles = sortFiles(files.children);
  const list =
    `<ul><li class="${active}"><a href="${funcUrl("/", true)}">Home</a>` +
    createHtmlList(sortedFiles) + "</ul>";
  return <nav class={props.class} dangerouslySetInnerHTML={{ __html: list }} />;
}
