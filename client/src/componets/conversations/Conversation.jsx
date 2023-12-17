import { useEffect, useState } from 'react'
import './conversation.css'
import axios from 'axios'


export default function Conversation({conversation,currentUser}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    const [userFriend,setUserFriend] = useState([])
    useEffect(()=>{
      const friendId = conversation.members.find((m)=>m!==currentUser._id)

      const getUser = async()=>{
        try {
          const res = await axios.get(`http://localhost:1200/api/users?userId=${friendId}`)
          setUserFriend(res.data)
        } catch (error) {
          console.log(error)
        }
      }
      getUser()
    },[currentUser,conversation])

  return (
    <div className='conversation'>
        <img src={PF+'person/'+userFriend?.profilePicture} alt="Pic" className="conversationImg" />
        <span className="conversationName">{userFriend?.username}</span>
    </div>
  )
}
