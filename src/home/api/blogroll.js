import { writeInOutput } from "../comp/utils.js";
import { parse } from "npm:yaml";

const yaml = Deno.readTextFileSync("data/feed.yaml");
const obj = parse(yaml);
const json = JSON.stringify(obj, null, 2);

writeInOutput("api/blogroll.json", json);
