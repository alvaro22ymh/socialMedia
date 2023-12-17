import { useContext, useEffect, useRef, useState } from "react"
import ChatOnline from "../../componets/chatOnline/ChatOnline"
import Conversation from "../../componets/conversations/Conversation"
import Message from "../../componets/message/Message"
import TopBar from "../../componets/topBar/TopBar"
import "./messenger.css"
import { AuthContext } from "../../context/AuthContext"
import axios from 'axios'
import {io} from 'socket.io-client'

export default function Messenger() {

  const [conversations, setConversations] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [socket, setSocket] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [userFriend,setUserFriend] = useState([])

  const { user } = useContext(AuthContext)
  const scrollRef = useRef()
  
  useEffect(()=>{
    setSocket(io("ws://localhost:8900"))
  },[user])


  useEffect(()=>{

    if (socket) {
      console.log("Socket conectado:", socket.connected);
    if (socket) {
      socket.on("welcome", message => {
        console.log(message);
      });
  
    }
  }
 },[socket])

  useEffect(()=>{
    const getConversations = async() =>{
      try {
        const res = await axios.get(`http://localhost:1200/api/conversation/${user._id}`)
        setConversations(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getConversations()

    if(currentChat){
      const friendId = currentChat?.members.find((m)=>m!==user._id)
      const getUser = async()=>{
        try {
          const res = await axios.get(`http://localhost:1200/api/users?userId=${friendId}`)
          setUserFriend(res.data)
        } catch (error) {
          console.log(error)
        }
      }
    getUser()
    }
  

  },[user,currentChat])
  

  useEffect(()=>{
    const getMessages = async() =>{
      if(currentChat){
        try {
            const res = await axios.get(`http://localhost:1200/api/messages?conversationId=${currentChat._id}&currentUserId=${user._id}`)
        setMessages(res.data)
         } catch (error) {
          console.log('Error fetching messages of the conversation: ' +error)
         }
      }
          
    }
    getMessages()
  },[user._id,currentChat])


  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior: "smooth"})
  },[messages])

    const postNewMessage = async() =>{
        try {
          const message = {
            sender: user._id,
            conversationId:currentChat._id,
            text: newMessage
          }
          setNewMessage("")
           const res = await axios.post('http://localhost:1200/api/messages', message)
           setMessages([...messages, res.data])
         } catch (error) {
            console.log('Error posting messages of the conversation: ' +error)
         }
      }


  

  return (
    <>
    <TopBar/>
    <div className="container">
    <div className='messenger'>
      <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations.map((c)=>(   
              <div onClick={()=>setCurrentChat(c)} >
                <Conversation conversation={c} currentUser={user}/>
              </div>
            ))}
          </div>
      </div>
      <div className="chatBox">
          <div className="chatBoxWrapper">
            {
              currentChat ? 
              <>
              <div className="chatBoxTop">
                
                  {messages.map((m)=>(
                    <div ref={scrollRef}>
                  {m.sender!==user._id? <Message message={m} user={userFriend}/>
                                    :<Message own={true} message={m} user={user}/>}
                    </div>
                ))}
               
                
                
              </div>

               <div className="chatBoxBottom">
                <textarea onChange={(e)=>setNewMessage(e.target.value)
                } value={newMessage} className="chatMessageInput" placeholder="Write Something...">

                </textarea>
                <button onClick={postNewMessage} className="chatSubmitButton">Send</button>
               </div>
           
              </> : <span className="noConversation">Open a conversation to start a chat</span>
              }
          </div>
       
      </div>
      <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline/>
            <ChatOnline/>
            <ChatOnline/>
            <ChatOnline/>
          </div>
      </div>
    </div>
    </div>
    
    
    </>
  )
}
