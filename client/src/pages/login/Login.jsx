import { useContext, useRef, useState } from "react";
import "./login.css"
import { AuthContext } from "../../context/AuthContext";
import { loginCall } from "../../apiCalls";
import CircularProgress from "@mui/material/CircularProgress"
import { Link } from "react-router-dom";

export default function Login() {

        const email = useRef();
        const password = useRef();
        const {user, isFetching, error, dispatch} = useContext(AuthContext)


    const handleClick = (e) =>{
       
            try {
                e.preventDefault();
                loginCall({email: email.current.value, password: password.current.value}, dispatch)
            } catch (error) {
                console.log(error)
            }
            
        
    }
   

  return (
    <div className="login">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">SocialBook</h3>
                <span className="loginDesc">Connect whit friends and the world aroound you on SocialBook</span>
            </div>
           
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleClick}>
                    <input  placeholder="Email" 
                            type="Email" required
                            className="loginInput" 
                            ref={email}/>

                    <input  placeholder="password" 
                            type="Password" required 
                            className="loginInput" 
                            minLength="6"
                            ref={password}/>

                    <button className="loginButton" type="submit" disabled={isFetching}>{isFetching ? <CircularProgress color="inherit" size="15px"/> : "Log In"}</button>
                    <span className="loginForgot">Forgot Password?</span>
                    <Link to={"/register"}>

                    <button className="loginRegisterButton" disabled={isFetching}>{isFetching ? <CircularProgress color="inherit" size="15px"/> : "Create a new account"}</button>
                    </Link>
                </form>
            </div>
        </div>
        </div>
  )
}
