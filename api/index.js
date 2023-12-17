import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
import multer from 'multer'
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const app = express();
import {userRoutes} from './routes/users.js'
import {authRoutes} from './routes/auth.js' 
import {postRoutes} from './routes/posts.js' 
import { conversationRoutes } from "./routes/conversation.js";
import { messagesRoutes } from "./routes/messages.js";
import { corsMiddleware } from "./middlewares/cors.js";

dotenv.config();
mongoose.connect(process.env.MONGO_URL, console.log("CONECTED TO MONGOdb"));


app.use(corsMiddleware())
//middelwares
app.use(express.json())
app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    })
  );
app.use(morgan("common"));

//upload files to server

const storage = multer.diskStorage({
    destination: (req,file,cb)=>[
        cb(null,'./public/images')
    ],
    filename: (req,file,cb) =>{
        cb(null, req.body.name)
    },
})

const upload = multer({storage})
app.post('/api/upload', upload.single('file'), (req,res, next)=>{
    try {
        return res.status(200).json('file uploaded succesfully')
    } catch (error) {
        console.log(error);
    }
})

//path to convert request url 'public/images' to a simple directory '/images'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use('/images', express.static(path.join(__dirname, 'public/images')))


//middelwares
app.use('/api/users', userRoutes())
app.use('/api/auth', authRoutes())
app.use('/api/posts', postRoutes())
app.use('/api/conversation', conversationRoutes())
app.use('/api/messages', messagesRoutes())


app.listen(1200, ()=> {
    console.log("SERVER IS RUNING...PORT 1200")
})