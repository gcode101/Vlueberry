import { getApiUrl } from "../../services/ApiUrl";
import axios from "axios";
import { MoviesContext } from "../../context/Movies.context";
import { UserContext } from "../../context/User.context";
import { useContext, useEffect, useState } from "react";
import { Grid, Box, Stack, Typography } from "@mui/material";
import MediaCard from "../../components/Media_Cards/MediaCard";
import { MediaContainer, StyledBox } from "../../components/Media_Cards/MediaCardsContainer.styles";
import { momentum } from 'ldrs'
import { ThemeProvider } from "@emotion/react";
import theme from "../../Theme.styles";
import { SubHeader } from "./Bookmarks.styles";


export const Bookmarks = () => {
    const apiUrl = getApiUrl();
    const { user } = useContext(UserContext);
    const { movies } = useContext(MoviesContext);
    const [bookmarkedMedia, setBookmarkedMedia] = useState([]);
    const [bookmarkedMovies, setBookmarkedMovies] = useState([]);
    const [bookmarkedShows, setBookmarkedShows] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [movieActive, setMovieActive] = useState(true);
    const [tvActive, setTvActive] = useState(false);

    const getBookmarks = async () => {
        momentum.register()
        setIsLoading(true);
        try {
            const response = await axios.get(`${apiUrl}/api/bookmarks`,
                { params: { userID: user.id} }
            );
            return response.data.bookmarks;
        }catch(err){
            console.log('Error', err);
            if(err.response){
                console.error("Response error data", err.response.data);
                console.error("Response error status", err.response.status);
            }
        }finally {
            setIsLoading(false);
        }
    }

    const getBookmarkedMedia = (categoryType) => {
        const media = bookmarkedMedia.filter((movie) => {
            if(movie.mediaType){
                return movie.mediaType.toLowerCase().includes(categoryType);
            }
        });
        return media;
    };

    const handleUnbookmark = (id) => {
        setBookmarkedMedia(prev => 
            prev.filter(item => {
                return item.mediaID !== id;
            })
        );
    };

    useEffect(() => {
        const fetchBookmarkedMedia = async () => {
            const bookmarks = await getBookmarks();
            setBookmarkedMedia(bookmarks);
        }
        fetchBookmarkedMedia();
    },[]);

    useEffect(() => {
        // Fetch bookmarked movies and TV shows
        const movies = getBookmarkedMedia('movie');
        const shows = getBookmarkedMedia('tv');
        // Update state with the fetched movies and shows
        setBookmarkedMovies(movies);
        setBookmarkedShows(shows);
        // Set the active state for movies or TV based on the fetched data
        updateActiveStates(movies, shows);
    },[bookmarkedMedia]);


    /*
     * Function to toggle active subheaders between movies and TV shows
     * - If only movies or only shows exist, ensure correct state is active.
     * - Otherwise, toggle between the current active states for movies and TV shows.
     */
    const toggleSubHeader = () => {
        if (bookmarkedMovies.length === 0 || bookmarkedShows.length === 0){
            // Ensure correct state is active if one type is empty
            updateActiveStates(bookmarkedMovies, bookmarkedShows);
        }else{
             // Toggle active states for movies and TV shows
            setMovieActive(!movieActive);
            setTvActive(!tvActive);
        }
    }
    /*
     * Helper function to update active states for movies and TV shows
     * - If no movies and some shows exist, activate TV and deactivate movies.
     * - If no shows and some movies exist, activate movies and deactivate TV.
     */
    const updateActiveStates = (movies, shows) => {
        if(movies.length === 0 && shows.length > 0){
            setTvActive(true);
            setMovieActive(false);
        }else if(shows.length === 0 && movies.length > 0){
            setMovieActive(true);
            setTvActive(false);
        }
    }

	return (
        <ThemeProvider theme={theme}>
            <Box className="page-container">
                {isLoading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                        <l-momentum
                        size="50"
                        speed="1.1" 
                        color="white" 
                        ></l-momentum>
                    </Box>
                ):(
                    <>
                        {bookmarkedMovies.length > 0 && movieActive && (
                            <Stack sx={{mb: 6}}>
                                <StyledBox className="font-heading-L media-heading">My Bookmarks</StyledBox>
                                <SubHeader>
                                    <Typography 
                                        variant="h2" 
                                        sx={{
                                            cursor: "pointer",
                                            color: movieActive ? "white" : "#868484"
                                        }}
                                        onClick={toggleSubHeader}
                                    >
                                        Movies
                                    </Typography>
                                    <Typography 
                                        variant="h2" 
                                        sx={{
                                            cursor: "pointer",
                                            color: tvActive ? "white" : "#868484"
                                        }}
                                        onClick={toggleSubHeader}
                                    >
                                        TV Series
                                    </Typography>
                                </SubHeader>
                                <MediaContainer>
                                    <Grid container spacing= {4}>
                                        {
                                            [...bookmarkedMovies].reverse().map((movie, index) => (
                                                <Grid 
                                                    item key={index}
                                                    xs={6}
                                                    sm={4}
                                                    md={4}
                                                    lg={3}
                                                    xl={2.4}
                                                >
                                                    <MediaCard movie={movie} type="recommended" onRemove={handleUnbookmark} isBookmarkedMedia/>
                                                </Grid>
                                            ))
                                        }
                                    </Grid>
                                </MediaContainer>
                            </Stack>
                        )}
                        {bookmarkedShows.length > 0 && tvActive && (
                            <Stack>
                                <StyledBox color={"white"} className="font-heading-L media-heading">My Bookmarks</StyledBox>
                                <SubHeader>
                                    <Typography 
                                        variant="h2" 
                                        sx={{
                                            cursor: "pointer",
                                            color: movieActive ? "white" : "#868484"
                                        }}
                                        onClick={toggleSubHeader}
                                    >
                                        Movies
                                    </Typography>
                                    <Typography 
                                        variant="h2" 
                                        sx={{
                                            cursor: "pointer",
                                            color: tvActive ? "white" : "#868484"
                                        }}
                                        onClick={toggleSubHeader}
                                    >
                                        TV Series
                                    </Typography>
                                </SubHeader>
                                <MediaContainer>
                                    <Grid container spacing= {4}>
                                        {
                                            [...bookmarkedShows].reverse().map((movie, index) => (
                                                <Grid 
                                                    item key={index}
                                                    xs={6}
                                                    sm={4}
                                                    md={4}
                                                    lg={3}
                                                    xl={2.4}
                                                >
                                                    <MediaCard movie={movie} type="recommended" onRemove={handleUnbookmark} isBookmarkedMedia/>
                                                </Grid>
                                            ))
                                        }
                                    </Grid>
                                </MediaContainer>
                            </Stack>
                        )}
                        {bookmarkedMedia.length === 0 && (
                                    <StyledBox color={"white"} className="font-heading-L media-heading">No bookmarks yet!</StyledBox>
                        )}
                    </>
                )}
            </Box>
        </ThemeProvider>
    )
};