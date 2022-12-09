export default ({ site, url, title, description, icon }) => {
  icon = icon || site.favicon;

  return (
    <>
      <title>{title} - {site.name}</title>

      <link rel="icon" type="image/png" href={url(site.favicon, true)} />
      <link rel="manifest" href={url("/manifest.json", true)} />
      <link
        rel="alternate"
        type="application/rss+xml"
        title={site.name + " RSS Feed"}
        href={url("/feed.xml", true)}
      />
      <link
        rel="alternate"
        type="application/json"
        title={site.name + " JSON Feed"}
        href={url("/feed.json", true)}
      />
      <link
        rel="alternate"
        type="application/atom+xml"
        title={site.name + " Atom Feed"}
        href={url("/feed.atom", true)}
      />
      <link
        rel="sitemap"
        type="application/xml"
        title={site.name + " Sitemap"}
        href={url("/sitemap.xml", true)}
      />

      <link
        href="https://fontbit.io/css2?family=Radio+Canada:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.6.0/build/styles/tokyo-night-dark.min.css"
        rel="stylesheet"
      />

      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css"
      />

      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta name="author" content={site.author} />
      <meta name="theme-color" content={site.theme_dark} />

      <meta property="og:title" content={title} />
      <meta property="og:image" content={url(icon, true)} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={url(icon, true)} />
      <meta itemprop="name" content={title} />
      <meta itemprop="description" content={description} />
      <meta itemprop="image" content={url(icon, true)} />
      <meta name="description" content={description} />
    </>
  );
};
