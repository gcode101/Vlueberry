import { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import MediaCard from "../Media_Cards/MediaCard";
import { MediaContainer, StyledBox } from "../Media_Cards/MediaCardsContainer.styles";
import { getApiUrl } from "../../services/ApiUrl";
import axios from "axios";
import { momentum } from 'ldrs';

const MediaList = ({ categoryType, title }) => {
	
	const apiUrl = getApiUrl();
	const [filteredCategory, setFilteredCategory ] = useState([]);
	const [loading, setLoading] = useState(true);

	const getMedia = async () => {
		momentum.register();
		setLoading(true);
		try{
			const mediaItems = await axios.get(`${apiUrl}/media/trending`, {
				params: {category: categoryType}
			});
			setFilteredCategory(mediaItems.data.results);
		}catch(error){
			console.error("Error fetching media.", error);
		}finally{
			setLoading(false);
		}
	}

	useEffect(()=> {
		getMedia();
	},[]);

    return (
		<Box>
			{loading ? (
				<Box display="flex" justifyContent="center" alignItems="center" height="100vh">
					<l-momentum
					size="50"
					speed="1.1" 
					color="white" 
					></l-momentum>
				</Box>
			):(
				<Box>
					<StyledBox color={"white"} className="font-heading-L media-heading">{title}</StyledBox>
					<MediaContainer>
						<Grid container spacing= {4}>
							{
								filteredCategory.map((movie, index) => (
									<Grid 
										item key={index}
										xs={6}
										sm={4}
										md={4}
										lg={3}
										xl={2.4}
									>
										<MediaCard movie={movie} type="recommended"/>
									</Grid>
								))
							}
						</Grid>
					</MediaContainer>
				</Box>
			)}
		</Box>
    )
}

export default MediaList;