import { Outlet } from "react-router-dom"
import { Navigate } from "react-router-dom"
const Roots=()=>{
    return <div className=" h-screen min-w-screen flex flex-row justify-center  overflow-hidden">
        <Outlet/> 
        </div>
}
export default Roots