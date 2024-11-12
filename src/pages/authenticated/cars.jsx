import { useState, useEffect } from "react";
import {
  Add,
  ArrowDownFill,
  ArrowRightFill,
  Checkmark,
  LoopRight,
} from "../../assets/icons/root";
import addCar from "../../components/car/addCar";
import axios from "axios";
import useForm from "../../hook/useForm";
import useAxiosPrivate from "../../hook/useAxiosPrivate";
import confirmExit from "../../components/car/confirmexit";
import { storageKeys } from "../../utilities/keys";
import CarDetails from "../../components/interview.jsx/carDetails";
function Cars() {
  const { ShowAddCar, newCar } = addCar();
  //const {payload,handleChange}=useForm()
  const [update,setUpdate]=useState(true)
  const [carList, setCarList] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const [input, setInput] = useState("");
  const [selectedCar,setSelectedCar]=useState('')
  const [carOptions,setCarOptions]=useState({})
  const [edit, setEdit] = useState({
    //focus:'',
    box: "",
    index: "",
  });
  const clearOptions = () => {
    
    setEdit({});
    setInput("");
  };
  const { ShowConfirmation, confirm } = confirmExit(clearOptions);
  const [active, setActive] = useState(1); //i dont know why but when i change property of an object it will not reflect until set the state of another const
  const [headers, setHeaders] = useState([
    {
      attribute: "Active",
      drop: false,
    },
    {
      attribute: "Non active",
      drop: false,
    },
  ]);
  const [tab, setTab] = useState("Details");
  const tabs = [
    {
      tab: "Details",
      id: 1,
    },
    {
      tab: "Dailly income",
      id: 2,
    },
    {
      tab: "Repairs",
      id: 3,
    },
  ];
  const dailly = [
    {
      id: 1,
      date: "05/07/2024",
      comment: "bad",
      amount: "3000",
      daystatus: "",
    },
    {
      id: 2,
      date: "06/07/2024",
      comment: "good",
      amount: "4000",
      daystatus: "",
    },
    {
      id: 3,
      date: "07/07/2024",
      comment: "toh",
      amount: "5000",
      daystatus: "",
    },
  ];


  const handleSubmit = async (carid,id) => {
    const payload = {
      carid:carid,
      fieldid: id,
      editfield: edit.box,
      editdata: input,
    };
    if (tab=='Dailly income'){
      const res = await axiosPrivate.post("/car/dailyinput/update", payload);
      if(res){
        setCarOptions({
          ...carOptions,daily:res.data
        })
        setEdit({});
        setInput("");
      }
    }else{
      const res = await axiosPrivate.post("/car/repairs/update", payload);
      if(res){
        setCarOptions({
          ...carOptions,repairs:res.data
        })
        setEdit({});
        setInput("");
      }
    } 
    console.log('sent',payload)
  };
  const handleInput = (e, index, item) => {
    setEdit({
      focus: e.target.id,
      box: e.target.id,
      index: index,
    });
    // console.log(e)
    setInput(item[e.target.id]);
  };
  const handleUpdate = async () => {
    const res = await axiosPrivate("/car/repairs/update", payload);
  };
const updateForm =async ()=>{
  const res = await axiosPrivate.get(`/car/update/${selectedCar}`);
  setUpdate(!update)
}
  const handleOnBlur = (e) => {
    confirm(e);
  };
  const handleDrop = (index) => {
    const item = headers[index];
    const state = headers;
    state[index] = { ...item, drop: !item.drop };
    console.log(headers);
    //console.log(active)
    setActive((prev) => {
      return prev + 1;
    });
    setHeaders((prev) => {
      return state;
    });
  };
  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;
    const getData = async () => {
      if (isMounted) {
        const response = await axiosPrivate.get("/car/list", {
          signal: controller.signal,
        });
        localStorage.setItem(storageKeys.carList, response.data);
        setCarList(response.data);
        console.log(response);
      }
    };
    getData();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;
    const getData = async () => {
      if (isMounted) {
        const daily= await axiosPrivate.get(`/car/daily/${selectedCar}`, {
          signal: controller.signal,
        });
        const repairs = await axiosPrivate.get(`/car/repairs/${selectedCar}`, {
          signal: controller.signal,
        });
        const info = await axiosPrivate.get(`/car/info/${selectedCar}`, {
          signal: controller.signal,
        });
        //localStorage.setItem(storageKeys.carList, response.data);
        setCarOptions({daily:daily?.data,
          repairs:repairs?.data,
          info:info?.data
        });
        console.log(carOptions);
      }
    };
    getData();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [selectedCar,update]);
  const nigerianCurrency=new Intl.NumberFormat('en-NG',{
    currency:'NGN',
    style:'currency'
  })
  return (
    <>
    <ShowAddCar />
      <ShowConfirmation />
      
      <div className="flex flex-col gap-6 p-6 h-screen scrollbar overflow-scroll bg-slate-50">
        <div className="flex flex-row justify-between border shadow-sm p-4 bg-white">
          <div className="flex flex-col gap-1 ">
            <p className="font-bold text-3xl ">Car overview</p>
            <p className=" font-light text-sm">
              Here you can manage and add new cars
            </p>
          </div>
        </div>
        <div className=" flex flex-row gap-6">
          <div className="flex flex-col gap-4 bg-white border shadow-sm w-56 min-h-72 p-4">
            <button
              className="button bg-black text-white w-full flex flex-row gap-1"
              onClick={() => newCar()}
            >
              {" "}
              <Add />
              <p>Add Car</p>
            </button>

            <form>
              <div className="w-full">
                <input
                  type="Search"
                  name="name"
                  id="name"
                  className="input-field "
                  placeholder="Search"
                  // value={payload['name']}
                  //onChange={(e)=>handleChange(e)}
                />
              </div>
            </form>

            <div className="flex flex-col gap-6">
              {headers.map((header, index) => (
                <div key={index}>
                  <div
                    className={` flex flex-row hover:text-blue-700 cursor-pointer font-semibold ${
                      header.drop ? "text-blue-500" : ""
                    } `}
                    onClick={() => handleDrop(index)}
                  >
                    {headers[index].drop ? (
                      <ArrowDownFill />
                    ) : (
                      <ArrowRightFill />
                    )}
                    <p className={`text-lg `}>{header.attribute}</p>
                  </div>

                  {headers[index].drop ? (
                    <div className=" flex flex-col">
                      {carList.map((item, index) =>
                        header.attribute == "Active" && item.driver ? (
                          <li onClick={()=>{
                            setSelectedCar(item._id)
                            console.log(selectedCar)
                          }}className="cursor-pointer" key={index}>{item.carcode}</li>
                        ) : header.attribute == "Non active" &&
                          item.driver == null ? (
                          <li onClick={()=>{setSelectedCar(item._id)
                            console.log(selectedCar)
                          }}className="cursor-pointer" key={index}>{item.carcode}</li>
                        ) :null
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ))}
              {/* {take} */}
            </div>
          </div>
          <div className=" flex flex-col ">
            <div className="flex flex-row ">
              {tabs.map((item, index) => (
                <div
                  key={index}
                  className={`flex flex-col justify-center p-4 cursor-pointer ${
                    tab === item.tab ? "bg-white border-x border-t" : "border-b"
                  }`}
                  onClick={() => setTab(item.tab)}
                >
                  <p>{item.tab}</p>
                </div>
              ))}
              <div className="flex-grow border-b"></div>
              <div className="flex flex-col w-[120px] justify-center  border-b">
                <button className="rounded-xl h-7 px-4 w-[100px] bg-black text-white  flex flex-row gap-1"onClick={()=>{updateForm()}} >
                  <div className="my-auto">
                    <LoopRight />
                  </div>

                  <p className="my-auto">Update</p>
                </button>
              </div>
            </div>
            <div className="flex flex-col bg-white border-b border-x p-4 pt-0 min-w-[700px] h-[500px] overflow-y-scroll scrolbar">
              {tab == "Dailly income" ? (
                <table className="w-full">
                  <tbody>
                  <tr className="bg-slate-100 font-bold h-9 sticky top-0 ">
                    <td className=" px-2 w-[60px]"></td>
                    <td className="w-[120px]">Date</td>
                    <td className=" w-[100px]">Daily</td>
                    <td className="w-[300px]">Comment</td>
                    <td className="w-[150px]">Amount</td>
                    <td className=" w-[150px]">Transaction type</td>
                    
                    <td className=" w-[150px]">Transaction hash</td>
                  </tr>

                  {carOptions?.daily?.dailyinput.map((item, index) => (
                    <tr className=" " key={index}
                    
                    >
                      <td className=" px-2 ">{index + 1}</td>
                      <td className="">{new Date(item.date).toLocaleDateString()}</td>
                      {/* <td className=" ">{item.daybalance}</td> */}
                      <td
                        id="daybalance"
                        className=""
                        onDoubleClick={(e) => {
                          handleInput(e, index, item);
                        }}
                      >
                        {edit.index == index && edit.box == "daybalance" ? (
                          <form
                            className={`flex flex-grow shadow-sm border-blue-400 border-2 gap-2`}
                           onSubmit={(e)=>{e.preventDefault()
                            handleSubmit(selectedCar,item._id)}
                           }
                          >
                            <input
                              className=" outline-none border-none focus:shadow-none nospin"
                              value={input}
                              onChange={(e) => setInput(e.target.value)}
                              onBlur={(e) => handleOnBlur(e)}
                              autoFocus

                              type="number"
                              inputMode="numeric"
                              pattern="[0-9]+"
                            />
                            <div className=" rounded-full border justify-center p-0.5 bg-blue-400 cursor-pointer text-3xl text-white">
                              <Checkmark />
                            </div>
                          </form>
                        ) : (
                          nigerianCurrency.format(item.daybalance)
                        )}{" "}
                      </td>
                      {/* comment */}
                      <td
                        id="comment"
                        className="flex flex-row"
                        onDoubleClick={(e) => {
                          handleInput(e, index, item);
                        }}
                      >
                        {edit.index == index && edit.box == "comment" ? (
                          <form
                            className={`flex flex-grow shadow-sm border-blue-400 border-2 gap-2`}
                           onSubmit={(e)=>{e.preventDefault()
                            handleSubmit(selectedCar,item._id)}
                           }
                          >
                            <input
                              className=" outline-none border-none focus:shadow-none"
                              value={input}
                              onChange={(e) => setInput(e.target.value)}
                              onBlur={(e) => handleOnBlur(e)}
                              autoFocus

                              type="text"
                            />
                            <div className=" rounded-full border justify-center p-0.5 bg-blue-400 cursor-pointer text-3xl text-white">
                              <Checkmark />
                            </div>
                          </form>
                        ) : (
                          item.comment
                        )}{" "}
                      </td>

                      {/* <td className="">{item.amount}</td> */}
                      <td
                        id="amount"
                        className=""
                        onDoubleClick={(e) => {
                          handleInput(e, index, item);
                        }}
                      >
                        {edit.index == index && edit.box == "amount" ? (
                          <form
                            className={`flex flex-grow shadow-sm border-blue-400 border-2 gap-2`}
                           onSubmit={(e)=>{e.preventDefault()
                            handleSubmit(selectedCar,item._id)}
                           }
                          >
                            <input
                              className=" outline-none border-none focus:shadow-none nospin "
                              value={input}
                              onChange={(e) => setInput(e.target.value)}
                              onBlur={(e) => handleOnBlur(e)}
                              autoFocus
                              type="number"
                              inputMode="numeric"
                              pattern="[0-9]+"
                            />
                            <div className=" rounded-full border justify-center p-0.5 bg-blue-400 cursor-pointer text-3xl text-white">
                              <Checkmark />
                            </div>
                          </form>
                        ) : (
                         nigerianCurrency.format(item.amount)
                        )}{" "}
                      </td>
                      {/* <td className=" ">cash</td> */}
                      <td
                        id="transactiontype"
                        className="flex flex-row"
                        onDoubleClick={(e) => {
                          handleInput(e, index, item);
                        }}
                      >
                        {edit.index == index && edit.box == "transactiontype" ? (
                          <form
                            className={`flex flex-grow shadow-sm border-blue-400 border-2 gap-2`}
                           onSubmit={(e)=>{e.preventDefault()
                            handleSubmit(selectedCar,item._id)}
                           }
                          >
                            <select
                            className=" outline-none border-none focus:shadow-none"
                            value={input}
                            onChange={(e) => {setInput(e.target.value)
                              handleSubmit(selectedCar,item._id)
                            }}
                            onBlur={(e) => handleOnBlur(e)}
                            autoFocus

                            >
                              <option value="Cash">Cash</option>
                              <option value="Transfer">Transfer</option>
                            </select>
                            <div className=" rounded-full border justify-center p-0.5 bg-blue-400 cursor-pointer text-3xl text-white">
                              <Checkmark />
                            </div>
                          </form>
                        ) : (
                          item.transactiontype
                        )}{" "}
                      </td>
                      <td className="">48u308093</td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              ) : tab == "Repairs" ? (
                <table className="w-full  ">
                  <tbody>
                  <tr className="bg-slate-100 font-bold sticky top-0 h-9">
                    <td className=" px-2 w-[60px]"></td>
                    <td className="w-[120px]">Date</td>
                    <td className="w-[350px]">Description</td>
                    <td className="w-[150px]">Amount</td>
                    <td className=" w-[150px]">Repair/Maintenance</td>
                    <td className=" w-[150px]">Transaction hash</td>
                  </tr>

                  {carOptions?.repairs?.repairs.map((item, index) => (
                    <tr className=" " key={index}
                    
                    >
                      <td className=" px-2 ">{index + 1}</td>
                      <td className="">{new Date(item.date).toLocaleDateString()}</td>
                      {/* <td className=" ">{item.daybalance}</td> */}
                     
                      {/* description */}
                      <td
                        id="description"
                        className="flex flex-row"
                        onDoubleClick={(e) => {
                          handleInput(e, index, item);
                        }}
                      >
                        {edit.index == index && edit.box == "description" ? (
                          <form
                            className={`flex flex-grow shadow-sm border-blue-400 border-2 gap-2`}
                           onSubmit={(e)=>{e.preventDefault()
                            handleSubmit(selectedCar,item._id)}
                           }
                          >
                            <input
                              className=" outline-none border-none focus:shadow-none"
                              value={input}
                              onChange={(e) => setInput(e.target.value)}
                              onBlur={(e) => handleOnBlur(e)}
                              autoFocus

                              type="text"
                            />
                            <div className=" rounded-full border justify-center p-0.5 bg-blue-400 cursor-pointer text-3xl text-white">
                              <Checkmark />
                            </div>
                          </form>
                        ) : (
                          item.description
                        )}{" "}
                      </td>

                      {/* <td className="">{item.amount}</td> */}
                      <td
                        id="amount"
                        className=""
                        onDoubleClick={(e) => {
                          handleInput(e, index, item);
                        }}
                      >
                        {edit.index == index && edit.box == "amount" ? (
                          <form
                            className={`flex flex-grow shadow-sm border-blue-400 border-2 gap-2`}
                           onSubmit={(e)=>{e.preventDefault()
                            handleSubmit(selectedCar,item._id)}
                           }
                          >
                            <input
                              className=" outline-none border-none focus:shadow-none nospin "
                              value={input}
                              onChange={(e) => setInput(e.target.value)}
                              onBlur={(e) => handleOnBlur(e)}
                              autoFocus
                              type="number"
                              inputMode="numeric"
                              pattern="[0-9]+"
                            />
                            <div className=" rounded-full border justify-center p-0.5 bg-blue-400 cursor-pointer text-3xl text-white">
                              <Checkmark />
                            </div>
                          </form>
                        ) : (
                         nigerianCurrency.format(item.amount)
                        )}{" "}
                      </td>
                      {/* <td className=" ">cash</td> */}
                      <td
                        id="ype"
                        className="flex flex-row"
                        onDoubleClick={(e) => {
                          handleInput(e, index, item);
                        }}
                      >
                        {edit.index == index && edit.box == "type" ? (
                          <form
                            className={`flex flex-grow shadow-sm border-blue-400 border-2 gap-2`}
                           onSubmit={(e)=>{e.preventDefault()
                            handleSubmit(selectedCar,item._id)}
                           }
                          >
                            <select
                            className=" outline-none border-none focus:shadow-none"
                            value={input}
                            onChange={(e) => {setInput(e.target.value)
                              handleSubmit(selectedCar,item._id)
                            }}
                            onBlur={(e) => handleOnBlur(e)}
                            autoFocus

                            >
                              <option value="Cash">Cash</option>
                              <option value="Transfer">Transfer</option>
                            </select>
                            <div className=" rounded-full border justify-center p-0.5 bg-blue-400 cursor-pointer text-3xl text-white">
                              <Checkmark />
                            </div>
                          </form>
                        ) : (
                          item.type
                        )}{" "}
                      </td>
                      <td className="">48u308093</td>
                    </tr>
                  ))}

                  </tbody>
                </table>
              ) : (
                <>
                
                <CarDetails 
                data={carOptions.info}/>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Cars;
