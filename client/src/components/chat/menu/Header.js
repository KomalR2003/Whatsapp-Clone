// menu header 

import { useContext , useState} from "react";

import { AccountContext } from "../../../context/AccountProvider";
import { Box, styled } from "@mui/material";

// Component 
import HeaderMenu from "./HeaderMenu";

// icon 
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import DataSaverOffIcon from '@mui/icons-material/DataSaverOff';
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import AddCommentIcon from '@mui/icons-material/AddComment';
import InfoDrawer from "../../drawer/InfoDrawer";


// styled
const Component = styled(Box)`
    height: 44px;
    background: #ededed;
    display: flex;
    padding: 8px 16px;
    // padding-top: 30px;
    align-items: center;
`;

const Wrapper = styled(Box) `
    margin-left: auto;
    & > * {
        margin-left: 2px;
        padding: 8px;
        color: #000;
    };
    & :first-child {
        font-size: 22px;
        margin-right: 8px;
        margin-top: 3px;
    }
`;

const Image = styled('img')({
    height: 40,
    width: 40,
    borderRadius: '50%'
})



const Header = () => {

    const [openDrawer, setOpenDrawer] = useState(false);

    const { account } = useContext(AccountContext);

    const toggleDrawer = () => {
        setOpenDrawer(true);
    }

    return (
        <>
            <Component >
                <Image 
                    src={account.picture} 
                    alt="dp"  
                    onClick={() => toggleDrawer()}
                    onError={(e) => {
                        e.target.src = 'https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-male-user-icon.png';
                    }}
                />
                <Wrapper>
                    <PeopleAltIcon  />
                    <DataSaverOffIcon />
                    <MapsUgcIcon />
                    <AddCommentIcon />
                    <HeaderMenu  setOpenDrawer={setOpenDrawer}/>
                </Wrapper>
            </Component>
            
            <InfoDrawer open={openDrawer} setOpen={setOpenDrawer}/>
        </>
    )
}

export default Header;
