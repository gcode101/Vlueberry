import { styled, width } from "@mui/system";

export const SubHeader = styled("div")(({theme}) => ({
    display: 'flex',
    width: '30%',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    borderBottom: '1px solid white',
    [theme.breakpoints.down('md')]: {
        width: '50%',
    },
    [theme.breakpoints.down('sm')]: {
        width: '70%',
    }
}));