import User from '../models/User.js';
import bcrypt from 'bcrypt'


export const createUserController = async(req,res) => {
        
    const {username,email,password,...rest} = req.body;
            
        try{
            const salt= await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password,salt)

            const user = await new User({
                username,
                email,
                password: hashedPassword
                })

            await user.save()
            res.status(201).json({msg: `User ${username} has been created successfully`})

        }catch(e){
            res.status(500).json(e)
        }

    }


export const updateUserController = async(req,res) => {
         const {userId,password, ...other} = req.body

         const user = await User.findById(req.params.id);
         const userToUpdate = await User.findById(userId);

         if(userId == req.params.id || user.isAdmin){
            if(password){
                try{
                    const salt = await bcrypt.genSalt(10);
                    other.password = await bcrypt.hash(password,salt);
                }catch(e){
                    return res.status(500).json('error with pass');
                }
            }

            try {
                await User.findByIdAndUpdate(userId, { $set: other})
            } catch (e) {
                return res.status(500).json(e);
            }
            return res.status(200).json(`msg: User ${userToUpdate.username} updated succesfully`)
         }

         return res.status(403).json('msg: You can only update your account')
    }


export const deleteUserController = async(req,res) => {
         const {userId} = req.body

         const user = await User.findById(req.params.id);
         const userToUpdate = await User.findById(userId);

         if(userId == req.params.id || user.isAdmin){
            try {
                await User.findByIdAndDelete(userId)
            } catch (e) {
                return res.status(500).json(e);
            }
            return res.status(200).json(`msg: User ${userToUpdate.username} deleted succesfully`)
         }
        
         return res.status(403).json('msg: You can only delete your account')
    }

    export const getUserController = async(req,res) =>{
        
        const {userId} = req.query
        const {username} = req.query

        try {
            
            const userToGet = userId ? await User.findById(userId) : await User.findOne({username});
            const {password,updatedAt, ...other} = userToGet._doc
            res.status(200).json(other)

        } catch (error) {
            res.status(500).json(error)
        }

    }
    export const getFriendsUserController = async(req,res) =>{
        
        const {userId} = req.params

        try {
            
            const user = await User.findById(userId)
            const friends =  await Promise.all(
                user.followings.map((friendId)=>{
                    return User.findById(friendId)
                })
            )

            res.status(200).json(friends)

        } catch (error) {
            res.status(500).json('error desde getFriends')
        }

    }


  
    export const followUnfollowUserController = async(req,res) =>{
        

        if(req.body.userId !== req.params.id){
            const userTofollow = await User.findById(req.params.id)
            const userCurrent = await User.findById(req.body.userId)
            if(!userTofollow.followers.includes(userCurrent._id)){
                await userCurrent.updateOne({$push: {followings: userTofollow._id}})
                await userTofollow.updateOne({$push: {followers: userCurrent._id}})
                res.status(200).json(`msg: User ${userTofollow.username} followed succesfully`)
            }else{
                await userCurrent.updateOne({$pull: {followings: userTofollow._id}})
                await userTofollow.updateOne({$pull: {followers: userCurrent._id}})
                res.status(200).json(`msg: User ${userTofollow.username} Unfollowed succesfully`)
            }

        }else{
            res.status(403).json('You cant follow yourself')
        }

    }