import { Navigate } from "react-router-dom";
import useAuth from "./useAuth";

const UseRequest=()=>{
    const {auth}=useAuth()
    if(auth.username){
        <Navigate to={'/dashboard'}/>
    }
}