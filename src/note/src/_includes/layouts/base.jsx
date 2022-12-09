import Head from "../template/head.jsx";
import Footer from "../template/footer.jsx";
import Files from "../template/nav.jsx";
import Header from "../template/header.jsx";
import Toc from "../template/toc.jsx";
import Script from "../template/script.jsx";

import style from "../style/style.js";
import styleNav from "../style/nav.js";
import styleContent from "../style/content.js";
import styleMedia from "../style/media.js";

import { formatNameSrc } from "../utils/format.js";
import getIcon from "../template/icon.js";
import getDis from "../template/dis.js";

export default function (
  { children, url, page, date, content, site, toc },
  func,
) {
  const title = formatNameSrc(page);
  const description = getDis(content);
  const icon = getIcon(title, description, site);

  return (
    <html>
      <head>
        <Head
          url={func.url}
          site={site}
          title={title}
          description={description}
          icon={icon}
        />
        <Script />
      </head>
      <body>
        <style lang="windi">
          {style(site.theme, site.theme_dark) + styleNav + styleContent +
            styleMedia}
        </style>
        <a
          class="p-0.3em absolute bg-$theme text-inherit transform -translate-y-20/10 focus:translate-y-0"
          href="#main"
        >
          Skip to content
        </a>
        <div class="page p-5 mx-auto max-w-screen-lg grid grid-cols-[13rem,768px] gap-x-8">
          <aside class="">
            <p class="font-bold text-2xl m-auto">
              <a href={site.start_url}>AK</a>#Notes
            </p>
            <div class="menu absolute right-4 top-5 hidden">
              <input type="checkbox" />
              <label for="Menu button"></label>
            </div>
            <div class="menu-items">
              <p class="feed">
                Feeds: <a href={func.url("/feed.xml", true)}>RSS</a>{" "}
                <a href={func.url("/feed.atom", true)}>Atom</a>{" "}
                <a href={func.url("/feed.json", true)}>JSON</a>
              </p>
              <Files funcUrl={func.url} url={url} class="files my-5" />
              <Toc
                toc={toc}
                class="toc fixed bottom-4 right-4 text-xs bg-white @dark:bg-black p-2 max-h-screen-sm overflow-x-auto"
                sumClass="text-sm"
                olClass="pt-2"
              />
            </div>
          </aside>
          <main
            id="main"
            class="min-h-screen"
          >
            <Header
              title={title}
              path={page.src.path}
              date={date}
              content={content}
              class="mb-8"
              titleClass="text-4xl font-bold"
              metaClass="font-light text-sm italic"
              dateClass="inline-block"
              readingClass="inline-block before:content-/ ml-2 before:mr-before:mr-2 before:font-normal"
              disClass="not-italic select-none"
            />
            <div class="content hyphens-manual">
              {children}
            </div>
          </main>
          <Footer
            class="text-center text-sm p-10 max-h-2em col-start-2"
            start_url={site.start_url}
          />
        </div>
      </body>
    </html>
  );
}
