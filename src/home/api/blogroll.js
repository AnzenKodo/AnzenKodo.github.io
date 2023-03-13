import { writeInOutput } from "../comp/utils.js";
import { parse } from "npm:yaml";

const yaml = Deno.readTextFileSync("notes/Feed.yaml");
const json = JSON.stringify(parse(yaml), null, 2);

writeInOutput("api/blogroll.json", json);
