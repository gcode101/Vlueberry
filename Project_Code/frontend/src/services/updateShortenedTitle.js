//Shorten the title based on screen width
//Parameters:
//@title - Movie title
//@maxWindowWidth - The max screen width to trigger the shortening logic
//@maxLength - The max num of chars to retain before appending "..."
export const updateShortenedTitle = (title, maxWindowWidth, maxLength) => {
    if (window.innerWidth < maxWindowWidth && title.length > maxLength){
        return title.slice(0, maxLength) + "...";
    }else{
        return title;
    }
}