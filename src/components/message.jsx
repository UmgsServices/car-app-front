import { useState } from "react";
import { Caution, Close } from "../../assets/icons/root";
import useForm from "../../hook/useForm";
import { axiosPrivate } from "../../api/axios";

function confirmExit(clear) {
  const [visible, setVisible] = useState(false)
  const [event,setEvent]=useState()
 
  const cancelAction=()=>{
    event.target.focus()
          setVisible(false);
  }
 
function handleConfirm() {
    clear()
    
    setVisible(false)
  }
  function ShowConfirmation(){
    return <div className={`popup z-10 fixed ${visible ? "" : 'hidden'}`}  >
    <div className="bg-white  p-4 h-fit flex flex-col rounded-lg gap-3 scrollbarc overflow-y-auto ">
    <div className="flex justify cursor-pointer" >
      <Caution width={30} 
      /><p className=" font-semibold text-xl">{'\u00A0'} Discard Changes</p>
      </div>
      <div>
        <p>Do you want to discard changes</p>
      </div>
  
    <div className="flex flex-row gap-6 w-full">
    <button onClick={() => cancelAction()} className="flex flex-col text-sm justify-around bg-white  h-8 w-full rounded-lg text-black items-center border-black">Cancel</button>
    <button onClick={() => handleConfirm()} className="flex flex-col text-sm justify-around bg-red-400 h-8 w-full rounded-lg border-red-300 text-white items-center">Ok</button>
  </div>
    </div>
  
  </div>
  }
  function confirm(e) {
    setVisible(true);
    setEvent(e)
  }
    return {ShowConfirmation,confirm}
  }
  export default confirmExit;
  