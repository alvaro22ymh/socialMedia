import {Router} from 'express';
import { body, param } from 'express-validator';
import { fieldsValidatorStopper } from '../middlewares/validate-fields.js';
import { userExistId } from '../helpers/dbValidators.js';
import { getConversationController, newConversationController } from '../controllers/conversation.js';


export const conversationRoutes = () =>{
    const router = Router()

    //new conversation
    router.post('/',[
        body('senderId').custom(userExistId),
        body('senderId', 'Is not a valid mongoId').isMongoId(),
        fieldsValidatorStopper,
        body('receiverId').custom(userExistId),
        fieldsValidatorStopper
    ],newConversationController)

    //get conversation of a user
    router.get('/:userId',[
        param('userId').custom(userExistId),
        fieldsValidatorStopper
    ], getConversationController)

    return router;
}