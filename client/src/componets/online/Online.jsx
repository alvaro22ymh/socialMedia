
import "./online.css"

export default function Online() {
    const PF= process.env.REACT_APP_PUBLIC_FOLDER;

        return (
                <li className="rightbarFriend">
                    <div className="rightbarProfileImgContainer">
                        <img src={PF+"person/3.jpeg"} alt="" className="rightbarProfileImg" />
                        <span className="rightbarOnline"></span>
                    </div>
                    <span className="rightBarUsername">
                        Mariana Lemon
                    </span>
                </li>
        )
    }       
