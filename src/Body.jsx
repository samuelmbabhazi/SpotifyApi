import React from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
function Body({ playlist }) {
  return (
    <Container>
      <h2>Home</h2>
      <Navbar />
      <div className="entete">
        <span>POPULAR PLAYLIST</span>
        <span className="detail">SEE DETAIL</span>
      </div>

      <ul className="playlist">
        {playlist.listOfPlaylistFromAPI &&
          playlist.listOfPlaylistFromAPI.map((image, i) => {
            return (
              <li key={i}>
                <img src={image.images[0] && image.images[0].url} />
              </li>
            );
          })}
      </ul>
     
    </Container>
  );
}
const Container = styled.div`
  padding-top: 2%;
  h2 {
    padding-left: 40px;
  }
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
    flex-wrap: wrap;
    align-items: center;

    gap: 1.2rem;
    li {
      list-style: none;
      img {
        height: 10rem;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      }
    }
  }
  
`;
export default Body;
