import writeHtml from "../comp/html.js";
import getTr from "../comp/db/tr.js";
import { getNav } from "../comp/db/header.js";
import { titleCase } from "../comp/utils.js";
import { DATA } from "../comp/data.js";

import { style } from "../comp/db/style.js";
const name = `db`;
const theme = "#e97b00";
const description = "Database of everything I have watched, read, and listened";
const data = JSON.parse(
  Deno.readTextFileSync(DATA.output + "/api/database.json"),
);

writeHtml({
  name,
  description,
  theme,
  content: getNav(data),
  path: "index",
  style,
});

const topics = Object.keys(data);

for (const topic of topics) {
  const categories = Object.keys(data[topic]);

  for (const categorie of categories) {
    const status = Object.keys(data[topic][categorie]);

    for (const statu of status) {
      const items = data[topic][categorie][statu];
      const meta = items?.[0] || {};
      const urlPath = `${topic}/${categorie}/${statu}`;

      const content = '<div class="table"><table>' +
        getTr(meta, "th") +
        items.map((item) => getTr(item, "td")).join("") +
        "</table></div>";

      writeHtml({
        name,
        prems: `${titleCase(topic)}>${titleCase(categorie)}>${
          titleCase(statu)
        }`,
        description,
        theme,
        content,
        path: urlPath,
        style,
      });
    }
  }
}
