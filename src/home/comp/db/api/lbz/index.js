import getListensData from "./lbzMusic.js";
import getPlaylistData from "./lbzPlaylist.js";

export default async function fetchMusicImage(url) {
  if (!url) return "";

  const imageFetch = await fetch("https://coverartarchive.org/release/" + url);

  if (imageFetch.status === 200) {
    const imageJson = await imageFetch.json();
    return imageJson.images[0].thumbnails.small;
  }

  return "";
}

const music = await getPlaylistData();
music.listens = await getListensData();
export const musicData = music;
