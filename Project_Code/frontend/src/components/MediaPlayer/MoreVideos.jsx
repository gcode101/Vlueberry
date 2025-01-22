import { Box, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";


const MoreVideos = ({ videos, onVideoSelect }) => {
    if(!videos || videos.length === 0) return null;

    return (
        <Box 
            sx={{
                padding: 2, 
                backgroundColor: '#161D2F', 
                borderRadius: 2,
                maxHeight: '500px',
                overflowY: 'auto',
            }}
        >
            <Grid container spacing={2}>
                {videos.map((video) => (
                    <Grid item xs={6} sm={6} md={4} key={video.key}>
                        <Card
                            sx={{
                                cursor: 'pointer',
                                boxShadow: 3,
                                borderRadius: 2,
                                transition: 'transform 0.2s ease',
                                '&:hover': { transform: 'scale(1.05)' },
                            }}
                            onClick={() => onVideoSelect(video.key)}
                        >
                            <CardMedia
                                component='img'
                                height='140'
                                image={`https://img.youtube.com/vi/${video.key}/0.jpg`}
                                alt={video.name}
                            />
                            <CardContent sx={{backgroundColor: 'rgba(15, 20, 30, 1)'}}>
                                <Typography variant="p">
                                    {video.name}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default MoreVideos;