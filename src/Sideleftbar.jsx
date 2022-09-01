import React from "react";
import {
  MdPlayArrow,
  MdReplay,
  MdShuffle,
  MdSkipNext,
  MdSkipPrevious,
} from "react-icons/md";
import styled from "styled-components";

function Sideleftbar({ genres }) {
  return (
    <Container>
      <div className="playing">
        <div className="play">
          <div className="shuffle">
            <MdShuffle />
          </div>
          <div className="previous">
            <MdSkipPrevious />
          </div>
          <div className="player">
            <MdPlayArrow />
          </div>
          <div className="next">
            <MdSkipNext />
          </div>
          <div className="replay">
            <MdReplay />
          </div>
        </div>
        <div className="queu">
          <ul>
            <span>YOUR QUEUE</span>
            {genres.listOfIconFromAPi &&
              genres.listOfIconFromAPi.map((icon, i) => {
                return (
                  <li key={i}>
                    <img src={icon.icon[0] && icon.icon[0].url}  alt=""/>
                    {icon.name}
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </Container>
  );
}
const Container = styled.div`
  margin-top: 5%;
  overflow:hidden;
  display: flex;
  flex-direction: column;
  width:20vw;
  
  
  .playing {
    border-radius: 10px;
    height: 310px;
    background-color: #2d3a5a;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    
    .play {
        display:flex;
        align-items:center;
        justify-content:center;
        gap:20px;
      margin-top: 92%;
      height: 20%;
      background-color:#e8eaee  ;
    
    }
    ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    height:55vh;
    max-height:100%;
    overflow:auto;
    &::-webkit-scrollbar{
      width:0.2rem;
      &-thumb{
        background-color:blue;
      }
    }
    li {
      display: flex;
      gap: 1rem;
      cursor: pointer;
      transition: 0.3s ease-in-out;
      &:hover {
        color: blue;
      }
      img{
        width:35px;
        border-radius:50%;
      }
    }
  }
`;
export default Sideleftbar;
