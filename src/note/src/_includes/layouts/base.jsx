import Head from "../template/head.jsx";
import Footer from "../template/footer.jsx";
import NavBar from "../template/nav.jsx";
import Header from "../template/header.jsx";
import Toc from "../template/toc.jsx";
import Script from "../template/script.jsx";

const style = `
:root {
  @apply accent-theme;
  color-scheme: light;
}
::selection {
  @apply bg-blue-500 text-white;
}
body { font-family: 'Radio Canada', sans-serif; }

a {
  @apply text-theme;
}
a:hover, a:focus {
  @apply underline;
}
a:active {
  @apply bg-theme text-bg;
}

.files summary {
  cursor: pointer;
}
.files details details{
  @apply ml-3;
}
.files li {
  @apply ml-3;
}
.files .active {
  @apply font-bold;
}
.files .not-active {
  @apply font-normal;
}

.toc ol {
  @apply list-decimal;
  counter-reset: item;
}
.toc li {
  @apply ml-3 list-inside;
}
.toc ol li::before { 
  content: counters(item, ".") " "; 
  counter-increment: item;
}

.files > summary { 
  list-style: none;
}
@media (max-width: 768px) {
  .files {
    @apply fixed top-1 left-4 bg-white p-2; 
  }
  .files > summary {
    @apply text-3xl;
  }
}
`;

export default function (
  { children, url, websiteName, page, date, content, start_url, toc },
) {
  return (
    <html>
      <head>
        <Head />
        <Script />
      </head>
      <body>
        <style lang="windi">{style}</style>
        <a
          class="p-0.3em absolute bg-theme text-bg transform -translate-y-20/10 focus:translate-y-0"
          href="#main"
        >
          Skip to content
        </a>
        <div class="grid grid-cols-4 grid-rows-2 mt-1">
          <aside>
            <p class="font-bold text-2xl m-auto ml-2">
              <a href={start_url}>AK</a>#Notes
            </p>
            <NavBar url={url} class="files col-start-1" />
          </aside>
          <main
            id="main"
            class="min-h-screen col-start-2 col-end-10 row-start-1 row-end-3"
          >
            <Header
              name={page.src.slug}
              path={page.src.path}
              date={date}
              content={content}
              class=""
              titleClass="text-4xl font-bold"
              metaClass="font-light text-sm italic"
              dateClass="inline-block"
              readingClass="inline-block before:content-/ ml-2 before:mr-before:mr-2 before:font-normal"
              disClass="not-italic select-none"
            />
            <Toc
              toc={toc}
              class="toc fixed bottom-1 right-4 text-xs bg-white p-2"
              sumClass="text-sm"
              olClass="pt-2"
            />
            {children}
          </main>
          <Footer class="text-center text-sm p-10 max-h-2em col-start-2 col-end-10" />
        </div>
      </body>
    </html>
  );
}
