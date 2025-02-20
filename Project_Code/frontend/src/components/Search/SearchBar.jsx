import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { Button, IconButton } from "@mui/material";
import axios from "axios";
import { getApiUrl } from "../../services/ApiUrl";
import { Search, StyledInputBase } from "./SearchBar.styles";
import { MoviesContext } from "../../context/Movies.context";

export const SearchBar = () => {
  // Import MoviesRoute Context
  const { setFilteredMovies, setLoading } = useContext(MoviesContext);

  // Import Navigation Handler
  const navigate = useNavigate();

  const location = useLocation();

  // Let the user user the search input
  const [searchInput, setSearchInput] = useState("");

  // Get the API URL
  const apiUrl = getApiUrl();

  // Show the search button
  const [showSearchButton, setShowSearchButton] = useState(false);

  // Create a reference to the input field
  const inputRef = React.createRef();

  useEffect(() => {
    if(location.pathname !== '/search'){
      setSearchInput('');
    }
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowSearchButton(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  },[inputRef])

  const onHandleInputChange = (e) => {
    // Change value of searchInput to whatever the user wrote right now
    const inputVal = e.target.value;
    setSearchInput(inputVal);
  };

  const goToSearchResults = () => {
    navigate("/search");
  };

  const onHandleSearchButtonClick = () => {
    filterMovies();
    goToSearchResults();
  };

  const onHandleKeyDownPress = (e) => {
    // Detect that the Enter key was pressed
    if (e.key === "Enter" || e.keyCode === 13) {
      filterMovies();
      goToSearchResults();
    }
  };

  const filterMovies = async () => {
    // Filter movies based on the input value
    const trimmedInput = searchInput.trim();
    setLoading(true);
    try{
      if (trimmedInput.length > 0) {
        const movies = await axios(`${apiUrl}/media/search`, {
          params: {
            query: trimmedInput
          }
        });

        setFilteredMovies(movies.data.results);
      } else {
        setFilteredMovies([]);
      }
    }catch(err){
      console.log('Error', err);
      if(err.response){
          console.error("Response error data", err.response.data);
          console.error("Response error status", err.response.status);      
      }
    }finally{
      setLoading(false);
    }
  };

  return (
    <Search ref={inputRef}>
      <IconButton
        aria-label="search"
        onClick={onHandleSearchButtonClick}
      >
        <SearchIcon style={{ color: "white" }} />
      </IconButton>
      <StyledInputBase
        placeholder="Search for movies or shows"
        inputProps={{ "aria-label": "search" }}
        value={searchInput}
        onChange={onHandleInputChange}
        onKeyDown={onHandleKeyDownPress}
        onFocus={() => setShowSearchButton(true)}
      />
      
        <Button 
          variant="contained"
          style={{
            backgroundColor: "rgb(252, 71, 71)",
            transition: "transform 0.5s ease, opacity 0.3s ease",
            transform: showSearchButton ? "translateX(0)" : "translateX(100%)",
            opacity: showSearchButton ? 1 : 0,
            pointerEvents: showSearchButton ? "auto" : "none"
          }}
          sx={{
            fontFamily: "Outfit",
            fontWeight: "300",
            fontSize: {
              xs: "12px",
              md: "15px",
            },
            marginRight: {
              xs: "12px",
              sm: "30px",
            }
          }}
          onClick={onHandleSearchButtonClick}
        >
            Search
        </Button>
      
    </Search>
  );
};