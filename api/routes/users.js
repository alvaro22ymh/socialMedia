import {Router} from 'express';
import { body, param, check, query } from 'express-validator'

import { createUserController, deleteUserController, followUnfollowUserController, getFriendsUserController, getUserController, updateUserController } from '../controllers/user.js';
import { fieldsValidator, fieldsValidatorStopper } from '../middlewares/validate-fields.js';
import { UserExist, emailExist, userExistId } from '../helpers/dbValidators.js';


 export const userRoutes = () =>{
    const router = Router();


    //create user
    router.post("/register",[ 
    check('email', 'The email is required').isEmail(),
    check('email').custom(emailExist),
    check('username').custom(UserExist),
    check('password', 'The password is required').not().isEmpty(),
    fieldsValidatorStopper],
    createUserController)

    //update user
    router.put("/:id",[ 
    body('userId', 'Is not a valid mongoId').isMongoId(),
    fieldsValidatorStopper,
    body('userId').custom(userExistId),
    fieldsValidator ],
    updateUserController)

    //delete user
    router.delete("/:id",[ 
      body('userId', 'Is not a valid mongoId').isMongoId(),
      fieldsValidatorStopper,
      body('userId').custom(userExistId),
      fieldsValidator ],
      deleteUserController)


    //get user
    router.get("/", getUserController)

    //get uSerfriends
    router.get("/friends/:userId", getFriendsUserController)


    //follow/unfollow a user
    router.post("/:id/follow",[ 
      param('id', 'Is not a valid mongoId').isMongoId(),
      body('userId', 'Is not a valid mongoId').isMongoId(),
      fieldsValidatorStopper,
      param('id').custom(userExistId),
      body('userId').custom(userExistId),
      fieldsValidator ],
      followUnfollowUserController)


  
    return router
 }
