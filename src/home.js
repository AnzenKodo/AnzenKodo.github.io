import { marked } from "https://deno.land/x/marked@1.0.2/mod.ts";

const info = JSON.parse(Deno.readTextFileSync(Deno.env.get("INFO")))

const renderer = {
	heading(text, level) {
    	if (level === 1) return `<h1>${text}</h1>`;
    	const escapedText = text.toLowerCase().replace(/[^\w]+/g, "-");
    	return `<h${level} id="${escapedText}"><a name="${escapedText}" href="#${escapedText}"></a>${text}</h${level}>`;
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

const getPage = (md) => {	
	return `<!DOCTYPE html>
<html lang="en-US">
	<head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AK(${info.username})</title>
		<link rel="icon" type="image/png" href="${info.website}/assets/favicon/home-favicon.png">
		<meta name="description" content="${info.username} official website.">
		<meta name="theme-color" content="${info.color}">
		<meta property="og:type" content="profile">
		<meta property="og:description" content="${info.username} official website.">
		<meta property="og:image" content="${info.logo}.png">
		<meta property="og:image:alt" content="${info.username} logo">
		<meta property="og:profile:username" content="${info.username}">
		<meta property="og:profile:first_name" content="${info.name}">
        <style>
			:root {
				--theme: ${info.color};
				color-scheme: dark;
				accent-color: var(--theme);
			}
            body {
				font-family: Consolas, "Lucida Console", Monaco, monospace;
				max-width: 40rem;
				margin: 0 auto;
				padding: 0 1rem;
		 		background: #000;
            }
			a {
				color: var(--theme);
				text-decoration: none;
			}
			a:hover, a:focus {
				text-decoration: underline;
			}
   			a:active {
	  			background: var(--theme);
	  			color: inherit;
	  		}
            img { max-width: 100% }
            h2 a::before { 
                content: "#";
                margin-right: 0.5rem;
            }
        </style>
    </head>
    <body>
		${marked.parse(md)}
  	</body>
</html>`.replaceAll("\n", "")
}

const indexMd = await fetch("https://raw.githubusercontent.com/AnzenKodo/AnzenKodo/main/README.md")
    .then((res) => res.text());

Deno.writeTextFileSync(
	`./${Deno.env.get("OUTPUT")}/index.html`, 
	getPage(indexMd)
);
Deno.writeTextFileSync(
	`./${Deno.env.get("OUTPUT")}/404.html`, 
	getPage(`<p style="font-size: 2rem;text-align: center;">404 Page Not Found</p>\n`+indexMd)
);
Deno.writeTextFileSync(
	`./${Deno.env.get("OUTPUT")}/license.html`, 
	getPage(`# [AK](info.website)#(License)\n`+Deno.readTextFileSync("../LICENSE.md"))
);