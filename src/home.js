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

const getPage = (md, data, title = "") => {	
	return `<!DOCTYPE html>
<html lang="en-US">
	<head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AK(${data.username}${title})</title>
		<link rel="icon" type="image/png" href="${data.website}/assets/favicon/home-favicon.png">
		<meta name="description" content="${data.username} official website.">
		<meta name="theme-color" content="${data.color}">
		<meta property="og:type" content="profile">
		<meta property="og:description" content="${data.username} official website.">
		<meta property="og:image" content="${data.logo}.png">
		<meta property="og:image:alt" content="${data.username} logo">
		<meta property="og:profile:username" content="${data.username}">
		<meta property="og:profile:first_name" content="${data.name}">
        <style>
			:root {
				--theme: ${data.color};
				color-scheme: dark;
				accent-color: var(--theme);
			}
            body {
				font-family: Consolas, "Lucida Console", Monaco, monospace;
				max-width: 40rem;
				margin: 0 auto;
				padding: 0 1rem;
		 		background: #000;
		 		word-break: break-word;
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
		<footer>
		    <p style="text-align: center"><small><a href="${data.license}">LICENSE</a></small></p>
		</footer>
  	</body>
</html>`.replaceAll("\n", "")
}

const indexMd = await fetch("https://raw.githubusercontent.com/AnzenKodo/AnzenKodo/main/README.md")
    .then((res) => res.text());

Deno.writeTextFileSync(
	`./${Deno.env.get("OUTPUT")}/index.html`, 
	getPage(indexMd, info)
);
Deno.writeTextFileSync(
	`./${Deno.env.get("OUTPUT")}/404.html`, 
	getPage(
	   `# [AK](${info.website})(${info.username})@404\n## Page Not Found\n\nGo back [**Home**](${info.website})`, 
	   info,
	   "@404"
	)
);
Deno.writeTextFileSync(
	`./${Deno.env.get("OUTPUT")}/license.html`, 
	getPage(
	   `# [AK](${info.website})(${info.username})@License\n`+Deno.readTextFileSync("../LICENSE.md"), 
	   info,
	   "@License"
	)
);