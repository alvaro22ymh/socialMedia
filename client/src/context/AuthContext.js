import { createContext, useReducer, } from "react"
import AuthReducer from "./AuthReducer";


const INITIAL_STATE = {
    user: {"_id":"656f72c5306c4cdb72a12f06","username":"alvaro2020","email":"alvaro2020@gmail.com","password":"$2b$10$frh/hLmFvffygx3Gz0Zyq.eH9zLXAzOcU4a8VweNu.YrVMrI9mESy","profilePicture":"2.jpeg","coverPicture":"","followers":[],"followings":["656775c90a2caa53e3e3066e"],"isAdmin":false,"createdAt":"2023-12-05T18:58:13.454Z","updatedAt":"2023-12-13T17:56:15.156Z","__v":0},
    isFetching: false,
    error: false
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children}) =>{
    const [state, dispatch ] = useReducer(AuthReducer, INITIAL_STATE);

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch
            }}
        >
            {children}
        </AuthContext.Provider>
    )

}