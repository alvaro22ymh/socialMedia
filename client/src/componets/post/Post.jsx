import { MoreVert } from "@mui/icons-material"
import "./post.css"
import { useContext, useEffect, useState } from "react"
import axios from "axios";
import {Link} from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";


export default function Post({post}) {


    const {user: currentUser} = useContext(AuthContext)
    const [user,setUser] = useState({})
    const [like, setLike] = useState(post.likes.length)
    const [isLiked, setIsLiked] = useState()

    const PF= process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(()=>{
        const fetchUser = async()=>{
            try {
                const res = await axios.get(`http://localhost:1200/api/users?userId=${post.userId}`)
                setUser(res.data)
                
            } catch (error) {
                console.log(error)
            }
        }
        fetchUser()
    },[post.userId])


    const likeHandler = async() =>{
        try{
            await axios.put(`http://localhost:1200/api/posts/like/${post._id}`, {userId: currentUser._id});

        }catch(err){
            
        }
        setLike(isLiked? like-1 : like+1);
        setIsLiked(!isLiked)
        console.log(post)

    }

  return (
    <div className="post">
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <Link to={`profile/${user.username}`}><img className="postProfileImg" src={PF+'person/'+user.profilePicture} alt="profPicture" /></Link>
                    
                    <span className="postUsername">{user.username}</span>
                    <span className="postDate">{post.updatedAt}</span>
                </div>    
                <div className="postTopRight">
                <MoreVert className=""/>
                </div>    
            </div>
            <div className="postCenter">
                <span className="postText">
                    {post.desc}
                    <img className="postImg" src={PF+'post/'+post.img} alt="postPic"/>
                </span>
            </div>    
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img onClick={likeHandler} src={PF+'like.png'} alt="" className="likeIcon" />
                    <img onClick={likeHandler} src={PF+'heart.png'} alt="" className="likeIcon" />
                    <span className="postLikeCounter">{like}</span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText">{post.comments}</span>
                </div>
            </div>    
        </div>    
    </div>
  )
}
