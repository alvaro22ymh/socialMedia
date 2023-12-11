
import "./closeFriend.css"

export default function Closefriend() {
  const PF= process.env.REACT_APP_PUBLIC_FOLDER;

  return (

    <li className="sidebarFriend">
        <img src={PF+"person/2.jpeg"} alt="" className="sidebarFriendImg" />
        <span className="sidebarFriendName">Jane Maccrty</span>
    </li>

  )
}
