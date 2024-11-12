import { useState,useEffect } from "react";
import { Close } from "../../assets/icons/root";
import useForm from "../../hook/useForm";
import { axiosPrivate } from "../../api/axios";
import { storageKeys } from "../../utilities/keys";

function acceptInterviw(id) {
  const [visible, setVisible] = useState(false)
  const [data,setData]=useState([])
const {payload,handleChange}=useForm()
 const [contract,setContract]=useState('')

  const cancelAction=()=>{
    // setItem(null)
    //       setRole(null)
          setVisible(false);
  }
  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;
    const getData = async () => {
      if (isMounted) {
        const response = await axiosPrivate.get("/car/list", {
          signal: controller.signal,
        });
        localStorage.setItem(storageKeys.carList, response.data);
        setData(response.data);
        console.log(response);
      }
    };
    getData();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  async function handleSubmit(){
console.log(id)
    await axiosPrivate.post('/driver/adddriver',{...payload,interviewid:id})
  }
  async function handleEdit() {
    if (true) {
      setVisible(true);
      await handleSubmit()
      try {
      
        setVisible(false)
      } catch (err) {
        console.error(err);

      }
    }
  }
  function ShowAcceptFoam(){
    return <div className={`popup fixed ${visible ? "" : 'hidden'}`}  >
    <div className="bg-white  p-4 h-fit flex flex-col gap-10 scrollbarc overflow-y-auto ">
     
    <form action="" className="flex bg-white  flex-col gap-3 ">
    <div className="flex flex-col">
     <div className="flex justify-end cursor-pointer" onClick={()=>cancelAction()}>
        <Close/>
      </div>
      <p className="text-3xl font-semibold">Accept driver </p>
     </div>
     
      <div className="flex flex-row gap-10  ">
        <div className="w-full">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          className="input-field "
          placeholder="Ashiru Garba"
            value={payload['name']}
 onChange={(e)=>handleChange(e)}/>
        </div>

        <div className="w-full">
        <label htmlFor="make">Attach car</label>
            <select className="input-field " required id="car" name="car" 
          onChange={(e)=>handleChange(e)}

          value={payload['car']} >
            <option value={null}>Select car</option>
            {
              data.map((item,index)=><>
              {
                 item?.driver==null?<option key={index}>{item.carcode}</option>:''
              }
            
              </>)
            }
          </select>
        </div>
      </div>
      <div className="flex flex-row gap-10  ">
      <div className="w-full">
        <label htmlFor="make">Contract type</label>
            <select className="input-field " id="contract" name="contract" 
          onChange={(e)=>{handleChange(e);setContract(e.target.value)}}

          value={payload['contract']} >
            <option >Purchase</option>
            <option >Daily balance</option>
          </select>
        </div>
      </div>
      <div className={`flex flex-row gap-10  ${contract=='Purchase'?'':'hidden'}`}>
        <div className="w-full">
        <label htmlFor="purchseamount">Purchase price </label>
        <input
          type="text"
          name="purchseamount"
          id="purchseamount"
          className="input-field "
          placeholder="10000"
            value={payload['purchseamount']}
 onChange={(e)=>handleChange(e)}/>
        </div>

        <div className="w-full">
        <label htmlFor="initialdeposite">Initial deposite</label>
        <input
          type="text"
          name="initialdeposite"
          id="initialdeposite"
          className="input-field "
          placeholder="10000"
            value={payload['initialdeposite']}
 onChange={(e)=>handleChange(e)}/>
        </div>
        
      </div>
      <div className={`w-2/5 ${contract?'':'hidden'}`}>
        <label htmlFor="dailybalance">Daily balance</label>
        <input
          type="text"
          name="dailybalance"
          id="dailybalance"
          className="input-field "
          placeholder="08037498749"
            value={payload['dailybalance']}
 onChange={(e)=>handleChange(e)}/>
      </div>
    </form>
    <div className="flex flex-row gap-6 w-full">
    <button onClick={() => cancelAction()} className="flex flex-col text-sm justify-around bg-white  h-10 w-full rounded-lg text-black items-center border-black">Cancel</button>
    <button onClick={() => handleEdit()} className="flex flex-col text-sm justify-around bg-blue-600 h-10 w-full rounded-lg border-red-300 text-white items-center">Add</button>
  </div>
    </div>
  
  </div>
  }
  function approveDriver() {
    setVisible(true);
  }
    return {ShowAcceptFoam,approveDriver}
  }
  export default acceptInterviw;
  