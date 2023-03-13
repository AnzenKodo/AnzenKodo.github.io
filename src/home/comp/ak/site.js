import { parse } from "https://deno.land/std@0.179.0/path/mod.ts";

export default function site(start_url, ignore) {
  const obj = {};
  const names = [...Deno.readDirSync("src/home/pages/")]
    .map((meta) => parse(meta.name).name)
    .filter((name) => ignore.indexOf(name) === -1);

  names.map((name) => obj[name] = `${start_url}${name}`);
  return obj;
}
