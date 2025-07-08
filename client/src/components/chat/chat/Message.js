import { useContext } from "react";
import React, { useState } from "react";
import { Box, Typography, styled, Menu, MenuItem } from "@mui/material";
import GetAppIcon from '@mui/icons-material/GetApp';

import { formatDate, downloadMedia } from "../../../utils/comman-utils";

import { AccountContext } from "../../../context/AccountProvider";
import { iconPDF } from "../../../constants/data";

// styled
const Wrapper = styled(Box)`
    background: #FFFFFF;
    padding: 5px;
    max-width: 60%;
    width: fit-content;
    display: flex;
    border-radius: 10px;
    word-break: break-word;
`;

const Own = styled(Box)`
    background: #dcf8c6;
    padding: 5px;
    max-width: 60%;
    width: fit-content;
    margin-left: auto;
    display: flex;
    border-radius: 10px;
    word-break: break-word;
`;

const Text = styled(Typography)`
    font-size: 14px;
    padding: 0 25px 0 5px;
`;

const Time = styled(Typography)`
    font-size: 10px;
    color: #919191;
    margin-top: 6px;
    word-break: keep-all;
    margin-top: auto;
`;

export const Message = ({ message, onDelete }) => {
    const { account } = useContext(AccountContext);
    const [menuAnchor, setMenuAnchor] = useState(null);

    const handleContextMenu = (event) => {
        event.preventDefault();
        setMenuAnchor(event.currentTarget);
    };
    const handleMenuClose = () => {
        setMenuAnchor(null);
    };
    const handleDelete = () => {
        handleMenuClose();
        if (onDelete) onDelete(message._id);
    };

    const MessageBox = account.sub === message.senderId ? Own : Wrapper;

    return (
        <MessageBox onContextMenu={handleContextMenu}>
            {message.type === 'file' ? <ImageMessage message={message} /> : <TaxtMessage message={message} />}
            <Menu
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </Menu>
        </MessageBox>
    );
}

const ImageMessage = ({ message }) => {
    // Helper to check if file is an image
    const isImage = (url) => {
        return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
    };
    const fileName = message.text.split('/').pop();
    return (
        <Box style={{ position: 'relative' }}>
            {
                message?.text?.includes('.pdf') ? (
                    <Box style={{ display: 'flex' }}>
                        <img src={iconPDF} alt="pdf" style={{ width: 80 }} />
                        <Typography style={{ fontSize: 14 }}  >{fileName}</Typography>
                    </Box>
                ) : isImage(message.text) ? (
                    <img style={{ width: 300, height: '100%', objectFit: 'cover' }} src={message.text} alt={fileName} />
                ) : (
                    <Box style={{ display: 'flex', alignItems: 'center', padding: 8 }}>
                        <GetAppIcon fontSize="large" style={{ marginRight: 8 }} />
                        <Typography style={{ fontSize: 14 }}>{fileName}</Typography>
                    </Box>
                )
            }
            <Time style={{ position: 'absolute', bottom: 0, right: 0 }}>
                <GetAppIcon
                     onClick={(e) => downloadMedia(e, message.text)} 
                    style={{ marginRight: 10, border: '1px solid grey', borderRadius: '50%' }}
                    fontSize='small'
                />
                {formatDate(message.createdAt)}
            </Time>
        </Box>
    )
}

const TaxtMessage = ({ message }) => {
    return (
        <>
            <Text> {message.text}</Text>
            <Time>{formatDate(message.createdAt)}</Time>
        </>
    )
}

export default Message;