import { useContext, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { Drivers, Cars ,File, DashboardI,User} from "../../assets/icons/root"
import { storageKeys } from "../../utilities/keys"
import useAuth from "../../hook/useAuth"
import axios from "../../api/axios"
function Sidebar(){
    const {setIsAuthenticated,setAuth}=useAuth()
    const navigate=useNavigate()
 
    const menuList=[
        {
            item:'Dashboard',
            route:'/',
            icon:<DashboardI/>,
            id:1,

        }, 
        {
            item:'Interviews',
            route:'interview',
            icon:<File/>,
            id:1,

        }, {
            item:'Cars',
            route:'car',
            icon:<Cars/>,
            id:1,

        }, {
            item:'Drivers',
            route:'driver',
            icon:<Drivers/>,
            id:1,

        },
        {
            item:'Users',
            route:'user',
            icon:<User/>,
            id:1,

        }
    ]
    const logout=async()=>{
     
        try{
            await  axios.get('/logout')
          }catch(err){
            console.log(err)
          }finally{
            setAuth({})
            setIsAuthenticated(false)
                localStorage.clear()
                console.log('logout')
                navigate('/')
          }
    }
    return<>
<div className="flex flex-col  border-r h-full  bg-white">
<div className="mx-auto h-16 flex flex-col justify-center "><p className="text-blue-500 font-bold text-3xl">Mugosa</p></div>
<div className="flex flex-col justify-between h-full pb-8">
<div className=" px-4  flex flex-col gap-1   ">
{
    menuList.map((item,index)=>(
        <NavLink key={index} 
        to={`${item.route}`}
        className={
        ({isActive})=>{return (isActive?'bg-blue-100 text-blue-700':'')+(
            ` rounded-md`
        ) }
    }
        >
            <div className="h-12  mx-auto w-36 hover:text-blue-700 font-medium cursor-pointer flex flex-row  gap-2">
            <div className="my-auto">
            {item.icon}
                </div>
            <p className="flex flex-row my-auto text-center ">
               {item.item}
            </p>
            </div>
            
        </NavLink>
    ))

   
}
</div>
<div className=" px-4  flex flex-col gap-1   ">
    
        <div className={ `bg-blue-100 text-blue-700 rounded-md`} onClick={logout}>
            <div className="h-12  mx-auto w-36 hover:text-blue-700 font-medium cursor-pointer flex flex-row  gap-2">
            <div className="my-auto">
          
                </div>
            <p className="flex flex-row my-auto text-center ">
              logout
            </p>
            </div>
            
        </div>
</div>
</div>

</div>
    </>
}
export default Sidebar