import {Router} from 'express';
import { addMessageController, getMessagesController } from '../controllers/message.js';
import { body, param,query } from 'express-validator';
import { fieldsValidatorStopper } from '../middlewares/validate-fields.js';
import { conversationExistId, getIsUserConversation, isUserConversation, userExistId } from '../helpers/dbValidators.js';


export const messagesRoutes = () =>{
    const router = Router()

    //add
    router.post('/',[
        body('conversationId').isMongoId(),
        body('sender').isMongoId(),
        fieldsValidatorStopper,
        body('conversationId').custom(conversationExistId),
        body('sender').custom(userExistId),
        body(['sender'],['conversationId']).custom(isUserConversation),
        fieldsValidatorStopper,
    ], addMessageController)

    //get
    router.get('/',[
        query('conversationId').isMongoId(),
        query('currentUserId').isMongoId(),
        fieldsValidatorStopper,
        query('conversationId').custom(conversationExistId),
        query('currentUserId').custom(userExistId),
        query().custom(getIsUserConversation),
        fieldsValidatorStopper,
    ], getMessagesController)


    return router
}