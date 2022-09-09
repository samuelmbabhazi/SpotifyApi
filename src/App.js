import React, { useState, useEffect } from "react";
import "./App.css";
import { Identifiants } from "./Identifiants";
import axios from "axios";

import styled from "styled-components";
import Body from "./Body";

import Sidebar from "./Sidebar";
import Sideleftbar from "./Sideleftbar";
import jwtDecode from "jwt-decode";

const App = () => {
  const [ide, setIde] = useState("hiphop");
  const [type, setType] = useState("playlist");
  const [idp, setIdp] = useState("37i9dQZF1DX6tw5tib6ZrB");
  const [idq, setIdq] = useState("2022");
  const [yourSearch, setYourSearch] = useState("POPULAR PLAYLIST");
  const [yourSearchALbum, setYourSearchALbum] = useState();
  const [yourSearchTrack, setYourSearchTrack] = useState();

  const spotify = Identifiants();

  const [playing, setPlaying] = useState("37i9dQZF1DX6tw5tib6ZrB");
  const [token, setToken] = useState("");
  const [genres, setGenres] = useState({
    selectedGenre: "",
    listOfGenresFromAPI: [],
  });
  const [album, setAlbum] = useState({
    listOfAlbumFromAPI: [],
  });
  const [albumSearch, setAlbumSearch] = useState({
    listOfAlbumFromAPISearch: [],
  });
  const [trackSearch, setTrackSearch] = useState({
    listOfTrackFromAPISearch: [],
  });
  const [playlist, setPlaylist] = useState({
    selectedPlaylist: "",
    listOfPlaylistFromAPI: [],
  });
  const [track, setTrack] = useState({
    listOfTrackFromAPI: [],
  });

  const [tracks, setTracks] = useState({
    selectedTrack: "",
    listOfTracksFromAPI: [],
  });

  const [user, setUser] = useState({});

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwtDecode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }
  function handleSignOut(event) {
    setUser({});
    window.location.reload();
    document.getElementById("signInDiv").hidden = false;
  }
  if (Object.keys(user).length !== 0) {
    document.getElementById("connexion").hidden = true;
  }
  useEffect(() => {
    /*global google */
    google.accounts.id.initialize({
      client_id:
        "335727433102-geo6pedmit8njss3hhe7nh6gfbkpt79a.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });

    console.log("user", user);

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
        "https://api.spotify.com/v1/browse/categories?locale=sv_US&limit=50",
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
      });

      axios(
        "https://api.spotify.com/v1/browse/new-releases?locale=sv_US&limit=50",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + tokenResponse.data.access_token,
          },
        }
      ).then((albumResponse) => {
        setAlbum({
          listOfAlbumFromAPI: albumResponse.data.albums.items,

          listOfIconAlbumFromAPi: albumResponse.data.albums.items.map(
            (genre) => ({
              type: genre.type,
              icon: genre.images,
              id: genre.id,
              name: genre.name,
            })
          ),
        });
      });
    });
    axios(`https://api.spotify.com/v1/search?q=${idq}&type=track&limit=50`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((tracksResponse) => {
      setTrack({
        listOfTrackIdFromAPI: tracksResponse.data.tracks.items.map((url) => ({
          id: url.id,
          type: url.type,
        })),

        listOfTrackFromAPI: tracksResponse.data.tracks.items,
      });
      console.log("track", tracksResponse);
    });

    axios(
      `https://api.spotify.com/v1/browse/categories/${ide}/playlists?limit=50`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    ).then((playlistResponse) => {
      setPlaylist({
        listOfIdPlaylistFromAPI: playlistResponse.data.playlists.items.map(
          (url) => ({
            id: url.id,
            type: url.type,
          })
        ),

        listOfPlaylistFromAPI: playlistResponse.data.playlists.items,
      });

      axios(`https://api.spotify.com/v1/playlists/${idp}/tracks?limit=50`, {
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
    <div id="home">
      <div id="connexion" className="connexion">
        <div className="text">
          <h1>find and listen your favorite artist</h1>
          <img src="logo.png" alt="" />
        </div>

        <div id="signInDiv"></div>
      </div>
      <div className="signout">
        {Object.keys(user).length !== 0 && (
          <button className="button" onClick={(e) => handleSignOut(e)}>
            Sign Out
          </button>
        )}
      </div>

      {Object.keys(user).length !== 0 && (
        <Container>
          <Sidebar
            genres={genres}
            ide={ide}
            setIde={setIde}
            setYourSearch={setYourSearch}
          />

          <Body
            setAlbum={setAlbum}
            album={album}
            playlist={playlist}
            setPlaylist={setPlaylist}
            items={tracks.listOfTracksFromAPI}
            setIdp={setIdp}
            yourSearch={yourSearch}
            setYourSearch={setYourSearch}
            tracks={tracks}
            track={track}
            setTracks={setTracks}
            token={token}
            setIde={setIde}
            setType={setType}
            setTrack={setTrack}
            setIdq={setIdq}
            setTrackSearch={setTrackSearch}
            setAlbumSearch={setAlbumSearch}
            albumSearch={albumSearch}
            trackSearch={trackSearch}
            yourSearchALbum={yourSearchALbum}
            yourSearchTrack={yourSearchTrack}
            setYourSearchAlbum={setYourSearchALbum}
            setYourSearchTrack={setYourSearchTrack}
            user={user}
          />

          <Sideleftbar
            genres={genres}
            items={tracks.listOfTracksFromAPI}
            playing={playing}
            idp={idp}
            type={type}
            setPlaying={setPlaying}
          />
        </Container>
      )}
    </div>
  );
};
const Container = styled.div`
  display: flex;

  @media (max-width: 900px) {
    flex-direction: column-reverse;
  }
`;
export default React.memo(App);
