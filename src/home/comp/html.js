import { DATA } from "./data.js";
import { titleCase, writeInOutput } from "./utils.js";
import { mime } from "https://deno.land/x/mimetypes@v1.0.0/mod.ts";
import { mdToHtml } from "./markdown.js";

export default function writeHtml(
  {
    name,
    description = DATA.description,
    type = "website",
    favicon = ".png",
    background = DATA.style.background,
    foreground = DATA.style.foreground,
    theme = DATA.style.theme,
    styleUrl =
      "https://cdn.jsdelivr.net/gh/AnzenKodo/punk@0.19.1/css/punk.min.css",
    style = "{}",
    content,
    path,
    prems,
    header = "",
    toc,
  },
) {
  const nameL = name.toLowerCase();
  const nameT = titleCase(name);

  prems = prems && prems !== "index" ? "@" + prems : "";
  const nameFormat = type !== "profile" ? "#" + nameT + prems : name;
  const nameFromatA = prems
    ? `#<a class="a-no-underline" href="${
      DATA.start_url + nameL
    }">${nameT}</a>${prems}`
    : nameFormat;

  path = `${nameL}/${path?.toLowerCase() || "index"}.html`;
  if (type === "profile") path = "index.html";

  const ogpType = type === "profile"
    ? `<meta property="og:type" content="profile">
<meta property="og:profile:first_name" content="${DATA.name}">
<meta property="og:profile:username" content="${DATA.username}">`
    : `<meta property="og:type" content="website">`;

  const head = `<head>
  <title>${type !== "profile" ? "AK" : ""}${nameFormat}</title>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${description}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${DATA.start_url}assets/favicon/${
    nameL + favicon
  }">
  <meta name="theme-color" content="${theme}"/>
  <meta property="og:image:alt" content="${name} logo">
  ${ogpType}
  <link rel="icon" type="${
    mime.getType(favicon)
  }" href="${DATA.start_url}assets/favicon/${nameL + favicon}">
  <link rel="stylesheet" href="${styleUrl}">

  <style>
    @font-face {
      font-family: "Jost";
      src: url("https://cdn.jsdelivr.net/gh/indestructible-type/Jost@814c58001f052904102a631b9cff92b4e522fb15/fonts/Jost-VF.ttf");
    }
    :root {
      --background: ${background};
      --foreground: ${foreground};
      --theme: ${theme}
    }
    body {
      font-family: "Jost",system-ui,-apple-system,Arial,sans-serif;
      letter-spacing: .1em;
      font-size: 1rem;
    }
    .skip-to-main {
      background: var(--theme);
      color: var(--fg);
      padding: .3em;
      position: absolute;
      transform: translateY(-300%);
    }
    .skip-to-main:focus { transform: translateY(0%) }
    .a-no-underline { text-decoration: none }
    .a-no-underline:hover { text-decoration: underline }
    .toc {
      position: fixed;
      bottom: 1px;
      right: 1px;
      background: var(--bg);
    }
    .toc li {
      display: list-item;
      margin-left: 3em;
      list-style: decimal;
    }
    body>header p:first-child {
      font-size: 2em;
      font-weight: bold;
      margin-bottom: .2em;
    }
    .header-anchor { color: var(--fg) }
    ${style}
  </style>
</head>`;

  const headerEle = type === "profile"
    ? `<header><h1 class="name">${nameFromatA}</h1></header>`
    : `<header>
    <h1 class="name"><a class="a-no-underline" href="${DATA.start_url}">AK</a>${nameFromatA}</h1>
    <p class="description">${mdToHtml(description)}</p>
    ${header}
  </header>`;

  const tocBox = toc
    ? `<nav>
        <details class="toc">
          <summary>Table of Content</summary>
          ${toc}
      </details>
    </nav>`
    : "";

  const footer =
    `<footer><p><a class="a-no-underline" href="${DATA.start_url}/license">LICENSE</a></p></footer>`;

  const html = `<!DOCTYPE html>
<html lang="en-US">
  ${head}
  <body>
    <a class="skip-to-main" href="#main">Skip to content</a>
    ${tocBox}
    ${headerEle}
    <main id="main">${content}</main>
    ${footer}
  </body>
</html>`;

  writeInOutput(path, html);
  if (type === "profile") writeInOutput("404.html", html);
}
