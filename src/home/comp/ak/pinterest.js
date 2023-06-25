import { DATA } from "../data.js";
import {
  DOMParser,
} from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";

const url = `https://www.pinterest.com/${DATA.username}/imgs/`;
const html = await fetch(url).then((res) => res.text());
const doc = new DOMParser().parseFromString(html, "text/html");

const query = (boardIndex, imgIndex) =>
  `#mweb-unauth-container > div > div > div:nth-child(5) > div > div.F6l.k1A.zI7.iyn.Hsu > div > div:nth-child(${boardIndex}) > div > div > div.Pj7.sLG.XiG.ho-.m1e > div > div:nth-child(${imgIndex}) > div > div.XiG.zI7.iyn.Hsu > img`;

export default async function getImg([boardIndex, imgIndex], imgOld) {
  const imgUrl = doc.querySelector(query(boardIndex, imgIndex)).getAttribute(
    "src",
  );
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
