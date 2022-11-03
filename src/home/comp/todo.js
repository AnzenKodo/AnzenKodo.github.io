export const todoMd = Deno.readTextFileSync("notes/Todo.md");

export default function getTodo() {
  const arrMd = todoMd.match(/## .*\n(- \s|.+\n)+/g);

  const obj = {};
  for (const val of arrMd) {
    const title = val.match(/(?<=^## ).*/)[0];
    const lists = val.match(/^(\s+|)- \[ \] .+/gm);

    const nestedList = lists.map((list) => {
      return list.replace(/- \[ \]/, "").replace(/^\s/, "");
    });

    obj[title.toLowerCase()] = nestedList;
  }

  return obj;
}
