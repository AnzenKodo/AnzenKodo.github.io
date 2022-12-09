export default function (title, description, site) {
  const name = site.name.replace("#", "%23");
  const color = site.theme_dark.replace("#", "%23");
  description = description.replaceAll("#", "%23").replaceAll(" ", "%20");
  if (title === "Home") title = name;
  return `https://ogsupa.com/api/v1?font_style=font-sans` +
    `&title=${title}&description=${description}&right_meta=${name}` +
    `&background_color=${color}`;
  // content.match(/(?<=<img[^<]+?src=\")[^\"]+/)?.[0] || "/favicon.png";
}
