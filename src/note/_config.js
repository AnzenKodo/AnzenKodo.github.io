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

const data = JSON.parse(Deno.readTextFileSync("../config.json"));

const site = lume({
  location: new URL(data.start_url + "blog"),
  src: "./src",
  dest: "./site",
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
    plugins: [toc],
    keepDefaultPlugins: true,
  },
});

site.use(jsx())
  .use(windi({
    minify: true,
    mode: "interpret",
    config: {
      theme: {
        extend: { colors: { theme: "#e879f9", fg: "#18181B", bg: "#cbd5e1" } },
      },
    },
  }))
  .use(slugifyUrls())
  .use(basePath())
  .use(metas())
  .use(inline())
  .use(codeHighlight())
  .use(minifyHTML({ extensions: [".html", ".css", ".js"] }));

site.data("websiteName", "AK#Notes");
site.data("start_url", data.start_url);

export default site;
