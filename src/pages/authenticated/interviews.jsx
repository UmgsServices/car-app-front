import { useEffect, useState } from "react";
import addInterviw from "../../components/interview.jsx/addInterview";

import { storageKeys } from "../../utilities/keys";
import useAxiosPrivate from "../../hook/useAxiosPrivate";
import InterviewDetail from "../../components/interview.jsx/interviewDetails";

function Interviews() {
  const axiosPrivate = useAxiosPrivate();
  async function handleSubmit(){
    await axiosPrivate.post('/interview/new',payload)
  }
  const { ShowAddInterview, newInterview,visible } = addInterviw(handleSubmit);
  const [selected, setSelected] = useState("all");
  const [view, setView] = useState("");
  const [option, setOption] = useState(() => {
    const data = JSON.parse(localStorage.getItem(storageKeys.interviewData));
    if (data) {
      return { ...data };
    } else return {};
  });
  const getStatus = (role) => {
    switch (role) {
      case "Aproved":
        return "bg-green-200";
      case "Rejected":
        return "bg-red-200";
      case "Pending":
        return "bg-yellow-200";
      default:
        return "bg-yellow-200";
    }
  };
  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;
    const getData = async () => {
      if (isMounted) {
        const response = await axiosPrivate.get("/interview/data", {
          signal: controller.signal,
        });
        if(response.data){
          localStorage.setItem(storageKeys.interviewData, JSON.stringify(response.data));
          setOption(response.data);
        }
        
        console.log(response.data);
      }
    };
    getData();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [visible]);
  const headers = [
    {
      attribute: "All",
      route: "",
    },
    {
      attribute: "Aproved",
      route: "",
    },
    {
      attribute: "Pending",
      route: "",
    },
    {
      attribute: "Rejected",
      route: "",
    },
  ];
  return (
    <>
      
      <div className="flex flex-col gap-6 p-6 h-screen w-full scrollbar overflow-scroll bg-slate-50">
        <div className="flex flex-row justify-between border shadow-sm p-4 bg-white">
          <div className="flex flex-col gap-1 ">
            <p className="font-bold text-3xl ">Interview report</p>
            <p className=" font-light text-sm">
              Here you can manage and add new intreviews
            </p>
          </div>
          <div className="my-auto">
            <button
              className="button bg-black text-white"
              onClick={() => newInterview()}
            >
              {" "}
              New interview
            </button>
          </div>
        </div>
        <div className="flex flex-row gap-6  ">
          <div className="flex flex-col gap-6 border p-4 bg-white">
            <div className="flex flex-row  border">
              {headers.map((header, index) => (
                <div
                  key={index}
                  className={`flex flex-row gap-2 px-9 p-4 text-xl  hover:bg-blue-100 cursor-pointer ${
                    selected == header.attribute.toLocaleLowerCase()
                      ? " border-b-2 border-blue-600 bg-blue-100"
                      : ""
                  } `}
                  onClick={() =>
                    setSelected(header.attribute.toLocaleLowerCase())
                  }
                >
                  <p>{header.attribute}</p>

                  <p className="bg-blue-200 rounded-2xl text-center px-3 ">
                    {option?.[header.attribute.toLocaleLowerCase()]?.length ||
                      "0"}
                  </p>
                </div>
              ))}
            </div>
            {option?.[selected.toLocaleLowerCase()]?.map((item, index) => (
              <div
                key={index}
                onClick={() => setView(item)}
                className="flex flex-row gap-20 overflow-visible cursor-pointer hover:bg-slate-100"
              >
                <div className="my-auto flex flex-row gap-4">
                  <div className="flex flex-col justify-center bg-slate-50 w-8">
                    <p className="text-center">{index + 1}</p>
                  </div>
                  <div className="flex flex-row gap-2">
                    <div className="rounded-full bg-blue-500 flex flex-row justify-center h-12 w-12">
                      <p className="text-2xl font-bold my-auto text-white">
                        BM
                      </p>
                    </div>
                    <div className="flex flex-col justify-between w-40">
                      <p>{item.name}</p>
                      <p className="text-sm">reffered by {item.rname}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-sm">Signup date: 12/03/2022</p>
                </div>
                <div className="flex flex-col justify-center w-20">
                  <p
                    className={`px-3 rounded-2xl w-fit ${getStatus(
                      item.status
                    )}`}
                  >
                    {item?.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <InterviewDetail data={view} />
        </div>
        <ShowAddInterview />
      </div>
    </>
  );
}
export default Interviews;
