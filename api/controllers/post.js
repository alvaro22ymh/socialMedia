import Post from "../models/Post.js"
import User from "../models/User.js"

export const createPostController = async(req,res) =>{
    const {userId, desc, img} = req.body

    try {
        const newPost = await Post({userId,desc,img})
        await newPost.save()
        res.status(201).json("msg: Post created successfully")
    } catch (error) {
        res.status(500).json(error)
    }

}


export const updatePostController = async(req,res) => {
    const {userId, desc, img} = req.body
    try {
        const post = await Post.findById(req.params.id)
        if(post.userId == userId){
            await Post.updateOne({desc,img})
            res.status(200).json("msg: Post updated successully")
        }else{
            res.status(403).json("msg: you can only update your post")
        }

    } catch (error) {
        res.status(500).json(error)
    }

}
export const deletePostController = async(req,res) => {
    const {userId} = req.body
    try {
        const post = await Post.findById(req.params.id)
        if(post.userId == userId){
            await Post.findByIdAndDelete(req.params.id)
            res.status(200).json("msg: Post deleted successully")
        }else{
            res.status(403).json("msg: you can only delete your post")
        }

    } catch (error) {
        res.status(500).json(error)
    }

}
export const likePostController = async(req,res) => {
   
    const {id: postId} = req.params
    const {userId} = req.body
    
    try {
        const post = await Post.findById(postId)
        if(post.likes.includes(userId)){
            await post.updateOne({ $pull: {likes: userId}})
            res.status(200).json("msg: Post unLiked successully")
        }else{
            await post.updateOne({ $push: {likes: userId}})
            res.status(200).json("msg: Post liked successully")
        }

    } catch (error) {
        res.status(500).json(`msg: internal error: ${error}`)
    }

}

export const getPostController = async(req,res) => {

    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(`msg: internal error ${error}`)
    }

}

export const timelinePostController = async(req,res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({userId: currentUser._id});
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId)=>{
                return Post.find({userId: friendId})
            })
        )
        if(userPosts.length===0 && friendPosts.length===0){
            return res.status(200).json("msg: you and your friends dont have any post")
        }
        res.status(200).json(userPosts.concat(...friendPosts))

    } catch (error) {
        res.status(500).json(error)
    }
}

export const allUserPostsController = async(req,res) => {
    try {
        const user = await User.findOne({username: req.params.username})
        const userPosts = await Post.find({userId: user._id});
        
        if(userPosts.length===0){
            return res.status(200).json("You dont have any post")
        }
      
        res.status(200).json(userPosts)

    } catch (error) {
        res.status(500).json(error)
    }
}