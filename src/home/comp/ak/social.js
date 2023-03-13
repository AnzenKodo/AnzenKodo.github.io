import { AK } from "../data.js";
const bookmark = await fetch(AK.api.bookmarks).then((res) => res.json());

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
