const bookmark = await fetch(
  "https://raw.githubusercontent.com/AnzenKodo/dotfiles/master/browser/Bookmarks.bak",
).then((res) => res.json());

const sites = {};

bookmark
  .roots
  .bookmark_bar
  .children
  .filter((item) => item.name === "Personal")[0]
  .children
  .filter((item) => item.name === "Social Media")[0]
  .children
  .map((obj) => sites[obj.name] = obj.url);

export default sites;
