import { DATA } from "../comp/data.js";
import {
  getBanner,
  getBrowserWallpaper,
  getWallpaper,
} from "../comp/ak/pinterest.js";
import { languages } from "../comp/ak/lang.js";
import social from "../comp/ak/social.js";
import { writeInOutput } from "../comp/utils.js";

const data = Object.assign(DATA, {
  "website": DATA.start_url,
  "color": DATA.style.theme.substring(1),
  "logo": DATA.start_url + "assets/ak/logo",
  "mascot": DATA.start_url + "assets/ak/mascot",
  "banner": await getBanner(
    DATA.banner,
  ),
  "wallpaper": await getWallpaper(
    DATA.wallpaper,
  ),
  "browserWallpaper": await getBrowserWallpaper(
    DATA.browserWallpaper,
  ),
  "socials": social,
  languages,
  "api": Object.assign(DATA.api, {
    "blogroll": DATA.start_url + "api/blogroll.json",
  }),
});

writeInOutput("api/ak.json", JSON.stringify(data, null, 2));
