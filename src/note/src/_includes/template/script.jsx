export default function () {
  return (
    <script
      type="module"
      dangerouslySetInnerHTML={{
        __html:
          `Array.from(document.querySelectorAll(".files *:has(.active)")).map(x => x.open = true);
      `,
      }}
    />
  );
}
