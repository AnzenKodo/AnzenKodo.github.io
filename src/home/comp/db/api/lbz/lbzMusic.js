import fetchMusicImage from "./index.js";
import { DATA } from "../../../data.js";

async function getTracks(tracks) {
  const lbzData = [];

  for (const item of tracks) {
    const lbzTracks = item.track_metadata;
    const lbzMbid = lbzTracks.mbid_mapping;
    const url = "https://musicbrainz.org/";

    lbzData.push({
      img: await fetchMusicImage(lbzMbid?.release_mbid) || "",
      name: lbzTracks.track_name,
      creator: lbzTracks.artist_name,
      album: lbzTracks.release_name ? lbzTracks.release_name : "",
      url: lbzMbid?.recording_mbid
        ? url + "recording/" + lbzMbid?.recording_mbid
        : "",
      creator_url: lbzMbid?.artist_mbids
        ? url + "artist/" + lbzMbid?.artist_mbids[0]
        : "",
      album_url: lbzMbid?.release_mbid
        ? url + "release/" + lbzMbid?.release_mbid
        : "",
    });
  }

  return lbzData;
}

export default async function getListensData() {
  const lbz = await fetch(
    `https://api.listenbrainz.org/1/user/${DATA.username}/listens`,
  ).then((res) => res.json());

  const lbzListens = lbz.payload.listens;

  return await getTracks(lbzListens);
}
