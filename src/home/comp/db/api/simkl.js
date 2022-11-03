import { formatDate } from "../../utils.js";

const simklData = await fetch(
  "https://api.simkl.com/sync/all-items//?episode_watched_at=yes",
  {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Deno.env.get("SIMKL_ACCESS_TOKEN")}`,
      "simkl-api-key": Deno.env.get("SIMKL_CLIENT_ID"),
    },
  },
).then((res) => res.json());

function simklDataFormat(data, type = "show") {
  return data.map((item) => ({
    img: `https://simkl.in/posters/${item[type].poster}_c.webp`,
    name: item[type].title,
    date: formatDate(item.last_watched_at).date,
    url: "https://simkl.com/anime/" + item[type].ids.simkl,
    status: item.status,
  }));
}

export function getAnime(type, status) {
  const anime = simklData.anime;

  const matchTypeAnime = anime.filter((item) => item.anime_type === type);

  const matchStatusAnime = matchTypeAnime
    .filter((item) => item.status === status);

  return simklDataFormat(matchStatusAnime);
}

export function getMovies(status) {
  const movies = simklData.movies;
  const matchStatusMovies = movies.filter((item) => item.status === status);
  return simklDataFormat(matchStatusMovies, "movie");
}

export function getShows(status) {
  const shows = simklData.shows;
  const matchStatusShows = shows.filter((item) => item.status === status);
  return simklDataFormat(matchStatusShows);
}
