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
    Block,
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
import WatchProviders from "./WatchProviders";


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
                console.log(media.data);
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
        const firstTrailer = videos.find(video => video.type === 'Trailer' || video.type === 'Teaser');
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
                        <Typography variant="p">Release Date: </Typography>
                        {media_type === "movie" ? (
                            mediaData?.release_date ? (
                                new Date(`${mediaData?.release_date}T12:00:00`).toLocaleString('en-US', {
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: 'numeric' 
                                    })
                                ) : (
                                    <Block variant="p"> To be determined</Block>
                                )
                            )
                            :
                            mediaData?.first_air_date ? (
                                new Date(`${mediaData?.first_air_date}T12:00:00`).toLocaleString('en-US', {
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: 'numeric' 
                                    })
                            ):(
                                <Block variant="p"> To be determined</Block>
                            )
                        }
                    </ReleaseDate>
                    <Status>
                        <Typography variant="p">Status: </Typography>
                        <Block>{mediaData?.status}</Block>
                        {media_type === "tv" && mediaData?.next_episode_to_air && (
                            <ComingSoon>
                                {mediaData?.next_episode_to_air.episode_number > 1 ? (
                                    <Typography sx={{border: '1px solid', padding: '5px' }} variant="p">New Episode </Typography>
                                ):(
                                    <Typography variant="p">Season {mediaData?.next_episode_to_air.season_number} coming soon:</Typography>
                                )}
                                <Typography variant="p">
                                    {new Date(`${mediaData?.next_episode_to_air.air_date}T12:00:00`).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </Typography>
                            </ComingSoon>
                                
                        )}
                    </Status>
                    {media_type === "tv" && (
                        <DurationData>
                            <Typography variant="p">Seasons: </Typography>
                            <Block>
                                {mediaData?.number_of_seasons}
                            </Block>
                            <Typography variant="p">Episodes: </Typography>
                            <Block>{mediaData?.number_of_episodes}</Block>
                            <Typography variant="p">Last Episode Aired: </Typography>
                            <Typography variant="p">
                                {
                                    mediaData?.last_episode_to_air?.air_date ? (   
                                        new Date(`${mediaData?.last_episode_to_air?.air_date}T12:00:00`).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'})
                                    ):(
                                        "N/A"
                                    )
                                }
                            </Typography>
                        </DurationData>
                    )}
                    <Genres>
                        {
                            (mediaData?.genres)?.map((genre) => (
                                <Block>{genre.name}</Block>
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
                    <WatchProviders mediaType={media_type} id={id}/>
                    <Typography sx={{mt: 4}} variant="h6" gutterBottom>
                        Overview:
                    </Typography>
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