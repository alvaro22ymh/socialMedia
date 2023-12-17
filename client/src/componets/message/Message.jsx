import './message.css'

export default function Message({own, message,user}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    

  return (
    <div className={own? 'message own' : 'message'}>
        <div className="messageTop own">
            <img src={PF+'person/'+user.profilePicture} alt="" className="messageImg" />
            <p className='messageText'>{message.text}</p>
        </div>
        <div className="messageBottom">{message.createdAt}</div>

    </div>
  
  )
}
