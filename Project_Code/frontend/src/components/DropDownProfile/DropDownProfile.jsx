import { ThemeProvider } from "@emotion/react";
import { Menu, MenuItem } from "@mui/material";
import theme from "../../Theme.styles";
import { Separator } from "./DropDownProfile.styles";
import { useContext } from "react";
import { UserContext } from "../../context/User.context";

const DropDownProfile = ({ anchorEl, isOpen, onClose }) => {
    const { logoutUser } = useContext(UserContext);

    const handleLogout = () => {
        logoutUser();
    }
    
    return (
        <ThemeProvider theme={theme}>
            <Menu
                anchorEl={anchorEl}
                open={isOpen}
                onClose={onClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <MenuItem onClick={onClose}>Profile</MenuItem>
                <MenuItem onClick={onClose}>My Account</MenuItem>
                <Separator />
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </ThemeProvider>
    );
}

export default DropDownProfile;