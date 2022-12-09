export const templateEngine = "jsx";
export const layout = "";
export const url = "/manifest.json";

export default ({ site }, { url }) => {
  return JSON.stringify(
    {
      $schema: "https://json.schemastore.org/web-manifest-combined.json",
      name: site.name,
      sort_name: site.name,
      start_url: url("/", true),
      display: "standalone",
      background_color: site.foreground,
      theme_color: site.theme_dark,
      description: site.description,
      orientation: "portrait",
      icons: [
        {
          src: url(site.favicon, true),
          sizes: "500x500",
          type: "image/png",
        },
      ],
    },
    null,
    2,
  );
};
