import { useContext, useState } from "react"
import useAuth from "../../hook/useAuth"
import AuthContext from "../../context/AuthProvider"
import { Link, Navigate, json, useLocation, useNavigate } from "react-router-dom"
import axios from "../../api/axios"
import {message} from 'react-message-popup'
import { storageKeys } from "../../utilities/keys"
function Login(){
    const location=useLocation()
    const navigate=useNavigate()
    const [form,setForm]=useState('login')
    const [login,setLogin]=useState({
        username:'',
        password:''
    })
    const {auth,setAuth,setIsAuthenticated}=useAuth();
    const handdleLoginChange=(e)=>{
        console.log(e.target.id)
         switch(e.target.id){
            case 'username':setLogin({...login,username:e.target.value})
            break
            case 'password':setLogin({...login,password:e.target.value})
         }
    }

    const handleLogin= async ()=>{
      try{
        const response= await axios.post('/auth',login)
        const username= response.data.username
        const firstname= response.data.firstname
       const  lastname= response.data.lastname
     const    email= response.data.email
       const  accessToken =response.data.accessToken
      
      console.log(response.data)
      localStorage.setItem(storageKeys.user,JSON.stringify({firstname,lastname,username,email,accessToken}))
      message.success(response.data.message,3000)
      setAuth({firstname,lastname,username,email,accessToken})
      setIsAuthenticated(true)
      
      navigate('/')
     
     
      }catch(err){
        console.log(err.message)
    }
    }
 
   return <div className=" lg:h-4/5 lg:w-3/5 w-full h-full lg:bg-white shadow-sm shadow-blue-300 flex flex-row my-auto rounded-3xl justify-center ">
       
      
        <div className="h-full w-1/2 rounded-br-[70px] rounded-tr-[70px] bg-blue-500 text-white lg:flex flex-col justify-center gap-6 hidden">
        <div className="mx-auto ">
                <p className=" font-bold">Welcome to mugosa </p>
                <p>Please signup to continue</p>
            </div>
                  <div className="w-full flex flex-row justify-center">
                    <button className="button border-white border w-48 hover:bg-blue-400 " onClick={()=>{navigate('/signup')}} >Singup</button>
                </div>
        </div>
        <div className=" flex flex-col lg:w-1/2 gap-8 py-10 overflow-y-scroll scrollbar ">
            <div className="mx-auto flex flex-col gap-4 ">
      
                <p className=" font-extrabold text-5xl">Login</p>
                <div className="lg:hidden">
                <p className=" font-bold">Welcome to mugosa </p>
                <p>Please login to continue</p>
                </div>
            </div>

            <div className=" w-72 mx-auto scrollbar flex flex-col gap-8 ">
            <form onSubmit={(e)=>e.preventDefault()}className={` flex-col gap-6 p-2  flex`} >
                <div>
                    <label htmlFor="name">Username</label>
                    <input type="text" value={login.username} name="name" onChange={(e)=>handdleLoginChange(e)} id="username" className="input-field " placeholder="Umgs"/>
                </div>
                <div >
                    <label htmlFor="name">Password</label>
                    <input type="password" name="name"value={login.password} id="password" onChange={(e)=>handdleLoginChange(e)}className="input-field" placeholder="Password"/>
                </div>
                <div className="w-full flex flex-row justify-center gap-4 ">
                    <button type="submit" className="button bg-blue-500 w-4/5 " onClick={handleLogin}>continue</button>
         
                <button type='button'className="button bg-purple-500 w-4/5 lg:hidden "onClick={()=>{navigate('/signup')}}>Singup</button>
             
                </div>
            </form>

       
           
            </div>
        </div>
    </div>

}
export default Login