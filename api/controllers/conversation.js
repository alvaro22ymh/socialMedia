import Conversation from "../models/Conversation.js"

export const newConversationController = async(req,res)=>{

    const newConversation = new Conversation({
        members: [req.body.senderId,req.body.receiverId]
    })
    try {
        const convSaved= await newConversation.save()
        res.status(200).json(convSaved)
    } catch (error) {
        res.status(500).json('error saving to db:' + error)
    }
        
}

export const getConversationController = async(req,res)=>{

    try {
        const conversation= await Conversation.find({
            members: {$in: [req.params.userId]}
        })

       res.status(200).json(conversation)
       
    } catch (error) {
        res.status(500).json('error finding conversation:' + error)
    }
        
}