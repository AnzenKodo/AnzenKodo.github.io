import { formatNameSrc } from "../_includes/utils/format.js";
import getIcon from "../_includes/template/icon.js";
import getDis from "../_includes/template/dis.js";

export const templateEngine = "jsx";
export const url = "/feed.json";
export const layout = "";

export default function ({ site, search }, { md, url, htmlUrl }) {
  const feed = {
    version: "https://jsonfeed.org/version/1",
    title: site.name,
    home_page_url: url("", true),
    feed_url: url("feed.json", true),
    description: site.description,
    favicon: url("/favicon.png", true),
    icon: url("/favicon.png", true),
    author: {
      name: site.author,
      url: site.start_url,
    },
    items: [],
  };

  for (const post of search.pages("", "date=desc", 10)) {
    const title = formatNameSrc(post);

    feed.items.push({
      id: url(post.data.url, true),
      url: url(post.data.url, true),
      title,
      content_html: htmlUrl(md(post.data.content), true),
      date_published: post.data.date,
      banner_image: getIcon(
        title,
        getDis(htmlUrl(md(post.data.content))),
        post.data.site,
      ),
    });
  }

  return JSON.stringify(feed, null, 2);
}
