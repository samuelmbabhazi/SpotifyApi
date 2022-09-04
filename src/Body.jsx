import React, { useState } from "react";
import { MdQueueMusic } from "react-icons/md";
import styled from "styled-components";
import Navbar from "./Navbar";
function Body({
  playlist,
  items,
  setIdp,
  setPlaylist,
  tracks,
  setTracks,
  token,
}) {
  const [resultSearch, setResultSearch] = useState({ listOfTracksSearch: [] });
  const [search, setSearch] = useState("");

  return (
    <Container>
      {/* <div className="avatar">
        <a href="#">
          <FaUserCircle/>
          <span></span>
        </a>
      </div> */}
      <Navbar
        setPlaylist={setPlaylist}
        playlist={playlist}
        search={search}
        token={token}
        setSearch={setSearch}
        tracks={tracks}
        setTracks={setTracks}
        resultSearch={resultSearch}
        setResultSearch={setResultSearch}
      />
      <div className="entete">
        <span>POPULAR PLAYLIST</span>
        <span className="detail">SEE DETAIL</span>
      </div>
      <ul className="playlist">
        {playlist.listOfPlaylistFromAPI &&
          playlist.listOfPlaylistFromAPI.map((image, i) => {
            return (
              <li key={i} onClick={() => setIdp(image.id)}>
                <img src={image.images[0] && image.images[0].url} alt="" />
              </li>
            );
          })}
      </ul>
      <br />
      <div className="entete">
        <span> Your Search </span>
      </div>

      <ul className="playlist">
        {resultSearch.listOfTracksSearch &&
          resultSearch.listOfTracksSearch.map((image, i) => {
            return (
              <li key={i} onClick={() => setIdp(image.id)}>
                <img src={image.images[0] && image.images[0].url} alt="" />
              </li>
            );
          })}
      </ul>
      <div className="tracks">
        <span className="span">
          <MdQueueMusic />{" "}
        </span>{" "}
        TRACKS
      </div>

      <div className="contcard">
        <div className="card">
          {items.map((item, idx) => (
            <div>
              <li key={idx}>
                <img src={item.track.album.images[0].url} alt="" />
                {item.track.name}
              </li>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
const Container = styled.div`
  .entete {
    margin-left: 30px;
    margin-right: 38px;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    .detail {
      color: #1161e8;
    }
  }
  .playlist {
    margin: 0 2rem;
    display: flex;

    align-items: center;
    width: 54vw;
    max-height: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
      height: 0.2rem;
      &-thumb {
        background-color: blue;
      }
    }
    gap: 1rem;
    li {
      list-style: none;
      img {
        height: 11rem;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        cursor: pointer;
      }
    }
  }
  .contcard {
    display: flex;
    justify-content: center;

    gap: 2rem;
    overflow: hidden;
  }
  .card {
    padding-top: 2%;
    background: linear-gradient(
      135deg,
      rgb(255, 255, 255, 0.1),
      rgb(255, 255, 255, 0)
    );
    -webkit-backdrop-filter: blur(20px);
    backdrop-filter: blur(10px);
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border: 1px solid rgb(255, 255, 255, 0.18);
    border-radius: 10px;

    width: 90%;
    height: 400px;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: blue;
      }
    }
    li {
      margin-top: 2%;
      margin-bottom: 2%;
      font-size: 12px;
    }
    img {
      width: 30px;
      border-radius: 50%;
    }
  }
  .avatar {
    background-color: blue;
    padding: 0.3rem 0.4rem;
    padding-right: 1rem;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    margin-left: auto;
    margin-top: 15px;

    a {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
      text-decoration: none;
      color: white;
      font-weight: bold;
      svg {
        font-size: 1.3rem;
      }
    }
  }
  .span {
    font-size: 25px;
    color: blue;
  }
  .tracks {
    margin-top: 7%;
    margin-left: 3%;
  }
`;
export default React.memo(Body);
