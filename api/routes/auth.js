import {Router} from 'express';
import { check } from 'express-validator'

//controllers
import { loginController } from '../controllers/auth.js';

//middelwares
import { fieldsValidator } from '../middlewares/validate-fields.js';



 export const authRoutes = () =>{
    const router = Router();

    //ROUTER LOGIN----------------
    router.post("/login",[
      check('email', 'The email is required').isEmail(),
      check('password', 'The password is required').not().isEmpty(),
      fieldsValidator
  ],loginController)
    
    return router
 }
