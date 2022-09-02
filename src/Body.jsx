import React from "react";
import { MdQueueMusic, MdSettingsInputHdmi } from "react-icons/md";
import styled from "styled-components";
import Navbar from "./Navbar";
function Body({ playlist, items, setIdp }) {
  console.log("items :", items);
  return (
    <Container>
      <Navbar />

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
      <div className="contcard">
        <div className="card">
          <span>
            <MdQueueMusic />{" "}
          </span>{" "}
          TRACKS
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
    margin-top: 10%;
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
    padding-left: 3%;
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
    span {
      font-size: 25px;
      color: blue;
    }
  }
`;
export default React.memo(Body);
