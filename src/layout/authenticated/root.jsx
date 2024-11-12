import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import useAuth from "../../hook/useAuth";

function RootLayout(){
 const {auth}=useAuth() 
    return<>
    <div className="min-h-screen flex flex-row w-full">
        <aside className="w-[15%]">
        <Sidebar
        // selected={selected}
        // setSelected={setSelected}
        />
        </aside>
        <div>

        </div>
        <div className="flex flex-col w-[85%] ">
<header className=" sticky top-0 min-h-[70px] shadow-sm w-full border-b bg-white flex flex-row justify-between px-3">
<div className="my-auto flex flex-row gap-3">
   <div className="rounded-full bg-blue-500 flex flex-row justify-center h-12 w-12">
<p className="text-2xl font-bold my-auto text-white">BM</p>
   </div>
   <div className="my-auto">
<p>{`${auth.firstname} ${auth.lastname}`}</p>
</div>
</div>

</header>
<Outlet

/>
        </div>
      

    </div>
    
    </>

}
export default RootLayout