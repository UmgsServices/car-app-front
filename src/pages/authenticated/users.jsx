import { useEffect, useState } from "react"
import axios from "../../api/axios"
import useRefreshToken from "../../hook/useRefreshToken"
import useAxiosPrivate from "../../hook/useAxiosPrivate"
import { storageKeys } from "../../utilities/keys"
import { Confirm } from "../../shared/edit"

function Users(){
   const [selected,setSelected]=useState('all')
   const [active,setActive]=useState(1)//i dont know why but when i change property of an object it will not reflect until set the state of another const
   const [option,setOption]=useState(()=>{
      const data=JSON.parse(localStorage.getItem(storageKeys.usersData))
      if(data) {
         return {...data}
      }else return {}
   })
   const {EditMessage,Edit,visible}=Confirm()
    const axiosPrivate=useAxiosPrivate()
    const refresh=useRefreshToken()
    useEffect(()=>{
      const controller=new AbortController()
      
        let isMounted=true
        const getData=async ()=>{
            if(isMounted){
                const response= await axiosPrivate.get('/auth',{
                  signal:controller.signal
                })
                if(response.data){
                  localStorage.setItem(storageKeys.usersData,JSON.stringify(response.data))
                  setOption(response.data)
                   //setActive(prev=>{return prev+1})
                }
                //console.log(response.data)
                
            }
        }
        getData()
       
return ()=>{isMounted=false
   controller.abort()
}
    },[visible])
const getRole=(role)=>{
switch (role) {
   case 3:
      return ['Manager','bg-blue-200']
   case 2:
      return ['Admin','bg-green-200']
   case 1:
      return ['Edittor','bg-yellow-200'] 

   default:
   return ['New','bg-purple-200']
}
}
    const headers=[
       {
          attribute:'All',
          route:''
       },
       {
         attribute:'Manager',
         route:''
      },
       {
          attribute:'Admin',
          route:''
       },
       {
        attribute:'Edittor',
        route:''
     },
       {
          attribute:'Pending',
          route:''
       },
       
    ]
        return <>
        <EditMessage/>
        <div className="flex flex-col gap-10 p-6 bg-white scrollbar overflow-y-scroll max-h-screen">
          <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-1 ">
    <p className="font-bold text-3xl ">Manage users</p>
    <p className=" font-light text-sm">Here you can manage and accept users</p>
          </div>
          
          </div>
           <div className="flex flex-col gap-6  bg-white">
             <div className="flex flex-row bg-white ">
               {headers.map((header,index)=><div key={index} className={`flex flex-row gap-2 px-20 p-4 text-xl  hover:bg-blue-100 cursor-pointer ${selected==header.attribute.toLocaleLowerCase()?' border-b-2 border-blue-600 bg-blue-100':''} `}onClick={()=>setSelected(header.attribute.toLocaleLowerCase())}>
                   <p>{header.attribute}</p> 
                   
                   <p className="bg-blue-200 rounded-2xl text-center px-3 " >{option?.[header.attribute.toLocaleLowerCase()]?.length||'0' }</p>
                </div>)} 
             </div>
    <div className="flex flex-col gap-2  flex-grow ">
          {  option?.[selected.toLocaleLowerCase()]?.map( (item,index)=><div key={index} className="flex flex-row gap-20 overflow-visible">

             <div className="my-auto flex flex-row gap-4">
               <div className="flex flex-col justify-center bg-slate-50 w-8"><p className="text-center">{index+1}</p></div>
               <div className="flex flex-row gap-2">
       <div className="rounded-full bg-blue-500 flex flex-row justify-center h-12 w-12">
    <p className="text-2xl font-bold my-auto text-white">BM</p>
       </div>
       <div className="flex flex-col justify-between w-40">
    <p>{item.firstname} {item.lastname}</p>
    <p className="text-sm">{item.username}</p>
    </div>
    </div>
    </div>
    <div className="flex flex-col justify-center">
       <p className="text-sm">Signup date: 12/03/2022</p>
    </div>
    <div className="flex flex-col justify-center w-20">
       <p className={`px-3 rounded-2xl w-fit ${getRole(item.role)[1]}`}>{
         getRole(item.role)[0]
         }</p>
    </div>

    <div className="flex flex-col justify-center cursor-pointer" onClick={()=>Edit(item)}>
    <p className={`px-3 rounded-2xl bg-slate-200`}>
         Edit
       </p>
       


    </div>
             </div>)}
             
             </div>
           </div>
        </div> 
        </>
        
        }
        export default Users