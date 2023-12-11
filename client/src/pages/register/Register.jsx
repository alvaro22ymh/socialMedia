import axios from "axios"
import "./register.css"
import { useEffect, useRef, useState } from "react"
import { useNavigate, Link } from "react-router-dom"


export default function Register() {

    const email= useRef()
    const username= useRef()
    const password = useRef()
    const passwordAgain = useRef()
    const errorDiv = useRef()


 
    const navigate = useNavigate();

    const [errors, setErrors] = useState([]);
        


    const handleClick = async(e) =>{
            
          e.preventDefault();
        if(password.current.value!==passwordAgain.current.value){
            if (!errors.some((error) => error === "Passwords don't match")){
                
                setErrors((prev)=>[...prev, "Passwords don't match"])
                setErrors([])
            }

        }else{
            
            try {
                await axios.post('http://localhost:1200/api/users/register', 
                {email: email.current.value,
                username: username.current.value,
                password: password.current.value,
                })
                navigate('/login')
                
            } catch (error) {
                if (!errors.some((error) => error === "Bad Request, email or username already exists")){
                    setErrors((prev)=>[...prev, "Bad Request, email or username already exists"])
                }
            }
        }
    }
  
   

  return (
    <div className="register">
        <div className="registerWrapper">
            <div className="registerLeft">
                <h3 className="registerLogo">SocialBook</h3>
                <span className="registerDesc">Connect whit friends and the world aroound you on SocialBook</span>
            </div>
           
            <div className="registerRight" >
                <form className="registerBox" onSubmit={handleClick} >
                    <input placeholder="Username" 
                           ref={username} required
                           className="registerInput" />

                    <input placeholder="Email" 
                           ref={email} required
                           type="Email" 
                           className="registerInput" />

                    <input placeholder="password" 
                           ref={password} required
                           type="Password" 
                           className="registerInput" />

                    <input placeholder="Repeat password" 
                           ref={passwordAgain} required
                           type="Password" 
                           className="registerInput" />

                  <div className="errorDiv">
                        <ul>
                            {errors.map((e)=>(
                            <li className="errorsList" key={e}>{e}</li>
                            ))}
                        </ul>
                 </div>

                    <button className="registerButton"  type="submit">Sign Up</button>
                    <Link to={"/login"}>
                    <button className="LoginRegisterButton">Log in into you account?</button>
                    </Link>
                </form>
                    
            </div>
        </div>
        </div>
  )
}
