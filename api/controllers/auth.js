import User from '../models/User.js';
import bcrypt from 'bcrypt'




    export const loginController = async(req,res) =>{
        
        try{
            const {email, password} = req.body;
            const user = await User.findOne({email})
            if(!user) return res.status(404).json({msg: 'User not found'}) 
            

            const validPassword = await bcrypt.compare(password,user.password)
            if(!validPassword) return res.status(401).json({msg: 'Wrong password'})

            if(user){

                const {password, ...other} = user 
                return res.status(200).json(other._doc)
            }

        }catch(e){
            return res.status(500).json(e)
        }
    }