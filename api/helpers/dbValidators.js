import Post from "../models/Post.js";
import User from "../models/User.js";

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



