import { CONFIG } from "../data.js";

const bookmark = await fetch(CONFIG.api.bookmarks).then((res) => res.json());

const sites = {};

bookmark
  .roots
  .bookmark_bar
  .children
  .filter((item) => item.name === "Personal")[0]
  .children
  .filter((item) => item.name === "Social Media")[0]
  .children
  .map((obj) =>
    sites[obj.name.match(/^[\w# ]+[^ -]/)[0]] = {
      description: obj.name.match(/[^- ][\w ]+$/)[0],
      url: obj.url,
    }
  );

export default sites;
