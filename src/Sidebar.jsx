import React from "react";
import styled from "styled-components";
import {
  MdHomeFilled,
  MdSearch,
  MdLibraryMusic,
  MdSettings,
} from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
function Sidebar({ genres }) {
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

        <ul>
          <span>CATEGORIES</span>
          {genres.listOfIconFromAPi &&
            genres.listOfIconFromAPi.map((icon, i) => {
              return (
                <li key={i}>
                  <img src={icon.icon[0] && icon.icon[0].url} width={30} />
                  {icon.name}
                </li>
              );
            })}
        </ul>
        <div className="line"></div>
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
  background-color: #e8eaee;
  display: flex;
  flex-direction: column;
  width: 50%;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

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
    padding-top: 100%;
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
  transition: color .3s ease-in-out; 
  box-shadow .3s ease-in-out;
      &:hover {
        
        
        box-shadow: inset 200px 0 0 0 #2d3a5a;
        color: white;
      }
    }
    .avatar {
      background-color: #2d3a5a;
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
`;
export default Sidebar;
