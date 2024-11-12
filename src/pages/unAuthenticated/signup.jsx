import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "../../api/axios"
import {message} from 'react-message-popup'
const Signup=()=>{
const [messages,setMessage]=useState()
    const navigate=useNavigate()
    const [signup,setSignup]=useState({
        username:'',
        password:'',
        cpassword:'',
        firstname:'',
        lastname:'', 
        email:''
    })
   
    const handdleSignupChange=(e)=>{
        console.log(e.target.id)
         switch(e.target.id){
            case 'firstname':setSignup({...signup,firstname:e.target.value})
            break
            case 'lastname':setSignup({...signup,lastname:e.target.value})
            break
            case 'username':setSignup({...signup,username:e.target.value})
            break
            case 'email':setSignup({...signup,email:e.target.value})
            break
            case 'password':setSignup({...signup,password:e.target.value})
            break
            case 'cpassword':setSignup({...signup,cpassword:e.target.value})
            break
         }
    }
    
    const handleSignup=async ()=>{
        try{
          
         const data=  await axios.post('/register',signup)
         setMessage({messages:data.data.message,
            type:'info'
         })
         setSignup({})
         console.log(data)
        }catch(err){
console.log(err)
message.error(err.response.data.message,2000)

setMessage({message:err.response.data.message
    ,type:'error',
})
        }
        
        
    }
    
   return <div className=" lg:h-4/5 lg:w-3/5 w-full h-full lg:bg-white shadow-sm shadow-blue-300 flex flex-row my-auto rounded-3xl justify-center ">
       

        <div className="h-full w-1/2 rounded-br-[70px] rounded-tr-[70px] bg-blue-500 text-white lg:flex flex-col justify-center gap-6 hidden">
        <div className="mx-auto ">
                <p className=" font-bold">Welcome to mugosa</p>
                <p>Please signup to continue</p>
            </div>
                  <div className="w-full flex flex-row justify-center">
                    <button className="button border-white border w-48 hover:bg-blue-400 "onClick={()=>navigate('/')} >Login</button>
                </div>
        </div>
        <div className=" flex flex-col lg:w-1/2 gap-8 py-10 overflow-y-scroll scrollbar ">
            <div className="mx-auto flex flex-col gap-4 ">
      
                <p className=" font-extrabold text-5xl">Sing up</p>
                <div className="lg:hidden">
                <p className=" font-bold">Welcome to mugosa</p>
                <p>Please signup to continue</p>
                </div>
            </div>

            <div className=" w-72 mx-auto scrollbar flex flex-col gap-8 ">
            
        <form onSubmit={(e)=>{e.preventDefault()
            e.target.reset()}} className={`flex-col gap-6 p-2 flex `}>

           {messages?<div className={`${messages?.type=='error'?'bg-red-200':messages?.type=='info'?'bg-green-200':''} py-3 flex flex-col`}>
            <p className="mx-auto">
                {messages?.message}
                </p></div>:''}
                <div className="flex flex-row gap-6">
                    <div>
                    <label htmlFor="name">Firstname</label>
                    <input type="text" name="firstname" id="firstname"onChange={(e)=>handdleSignupChange(e)} value={signup.firstname}className="input-field " placeholder="Gonib "/>
                    </div>
                    
                    <div>
                    <label htmlFor="lastname">Lastname</label>
                    <input type="text" name="lastname" id="lastname"value={signup.lastname} onChange={(e)=>handdleSignupChange(e)} className="input-field" placeholder="Mohammed"/>
                    </div>
                </div>

                <div >
                    <label htmlFor="name">Email</label>
                    <input type="email" name="email" id="email" className="input-field" value={signup.email} onChange={(e)=>handdleSignupChange(e)} placeholder="babagonimgs@gmail.com"/>
                </div>
                <div >
                    <label htmlFor="name">Username</label>
                    <input type="text" name="username" id="username"value={signup.username} className="input-field" onChange={(e)=>handdleSignupChange(e)} placeholder="Umgs"/>
                </div>
                <div >
                    <label htmlFor="name">Password</label>
                    <input type="text" name="password" id="password"value={signup.password} className="input-field" onChange={(e)=>handdleSignupChange(e)} placeholder="hsdgf$5£jmtyd546"/>
                </div>
                <div >
                    <label htmlFor="name">Confirm password</label>
                    <input type="text" name="cpassword" id="cpassword"value={signup.cusername} className="input-field" onChange={(e)=>handdleSignupChange(e)} placeholder="hsdgf$5£jmtyd546"/>
                </div>
                <div className="w-full flex flex-row justify-center gap-4 ">
                    <button type="submit" className="button bg-blue-500 w-4/5 " onClick={handleSignup}>continue</button>
                    <button type='button'className="button bg-purple-500 w-4/5 lg:hidden "onClick={()=>navigate('/')} >Login</button>
                </div>
            </form>
           
            </div>
        </div>
    </div>


}
export default Signup