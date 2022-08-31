import React from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { MdNotifications } from "react-icons/md";
function Navbar() {
  return (
    <Container>
      <div className="search_bar">
        <input type="text" placeholder="Artist, song" />
        <div className="search">
          <FaSearch />
        </div>
      </div>
      <div className="notification">
        <MdNotifications />
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  height: 15vh;

  position: sticky;
  top: 0;
  transition: 0.3s ease-in-out;
  background-color: none;
  .search_bar {
    background-color: white;
    width: 30%;
    padding: 0.4rem 1rem;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    

    input {
      border: none;
      height: 1.5rem;
      width: 100%;
      &:focus {
        outline: none;
      }
    }
  }
  .notification {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    
  }
`;
export default Navbar;
