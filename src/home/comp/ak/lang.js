import {
  DOMParser,
} from "https://deno.land/x/deno_dom@v0.1.32-alpha/deno-dom-wasm.ts";

const url =
  "https://github-readme-stats.vercel.app/api/top-langs/?username=AnzenKodo&langs_count=100";
const html = await fetch(url).then((res) => res.text());

const doc = new DOMParser().parseFromString(html, "text/html");
export const languages = Array.from(doc.querySelectorAll(
  "svg > g:nth-child(6) > svg > g > g > text:nth-child(1)",
)).map((v) => v.textContent);
