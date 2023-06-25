import { CONFIG, DATA } from "../comp/data.js";
import getImg from "../comp/ak/pinterest.js";
import { languages } from "../comp/ak/lang.js";
import sites from "../comp/ak/sites.js";
import status from "../comp/ak/status.js";
import { writeInOutput } from "../comp/utils.js";

const config = structuredClone(CONFIG);
delete config.output;

writeInOutput(
  "api/ak.json",
  JSON.stringify(
    Object.assign(config, {
      "website": CONFIG.start_url,
      "color": DATA.style.theme.substring(1),
      "logo": CONFIG.start_url + "assets/ak/logo",
      "mascot": CONFIG.start_url + "assets/ak/mascot",
      "banner": await getImg([2, 1], CONFIG.banner),
      "wallpaper": {
        desktop: await getImg([1, 1], CONFIG.wallpaper.desktop),
        browser: await getImg([1, 2], CONFIG.wallpaper.browser),
        mobile: await getImg([3, 1], CONFIG.wallpaper.mobile),
        mobileLockscreen: await getImg(
          [3, 2],
          CONFIG.wallpaper.mobileLockscreen,
        ),
      },
      "api": Object.assign(CONFIG.api, {
        "blogroll": CONFIG.start_url + "api/blogroll.json",
      }),
      status,
      sites,
      languages,
    }),
    null,
    2,
  ),
);
