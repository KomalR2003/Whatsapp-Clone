import { useEffect } from "react";
import React from "react";

import { Box, InputBase, styled } from "@mui/material";
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import SendIcon from '@mui/icons-material/Send';

import { uploadFile } from "../../../service/api";

const Container = styled(Box)`
    height: 56px;
    background: #ededed;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 15px;
    &  > * {
        margin: 5px;
        color: #919191;
    }
`;

const Search = styled(Box)`
    border-radius: 18px;
    background-color: #FFFFFF;
    width: calc(94% - 100px);
`;

const InputField = styled(InputBase)`
    width: 100%;
    padding: 20px;
    padding-left: 25px;
    font-size: 14px;
    height: 20px;
    width: 100%;
`;

const ClipIcon = styled(AttachFileIcon)`
    transform: rotate(40deg);
`;


const Footer = ({ sendText, setValue, value, file, setFile, setImage}) => {
    const [isSending, setIsSending] = React.useState(false);

    useEffect(() => {
        const getImage = async () => {
            if (file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);

                let response = await uploadFile(data);
                if (response && response.data) {
                    setImage(response.data);
                } else {
                    console.error("File upload failed or returned no data");
                }
            }
        }
        getImage();
    }, [file]);

    const onFileChange = (e) => {
        setFile(e.target.files[0]);
        setValue(e.target.files[0].name);
    }

    const handleSend = async (e) => {
        if (e) e.preventDefault();
        if (isSending) return;
        const trimmed = value && value.trim();
        if (!trimmed) return;
        setIsSending(true);
        await sendText({ key: e, value: trimmed });
        setIsSending(false);
        setValue("");
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend(e);
        }
    };

    return (
        <Container>
            <InsertEmoticonIcon />
            <label htmlFor="fileInput">
                <ClipIcon />
            </label>
            <input
                type="file"
                id="fileInput"
                style={{ display: 'none' }}
                onChange={onFileChange}
            />
            <Search style={{ display: 'flex', alignItems: 'center' }}>
                <InputField
                    placeholder="Type a message"
                    onChange={(e) => setValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    value={value}
                />
                <SendIcon
                    style={{ cursor: value && value.trim() && !isSending ? 'pointer' : 'not-allowed', color: value && value.trim() ? '#008069' : '#ccc', marginRight: 8 }}
                    onClick={handleSend}
                    disabled={!value || !value.trim() || isSending}
                />
            </Search>
            <KeyboardVoiceIcon />
        </Container>
    )
}

export default Footer;
