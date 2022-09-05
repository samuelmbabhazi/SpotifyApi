import React from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { MdNotifications } from "react-icons/md";
import axios from "axios";
function Navbar({ search, setSearch, setResultSearch,token ,playlist,setPlaylist}) {
  const Mysearch = (e) => {
    setSearch(e.target.value);
  
  };
  const changeContent = (event) => {
    event.preventDefault();
  
    setSearch(search);
    axios(
      `https://api.spotify.com/v1/search?q=${encodeURI(
        search
      )}&type=playlist&limit=15`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ).then((tracksResponse) => {
      setResultSearch({
        listOfTracksSearch: tracksResponse.data.playlists.items,
      });
    
    });
   
    
    setSearch("");
  };
  
  
  return (
    <Container>
      <div className="search_bar">
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

      <div className="notification">
        <span>
          <MdNotifications />
        </span>
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
    background-color: white;
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
    span {
      font-size: 20px;
      color: blue;
    }
  }
`;
export default Navbar;
