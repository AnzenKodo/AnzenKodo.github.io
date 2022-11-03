import fetchMusicImage from "./index.js";
import { DATA } from "../../../data.js";

async function getPlayTracks(tracks) {
  const url = "https://musicbrainz.org/";

  return {
    img: await fetchMusicImage(tracks?.release_mbid) || "",
    name: tracks.recording_name,
    creator: tracks.artist_credit_name,
    album: tracks.release_name ? tracks.release_name : "",
    url: tracks?.recording_mbid
      ? url + "recording/" + tracks?.recording_mbid
      : "",
    creator_url: tracks?.artist_mbids
      ? url + "artist/" + tracks?.artist_mbids[0]
      : "",
    album_url: tracks?.release_mbid
      ? url + "release/" + tracks?.release_mbid
      : "",
  };
}

export default async function getPlaylistData() {
  const lbz = await fetch(
    `https://api.listenbrainz.org/1/user/${DATA.username}/playlists`,
  ).then((res) => res.json());

  const lbzPlay = lbz.playlists;

  const lbzData = {};
  for (const item of lbzPlay) {
    const regex = /[\w\d-]+$/;

    const lbzPlayUrl = item.playlist.identifier;
    const lbzPlayMbid = lbzPlayUrl.match(regex)[0];
    const lbzPlayTitle = item.playlist.title.toLowerCase();

    const lbzPlayList = await fetch(
      "https://api.listenbrainz.org/1/playlist/" + lbzPlayMbid,
    ).then((res) => res.json());

    const lbzPlayTracks = lbzPlayList.playlist.track;

    for (const item of lbzPlayTracks) {
      const tracks = await fetch(
        `https://api.listenbrainz.org/1/metadata/lookup/?artist_name=${item.creator}&recording_name=${item.title}`,
      ).then((res) => res.json());

      lbzData[lbzPlayTitle] = lbzData[lbzPlayTitle] || [];

      lbzData[lbzPlayTitle].push(await getPlayTracks(tracks));
    }
  }
  return lbzData;
}
