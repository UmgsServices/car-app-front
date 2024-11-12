import { useState } from "react";
import { Close } from "../../assets/icons/root";
import useForm from "../../hook/useForm";
import { axiosPrivate } from "../../api/axios";
import message from 'react-message-popup'
function addInterviw({submit=()=>{}}) {
  const [visible, setVisible] = useState(false)
const {payload,handleChange}=useForm({})
 
  const cancelAction=()=>{
    // setItem(null)
    //       setRole(null)
          setVisible(false);
  }
  async function handleSubmit(){
    console.log(payload)
    try{
      const res =await axiosPrivate.post('/interview/new',payload)
      message.success(res.data.message,2000)
    } catch(err){
message.error(err.response.data.message,2000)
    }
    
  }
  async function handleEdit() {
    if (true) {
      
      await handleSubmit()
      try {
      
        setVisible(false)
      } catch (err) {
        console.error(err);

      }
    }
  }
  function ShowAddInterview(){
    return <div className={`popup fixed ${visible ? "" : 'hidden'}`}  >
    <div className="bg-white  p-4 h-screen flex flex-col gap-10 scrollbarc overflow-y-auto ">
     
    <form action="" className="flex bg-white  flex-col gap-3 ">
    <div className="flex flex-col">
     <div className="flex justify-end cursor-pointer" onClick={()=>cancelAction()}>
        <Close/>
      </div>
      <p className="text-3xl font-semibold">New interview form </p>
     </div>
      <div className="flex flex-row gap-10  ">
        <div className="w-full">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
           
            value={payload['name']}
            className="input-field "
            placeholder="Type fullname"
            onChange={(e)=>handleChange(e)}
          />
        </div>

        <div className="w-full">
          <label htmlFor="rname">Referer</label>
          <input
            type="text"
            name="rname"
            id="rname"
            className="input-field "
            placeholder="Type fullname"
               
            value={payload['rname']}
            onChange={(e)=>handleChange(e)}
          />
        </div>
      </div>
      <div className="w-2/5">
        <label htmlFor="phonenumber">Phone number</label>
        <input
          type="text"
          name="phonenumber"
          id="phonenumber"
          className="input-field "
          placeholder="08037498749"
            value={payload['phonenumber']}
 onChange={(e)=>handleChange(e)}/>
      </div>
      <div className="flex flex-row gap-10  ">
        <div className="w-full">
          <label htmlFor="state">Home state</label>
            <select className="input-field " id="state" name="state" 
          onChange={(e)=>handleChange(e)}

          value={payload['state']} >
            <option>Abuja</option>
            <option>Abuja</option>
          </select>
        </div>

        <div className="w-full">
          <label htmlFor="localgovernment">Local government</label>
          <input
            type="text"
            name="localgovernment"
            id="localgovernment"
            className="input-field "
            placeholder="Type fullname"
      
            value={payload['localgovernment']}
            onChange={(e)=>handleChange(e)}
          />
        </div>
      </div>
      <div className="">
        <label htmlFor="address">Residential address</label>
        <input
          type="text"
          name="address"
          id="address"
          className="input-field "
          placeholder="Full address"
            value={payload['address']}
onChange={(e)=>handleChange(e)}
/>
      </div>
      <div className="w-2/5">
        <label htmlFor="lastjob">Last job</label>
        <input
          type="text"
          name="lastjob"
          id="lastjob"
          className="input-field "
          placeholder="last job"
    
            value={payload['lastjob']}
    onChange={(e)=>handleChange(e)}/>
      </div>
      <div className="w-2/5">
        <label htmlFor="reason">Reason for leaving </label>
        <textarea
          type="text"
          name="reason"
          id="reason"
          className="input-field "
          placeholder="reason fo leaving last job"
    
            value={payload['reason']}
    onChange={(e)=>handleChange(e)}/>
      </div>
      <div className="flex flex-row gap-10  ">
        <div className="w-full flex flex-col">
          <label htmlFor="froute">Familier with abuja route</label>
          <input
            type="checkbox"
            name="Froute"
            id="Froute"
            className="input-field "
            placeholder="Type fullname"
            value={payload['froute']}
            onChange={(e)=>handleChange(e)}
            
          />
        </div>

        <div className="w-full flex flex-col">
        <label htmlFor="bolt">Experinced in bolt driving</label>
          <input
            type="checkbox"
            name="bolt"
            id="bolt"
            className=""
            placeholder="Type fullname"
      
            value={payload['bolt']}
            onChange={(e)=>handleChange(e)}
          />
        </div>
        <div className="w-full flex flex-col">
        <label htmlFor="taxi">Experianced in taxi driving</label>
          <input
            type="checkbox"
            name="taxi"
            id="taxi"
            className=""
  
            value={payload['taxi']}
            onChange={(e)=>handleChange(e)}
          />
        </div>
      </div>

      <div className="flex flex-row gap-10  ">
        <div className="w-full flex flex-col">
          <label htmlFor="licence">Driving licence</label>
          <input
            type="checkbox"
            name="licence"
            id="licence"
            className="input-field "
            placeholder="Type fullname"
      
            value={payload['licence']}
            onChange={(e)=>handleChange(e)}
          />
        </div>

        <div className="w-full flex flex-col">
        <label htmlFor="edate">Expiry date</label>
          <input
            type="date"
            name="edate"
            id="edate"
            className="input-field"
            placeholder="Type fullname"
      
            value={payload['edate']}
            onChange={(e)=>handleChange(e)}
          />
        </div>
        
      </div>
<div><p>Type of contract in intrest</p></div>
      <div className="flex flex-row gap-10  ">
        <div className="w-full flex flex-col">
          <label htmlFor="contract">Bolt</label>
          <input
            type="radio"
            name="contract"
            id="contract"
            value={'bolt'}
            className="input-field "
            placeholder="Type fullname"
      
            
            onChange={(e)=>handleChange(e)}
          />
        </div>

        <div className="w-full flex flex-col">
        <label htmlFor="contract">Taxi</label>
          <input
            type="radio"
            name="contract"
            id="contract"
            value={'taxi'}
            className=""
            placeholder="Type fullname"
      
           
            onChange={(e)=>handleChange(e)}
          />
        </div>
        <div className="w-full flex flex-col">
        <label htmlFor="contract">Personal</label>
          <input
            type="radio"
            name="contract"
            id="contract"
            value={'personal'}
            className=""
            placeholder="Type fullname"
      
            
            onChange={(e)=>handleChange(e)}
          />
        </div>
      </div> 
      
    </form>
    <div className="flex flex-row gap-6 w-full">
    <button onClick={() => cancelAction()} className="flex flex-col text-sm justify-around bg-white  h-10 w-full rounded-lg text-black items-center border-black">Cancel</button>
    <button onClick={() => handleEdit()} className="flex flex-col text-sm justify-around bg-blue-600 h-10 w-full rounded-lg border-red-300 text-white items-center">Add</button>
  </div>
    </div>
  
  </div>
  }
  function newInterview() {
    setVisible(true);
  }
    return {ShowAddInterview,newInterview}
  }
  export default addInterviw;
  