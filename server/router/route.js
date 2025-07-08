import express from 'express';

import { addUser, getUsers } from '../controller/user-controller.js';
import { newConversation, getConversation, deleteConversation } from '../controller/conversation-controller.js';
import { newMessage, getMessages, deleteMessage } from '../controller/message-controller.js';
import { uploadFile } from '../controller/image-comtroller.js';

import upload from '../utils/upload.js';
import { getImage } from '../controller/image-comtroller.js';

const route = express.Router();

route.post('/add',addUser);
route.get('/users', getUsers);

route.post('/conversation/add', newConversation);
route.post('/conversation/get', getConversation);
route.delete('/conversation/:conversationId', deleteConversation);

route.post('/message/add', newMessage);
route.get('/message/get/:id', getMessages);
route.delete('/message/:messageId', deleteMessage);

route.post('/file/upload', upload.single("file"), uploadFile);
route.get('/file/:filename', getImage);

export default route;