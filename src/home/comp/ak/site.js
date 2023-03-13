import { parse } from "https://deno.land/std@0.179.0/path/mod.ts";

export default function site(start_url, add = {}, ignore = []) {
  const obj = {};

  [...Deno.readDirSync("./home/pages/")]
    .map((meta) => parse(meta.name).name)
    .filter((name) => ignore.indexOf(name) === -1)
    .map((name) => obj[name] = `${start_url}${name}`);

  return Object.assign(add, obj);
}
