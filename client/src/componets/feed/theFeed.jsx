import { useContext, useEffect, useState } from "react"
import Post from "../post/Post"
import Share from "../share/Share"
import "./feed.css"
import axios from "axios"
import { AuthContext } from "../../context/AuthContext"


export default function Feed({username}){
    const [posts,setPosts] = useState([])
    const {user} = useContext(AuthContext)

    useEffect(()=>{
        const fetchPosts = async()=>{
        
                try {
                    if(!username){
                        const res = await axios.get(`http://localhost:1200/api/posts/timeline/${user._id}`)
                        return setPosts(res.data.sort((p1,p2)=>{
                            return new Date(p1.createdAt)- new Date(p2.createdAt)
                        }))
                             
                    }else{
                        const res = await axios.get(`http://localhost:1200/api/posts/profile/${username}`)
                        console.log(res.data)
                        return setPosts(res.data.sort((p1,p2)=>{
                            return new Date(p1.createdAt)- new Date(p2.createdAt)
                        }))
                    }          
                } catch (error) {
                    console.log(error)
                }
        }
        fetchPosts()
    },[username, user._id])
    
    if(Array.isArray(posts)){
        console.log(posts)
            return (
            <div className="feed">
                <>
               {!username && <Share/>}
               {username===user.username && <Share/>}

                    
                    { posts.map((p) =>( <Post key={p._id} post={p}/> ))}
                </>
            </div>
        )
    }else{
        
        return (
            <div className="feed">
                <>
               <Share/>
                    { <div className="noPostWrapper">
                        <span className="noPosts">No posts yet</span>
                    </div> } 
                </>
            </div>
            )
    }
    
}

