const config = JSON.parse(Deno.readTextFileSync("./data/config.json"));

export const DATA = Object.assign(
  config,
  {
    description: config.username + " official website.",
    style: {
      "background": "#ffffff",
      "foreground": "#000000",
      "theme": "#f20544",
    },
  },
);
