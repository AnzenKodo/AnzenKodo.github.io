import { DATA } from "../comp/data.js";
import {
  getBanner,
  getBrowserWallpaper,
  getDarkWallpaper,
  getWallpaper,
} from "../comp/ak/pinterest.js";
import getTodo from "../comp/todo.js";
import { languages } from "../comp/ak/lang.js";
import { writeInOutput } from "../comp/utils.js";

const data = {
  "name": DATA.name,
  "username": DATA.username,
  "email": DATA.email,
  "description": "Programming nerd who is obsessed with JavaScript.",
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
  "darkWallpaper": await getDarkWallpaper(
    "https://i.pinimg.com/originals/29/e2/ed/29e2ed2f5a67c0827d2b05eb6eb663de.jpg",
  ),
  "browserWallpaper": await getBrowserWallpaper(
    "https://i.pinimg.com/originals/11/13/94/111394df5ea3cf00d7e71c2d2687694c.jpg",
  ),
  "socials": {
    "gitHub": "https://github.com/AnzenKodo",
    "twitter": "https://twitter.com/AnzenKodo",
    "discord": "https://discord.com/users/910257548593086474",
    "pinterest": "https://www.pinterest.com/AnzenKodo",
    "wakaTime": "https://wakatime.com/@AnzenKodo",
    "goodreads": "https://www.goodreads.com/AnzenKodo",
    "listenBrainz": "https://listenbrainz.org/user/AnzenKodo/",
    "simkl": "https://simkl.com/5607531",
  },
  languages,
  "todo": getTodo(),
  "support": {
    "ethereum": "0xE9421ad603651a6ecD56d3C78472E64EDE7Cf43A",
  },
  "api": {
    "blog": "https://anzenkodo.github.io/notes/feed.json",
    "db": DATA.start_url + "api/db.json",
    "github": "https://api.github.com/users/AnzenKodo",
  },
};

writeInOutput("api/ak.json", JSON.stringify(data, null, 2));
