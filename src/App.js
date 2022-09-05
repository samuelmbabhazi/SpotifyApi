import React, { useState, useEffect } from "react";
import "./App.css";
import { Identifiants } from "./Identifiants";
import axios from "axios";

import styled from "styled-components";
import Body from "./Body";

import Sidebar from "./Sidebar";
import Sideleftbar from "./Sideleftbar";

const App = () => {
  const [ide, setIde] = useState("hiphop");
  const [idp, setIdp] = useState("37i9dQZF1DX0XUsuxWHRQd");

  const spotify = Identifiants();

  const [playing, setPlaying] = useState("37i9dQZF1DX6tw5tib6ZrB");
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
      `https://api.spotify.com/v1/browse/categories/${ide}/playlists?limit=8`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    ).then((playlistResponse) => {
      setPlaylist({
        listOfIdPlaylistFromAPI: playlistResponse.data.playlists.items.map(
          (url) => ({
            id: url.id,
          })
        ),
        selectedPlaylist: playlist.selectedPlaylist,
        listOfPlaylistFromAPI: playlistResponse.data.playlists.items,
      });

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
        console.log("ancien", tracksResponse);
      });
    });
  }, [ide, idp, genres.selectedGenre, spotify.ClientId, spotify.ClientSecret]);

  return (
    <Container>
      <Sidebar genres={genres} ide={ide} setIde={setIde} />

      <Body
        playlist={playlist}
        setPlaylist={setPlaylist}
        items={tracks.listOfTracksFromAPI}
        setIdp={setIdp}
        
        tracks={tracks}
        setTracks={setTracks}
        token={token}
      />

      <Sideleftbar
        genres={genres}
        items={tracks.listOfTracksFromAPI}
        playing={playing}
        idp={idp}
        setPlaying={setPlaying}
      />
    </Container>
  );
};
const Container = styled.div`
  display: flex;
`;
export default React.memo(App);
