import { basename, dirname } from "https://deno.land/std@0.165.0/path/mod.ts";
import { input } from "./input.js";

export function formatName(name, path) {
  path = basename(dirname(path)).replace(/[-]/g, " ");

  name = name.replace(/\.(md)$/, "")
    .replace(/[-]/g, " ");

  if (name === "index") {
    name = path;
    if (path === input) name = "Home";
  }

  return name;
}

export function formatNameSrc(data) {
  return formatName(data.src.slug, data.src.path);
}

export function formatDate(dateUTC) {
  const date = new Date(dateUTC);

  const yyyy = date.getFullYear();
  const mm = date.getMonth() + 1; // Monts start at 0
  const dd = date.getDate();

  return dd + "-" + mm + "-" + yyyy;
}
