import bookmarkActive from "../../assets/bookmark-active.png";
import bookmarkInactive from "../../assets/bookmark-inactive.png";
import bookmarkHover from "../../assets/bookmark-hover.svg";
import useBookmark from "../../hooks/useBookmark.jsx";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const BookmarkButton = ({currentMedia, mediaType, isBookmarkedMedia = false}) => {
    const [isBookmarked, toggleBookmark] = useBookmark(currentMedia, mediaType, isBookmarkedMedia);
    const [isHovered, setIsHovered] = useState(false);
    const [mediaIsBookmarked, setMediaIsBookmarked] = useState(isBookmarked);

    // Update mediaIsBookmarked whenever isBookmarked changes
    useEffect(() => {
        setMediaIsBookmarked(isBookmarked);
    }, [isBookmarked]);
    
    const handleToggleBookmark = async () => {
        let message = "";
        mediaIsBookmarked ? message = "Bookmark removed!" : message = "Bookmark added!"; 
        const toastId = toast.loading("Loading...", {position: "bottom-center"})
        try{
            await toggleBookmark();

            toast.update(toastId, {
                render: message,
                type: "success",
                isLoading: false,
                autoClose: 3000,
            });
            
        }catch(error){
            if(error.response && error.response.status === 409){
                toast.update(toastId, {
                    render: "Error: Duplicate bookmark!",
                    type: "error",
                    isLoading: false,
                    autoClose: 3000,
                });
            }else{
                console.error("An unexpected error occurred:", error);
                toast.update(toastId, {
                    render: "Error: Something went wrong. Please try again",
                    type: "error",
                    isLoading: false,
                    autoClose: 3000,
                });
            }
        }
    }
    //Set hover effect for bigger screens only
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
                    : mediaIsBookmarked
                    ? bookmarkActive
                    : bookmarkInactive
                } // Toggle between hover and normal states
                className="bookmark-icon"
                alt="Bookmark Icon"
                onClick={handleToggleBookmark}
                onMouseEnter={handleHoverEffect} // Set hover state to true on mouse enter
                onMouseLeave={() => setIsHovered(false)} // Reset hover state on mouse leave
                style={{ cursor: "pointer" }}
            />
        </>
    )
}

export default BookmarkButton;