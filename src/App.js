import React, { useState, useEffect } from "react";
import "./App.css";
import { Identifiants } from "./Identifiants";
import axios from "axios";

import styled from "styled-components";
import Body from "./Body";

import Sidebar from "./Sidebar";
import Sideleftbar from "./Sideleftbar";

const App = () => {

  const [search,setSearch]=useState("");
  
  const [ide, setIde] = useState("toplists");
  const [idp, setIdp] = useState("37i9dQZF1DX0XUsuxWHRQd");

  const spotify = Identifiants();

  console.log("RENDERING APP.JS");

  const [token, setToken] = useState("");
  const [genres, setGenres] = useState({
    selectedGenre: "",
    listOfGenresFromAPI: [],
  });
  const [playlist, setPlaylist] = useState({
    selectedPlaylist: "",
    listOfPlaylistFromAPI: [],
  });
  const [tracks, setTracks] = useState({
    selectedTrack: "",
    listOfTracksFromAPI: [],
  });
  const [trackDetail, setTrackDetail] = useState(null);

  useEffect(() => {
    axios("https://accounts.spotify.com/api/token", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " + btoa(spotify.ClientId + ":" + spotify.ClientSecret),
      },
      data: "grant_type=client_credentials",
      method: "POST",
    }).then((tokenResponse) => {
      setToken(tokenResponse.data.access_token);

      axios(
        "https://api.spotify.com/v1/browse/categories?locale=sv_US&limit=25",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + tokenResponse.data.access_token,
          },
        }
      ).then((genreResponse) => {
        setGenres({
          listOfGenresFromAPI: genreResponse.data.categories.items,

          listOfIconFromAPi: genreResponse.data.categories.items.map(
            (genre) => ({ icon: genre.icons, id: genre.id, name: genre.name })
          ),
        });
        console.log("nouve:", genres.listOfGenresFromAPI);
      });
    });
    axios(
      `https://api.spotify.com/v1/browse/categories/${ide}/playlists?limit=15`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    ).then((playlistResponse) => {
      setPlaylist({
        selectedPlaylist: playlist.selectedPlaylist,
        listOfPlaylistFromAPI: playlistResponse.data.playlists.items,
      
      });
      console.log("playlist", playlist.ListOfidPlaylist);
      axios(`https://api.spotify.com/v1/playlists/${idp}/tracks?limit=20`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }).then((tracksResponse) => {
        setTracks({
          selectedTrack: tracks.selectedTrack,
          listOfTracksFromAPI: tracksResponse.data.items,
        });
      });
    });
    axios(`https://api.spotify.com/v1/search?q=${encodeURI(search)}&type=artist,track,album,playlist&limit=15e`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }).then((tracksResponse) => {
        setTracks({
          selectedTrack: tracks.selectedTrack,
          listOfTracksFromAPI: tracksResponse.data.items,
        });
      });

  }, [search,ide,idp, genres.selectedGenre, spotify.ClientId, spotify.ClientSecret]);
  
  return (
    <Container>
      <Sidebar genres={genres} ide={ide} setIde={setIde} />

      <Body
        playlist={playlist}
        items={tracks.listOfTracksFromAPI}
        setIdp={setIdp}
        search={search}
        setSearch={setSearch}
      />

      <Sideleftbar genres={genres} />
    </Container>
  );
};
const Container = styled.div`
  display: flex;
`;
export default React.memo(App);
