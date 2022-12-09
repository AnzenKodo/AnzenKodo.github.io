function tocGet(toc) {
  if (!toc.length) return "";

  let tocItem = "<ol>";

  for (const item of toc) {
    tocItem += `<li><a href="#${item.slug}">${item.text}</a>`;

    tocItem += tocGet(item.children);
    tocItem += "</li>";
  }

  return tocItem += "</ol>";
}

export default function (props) {
  if (!props.toc?.length) return "";

  return (
    <nav
      class={props.class}
    >
      <details class={props.deClass}>
        <summary class={props.sumClass}>Table of Content</summary>
        <ol
          class={props.olClass}
          dangerouslySetInnerHTML={{ __html: tocGet(props.toc) }}
        />
      </details>
    </nav>
  );
}
