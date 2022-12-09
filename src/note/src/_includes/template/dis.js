import htmlText from "https://esm.sh/html-text@1.0.1";

export default function (content) {
  return htmlText(content).slice(0, 280).replace(/[\n\t]/g, " ");
}
