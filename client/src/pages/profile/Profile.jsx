import "./profile.css"
import { useEffect, useState } from "react"
import axios from "axios";


import TopBar from "../../componets/topBar/TopBar";
import SideBar from "../../componets/sidebar/Sidebar";
import Feed from "../../componets/feed/theFeed";
import RightBar from "../../componets/rightbar/Rightbar";

import { useParams } from "react-router-dom"; 

export default function Profile() {
    const PF= process.env.REACT_APP_PUBLIC_FOLDER;
    const username = useParams().username;

    const [user,setUser] = useState({})

    useEffect(()=>{
        const fetchUser = async()=>{
            try {
                const res = await axios.get(`http://localhost:1200/api/users?username=${username}`)
                 setUser(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchUser()
    },[username])


  return (
        <>
            <TopBar/>
            <div className="profile">
                <SideBar/>
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img src={PF+"post/"+user.coverPicture} alt="" className="profileCoverImg" />
                            <img src={PF+'person/'+user.profilePicture} alt="" className="profileUserImg" />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                            <span className="profileInfoDesc">Hi my friends!</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={username}/> 
                        <RightBar user={user}/>
                    </div>
                </div>
            </div>
        </>
  )
}
