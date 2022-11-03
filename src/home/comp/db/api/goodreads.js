import { parseFeed } from "https://deno.land/x/rss@0.5.6/mod.ts";
import { formatDate } from "../../utils.js";

export async function gdByShelf(shelf) {
  let gdXml = {};

  try {
    gdXml = await fetch(
      "https://www.goodreads.com/review/list_rss/141100671?key=ml90gMmc42ivHC14PhwJ70GJ5E0YWBCLodO1V4SJaaX-ZyCe&shelf=" +
        shelf,
    )
      .then((res) => res.text())
      .then((res) => parseFeed(res));
  } catch (_e) {
    console.log("\nThe shelf is empty: " + shelf);
    return [];
  }

  return gdXml.entries.map((item) => ({
    "img": item.book_small_image_url.value,
    "name": item.title.value,
    "creator": item.author_name.value,
    "date": formatDate(item.user_date_added.value).date,
    "page_number": item.book.num_pages?.value || "",
    "url": "https://www.goodreads.com/book/show/" + item.book.id,
    "isbn": item.isbn?.value,
    "id": item.book.id,
  }));
}

async function getCategories(reads) {
  for (let index = 0; index < reads.length; index++) {
    const read = reads[index];

    if (!read.isbn) {
      console.log(index + " " + read.url + " no isbn");
      continue;
    }

    const json = await fetch(
      "https://www.googleapis.com/books/v1/volumes?q=isbn:" + read.isbn,
    )
      .then((res) => res.json())
      .then((res) => res.items?.[0]?.volumeInfo);
    if (!json) {
      console.log(index + " " + read.url + " no data");
      continue;
    }

    const catJson = json?.categories;
    if (!catJson) continue;

    read.categories = catJson[0];
    reads[index] = read;
  }

  return reads;
}

export async function gdByCategories(catName) {
  const reads = await gdByShelf("read");
  const readsWithCat = await getCategories(reads);

  const cat = {};
  for (const arrs of catName) {
    for (const arr of arrs) {
      const catTitle = arrs[0].replace(" ", "-").toLowerCase();
      cat[catTitle] = readsWithCat.filter((item) => {
        if (!item.categories) return false;
        return item.categories.match(arr);
      });
    }
  }

  return cat;
}
