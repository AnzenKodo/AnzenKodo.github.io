import lume from "lume/mod.ts";
import jsx from "lume/plugins/jsx_preact.ts";
import minifyHTML from "lume/plugins/minify_html.ts";
import codeHighlight from "lume/plugins/code_highlight.ts";
import inline from "lume/plugins/inline.ts";
import metas from "lume/plugins/metas.ts";
import basePath from "lume/plugins/base_path.ts";
import slugifyUrls from "lume/plugins/slugify_urls.ts";
import windi from "lume/plugins/windi_css.ts";
import toc from "https://deno.land/x/lume_markdown_plugins@v0.1.0/toc/mod.ts";
import checkbox from "npm:markdown-it-task-checkbox";
import footnote from "npm:markdown-it-footnote";
import sitemap from "lume/plugins/sitemap.ts";
import implicitFigures from "https://esm.sh/markdown-it-image-figures@2.1.0";
import mk from "https://esm.sh/markdown-it-katex@2.0.2";
import katex from "lume/plugins/katex.ts";

const data = JSON.parse(Deno.readTextFileSync("../config.json"));

const site = lume({
  location: new URL(data.start_url + "notes"),
  src: "./src",
  dest: "../../site/notes",
  port: 8000,
  page404: "/404/",
  open: true,
  emptyDest: true,
  prettyUrls: true,
  watcher: {
    debounce: 100,
    ignore: [],
  },
  components: {
    // variable: "comp",
    // cssFile: "/components.css",
    // jsFile: "/components.js",
  },
}, {
  markdown: {
    plugins: [[toc], [checkbox], [footnote], [mk], [implicitFigures, {
      lazy: true,
      async: true,
      dataType: true,
      figcaption: true,
    }]],
    keepDefaultPlugins: true,
    options: {
      html: true,
      linkify: true,
      typographer: true,
      xhtmlOut: false,
    },
  },
});

site.use(jsx())
  .use(windi({
    minify: true,
    mode: "interpret",
  }))
  .use(slugifyUrls())
  .use(basePath())
  .use(metas())
  .use(inline())
  .use(codeHighlight())
  .use(sitemap())
  .use(katex())
  .use(minifyHTML({ extensions: [".html", ".css", ".js"] }));

import setInput, { input } from "./src/_includes/utils/input.js";

site.copy(
  [".jpg", ".png", ".gif", ".mp3", ".webp", ".webm", ".svg"],
  (file) => {
    return setInput(file.toLowerCase());
  },
);

const siteData = {
  name: "AK#Notes",
  description: Deno.readTextFileSync(`src/${input}/index.md`).match(
    /^[^\n]+(\n[^\n]+)*/,
  )[0],
  lang: "en",
  author: data.name,
  email: data.email,
  theme: "#583fcb",
  theme_dark: "#bd8bf2",
  foreground: "#121212",
  start_url: data.start_url,
  favicon: "/favicon.png",
};

site.data("site", siteData);

site.data("metas", {
  site: siteData.name,
  lang: siteData.lang,
  twitter: "@" + data.username,
  generator: true,
});

site.data("mergedKeys", { metas: "object" });
export default site;
