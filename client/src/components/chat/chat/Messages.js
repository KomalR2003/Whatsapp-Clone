import { useContext, useState, useEffect, useRef } from "react";

import { Box, styled } from "@mui/material";

import {AccountContext} from '../../../context/AccountProvider';

import { getMessages, newmessage, deleteMessage } from "../../../service/api";

// Component
import Footer from "./Footer";
import Message from "./Message";
import { Socket } from "socket.io-client";

// styled
const Wrapper = styled(Box)`
    background-image: url(${'https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png'});
    background-size: 50%;
`;

const Component = styled(Box)`
    height: 75vh;
    overflow-y: scroll;
`;

 const Container = styled(Box)`
 padding: 1px 80px;
`;


const Messages = ({person, conversation}) => {

  const [value, setValue] = useState('');
  const [messages, setMessages] = useState([]);
 
  const [file, setFile] = useState();
  const [image, setImage] = useState('');
  const [incomingMessage, setIncomingMessage] = useState(null);

  const scrollRef = useRef();

  const {account, socket, newMessageFlag, setNewMessageFlag} = useContext(AccountContext);

  useEffect(() => {
    socket.current.on('getMessage', data => {
      setIncomingMessage({
        ...data,
        createdAt: Date.now()
      })
    })
  }, []);


  useEffect(() => {
    const getMessageDetails = async () => {
      if (conversation && conversation._id) {
        let data = await getMessages(conversation._id);
        setMessages(data);
      }
    }
    getMessageDetails();
  }, [person._id, conversation?._id, newMessageFlag])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ transition : 'smooth'})
  }, [messages])

  useEffect(() => {
    incomingMessage && conversation?.members?.includes(incomingMessage.senderId) && 
    setMessages(prev => [...prev, incomingMessage])
  }, [incomingMessage, conversation]);

  useEffect(() => {
    socket.current.on('messageDeleted', ({ messageId }) => {
      setMessages(prev => prev.filter(msg => msg._id !== messageId));
    });
    // Cleanup
    return () => socket.current.off('messageDeleted');
  }, []);

  const sendText = async (eOrObj) => {
    let isSendButton = false;
    let textValue = value;
    let event = eOrObj;

    // If called from Footer send button, eOrObj may be an object with value
    if (eOrObj && typeof eOrObj === 'object' && eOrObj.value !== undefined) {
      isSendButton = true;
      textValue = eOrObj.value;
      event = eOrObj.key;
    }

    // Prevent sending empty or whitespace-only messages
    if (!textValue || !textValue.trim()) return;

    // If Enter key pressed or send button clicked
    const code = event && (event.keyCode || event.which);
    if ((event && event.type === 'keypress' && code === 13) || isSendButton) {
      let message = {};
      if(!file){
        message = {
          senderId: account.sub,
          receiverId: person.sub,
          conversationId: conversation._id,
          type: 'text',
          text:  textValue
        }
      }else{
        message = {
          senderId: account.sub,
          receiverId: person.sub,
          conversationId: conversation._id,
          type: 'file',
          text:  image
        }
      }

      socket.current.emit('sendMessage', message);
      await newmessage(message);
      setValue('');
      setFile('');
      setImage('');
      setNewMessageFlag(prev => !prev)
    }
  }

  const handleDeleteMessage = async (messageId) => {
    await deleteMessage(messageId);
    setMessages((prev) => prev.filter((msg) => msg._id !== messageId));
  };

  return (
    <Wrapper>
      <Component>
      {
        messages && messages.map(message => (
         <Container ref={scrollRef} key={message._id}>
            <Message message={message} onDelete={handleDeleteMessage} />
         </Container>
        ))
      }
      </Component>
      <Footer 
        sendText={sendText}
        setValue={setValue}
        value={value}
        file={file}
        setFile={setFile}
        setImage={setImage}
      />
    </Wrapper>
  )
}

export default Messages;

