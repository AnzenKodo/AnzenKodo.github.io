const bookmark = await fetch(
  "https://raw.githubusercontent.com/AnzenKodo/dotfiles/master/browser/Bookmarks.bak",
).then((res) => res.json());

const social = {};

bookmark
  .roots
  .bookmark_bar
  .children
  .filter((item) => item.name === "Personal")[0]
  .children
  .filter((item) => item.name === "Social Media")[0]
  .children
  .map((obj) => social[obj.name] = obj.url);

export default social;
