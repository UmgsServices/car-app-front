import {RouterProvider,createBrowserRouter} from "react-router-dom"
import RootLayout from "../layout/authenticated/root"
import Login from "../pages/unAuthenticated/login"
import Dashboard from '../pages/authenticated/Dashboard'
import Cars from "../pages/authenticated/cars"
import Interviews from '../pages/authenticated/interviews'
import Drivers from '../pages/authenticated/drivers'
import Users from '../pages/authenticated/users'
import { useEffect } from "react"
const router=createBrowserRouter([
    // location =useLocation()
// <Navigate to='/' state={{from: location}} replace/> #
//const from =location.state?.from?.pathname || '/'
    {
        path:'/',
        element:<RootLayout/>,
       errorElement:'go bCK',
        children:[

           
            {
                path:'/',
                element:<Dashboard/>,
               
            },
            {
                path:'/interview',
                element:<Interviews/>,
               
            },
            {
                path:'/car',
                element:<Cars/>,
               
            },
            {
                path:'/driver',
                element:<Drivers/>,
               
            },
            {
                path:'/user',
                element:<Users/>,
               
            }
        ]
    }
    
])
function Authenticated (){
    return <div className=" h-screen min-w-screen flex flex-row justify-center  overflow-hidden">
{/* <Login/> */}
<RouterProvider router={router}/>
    </div>

}
export default Authenticated

// useEffect(()=>{
//     let isMounted=true
//     const controller=new AbortController()

//     const getData=async ()=>{
//         try{
//             const response=await axios.get('/'{
//                 signal:controller.signal
//             });
//             console.log(response.data)
//             isMounted && setData(response.data)
//         }catch(err){
// console.error(err)
//         }
//     }
//     getData()

//     return ()=>{
//         isMounted=false;
//         controller.abort();
//     }
// },[])