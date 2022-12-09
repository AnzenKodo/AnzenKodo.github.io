import { formatDate, formatName } from "../utils/format.js";

function readingTime(text) {
  // get entire post content element
  const wordCount = `${text}`.match(/\b[-?(\w+)?]+\b/gi)?.length || 0;
  //calculate time in munites based on average reading time
  const timeInMinutes = wordCount / 225;
  //validation as we don't want it to show 0 if time is under 30 seconds
  let output;

  if (timeInMinutes <= 0.5) {
    output = 1;
  } else {
    //round to nearest minute
    output = Math.round(timeInMinutes);
  }

  return `${output}` + "min" + ``;
}

export default function Header(props) {
  const date = formatDate(props.date);
  const reading = readingTime(props.content);

  return (
    <div class={props.class}>
      <h1 class={props.titleClass}>{props.title}</h1>
      <ul class={props.metaClass}>
        <li class={props.dateClass}>
          <span class={props.disClass}>Date:{" "}</span>
          <time datetime={props.date}>{date}</time>
        </li>
        <li class={props.readingClass}>
          <span class={props.disClass}>Reading Time:{" "}</span>
          {reading}
        </li>
      </ul>
    </div>
  );
}
