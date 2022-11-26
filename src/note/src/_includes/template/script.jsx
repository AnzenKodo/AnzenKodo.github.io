export default function () {
  return (
    <script
      type="module"
      dangerouslySetInnerHTML={{
        __html:
          `Array.from(document.querySelectorAll(".files *:has(.active)")).map(x => x.open = true);
          if (window.matchMedia( "(min-width: 768px)" ).matches) {
            document.querySelector(".files").open = true;
          }`,
      }}
    />
  );
}
