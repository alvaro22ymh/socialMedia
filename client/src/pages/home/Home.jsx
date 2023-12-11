import "./home.css"

import TopBar from "../../componets/topBar/TopBar";
import SideBar from "../../componets/sidebar/Sidebar";
import Feed from "../../componets/feed/theFeed";
import RightBar from "../../componets/rightbar/Rightbar";

export default function Home(){
    return (
        <>
            <TopBar/>
            <div className="homeContainer">
                <SideBar/>
                <Feed/> 
                <RightBar/> 
            </div>
            
        </>
    )
}