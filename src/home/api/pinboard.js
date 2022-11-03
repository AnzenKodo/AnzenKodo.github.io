import { writeInOutput } from "../comp/utils.js";
const json = await fetch(
  "https://raw.githubusercontent.com/AnzenKodo/dotfiles/master/browser/Bookmarks.bak",
).then((res) => res.json());

const obj = json.roots.bookmark_bar.children;
const bookmarks = obj.filter((val) => val.id === "631");
const pinboards = bookmarks[0].children;

const index = {};
for (const pinboard of pinboards) {
  if (!index["To-Read"]) index["To-Read"] = [];
  if (!index["Read"]) index["Read"] = [];

  if (pinboard.type === "folder") {
    if (!index[pinboard.name]) index[pinboard.name] = [];

    for (const child of pinboard.children) {
      index["Read"].push({ [child.name]: child.url });
      index[pinboard.name].push({ [child.name]: child.url });
    }
  } else {
    index["To-Read"].push({ [pinboard.name]: pinboard.url });
  }
}

writeInOutput("api/pinboard.json", JSON.stringify(index, null, 2));
