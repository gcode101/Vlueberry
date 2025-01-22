import { styled } from "@mui/material";

export const WatchContainer = styled("div")`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const TopContainer = styled("div")`
    display: flex;
    justify-content: center;
    align-items: center;
`

export const BackdropImage = styled("div")`
    z-index: 1;
    cursor: pointer;
    position: relative;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: filter 0.3 ease
    }
    &:hover img {
        filter: brightness(0.8);
    }
`

export const MediaContainer = styled("div")`
    z-index: 2;
`

export const NoVideoMsg = styled("div")`
    padding: 100px;
    text-align: center;
    margin-top: 2rem;
    color: #bbb;
    font-size: 1.25rem;
    background-color: #0a0a0a78;
    border-radius: 9px;
`

export const MediaInfoContainer = styled("div")`
    padding: 40px;
    max-width: 1060px;
`

export const Title = styled("h1")`
    color: white;
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 40px;
    font-family: 'Outfit';
`

export const ReleaseDate = styled("p")`
    color: rgba(255, 255, 255, 0.8);
    font-size: 1rem;
    margin-bottom: 15px;
    font-family: 'Outfit';
`

export const Overview = styled("p")`
    color: rgba(255, 255, 255, 0.9);
    font-size: 1rem;
    line-height: 1.9;
    margin-bottom: 20px;
    font-family: 'Outfit';
`

export const Genres = styled("div")`
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
`

export const Genre = styled("p")`
    color: rgba(255, 255, 255, 0.9);
    background-color: rgba(255, 255, 255, 0.1);
    padding: 5px 10px;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 500;
    text-transform: capitalize;
    font-family: 'Outfit';
`

export const VideosContainer = styled("div")(({theme}) => ({
    width: '90%',          
    maxWidth: '1060px',      
    overflowX: 'hidden',   
    display: 'flex',        
    flexDirection: 'column', 
    padding: '1rem',
    boxSizing: 'border-box', 
    borderTop: '1px solid white'
}))