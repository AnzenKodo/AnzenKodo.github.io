import { formatNameSrc } from "../_includes/utils/format.js";

export const templateEngine = "jsx";
export const url = "/feed.xml";
export const layout = "";

export default ({ site, search }, { url, md, htmlUrl }) => {
  const entry = search.pages("", "date=desc", 10)
    .map((post) =>
      `  <item>
    <title>${formatNameSrc(post)}</title>
    <link>${url(post.data.url, true)}</link>
    <pubDate>${post.data.date.toISOString()}</pubDate>
    <description><![CDATA[${htmlUrl(md(post.data.content))}]]></description>
  </item>`
    ).join("\n");

  return `<?xml version="1.0" encoding="utf-8"?>
<rss xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${site.name}</title>
    <link>${url("/", true)}</link>
    <description>${site.description}</description>
    <language>en-US</language>
    <lastBuildDate>${
    search.pages().at(-1).data.date.toISOString()
  }</lastBuildDate>
    <image>
      <url>${url("/favicon.png", true)}</url>
      <title>${site.name}</title>
      <link>${url("/", true)}</link>
      <width>500</width>
      <height>500</height>
    </image>
    <atom:link href="${
    url("/feed.xml", true)
  }" rel="self" type="application/rss+xml" />
    <atom:link href="${
    url("/feed.xml", true)
  }" rel="alternate" type="application/rss+xml" />
    ${entry}
  </channel>
</rss>
`;
};
