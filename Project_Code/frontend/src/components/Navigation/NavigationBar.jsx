import { useLocation } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import SiteLogoIcon from "@mui/icons-material/Movie";
import HomeIcon from "../../assets/icon-nav-home.svg";
import ActiveHomeIcon from "../../assets/active-icon-nav-home.svg";
import HoverHomeIcon from "../../assets/hover-icon-nav-home.svg";
import MovieIcon from "../../assets/icon-nav-movies.svg";
import ActiveMovieIcon from "../../assets/active-icon-nav-movies.svg";
import HoverMovieIcon from "../../assets/hover-icon-nav-movie.svg";
import TvIcon from "../../assets/icon-nav-tv-series.svg";
import ActiveTvIcon from "../../assets/active-icon-nav-tv-series.svg";
import HoverTvIcon from "../../assets/hover-icon-nav-tv.svg";
import BookmarkIcon from "../../assets/icon-nav-bookmark.svg";
import ActiveBookmarkIcon from "../../assets/active-icon-nav-bookmark.svg";
import HoverBookmarkIcon from "../../assets/hover-icon-nav-bookmark.svg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { IconButton } from "@mui/material";
import {
  NavBarContainer,
  NavBarMenuItemsContainer,
  NavBarLink,
} from "./NavigationBar.styles.js";
import { UserContext } from "../../context/User.context.jsx";
import avatar from "../../assets/image-avatar.png";
import useViewport from "../../services/useViewport.jsx";
import DropDownProfile from "../DropDownProfile/DropDownProfile.jsx";

export const NavigationBar = () => {
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);
  const { width } = useViewport();
  const { user } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const isMobile = width <= 767;
  const isTablet = width >= 768 && width <= 1439;
  const isDesktop = width >= 1440;

  const handleIconClick = (path) => {
    setActivePath(path);
    window.scrollTo({top: 0});
  };

  //Profile dropdown menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleMenuClose = () => {
    setAnchorEl(null);
  }

  const isMenuOpen = Boolean(anchorEl);

  // Hover logic for each menu item
  const [hoveredItem, setHoveredItem] = useState(null);

  //Scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isTopScreen = window.scrollY === 0;

      if(currentScrollY > (lastScrollY + 10) && !isDesktop){
        //Scrolling down on a small screen
        setIsVisible(false);
      }else if ((currentScrollY < (lastScrollY - 10) && !isDesktop) || isTopScreen){
        //Scrolling up on a small screen
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isDesktop]);

  return (
    <NavBarContainer isVisible={isVisible}>
      <NavBarLink to="/" onClick={() => handleIconClick("/")}>
        <SiteLogoIcon
          sx={{ color: "red", marginBottom: isDesktop ? "20px" : 0 }}
        />
      </NavBarLink>
      <NavBarMenuItemsContainer>
        {/* Home */}
        <NavBarLink
          to="/"
          onMouseEnter={() => setHoveredItem("/")}
          onMouseLeave={() => setHoveredItem(null)}
          onClick={() => handleIconClick("/")}
        >
          <img
            src={
              activePath === "/"
                ? ActiveHomeIcon
                : hoveredItem === "/"
                  ? HoverHomeIcon
                  : HomeIcon
            }
          />
        </NavBarLink>

        {/* Movies */}
        <NavBarLink
          to="/movies"
          onMouseEnter={() => setHoveredItem("/movies")}
          onMouseLeave={() => setHoveredItem(null)}
          onClick={() => handleIconClick("/movies")}
        >
          <img
            src={
              activePath === "/movies"
                ? ActiveMovieIcon
                : hoveredItem === "/movies"
                  ? HoverMovieIcon
                  : MovieIcon
            }
          />
        </NavBarLink>
        {/* TV Series */}
        <NavBarLink
          to="/tv-series"
          onMouseEnter={() => setHoveredItem("/tv-series")}
          onMouseLeave={() => setHoveredItem(null)}
          onClick={() => handleIconClick("/tv-series")}
        >
          <img
            src={
              activePath === "/tv-series"
                ? ActiveTvIcon
                : hoveredItem === "/tv-series"
                  ? HoverTvIcon
                  : TvIcon
            }
          />
        </NavBarLink>

        {/* Bookmarks */}
        <NavBarLink
          to="/bookmarks"
          onMouseEnter={() => setHoveredItem("/bookmarks")}
          onMouseLeave={() => setHoveredItem(null)}
          onClick={() => handleIconClick("/bookmarks")}
        >
          <img
            src={
              activePath === "/bookmarks"
                ? ActiveBookmarkIcon
                : hoveredItem === "/bookmarks"
                  ? HoverBookmarkIcon
                  : BookmarkIcon
            }
          />
        </NavBarLink>
      </NavBarMenuItemsContainer>
      {user ? (
        <>
          <IconButton
            aria-label="avatar"
            onClick={handleMenuOpen}
            sx={{ paddingTop: isDesktop ? "6em" : 0 }}
          >
            <img
              src={avatar}
              alt="User Profile Picture Avatar"
              width={42}
              style={{ border: "2px solid white", borderRadius: "50%" }}
            />
          </IconButton>
          <DropDownProfile 
            anchorEl={anchorEl}
            isOpen={isMenuOpen}
            onClose={handleMenuClose}
          />
        </>
      ) : (
        <AccountCircleIcon
          sx={{
            color: "#5A698F",
            fontSize: 42,
            paddingTop: isDesktop ? "4em" : 0,
          }}
        />
      )}
    </NavBarContainer>
  );
};
