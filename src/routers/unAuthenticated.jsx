import Login from "../pages/unAuthenticated/login";
import Roots from "../pages/unAuthenticated/root";
import Signup from "../pages/unAuthenticated/signup"
import { createBrowserRouter ,RouterProvider} from "react-router-dom";


const router =createBrowserRouter([
    {
        path:'/',
        element:<Roots/>,
        errorElement:'',
        children:[
            {
                path:'/',
                element:<Login/>
        
            },
            {
                path:'/signup',
                element:<Signup/>
        
            }
        ]
    },
   
] 
)
const  UnAuthenticated=()=>{
    return  <><RouterProvider router={router}/></>


}
export default UnAuthenticated