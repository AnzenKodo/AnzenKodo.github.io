import { DATA } from "./data.js";
import { dirname } from "https://deno.land/std@0.158.0/path/mod.ts";
import { ensureDirSync } from "https://deno.land/std@0.158.0/fs/mod.ts";

export function writeInOutput(path, content) {
  const pathFull = DATA.output + "/" + path;
  const pathDir = dirname(pathFull);

  ensureDirSync(pathDir);
  Deno.writeTextFileSync(pathFull, content);
}

export function formatDate(date) {
  date = new Date(date);

  const dd = date.getDate();
  const mm = new Intl.DateTimeFormat("en-US", { month: "short" }).format(date);
  const yyyy = date.getFullYear();

  const hh = date.getHours();
  const mi = date.getMinutes();

  return { date: `${dd}-${mm}-${yyyy}`, time: `${hh}:${mi}` };
}

export function titleCase(char) {
  return char.replace(
    /\w\S*/g,
    function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    },
  );
}
