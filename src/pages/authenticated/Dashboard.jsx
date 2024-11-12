import { NavLink, Navigate } from "react-router-dom";
import { File, Drivers, User,Cars,DashboardI } from "../../assets/icons/root";
function Dashboard() {
  
 const  interviews=[
    {attribute:'Dashboard',
      value:90,
      nav:'/',
      icon:<DashboardI width={130}/>,
    color:'bg-green-300'},
    {attribute:'Interview',
      value:25,
      nav:'interview',
      icon:<File width={130}/>,
      color:'bg-green-300'},
      {attribute:'Driver',
      value:30,
      nav:'driver',
      icon:<Drivers width={130}/>,
        color:'bg-yellow-300'},
        {attribute:'Car',
          value:30,
          nav:'car',
          icon:<Cars width={130}/>,
            color:'bg-yellow-300'},
        {attribute:'User',
        value:35,
        nav:'user',
        icon:<User width={130}/>,
          color:'bg-red-300'},
          {attribute:'Report',
            value:35,
            nav:'',
            icon:<File width={130}/>,
              color:'bg-red-300'}

  ]
  return (
    <>
       

      <div className="flex flex-col gap-8 md:p-10 p-6 overflow-y-scroll scrollbar">
        <div className="flex flex-col gap-8">
         

          <div className="flex flex-row gap-10 flex-wrap">
            {/* box */}
          {interviews.map((item,index)=>
          <NavLink to={`${item.nav}`}
          key={index}>
          <div  className={`flex flex-col-reverse w-[235px] border   h-[250px] rounded-3xl  ${item.color} shadow-white overflow-hidden`}>
          
          
          <div className="w-full bg-slate-100 h-full flex mx-auto flex-col justify-center ">
            <p className="mx-auto text-2xl font-bold ">
              {item.attribute}</p>
            
          </div>

          <div className="flex flex-col mx-auto justify-center h-full w-2/3   ">
          <div className="mx-auto">
         {item.icon}
            </div> 
          </div>
        </div>
        </NavLink>
          )}  
          </div>
        </div>
      </div>

      
    </>
  );
}
export default Dashboard;
