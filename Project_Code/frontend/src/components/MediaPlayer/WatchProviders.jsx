import axios from "axios";
import { useEffect, useState } from "react";
import { getApiUrl } from "../../services/ApiUrl";
import { Avatar, Box, Grid, ThemeProvider, Tooltip, Typography } from "@mui/material";
import theme from "../../Theme.styles";

const WatchProviders = ({ mediaType, id }) => {
    const [providers, setProviders] = useState(null);
    const apiUrl = getApiUrl();

    useEffect(() => {
        const fetchProviders = async () => {
            try{
                const providersData = await axios.get(`${apiUrl}/media/watch-providers`, {
                    params: {
                        mediaType,
                        id
                    }
                });
                console.log("Providers data: ", providersData);
                setProviders(providersData.data.results?.US);
            }catch(error){
                console.error('Error fetching watch providers:', error);
            }
        }
        fetchProviders();
    }, [mediaType, id]);

    if(!providers) return null;

    const providerCategories = [
        { type: 'flatrate', label: 'Streaming' },
        { type: 'rent', label: 'Rent' },
        { type: 'buy', label: 'Buy' },
        { type: 'cinema', label: 'In Theaters' },
      ];
    
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{mt: 4}}>
                <Typography variant="h6" gutterBottom>
                    Where to Watch
                </Typography>

                <Grid container spacing={3}>
                    {providerCategories.map((category) => (
                        providers[category.type] && (
                            <Grid item xs={12} sm={6} md={3} key={category.type}>
                                <Typography variant="subtitle1" gutterBottom>
                                    {category.label}
                                </Typography>
                                <Grid container spacing={1}>
                                    {providers[category.type].map((provider) => (
                                        <Grid item key={provider.provider_id}>
                                            <Tooltip title={provider.provider_name}>
                                                <Avatar
                                                    alt={provider.provider_name}
                                                    src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                                                    sx={{width: 56, height: 56}}
                                                />
                                            </Tooltip>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                        )
                    ))}
                </Grid>
            </Box>
        </ThemeProvider>
    );
    
}

export default WatchProviders;