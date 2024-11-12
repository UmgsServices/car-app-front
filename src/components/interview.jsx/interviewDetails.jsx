import { Drivers, File } from "../../assets/icons/root";
import acceptInterviw from "./acceptInterview";

const InterviewDetail = ({ data }) => {
  const {ShowAcceptFoam,approveDriver}=acceptInterviw(data._id)
  
  const details = [
    {
      title: "Name",
      content: "name",
    },
    {
      title: "Referrer name",
      content: "rname",
    },
    {
      title: "State",
      content: "state",
    },
    {
      title: "Local government",
      content: "localgovernment",
    },
    {
      title: "Residential address",
      content: "address",
    },
    {
      title: "Last job",
      content: "lastjob",
    },
    {
      title: "Reason for leaving",
      content: "reason",
    },
    {
      title: "Familier with abuja routes",
      content: "froute",
    },
    {
      title: "Experience in bolt",
      content: "bolt",
    },
    {
      title: "Experience in taxi",
      content: "taxi",
    },
    {
      title: "Driving expiry date",
      content: "edate",
    },
    {
      title: "Contract of intrest",
      content: "contract",
    },
  ];
  const view = () => {
    if (data) {
      return (
        <>
          <div className="flex flex-col w-full gap-3">
            <p className="text-3xl font-medium mx-auto">Interview details</p>
            <p>Interviewed on 12/10/2024</p>
            {details.map((item, index) => (
             item? <div key={index} className={`flex flex-row  gap-2 `}>
                <p className="text-xl font-bold">{item.title} :</p>
                <p className="text-xl font-medium ">
                  {`${data[`${item.content}`]} ` || "null"}
                </p>
              </div>:null
            ))}
            
            <div>
              <div className="flex flex-row gap-6 w-full">
                <button onClick={()=>approveDriver()} className="flex flex-col text-sm justify-around bg-blue-600  h-10 w-full rounded-lg text-black items-center border-black">
                  Approve
                </button>
                <button className="flex flex-col text-sm justify-around bg-red-600 h-10 w-full rounded-lg border-red-300 text-white items-center">
                  Reject
                </button>
              </div>
            </div>
            <ShowAcceptFoam />
          </div>
        </>
      );
    }
    return (
      <>
        <div className="flex flex-row justify-center min-w-[500px]  ">
          <div className="flex flex-col justify-center  min-h-full">
            <p className="text-slate-400 mx-auto">
              <File width={200} />
            </p>
            <p className="text-xl text-slate-400">
              Select an interview to view and manage
            </p>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <div className="shadow-sm flex border top-0 sticky min-h-[500px] h-fit min-w-[500px] p-4 bg-white">
        {view()}
      </div>
    </>
  );
};
export default InterviewDetail;
