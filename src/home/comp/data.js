export const CONFIG = JSON.parse(Deno.readTextFileSync("./config.json"));

export const DATA = Object.assign(CONFIG, {
  description: CONFIG.username + " official website.",
  location: "Mom's basement",
  style: {
    "background": "#ffffff",
    "foreground": "#000000",
    "theme": "#f20544",
  },
  output: "../" + CONFIG.output,
});

export const AK = () =>
  JSON.parse(
    Deno.readTextFileSync(DATA.output + "/api/ak.json"),
  );
