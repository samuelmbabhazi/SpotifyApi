import React from "react";
import styled from "styled-components";
import {
  MdHomeFilled,
  MdSearch,
  MdLibraryMusic,
  MdSettings,
} from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

function Sidebar({ genres, setIde,ide ,onclik}) {
  console.log(genres.listOfGenresFromAPI);
const click=e=>{
  onclik(e.target.value)
}
  return (
    <Container>
      <div className="top_links">
        <div className="logo">
          <img src="logo.png" alt="" width={130} />
        </div>
        <div className="line"></div>
        <ul>
          <span>MENU</span>
          <li>
            <MdHomeFilled />
            <span>Home</span>
          </li>
          <li>
            <MdSearch />
            <span>Search</span>
          </li>
          <li>
            <MdLibraryMusic />
            <span>Your Library</span>
          </li>
        </ul>
        <div className="line"></div>

        <ul className="categorie">
          <span>CATEGORIES</span>
          {genres.listOfIconFromAPi &&
            genres.listOfIconFromAPi.map((icon, i) => {
              return (
                <li key={i} value={icon.id} onClick={() => setIde(icon.id)}>
                  <img
                    src={icon.icon[0] && icon.icon[0].url}
                    width={30}
                    alt=""
                  />

                  {icon.name}
                </li>
              );
            })}
        </ul>
        <div className="line"></div>
        <div className="card"></div>
        <ul className="end">
          <li>
            <MdSettings />
            <span>Settings</span>
          </li>
          <li>
            <div className="avatar">
              <a href="#">
                <FaUserCircle />
                <span></span>
              </a>
            </div>
          </li>
        </ul>
      </div>
    </Container>
  );
}
const Container = styled.div`
  background: linear-gradient(
    135deg,
    rgb(255, 255, 255, 0.1),
    rgb(255, 255, 255, 0)
  );
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(20px);

  display: flex;
  flex-direction: column;
  width: 20vw;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  overflow: hidden;
  .card {
    margin-top: 18%;
    border-radius: 5px;
    height: 150px;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    background-color: blue;
  }
  .top_links {
    display: flex;
    flex-direction: column;
    .logo {
      text-align: center;
      margin: 1rem 0;
    }
    img {
      max-inline-size: 80%;
      block-size: auto;
    }
  }
  .end {
  }
  ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;

    li {
      display: flex;
      gap: 1rem;
      cursor: pointer;
      transition: color 0.3s ease-in-out;

      font-size: 15px;
      &:hover {
        border-left: 2px solid blue;
        color: blue;
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
      a {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
        text-decoration: none;
        color: white;
        font-weight: bold;
        svg {
          font-size: 1.3rem;
        }
      }
    }
  }
  .categorie {
    height: 55vh;
    max-height: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: blue;
      }
    }
  }
`;
export default React.memo (Sidebar);
