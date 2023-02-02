import { getAnime, getMovies, getShows } from "../comp/db/api/simkl.js";
import { gdByCategories, gdByShelf } from "../comp/db/api/goodreads.js";
import { musicData } from "../comp/db/api/lbz/index.js";
import { writeInOutput } from "../comp/utils.js";

const data = {
  "movies": {
    "general": {
      "completed": getMovies("completed"),
      "planned": getMovies("plantowatch"),
      "dropped": getMovies("dropped"),
    },
    "anime-movies": {
      "completed": getAnime("movie", "completed"),
      "planned": getAnime("movie", "plantowatch"),
      "dropped": getAnime("movie", "dropped"),
    },
  },
  "shows": {
    "general": {
      "watching": getShows("watching"),
      "completed": getShows("completed"),
      "planned": getShows("plantowatch"),
      "dropped": getShows("dropped"),
    },
    "anime": {
      "watching": getAnime("tv", "watching"),
      "completed": getAnime("tv", "completed"),
      "planned": getAnime("tv", "plantowatch"),
      "dropped": getAnime("tv", "dropped"),
    },
    "ona": {
      "watching": getAnime("ona", "watching"),
      "completed": getAnime("ona", "completed"),
      "planned": getAnime("ona", "plantowatch"),
      "dropped": getAnime("ona", "dropped"),
    },
  },
  "books": {
    "general": {
      "reading": await gdByShelf("currently-reading"),
      "read": await gdByShelf("read"),
      "planned": await gdByShelf("to-read"),
      "dropped": await gdByShelf("dropped"),
    },
    "categories": await gdByCategories([
      ["Computers", "Bitcoin"],
      ["Science", "Psychology", "Social Science"],
      ["Biography", "Autobiography"],
      ["Economics"],
      ["Fiction"],
      ["Philosophy"],
    ]),
    "types": {
      "light-novel": await gdByShelf("light-novel"),
      "web-novel": await gdByShelf("web-novel"),
    },
  },
  "comic": {
    "manga": {
      "reading": await gdByShelf("manga-reading"),
      "read": await gdByShelf("manga-read"),
      "planned": await gdByShelf("manga-to-read"),
      "dropped": await gdByShelf("manga-dropped"),
    },
    "types": {
      "oneshot": await gdByShelf("oneshot"),
      "web-comics": await gdByShelf("web-comic"),
    },
  },
  "sound": {
    "audiobooks": {
      "listens": await gdByShelf("listen"),
      "listening": await gdByShelf("listening"),
      "dropped": await gdByShelf("listening-dropped"),
    },
     "music": musicData,
  },
};

writeInOutput("api/db.json", JSON.stringify(data, null, 2));
