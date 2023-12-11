import { Bookmark, Event, Group, HelpOutline, Message, PlayArrow, RssFeed, School, WorkOutline } from "@mui/icons-material"

import "./sidebar.css"
import Closefriend from "../closeFriend/myCloseFriend"


export default function SideBar(){

    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <RssFeed className="sidebarIcon"/>
                        <span className="sidebarListItemText">
                            Feed
                        </span>
                    </li>
                    <li className="sidebarListItem">
                        <Message className="sidebarIcon"/>
                        <span className="sidebarListItemText">
                            Chats
                        </span>
                    </li>
                    <li className="sidebarListItem">
                        <PlayArrow className="sidebarIcon"/>
                        <span className="sidebarListItemText">
                            Videos
                        </span>
                    </li>
                    <li className="sidebarListItem">
                        <Group className="sidebarIcon"/>
                        <span className="sidebarListItemText">
                            Groups
                        </span>
                    </li>
                    <li className="sidebarListItem">
                        <Bookmark className="sidebarIcon"/>
                        <span className="sidebarListItemText">
                            Bookmarks
                        </span>
                    </li>
                    <li className="sidebarListItem">
                        <HelpOutline className="sidebarIcon"/>
                        <span className="sidebarListItemText">
                           Questions
                        </span>
                    </li>
                    <li className="sidebarListItem">
                        <WorkOutline className="sidebarIcon"/>
                        <span className="sidebarListItemText">
                            Jobs
                        </span>
                    </li>
                    <li className="sidebarListItem">
                        <Event className="sidebarIcon"/>
                        <span className="sidebarListItemText">
                           Events
                        </span>
                    </li>
                    <li className="sidebarListItem">
                        <School className="sidebarIcon"/>
                        <span className="sidebarListItemText">
                            Courses
                        </span>
                    </li>

                </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr"></hr>
        <ul className="sidebarFriendList">
            <Closefriend/>
        </ul>
            </div>
        </div>
    )
}