import { writeInOutput } from "../comp/utils.js";
const json = await fetch(
  "https://raw.githubusercontent.com/AnzenKodo/dotfiles/master/browser/Bookmarks.bak",
).then((res) => res.json());

const pinboards = json.roots.other.children;

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
