import React from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

import axios from "axios";
function Navbar({ props, search, setSearch, resultSearch, setResultSearch }) {
  const Mysearch = (e) => {
    setSearch(e.target.value);
  };
  const changeContent = (event) => {
    event.preventDefault();

    setSearch(search);
    props.setYourSearch("PLAYLIST : " + search);
    props.setYourSearchAlbum("ALBUM : " + search);
    props.setYourSearchTrack("TRACK : " + search);
    axios(
      `https://api.spotify.com/v1/search?q=${encodeURI(
        search
      )}&type=track,artist,album,playlist&limit=50`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + props.token,
        },
      }
    ).then((tracksResponse) => {
      props.setPlaylist({
        listOfIdPlaylistFromAPI: tracksResponse.data.playlists.items.map(
          (url) => ({
            id: url.id,
            type: url.type,
          })
        ),

        listOfPlaylistFromAPI: tracksResponse.data.playlists.items,
      });
      props.setIde(props.playlist.listOfIdPlaylistFromAPI.id);
      props.setAlbumSearch({
        listOfAlbumFromAPISearch: tracksResponse.data.albums.items,

        listOfIconAlbumFromAPiSearch: tracksResponse.data.albums.items.map(
          (genre) => ({
            type: genre.type,
            icon: genre.images,
            id: genre.id,
            name: genre.name,
          })
        ),
      });

      props.setTrackSearch({
        listOfTrackIdFromAPISearch: tracksResponse.data.tracks.items.map(
          (urle) => ({
            id: urle.id,
            type: urle.type,
          })
        ),

        listOfTrackFromAPISearch: tracksResponse.data.tracks.items,
      });

      props.setIde(props.trackSearch.listOfTrackIdFromAPISearch.id);
    });

    setSearch("");
  };

  return (
    <Container>
      <div className="search_bar" id="search">
        <form action="" onSubmit={changeContent}>
          <input
            type="text"
            placeholder="Artist, song"
            required
            value={search}
            onChange={Mysearch}
          />
          <div className="search">
            <button type="submit">
              <span>
                <FaSearch />
              </span>{" "}
            </button>
          </div>
        </form>
      </div>
      {
        <div className="avatar">
          <a href="#">
            <img src={props.user.picture} alt="" width={25} />
            <span>{props.user.given_name}</span>
          </a>
        </div>
      }
      {/* <div className="notification">
        <span>
          <MdNotifications />
        </span>
      </div> */}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  height: 15vh;

  top: 0;
  transition: 0.3s ease-in-out;
  background-color: none;

  button {
    border: none;
    background-color: transparent;
  }
  form {
    display: flex;
    gap: 25px;
    justify-content: space-between;
    align-items: center;
    padding: 0px;
  }
  .search_bar {
    background: linear-gradient(
      135deg,
      rgb(255, 255, 255, 0.1),
      rgb(255, 255, 255, 0)
    );
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(20px);
    width: 30%;
    padding: 0.4rem 1rem;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    span {
      color: blue;
    }

    input {
      background-color: transparent;
      border: none;
      color: white;
      height: 1.5rem;
      width: 100%;
      &:focus {
        outline: none;
      }
    }
  }

  .avatar {
    border: none;
    padding: 0.3rem 0.4rem;
    padding-right: 1rem;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 110px;
    margin-left: auto;
    margin-top: 15px;

    a {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
      text-decoration: none;
      color: white;
      font-weight: bold;
      img {
        border-radius: 50%;
      }
      span {
        display: flex;

        align-items: center;
        font-size: 9px;
      }
    }
  }
  @media (max-width: 900px) {
    .search_bar {
      width: 60%;
    }
    .avatar {
      margin-left: 5px;
      width: 90px;
      span {
        display: none;
      }
    }
  }
`;
export default Navbar;
