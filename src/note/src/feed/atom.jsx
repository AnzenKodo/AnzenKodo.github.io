import { formatNameSrc } from "../_includes/utils/format.js";

export const templateEngine = "jsx";
export const url = "/feed.atom";
export const layout = "";

export default ({ site, search }, { url, md, htmlUrl }) => {
  const entry = search.pages("", "date=desc", 10)
    .map((post) =>
      `  <entry>
    <title>${formatNameSrc(post)}</title>
    <link href="${url(post.data.url, true)}" />
    <updated>${post.data.date.toISOString()}</updated>
    <id>${url(post.data.url)}</id>
    <content type="html"><![CDATA[${htmlUrl(md(post.data.content))}]]></content>
  </entry>`
    ).join("\n");

  return `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${site.name}</title>
  <subtitle>${site.description}</subtitle>
  <link href="${url("/", true)}" />
  <link href="${url("/", true)}" rel="self" />
	<id>${url("/", true)}</id>
  <updated>${search.pages().at(-1).data.date.toISOString()}</updated>
  <author>
    <name>${site.author}</name>
    <email>${site.email}</email>
  </author>
  ${entry}
</feed>
`;
};
