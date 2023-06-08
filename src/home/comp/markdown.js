import { marked } from "https://esm.sh/marked@4.0.18";
import toc from "npm:markdown-toc@1.2.0";
import writeHtml from "./html.js";

const renderer = {
  heading(text, level) {
    const escapedText = text.toLowerCase().replace(/[^\w]+/g, "-");
    // const hLevel = "#".repeat(level);

    return `<h${level}>
  <a name="${escapedText}" class="header-anchor a-no-underline" href="#${escapedText}">${text}</a>
</h${level}>`;
  },
};

const loadingLazy = {
  name: "image",
  level: "inline",
  renderer(token) {
    const html = this.parser.renderer.image(
      token.href,
      token.title,
      token.text,
    );
    return html.replace(/^<img /, '<img loading="lazy" ');
  },
};

marked.use({ renderer, extensions: [loadingLazy] });

export function mdToHtml(md) {
  return marked.parse(md);
}

export default function writeMd(obj) {
  obj.description = obj.description ||
    obj.content.match(/^(?!#|<!--.*:.*-->).+(?=\n)/m)[0];
  obj.name = obj.name || obj.content.match(/(?<=# .*AK#)\w*/)[0];

  if (obj.remove) {
    obj.content = obj.content.replace(
      new RegExp(`(.+|\\n){${obj.remove}}`),
      "",
    );
  }

  obj.toc = marked.parse(toc(obj.content).content);
  obj.content = marked.parse(obj.content);

  writeHtml(obj);
}
