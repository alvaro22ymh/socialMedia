import { Router } from "express";
import {body, param} from "express-validator"

import { allUserPostsController, createPostController, deletePostController, getPostController, likePostController, timelinePostController, updatePostController } from "../controllers/post.js";
import { fieldsValidator, fieldsValidatorStopper } from '../middlewares/validate-fields.js';
import { postExistId, userExistId } from "../helpers/dbValidators.js";



export const postRoutes = () =>{
    const router = Router()

    //create a post
    router.post("/", [
        body('userId', 'Is not a valid mongoId').isMongoId(),
        fieldsValidatorStopper,
        body('userId').custom(userExistId),
        fieldsValidator],
    createPostController)

    //update a post
    router.put("/:id", [
        param('id', 'Is not a valid mongoId').isMongoId(),
        body('userId', 'Is not a valid mongoId').isMongoId(),
        fieldsValidatorStopper,
        param('id').custom(postExistId),
        body('userId').custom(userExistId),
        fieldsValidator
    ],
    updatePostController)


    //delete a post
    router.delete("/:id", [
        param('id', 'Is not a valid mongoId').isMongoId(),
        body('userId', 'Is not a valid mongoId').isMongoId(),
        fieldsValidatorStopper,
        param('id').custom(postExistId),
        body('userId').custom(userExistId),
        fieldsValidator
    ],
    deletePostController)


    //like a post
    router.put("/like/:id", [
        param('id', 'Is not a valid mongoId').isMongoId(),
        body('userId', 'Is not a valid mongoId').isMongoId(),
        fieldsValidatorStopper,
        param('id').custom(postExistId),
        body('userId').custom(userExistId),
        fieldsValidator
    ],
    likePostController)

   
    //get a post
    router.get("/:id",[
        param('id', 'Is not a valid mongoId').isMongoId(),
        fieldsValidatorStopper,
        param('id').custom(postExistId),
        fieldsValidator
    ],getPostController )
  

    //get timeline a post
      router.get("/timeline/:userId",[
        param('userId', 'Is not a valid mongoId').isMongoId(),
        fieldsValidatorStopper,
        param('userId').custom(userExistId),
    ],timelinePostController )



    //get user all posts
      router.get("/profile/:username",allUserPostsController )
    



    return router;
}