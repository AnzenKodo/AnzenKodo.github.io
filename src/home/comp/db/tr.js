export default function getTr(item, t) {
  let ele = `<tr>`;

  for (const [key, value] of Object.entries(item)) {
    let tag = value;

    if (
      key === "url" || key === "isbn" || key === "id" || key === "categories" ||
      key === "status" || key === "creator_url" || key === "album_url"
    ) continue;

    if (key === "name") tag = `<a href="${item.url}">${value}</a>`;
    if (key === "img") {
      tag = `<img src="${value}" alt="${item.name} cover" loading="lazy">`;
    }
    if (key === "creator" && item.creator_url) {
      tag = `<a href="${item.creator_url}">${value}</a>`;
    }
    if (key === "album" && item.album_url) {
      tag = `<a href="${item.album_url}">${value}</a>`;
    }

    if (t === "th") tag = key;
    if (t === "th" && !value) {
      tag = "Data not found";
    }

    ele += `<${t}>${tag}</${t}>`;
  }

  return ele += "</tr>";
}
