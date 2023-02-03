import {
  DOMParser,
} from "https://deno.land/x/deno_dom@v0.1.32-alpha/deno-dom-wasm.ts";

const url =
  "https://ionicabizau.github.io/github-profile-languages/api.html?AnzenKodo";
const html = await fetch(url).then((res) => res.text());

const doc = new DOMParser().parseFromString(html, "text/html");
export const languages = Array.from(
  doc.querySelectorAll("#pieChart > svg > g.legend > g"),
).map((v) => v.textContent);
