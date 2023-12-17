import './chatOnline.css'

export default function ChatOnline() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

  return (
    <div className='chatOnline'>
        <div className="chatOnlinefriend">
            <div className="chatOnlineImgContainer">
                <img src={PF+'person/1.jpeg'} alt="" className="friendImg" />
                <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineName">Alvaro mosqueda</span>
        </div>
    </div>
  )
}
