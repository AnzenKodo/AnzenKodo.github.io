import { DATA } from "../data.js";
import { titleCase } from "../utils.js";
const url = DATA.start_url + "db/";

function addTag(ele, arr, func, type = "keys") {
  return `<${ele}>` + Object[type](arr).map(func).join("") + `</${ele}>`;
}

export function getNav(data) {
  const html = addTag('ul"', data, (ele) => {
    const topices = addTag("ul", data[ele], (ele2) => {
      const cate = addTag(
        "ul",
        data[ele][ele2],
        (ele3) => {
          const href = `${url}${ele}/${ele2}/${ele3}.html`;
          return `<li class="status"><a href="${href}">${
            titleCase(ele3)
          }</a></li>`;
        },
      );

      return `<li class="cat"><p>${titleCase(ele2)}</p>${cate}</li>`;
    });

    return `<li class="topic"><p>${titleCase(ele)}</p>${topices}</li>`;
  });

  return "<nav>" + html + "</nav>";
}
