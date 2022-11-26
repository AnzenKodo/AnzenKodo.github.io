export default ({ title }) => (
  <>
    <title>{title}</title>

    <link rel="icon" type="image/svg+xml" href />
    <link rel="manifest" href />
    <link
      rel="alternate"
      type="application/rss+xml"
      title="{}RSS Feed"
      href
    />
    <link
      rel="alternate"
      type="application/json"
      title="{data.name} JSON Feed"
      href="{data.start_url}feed.json"
    />
    <link
      rel="alternate"
      type="application/atom+xml"
      title="${data.name} Atom Feed"
      href="${data.start_url}feed.atom"
    />
    <link
      rel="sitemap"
      type="application/xml"
      title="${data.name} Sitemap"
      href="${data.start_url}sitemap.xml"
    />

    <link
      href="https://fontbit.io/css2?family=Radio+Canada:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
      rel="stylesheet"
    />

    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="author" content="${data.author}" />
    <meta name="description" content="${meta.description}" />
    <meta name="theme-color" content="${data.theme}" />
    <meta property="og:image" content="${data.start_url}${data.favicon}" />
    <meta property="og:image:width" content="500" />
    <meta property="og:image:height" content="500" />
    <meta property="og:image:alt" content="${data.name} logo" />
    <meta property="og:url" content="${data.start_url}${meta.url}.html" />
    <meta property="og:title" content="${meta.title} - ${data.name}" />
    <meta property="og:description" content="${meta.description}" />
  </>
);
