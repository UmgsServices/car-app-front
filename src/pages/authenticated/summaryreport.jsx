import { Navigate } from "react-router-dom";
import { File } from "../../assets/icons/root";
function Dashboard() {
 const  interviews=[
    {attribute:'Total',
      value:90,
    color:'bg-blue-300'},
    {attribute:'Aproved',
      value:25,
      color:'bg-green-300'},
      {attribute:'Pending',
      value:30,
        color:'bg-yellow-300'},
        {attribute:'Rejected',
        value:35,
          color:'bg-red-300'},

  ]
  return (
    <>
    <Navigate to={'/dashboard'}/>
      <div className="flex flex-col gap-8 p-6">
        <div className="flex flex-col gap-8">
          <div className="h-8 w-full flex flex-col justify-center rounded-xl bg-slate-100 px-2">
            <p className=" font-semibold ">Interview</p>
          </div>

          <div className="flex flex-row gap-6 overflow-scroll  w-full scrollbar ">
            {/* box */}
          {interviews.map((item,index)=>
          <div key={index} className={`flex flex-row   min-w-[235px] border p-4  h-[120px] rounded-3xl  ${item.color} shadow-white overflow-hidden`}>
          <div className="w-5/6  h-full flex flex-col justify-center ">
            <p className="mx-auto text-sm ">
              {item.attribute} Interviews</p>
            <p className="text-4xl font-bold mx-auto ">{item.value}</p>
          </div>

          <div className="flex flex-col justify-center h-full w-2/3   ">
          <div className="mx-auto">
          <File width={60}    />
            </div> 
          </div>
        </div>
          )}  
          </div>
        </div>
      </div>

      
    </>
  );
}
export default Dashboard;
