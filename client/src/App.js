import { useContext } from "react";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login"
import Profile from "./pages/profile/Profile"
import Register from "./pages/register/Register"
import Messenger from "./pages/messenger/Messenger.jsx"

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

function App() {

  const {user} = useContext(AuthContext);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element= {user? <Home/> : <Navigate to="/register"/>}/>
    
        <Route path="/login" element= {user? <Navigate to="/"/> : <Login/>}/>
   
        <Route path="/register"  element= {user? <Navigate to="/"/> : <Register/>}/>

        <Route path="/messenger"  element= {!user? <Navigate to="/register"/> : <Messenger/>}/>
      
        <Route path="/profile/:username"  element= {!user? <Navigate to="/"/> : <Profile/>}/>
   
      </Routes>
    </BrowserRouter>
  )
}

export default App;
