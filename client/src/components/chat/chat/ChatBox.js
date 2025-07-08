import { useContext, useEffect , useState} from "react";

import { Box } from "@mui/material";

import { AccountContext } from "../../../context/AccountProvider";
import { getConversation, deleteConversation } from "../../../service/api";

// component 
import CardHeader from './ChatHeader';
import Messages from "./Messages";



const ChatBox = () => {

    const { person, account, setPerson } = useContext(AccountContext);

    const [conversation, setConversation] = useState([]);

    useEffect(() => {
        const getConversationDetails = async () => {
            let data = await getConversation({ senderId: account.sub, receiverId: person.sub });
            setConversation(data);
        }
        getConversationDetails();
    }, [person.sub]);

    const handleDeleteChat = async () => {
        if (conversation && conversation._id) {
            await deleteConversation(conversation._id);
            setConversation([]);
            setPerson({}); // Optionally clear selected person
        }
    };

    return (
        <Box style={{ height: '75%' }}>
            <CardHeader person={person} onDeleteChat={handleDeleteChat} />
            <Messages person={person } conversation={conversation} />
        </Box>
    )
}

export default ChatBox;
