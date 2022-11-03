import writeMd from "../comp/markdown.js";
import { todoMd as content } from "../comp/todo.js";

writeMd({
  theme: "#e44233",
  content: content,
  remove: 3,
});
