import { DATA } from "../comp/data.js";
import {
  getBanner,
  getBrowserWallpaper,
  getWallpaper,
} from "../comp/ak/pinterest.js";
import getTodo from "../comp/todo.js";
import { languages } from "../comp/ak/lang.js";
import site from "../comp/ak/site.js";
import social from "../comp/ak/social.js";
import { writeInOutput } from "../comp/utils.js";

const data = {
  "name": DATA.name,
  "username": DATA.username,
  "email": DATA.email,
  "description": "Understanding the world one step at time...",
  "location": DATA.location,
  "age": "ಠ_ಠ",
  "hobby": "Making fun stuff.",
  "website": DATA.start_url,
  "color": DATA.style.theme.substring(1),
  "logo": DATA.start_url + "assets/ak/logo",
  "mascot": DATA.start_url + "assets/ak/mascot",
  "banner": await getBanner(
    "https://i.pinimg.com/originals/cd/e7/44/cde7443d181a91918d4460eea5f5e2cf.jpg",
  ),
  "wallpaper": await getWallpaper(
    "https://i.pinimg.com/originals/b6/b8/d5/b6b8d5c86aa26c964f701a6f8a3a8e51.jpg",
  ),
  "browserWallpaper": await getBrowserWallpaper(
    "https://i.pinimg.com/originals/11/13/94/111394df5ea3cf00d7e71c2d2687694c.jpg",
  ),
  "socials": social,
  languages,
  "todo": getTodo(),
  "support": {
    "ethereum": "0xE9421ad603651a6ecD56d3C78472E64EDE7Cf43A",
  },
  "site": site(
    DATA.start_url,
    ["index", "license"],
  ),
  "api": {
    "db": DATA.start_url + "api/db.json",
    "pinboard": DATA.start_url + "api/pinboard.json",
    "blogroll": DATA.start_url + "api/blogroll.json",
    "github": "https://api.github.com/users/AnzenKodo",
    "bookmarks":
      "https://github.com/AnzenKodo/dotfiles/blob/master/browser/Bookmarks.bak",
  },
};

writeInOutput("api/ak.json", JSON.stringify(data, null, 2));
