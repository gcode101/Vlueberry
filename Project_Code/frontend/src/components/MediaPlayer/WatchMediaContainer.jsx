import { useEffect, useRef, useState } from "react";
import CustomMediaPlayer from "../../components/MediaPlayer/CustomMediaPlayer";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getApiUrl } from "../../services/ApiUrl";
import { 
    NoVideoMsg, 
    MediaContainer,
    MediaInfoContainer,
    Title,
    ReleaseDate,
    Overview,
    Genres,
    Genre,
    WatchContainer,
    BackdropImage,
    TopContainer,
    VideosContainer,
    DurationData,
    Status,
    ComingSoon,
} from "./WatchMediaContainer.styles";
import { Button, Typography } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import theme from "../../Theme.styles";
import BookmarkButton from "../BookmarkButton/BookmarkButton";
import MoreVideos from "./MoreVideos";


const WatchMediaContainer = () => {
    const { id } = useParams();
    const { media_type } = useParams();
    const apiUrl = getApiUrl();
    const [videoKey, setVideoKey] = useState("");
    const [mediaData, setMediaData] = useState();
    const [backdropUrl, setBackdropUrl] = useState("");
    const basicImgUrl = "https://image.tmdb.org/t/p";
    const [playTrailer, setPlayTrailer] = useState(false);
    const WatchContainerRef = useRef(null);
    const [videoList, setVideoList] = useState([]);

    useEffect(() => {
        const fetchMedia = async () => {
            try{
                const media = await axios.get(`${apiUrl}/media/mediaItem`, {
                    params: {
                        mediaID: id,
                        category: media_type
                    }
                });
                setMediaData(media.data);
                const videos = media.data.videos.results;
                setVideoList(videos);
                const videoKey = getvideoKey(videos);
                setVideoKey(videoKey);
            }catch(error){
                console.error("Error fetching videos", error);
            }
        }
        fetchMedia();
    },[])

    useEffect(()=> {
        if(mediaData){
            setBackdropUrl(`${basicImgUrl}/original/${mediaData.backdrop_path}`);
        }
    },[mediaData]);

    const getvideoKey = (videos) => {
        const officialTrailer = videos.find(video => video.type === 'Trailer' && video.name.toLowerCase().includes('official'));
        if(officialTrailer){
            return officialTrailer.key;
        }
        const firstTrailer = videos.find(video => video.type === 'Trailer');
        return firstTrailer ? firstTrailer.key : null;
    }

    const handlePlayTrailer = () => {
        setPlayTrailer(!playTrailer);
    }

    const handleVideoSelect = (videoKey) => {
        setVideoKey(videoKey);
        scrollToMedia();
        setPlayTrailer(true);
    }

    const scrollToMedia = () => {
        if(WatchContainerRef.current){
            WatchContainerRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <WatchContainer ref={WatchContainerRef}>
                <TopContainer>
                    {
                        !playTrailer && (
                            <>
                                <BackdropImage 
                                    onClick={() => handlePlayTrailer()}
                                    sx={{
                                        width: {
                                            xs: "100%",
                                            md: "950px",
                                            lg: "1280px"
                                        },
                                        height: {
                                            lg: "550px",
                                        }
                                    }}
                                >
                                    <img src={backdropUrl} alt="Movie Backdrop"/>
                                </BackdropImage>
                                <Button 
                                    onClick={() => {
                                        handlePlayTrailer();
                                    }}
                                    variant="contained"
                                    sx={{
                                        zIndex: 2,
                                        borderRadius: 20,
                                        position: 'absolute'
                                    }}
                                >
                                    Play Trailer
                                </Button>
                            </>
                        )
                    }
                </TopContainer>
                <MediaContainer
                        sx={{
                            width: {
                                xs: "100%",
                                md: "90%",
                                lg: "1060px"
                            },
                        }}
                    >
                        {
                            playTrailer && (
                                videoKey ? (
                                    <CustomMediaPlayer videoKey={videoKey}/>
                                ) : (
                                    <NoVideoMsg color={'white'}>No trailer video found</NoVideoMsg>
                                )
                            )
                        }
                </MediaContainer>
                <MediaInfoContainer>
                    <BookmarkButton currentMedia={mediaData} mediaType={media_type}/>
                    <Title>{media_type === "movie" ? mediaData?.title : mediaData?.name}</Title>
                    {media_type === "movie" && mediaData?.runtime > 0 && (
                        <Typography variant="p">Duration: {Math.floor(mediaData.runtime / 60)}h {mediaData.runtime % 60}m</Typography>
                    )}
                    <ReleaseDate>
                        Release Date: {media_type === "movie" ? mediaData?.release_date : mediaData?.first_air_date}
                    </ReleaseDate>
                    <Status>
                        <Typography variant="p">Status: </Typography>
                        <Genre>{mediaData?.status}</Genre>
                        {media_type === "tv" && mediaData?.next_episode_to_air && (
                            <ComingSoon>
                                <Typography variant="p">Season {mediaData?.next_episode_to_air.season_number} coming soon: </Typography>
                                <Genre>{mediaData?.next_episode_to_air.air_date}</Genre>
                            </ComingSoon>
                        )}
                    </Status>
                    {media_type === "tv" && (
                        <DurationData>
                            <Typography variant="p">Seasons: </Typography>
                            <Genre>
                                {mediaData?.number_of_seasons}
                            </Genre>
                            <Typography variant="p">Episodes: </Typography>
                            <Genre>{mediaData?.number_of_episodes}</Genre>
                            <Typography variant="p">Last Episode Aired: </Typography>
                            <Genre>
                                {mediaData?.last_episode_to_air?.air_date || "N/A"}
                            </Genre>
                        </DurationData>
                    )}
                    <Genres>
                        {
                            (mediaData?.genres)?.map((genre) => (
                                <Genre>{genre.name}</Genre>
                            ))
                        }
                    </Genres> 
                    <Button 
                        onClick={() => {
                            handlePlayTrailer();
                            scrollToMedia();
                        }}
                        variant="contained"
                        sx={{
                            width: {
                                xs: '100%',
                                sm: 'auto'
                            },
                        }}
                    >
                        {playTrailer ? "Close Video" : "Play Trailer"}
                    </Button>
                    <Overview>{mediaData?.overview}</Overview>
                </MediaInfoContainer>
                <Typography variant="p">More Videos ( {videoList.length} )</Typography>
                <VideosContainer>
                    <MoreVideos videos={videoList} onVideoSelect={handleVideoSelect}/>
                </VideosContainer>
            </WatchContainer>
        </ThemeProvider>
    );
}

export default WatchMediaContainer;