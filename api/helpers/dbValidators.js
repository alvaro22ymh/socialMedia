import Post from "../models/Post.js";
import User from "../models/User.js";
import Conversation from "../models/Conversation.js";

export const emailExist = async(email='') => {
    const exist = await User.findOne({email});
    if(exist){
        throw new Error(`User email ${email} already exist, try another`)
    }
}
export const UserExist = async(username='') => {
    const exist = await User.findOne({username});
    if(exist){
        throw new Error(`User username ${username} already exist, try another`)
    }
}

export const userExistId = async(userId) => {
    
    const exist = await User.findById(userId);
    if(!exist){
        throw new Error(`the user id ${userId} dont exist`)
    }
}
export const postExistId = async(postId) => {
    const exist = await Post.findById(postId);
    if(!exist){
        throw new Error(`the post id ${postId} dont exist`)
    }
}
export const conversationExistId = async(conversationId) => {
    const exist = await Conversation.findById(conversationId);
    if(!exist){
        throw new Error(`the conversation id ${conversationId} dont exist`)
    }
}
export const isUserConversation = async(values,{req}) => {
    const {sender,conversationId} = req.body
     const conversation = await Conversation.findById(conversationId)
    if(!conversation.members.includes(sender) ){
        throw new Error(`the user ${sender} is not included on the conversation ${conversationId}`)
     }
}
export const getIsUserConversation = async(values,{req}) => {
    const {currentUserId,conversationId} = req.query
     const conversation = await Conversation.findById(conversationId)
    if(!conversation.members.includes(currentUserId) ){
        throw new Error(`the user ${currentUserId} is not included on the conversation ${conversationId}`)
     }
}



