import Conversation from "../model/Conversation.js";
import Message from "../model/Message.js";

export const newConversation = async (request, response) => {
    try {
        const senderId = request.body.senderId;
        const receiverId = request.body.receiverId;

        const exist = await Conversation.findOne({ members: { $all: [receiverId, senderId] } });

        if (exist) {
            return response.status(200).json('conversation already exists');
        }

        const newConversation = new Conversation({
            members: [senderId, receiverId]
        })

        await newConversation.save();
        return response.status(200).json('conversation saved successfully')

    } catch (error) {
        return response.status(500).json(error.message);
    }
}

export const getConversation = async (request, response) => {
    try {

        const senderId = request.body.senderId;
        const receiverId = request.body.receiverId;

        let conversation = await Conversation.findOne({ members: { $all: [receiverId, senderId] } });
        return response.status(200).json(conversation);
    } catch (error) {
        return response.status(500).json(error.message);
    }
}

export const deleteConversation = async (request, response) => {
    try {
        const { conversationId } = request.params;
        const deleted = await Conversation.findByIdAndDelete(conversationId);
        if (!deleted) {
            return response.status(404).json('Conversation not found');
        }
        // Delete all messages for this conversation
        await Message.deleteMany({ conversationId: deleted._id });
        return response.status(200).json('Conversation and messages deleted successfully');
    } catch (error) {
        return response.status(500).json(error.message);
    }
}

