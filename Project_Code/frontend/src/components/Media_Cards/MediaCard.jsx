import { useState, useEffect } from "react";
import { getImagePath } from "../../services/getImagePath.js";
import useBookmark from "../../hooks/useBookmark.jsx";
import TrendingMediaCard from "./TrendingMediaCard.jsx";
import RecommendedMediaCard from "./RecommendedMediaCard.jsx";
import PosterNotFound from "../../assets/poster-not-found.png"
import { toast } from "react-toastify";

const MediaCard = ({ movie, type, onRemove = () => {}, isBookmarkedMedia = false }) => {
  const [imgSrc, setImgSrc] = useState("");
  const [isBookmarked, toggleBookmark] = useBookmark(movie, null, isBookmarkedMedia);
  const moviePosterUrl = "https://image.tmdb.org/t/p/w500";
  const [mediaIsBookmarked, setMediaIsBookmarked] = useState(isBookmarked);

  // Get the static path to the image required for the media card
  useEffect(() => {
    let imagePath = "";
    if(type.toLowerCase() === "trending"){
      imagePath = `${moviePosterUrl}${movie.backdrop_path}`;
    }else{
      if(isBookmarkedMedia){
        imagePath = movie.posterPath ? `${moviePosterUrl}${movie.posterPath}`: PosterNotFound;
      }else{
        imagePath = movie.poster_path ? `${moviePosterUrl}${movie.poster_path}`: PosterNotFound;
      }
    }
    setImgSrc(imagePath);
  }, [movie]);

  // Update mediaIsBookmarked whenever isBookmarked changes
  useEffect(() => {
    setMediaIsBookmarked(isBookmarked);
  }, [isBookmarked]);

  const handleToggleBookmark = async () => {
    let message = "";
    mediaIsBookmarked ? message = "Bookmark removed!" : message = "Bookmark added!";
    const toastId = toast.loading("Loading...", {position: "bottom-center"});
    try{
      await toggleBookmark();

      toast.update(toastId, {
        render: message,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      if(isBookmarked){
        if(isBookmarkedMedia){
          onRemove(movie.mediaID);
        }else{
          onRemove(movie.id);
        }
      }
    } catch(error){

    }
  }

  if (!imgSrc) {
    return <p style={{ color: "white" }}>Loading...</p>;
  }

  return (
    <>
      {type.toLowerCase() === "trending" ? (
        <TrendingMediaCard
          imgSrc={imgSrc}
          movie={movie}
          isBookmarked={mediaIsBookmarked}
          toggleBookmark={handleToggleBookmark}
        ></TrendingMediaCard>
      ) : (
        <RecommendedMediaCard
          imgSrc={imgSrc}
          movie={movie}
          isBookmarked={mediaIsBookmarked}
          toggleBookmark={handleToggleBookmark}
          isBookmarkedMedia={isBookmarkedMedia}
        ></RecommendedMediaCard>
      )}
    </>
  );
};

export default MediaCard;
