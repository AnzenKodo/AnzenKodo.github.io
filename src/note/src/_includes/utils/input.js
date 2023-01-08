export const input = "online";

export default function setInput(path, first = "", re = "") {
  return path.replace(/\.(md)$/, "")
    .replace(new RegExp(`^${first}\/${input}`), re);
}
