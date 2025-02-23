import { createTheme } from "@mui/material";

const theme = createTheme({
	palette: {
		white: {
	      main: "#FFFFFF",			
		}
	},
	typography: {
		h1: {
			fontFamily: "Outfit",
			fontWeight: "300",
			fontSize: "32px",
			letterSpacing: "-0.5px",	
			color: "white",
		},
		h2: {
			paddingTop: "40px",
			paddingBottom: "40px",
			fontFamily: "Outfit",
			fontWeight: "300",
			fontSize: "22px",
			letterSpacing: "-0.5px",
			color: "white",
		},
		h6: {
			fontFamily: "Outfit",
			fontWeight: "300",
			letterSpacing: "-0.5px",	
			color: "white",
		},
		p: {
			color: 'rgba(255, 255, 255, 0.9)',
			fontSize: '1rem',
			lineHeight: '1.9',
			marginBottom: '20px',
			letterSpacing: "-0.5px",
			fontFamily: 'Outfit',
		},
		span: {
			fontFamily: "Outfit",
			fontWeight: "300",
			letterSpacing: "-0.5px"
		},
		subtitle1: {
			fontFamily: "Outfit",
			fontWeight: "300",
			letterSpacing: "-0.5px",	
			color: "white",
		},
		caption: {
			fontFamily: "Outfit",
			fontWeight: "300",
			letterSpacing: "-0.5px",	
			color: "white",
		}
	},
	components: {
		//Custom Override for textfields
		MuiTextField: {
			styleOverrides: {
				root:{
					"& .MuiInput-root": {
						color: "#FFFFFF",
						//Bottom border
						"&:before":{
							borderColor: "#FFFFFF",
							opacity: "0.5"
						},
						"&:after": {
							borderColor: "#FFFFFF",
							borderWidth: "3px"
						},
						":hover:not(.Mui-focused)":{
							"&:before":{
								borderColor: "#e7e7e7",
								borderWidth: "2px"
							}
						}
					},
					//Label
					"& .MuiInputLabel-standard":{
						color: "#FFFFFF",
						fontFamily: "Outfit",
						opacity: "0.5",
						fontSize: "15px",
						marginLeft: "15px",
					},
				},
			}
		},
		//Custom Override for container
		MuiContainer: {
			styleOverrides: {
				root: {
					backgroundColor: "#161D2F",
					borderRadius: "20px",
					marginTop: "20px",
					color: "#FFFFFF",
					paddingBottom: "20px",
					'@media (max-width: 767px)': {
						maxWidth: '327px'
					},
					'@media (min-width: 768px)': {
						maxWidth: '400px'
					}
				}
			}
		},
		//Custom Override for buttons
		MuiButton: {
			styleOverrides: {
				root: {
					backgroundColor: "rgb(252, 71, 71)",
					fontFamily: "Outfit",
					fontSize: "13px",
					fontWeight: "300",
					marginTop: "20px",
					marginBottom: "20px",
					padding: "10px",
                    "&:hover":{
                        backgroundColor: "#f6f6f6",
                        color: "#10141E"
                    }
                }
            }
        },
		//Custom Overrite for Menu
		MuiMenu: {
			styleOverrides: {
				paper: {
					backgroundColor: 'rgb(16, 20, 30, 0.82)',
					color: '#fff',
					borderRadius: '20px',
				}
			}
		},
		//Custom Overrite for Menu items
		MuiMenuItem: {
			styleOverrides: {
				root: {
					'&:hover': {
						backgroundColor: 'rgb(44, 52, 70, 1)',
					}
				}
			}
		},
    }
});

export default theme;