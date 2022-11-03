export const CONFIG = JSON.parse(Deno.readTextFileSync("./config.json"));

const data = Object.assign(CONFIG, {
  description: CONFIG.username + " official website.",
  location: "Mom's basement",
  style: {
    "background": "#ffffff",
    "foreground": "#000000",
    "theme": "#f20544",
  },
  output: "../" + CONFIG.output,
});

export const DATA = data;
