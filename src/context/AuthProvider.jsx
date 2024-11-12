import { createContext,useState } from "react";
import axios from "../api/axios";
import { storageKeys } from "../utilities/keys";

const AuthContext=createContext({})

export const AuthProvider=({children})=>{
    const [auth,setAuth]=useState(localStorage.getItem(storageKeys.user)?localStorage.getItem(storageKeys.user):{})
    const [isAuthenticated,setIsAuthenticated]=useState(localStorage.getItem(storageKeys.user)?true:false)
    const logout= async ()=>{
      await  axios.get('http://localhost:5000/logout')
    }
    return (
        <AuthContext.Provider value={{auth,setAuth,isAuthenticated,setIsAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext;