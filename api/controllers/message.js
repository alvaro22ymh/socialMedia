import Message from "../models/Message.js"


export const addMessageController = async(req,res) =>{
    const {conversationId,sender,text} = req.body
    const newMessage = new Message({conversationId,sender,text})

    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    } catch (error) {
        res.status(500).json('Error saving message to db' + error)
    }
}

export const getMessagesController = async(req,res) =>{
    const {conversationId} = req.query
    
    try {
        const messages = await Message.find({conversationId})
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json('Error trying to find message on db' + error)
    }
}