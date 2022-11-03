import writeMd from "../comp/markdown.js";

const content = Deno.readTextFileSync("../LICENSE.md");

writeMd({
  name: "license",
  description: "License of AK",
  theme: "#3DA639",
  content,
});
