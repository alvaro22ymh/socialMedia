import "./topbar.css"
import { Search, Person, Chat, Notifications } from "@mui/icons-material"
import { useContext } from "react";
import {Link} from "react-router-dom"
import {AuthContext} from "../../context/AuthContext"
 
export default function TopBar(){
    const PF= process.env.REACT_APP_PUBLIC_FOLDER;

    
    const {user} = useContext(AuthContext)

    return (
        <div className="topBarContainer">

            <div className="topBarLeft">
                <Link to="/" style={{textDecoration: "none"}}>
                    <span className="logo">SocialBook</span>
                </Link>
            </div>

            <div className="topBarCenter">
                <div className="searchBar">
                    <Search className="searchIcon"/>
                    <input placeholder="Search for frien, post, video..." className="searchInput"/>
                </div>
            </div>

            <div className="topBarRight">
                <div className="topBarLinks">
                    <span className="topBarLink">Homepage</span>
                    <Link to={"/"}>
                    <span className="topBarLink">Timeline</span>
                    </Link>
                </div>
                <div className="topBarIcons">
                    <div className="topBarIconItem">
                        <Person/>
                        <span className="topBarIconBadge">1</span>
                    </div>
                    <div className="topBarIconItem">
                        <Chat/>
                        <span className="topBarIconBadge">1</span>
                    </div>
                    <div className="topBarIconItem">
                        <Notifications/>
                        <span className="topBarIconBadge">1</span>
                    </div>
                </div>
                <Link to={`/profile/${user.username}`}>
                <img src={PF+"person/"+user.profilePicture} alt="img" className="topBarImg" />
                </Link>
                
            </div>
        </div>
    )
}
