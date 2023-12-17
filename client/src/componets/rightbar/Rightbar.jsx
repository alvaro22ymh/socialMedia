import { useContext, useEffect, useState } from "react";
import Online from "../online/Online"
import "./rightbar.css"
import axios from "axios";
import { Link } from "react-router-dom";
import { Add, Remove } from "@mui/icons-material";
import { AuthContext } from "../../context/AuthContext";

export default function RightBar({user}){
    const PF= process.env.REACT_APP_PUBLIC_FOLDER;
    const {user:currentUser} = useContext(AuthContext);

    const [friends, setFriends] = useState([])
    const [follow, setFollow] = useState()

    useEffect(()=>{
            const fetchFriends = async() =>{
                if(user) {
                    try {
                        const res = await axios.get(`http://localhost:1200/api/users/friends/${user._id}`)
                        setFriends(res.data)
                        console.log(user)
                    } catch (error) {
                        console.log(error)
                    }
                  !currentUser.followings.includes(user._id)? setFollow(false)
                                                      : setFollow(true)  
            }     
        }
            
            
        fetchFriends()   
    },[user,currentUser])
    
 
        const followUnfollow = async()=>{
            if(user){
                try {
                    await axios.post(`http://localhost:1200/api/users/${user._id}/follow`, {userId: currentUser._id})
                    setFollow(!follow)
                } catch (error) {
                    console.log(error)
                }
            }
        }
       
    const HomeRightbar = () =>{
        return (
            <>
                <div className="birthdayContainer">
                    <img src={PF+"gift.png"} alt="" className="birthdayImg" />
                    <span className="birthdayText"><b>Pola Foster</b> and <b>3 other friends</b> have a birthday today</span>
                </div>
                <img src={PF+"ad.png"} alt="" className="rightbarAd" />
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                        <Online/>
                 </ul>
            </>
        )
    }

    const ProfileRightbar = () =>{
        return (<>
        {user.username!==currentUser.username && 
                <button 
               onClick={followUnfollow} className="rightbarFollowButton">
                     {follow?'Unfollow' :'Follow'}  
                     {follow?<Remove/> :<Add/> }  
                </button>
            }
            
          
            <h4 className="rightbarTitle">User information</h4>
            <div className="rightbarInfo">
               
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">City: </span>
                    <span className="rightbarInfoValue"> {user.city} </span>
                </div>
                
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">From: </span>
                    <span className="rightbarInfoValue"> {user.from} </span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">Relationship: </span>
                    <span className="rightbarInfoValue"> {user.relationship === 1
                                                            ? "Single"
                                                            : user.relationship ===2
                                                            ?"Married"
                                                            : "-"  
                    }</span>
                </div>
             
            </div>

            {friends.length>0?  <h4 className="rightbarTitle">Friends{
                                     friends.map((friend) => (
                                        
                                        <div className="rightbarFollowings">
                                            <Link to={`/profile/${friend.username}`} style={{textDecoration: "none"}}>
                                                <div  className="rightbarFollowing">
                                                <img src={PF+"person/"+friend.profilePicture} alt="" className="rightbarFollowingImg" />
                                                <span className="rightbarFollowingName">{friend.username}</span>
                                                </div>
                                            </Link>
                                        </div>
                                         ))}
                                 </h4>
                         :  <h4 className="rightbarTitle">No friends yet</h4>}
        </>)
    }
  

    return (
        <div className="rightbar">
           <div className="rightbarWrapper">
                {user? <ProfileRightbar/> : <HomeRightbar/>}
           </div>
        </div>
    )
}