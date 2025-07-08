import { useContext } from "react";
import React from "react";

import { Box, Typography, styled, Menu, MenuItem } from "@mui/material"

import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// import { defaultProfilePicture } from "../../../constants/data";
import { AccountContext } from "../../../context/AccountProvider";

// styled 
const Header = styled(Box)`
    height: 44px;
    background: #ededed;
    display: flex;
    padding: 8px 16px;
    padding-top: 30px;
    align-items: center;
`;

const Image = styled('img')({
    width: 40,
    height: 40,
    objectFit: 'cover',
    borderRadius: '50%'
});

const Name = styled(Typography)`
    margin-left: 12px !important;
`;

const Status = styled(Typography)`
    margin-left: 12px !important;
    font-size: 12px;
    color: rgb(0, 0, 0, 0.6);
`;

const RightContainer = styled(Box)`
    margin-left: auto;
    & > svg {
        padding: 8px;
        font-size: 24px;
        color: #000;
    }
`;


const ChatHeader = ({ person, onDeleteChat }) => {
    const {activeUsers} = useContext(AccountContext);
    const [menuAnchor, setMenuAnchor] = React.useState(null);

    const handleMenuOpen = (event) => {
        setMenuAnchor(event.currentTarget);
    };
    const handleMenuClose = () => {
        setMenuAnchor(null);
    };
    const handleDeleteChat = () => {
        handleMenuClose();
        if (onDeleteChat) onDeleteChat();
    };

    return (
        <Header>
            <Image 
                src={person.picture} 
                alt="dp" 
                onError={(e) => {
                    e.target.src = 'https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-male-user-icon.png';
                }}
            />
            <Box>
                <Name>{person.name}</Name>
                <Status>{activeUsers?.find(user => user.sub === person.sub) ? 'Online ' : 'Ofline'} </Status>
            </Box>
            <RightContainer>
                <SearchIcon />
                <MoreVertIcon onClick={handleMenuOpen} style={{ cursor: 'pointer' }} />
                <Menu
                    anchorEl={menuAnchor}
                    open={Boolean(menuAnchor)}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={handleDeleteChat}>Delete Chat</MenuItem>
                </Menu>
            </RightContainer>
        </Header>
    )
}

export default ChatHeader
