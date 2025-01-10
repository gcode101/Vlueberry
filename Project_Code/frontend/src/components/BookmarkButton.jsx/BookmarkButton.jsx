import bookmarkActive from "../../assets/bookmark-active.png";
import bookmarkInactive from "../../assets/bookmark-inactive.png";
import bookmarkHover from "../../assets/bookmark-hover.svg";
import useBookmark from "../../hooks/useBookmark.jsx";
import { useState } from "react";

const BookmarkButton = ({currentMedia, mediaType, isBookmarkedMedia = false}) => {
    const [isBookmarked, toggleBookmark] = useBookmark(currentMedia, mediaType, isBookmarkedMedia);
    const [isHovered, setIsHovered] = useState(false);
    
    const handleToggleBookmark = async () => {
        try{
            await toggleBookmark();
        }catch(error){
            console.log('Error', error);
            if(error.response){
                console.error("Response error data", error.response.data);
                console.error("Response error status", error.response.status);
            }
        }
    }

    const handleHoverEffect = () => {
        if(window.innerWidth > 768){
            setIsHovered(true);
        }
    }
    
    return (
        <>
            <img
                src={
                isHovered
                    ? bookmarkHover
                    : isBookmarked
                    ? bookmarkActive
                    : bookmarkInactive
                } // Toggle between hover and normal states
                className="bookmark-icon"
                alt="Bookmark Icon"
                onClick={handleToggleBookmark}
                onMouseEnter={handleHoverEffect} // Set hover state to true on mouse enter
                onMouseLeave={() => setIsHovered(false)} // Reset hover state on mouse leave
            />
        </>
    )
}

export default BookmarkButton;