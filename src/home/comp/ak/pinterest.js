import { DATA } from "../data.js";
import {
  DOMParser,
} from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";

const url = `https://www.pinterest.com/${DATA.username}/imgporn/`;
const html = await fetch(url).then((res) => res.text());
const doc = new DOMParser().parseFromString(html, "text/html");

async function getImg(query, imgOld) {
  const imgUrl = doc.querySelector(query).getAttribute("src");
  const imgOg = imgUrl.replace(
    "https://i.pinimg.com/200x",
    "https://i.pinimg.com/originals",
  );

  return await fetch(imgOg).then((res) => {
    if (res.status === 403) {
      console.log("\nImage don't exists using existing redme image.");
      return imgOld;
    }
    return res.url;
  });
}

export async function getBanner(imgOld) {
  const query =
    "#mweb-unauth-container > div > div > div:nth-child(5) > div > div.F6l.k1A.zI7.iyn.Hsu > div > div:nth-child(2) > div > div > div.Pj7.sLG.XiG.ho-.m1e > div > div:nth-child(1) > div > div.XiG.zI7.iyn.Hsu > img";

  return await getImg(query, imgOld);
}

export async function getWallpaper(imgOld) {
  const query =
    "#mweb-unauth-container > div > div > div:nth-child(5) > div > div.F6l.k1A.zI7.iyn.Hsu > div > div:nth-child(1) > div > div > div.Pj7.sLG.XiG.ho-.m1e > div > div:nth-child(1) > div > div.XiG.zI7.iyn.Hsu > img";

  return await getImg(query, imgOld);
}

export async function getBrowserWallpaper(imgOld) {
  const query =
    "#mweb-unauth-container > div > div > div:nth-child(5) > div > div.F6l.k1A.zI7.iyn.Hsu > div > div:nth-child(1) > div > div > div.Pj7.sLG.XiG.ho-.m1e > div > div:nth-child(2) > div > div.XiG.zI7.iyn.Hsu > img";
  return await getImg(query, imgOld);
}
