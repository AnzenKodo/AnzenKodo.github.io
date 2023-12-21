import { marked } from "https://deno.land/x/marked@1.0.2/mod.ts";

const md = await fetch(
  "https://raw.githubusercontent.com/AnzenKodo/AnzenKodo/main/README.md",
).then((res) => res.text());

const config = JSON.parse(Deno.readTextFileSync(Deno.env.get("CONFIG")))

const renderer = {
  heading(text, level) {
    if (level === 1) return `<h1>${text}</h1>`;
    const escapedText = text.toLowerCase().replace(/[^\w]+/g, "-");
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

const html = marked.parse(md);

const fullHtml = `<!DOCTYPE html>
<html lang="en-US">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AK(${config.username})</title>
		<link rel="icon" type="image/png" href="${config.website}/assets/favicon/home-favicon.png">
		<meta name="description" content="${config.username} official website.">
		<meta name="theme-color" content="${config.color}">
		<meta property="og:type" content="profile">
		<meta property="og:description" content="${config.username} official website.">
		<meta property="og:image" content="${config.logo}.png">
		<meta property="og:image:alt" content="${config.username} logo">
		<meta property="og:profile:username" content="${config.username}">
		<meta property="og:profile:first_name" content="${config.name}">
        <style>
			:root {
			  --theme: ${config.color};
			  color-scheme: dark light;
     			  background: #000;
			  accent-color: var(--theme);
			}
            body {
				font-family: Consolas, "Lucida Console", Monaco, monospace;
				max-width: 40rem;
				margin: 0 auto;
            }
			a {
				color: var(--theme);
				text-decoration: none;
			}
			a:hover, a:focus {
				text-decoration: underline;
			}
        </style>
    </head>
    <body>${html}</body>
</html>`

Deno.writeTextFileSync(`./${Deno.env.get("OUTPUT")}/index.html`, fullHtml.replaceAll("\n", ""));
Deno.writeTextFileSync(`./${Deno.env.get("OUTPUT")}/404.html`, fullHtml.replaceAll("\n", ""));
