import { EmojiEmotions, Label, PermMedia, Room } from "@mui/icons-material"
import "./share.css"
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios"



export default function Share(){
    const PF= process.env.REACT_APP_PUBLIC_FOLDER;
    const {user} = useContext(AuthContext)
    const desc = useRef()
    const [file,setFile] = useState(null)
    

    
    
     
    const submitHandler = async(e) =>{
    e.preventDefault()

    if(file){
        const data = new FormData();
        const filename = Date.now() + file.name;
        //add file to datafornm
        data.append('file',file);

        //add name to dataform
        data.append('name',filename);
        try {
            await axios.post("http://localhost:1200/api/upload", {data})
        } catch (error) {
            console.log(error)
        }
    }
        try{
            await axios.post("http://localhost:1200/api/posts", {img: file.name, desc: desc.current.value, userId: user._id})
        }catch(err){
            console.log('An error while uploadng post: '+err);
        }
    }
    
    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img src={`${PF}person/${user.profilePicture}`} alt="" className="shareProfileImg" />
                    <input
                        placeholder= {`Whats On your mind ${user.username}?`}
                        className="shareInput"
                        ref={desc}
                    />
                </div>
                <hr className="shareHr" />
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <PermMedia htmlColor="tomato" className="shareIcon"/>
                            <span className="shareOptionText">Photo or video</span>
                            <input style={{display: "none"}} 
                                   type="file" id="file"
                                   accept=".png, .jpeg, .jpg" 
                                   onChange={(e)=> setFile(e.target.files[0])}/>
                        </label>
                        <div className="shareOption">
                            <Label htmlColor="blue" className="shareIcon"/>
                            <span className="shareOptionText">Tag</span>
                            
                        </div>
                        <div className="shareOption">
                            <Room htmlColor="green" className="shareIcon"/>
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor="gold" className="shareIcon"/>
                            <span className="shareOptionText">feeling</span>
                        </div>
                    </div>
                    <button className="shareButton" type="submit" >Share</button>
                </form>
            </div>
        </div>
    )
}