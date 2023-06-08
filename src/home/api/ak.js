import { CONFIG } from "../comp/data.js";
import {
  getBanner,
  getBrowserWallpaper,
  getWallpaper,
} from "../comp/ak/pinterest.js";
import { languages } from "../comp/ak/lang.js";
import sites from "../comp/ak/sites.js";
import { writeInOutput } from "../comp/utils.js";

writeInOutput(
  "api/ak.json",
  JSON.stringify(
    Object.assign(CONFIG, {
      "website": CONFIG.start_url,
      "color": CONFIG.style.theme.substring(1),
      "logo": CONFIG.start_url + "assets/ak/logo",
      "mascot": CONFIG.start_url + "assets/ak/mascot",
      "banner": await getBanner(
        CONFIG.banner,
      ),
      "wallpaper": await getWallpaper(
        CONFIG.wallpaper,
      ),
      "browserWallpaper": await getBrowserWallpaper(
        CONFIG.browserWallpaper,
      ),
      "api": Object.assign(CONFIG.api, {
        "blogroll": CONFIG.start_url + "api/blogroll.json",
      }),
      sites,
      languages,
    }),
    null,
    2,
  ),
);
