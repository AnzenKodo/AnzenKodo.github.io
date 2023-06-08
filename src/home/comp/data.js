export const CONFIG = JSON.parse(Deno.readTextFileSync("./data/config.json"));

export const DATA = Object.assign(
  structuredClone(CONFIG),
  {
    description: CONFIG.username + " official website.",
    style: {
      "background": "#ffffff",
      "foreground": "#000000",
      "theme": "#f20544",
    },
  },
);
