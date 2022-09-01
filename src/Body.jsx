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
                <img src={image.images[0] && image.images[0].url} alt=""/>
              </li>
            );
          })}
      </ul>
      <div className="contcard">
      <div className="card"></div>
     <div className="card"></div>
      </div>
    
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
    
    align-items: center;
    width:54vW;
    max-height:100%;
    overflow:auto;
    &::-webkit-scrollbar{
      height:0.2rem;
      &-thumb{
        background-color:blue;
      }
   
   }
   gap: 1rem;
    li {
      list-style: none;
      img {
        height: 11rem;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      }
    }
  }
  .contcard{
    
    display:flex;
    justify-content:center;
    margin-top:10%;
    gap:2rem
  }
  .card{
    
    background: linear-gradient(
    135deg,
    rgb(255, 255, 255, 0.1),
    rgb(255, 255, 255, 0)
  );
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border: 1px solid rgb(255, 255, 255, 0.18);
  border-radius:10px;
    width:44%;
    height:400px;
    
  }
`;
export default React.memo(Body) ;
