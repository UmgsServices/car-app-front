import { Drivers, File } from "../../assets/icons/root";

const DriverDetails = ({ data }) => {
 
  
  const details = [
    {
      title: "Drivercode",
      content: "drivercode",
    },
    {
      title: "Name",
      content: "name",
    },
    {
      title: "Car",
      content: "car",
    },
    {
        title: "Contract type",
        content: "contract",
      },
    {
      title: "Daily Balance",
      content: "dailybalance",
    },
  ];
  const view = () => {
    if (data) {
      return (
        <>
          <div className="flex flex-col w-full gap-3">
            <div className="flex flex-1 flex-col">
            <p className="text-3xl font-medium mx-auto">Car details</p>
            {details.map((item, index) => (
             item? <div key={index} className={`flex flex-row  gap-2 `}>
                <p className="text-xl font-bold">{item.title} :</p>
                <p className="text-xl font-medium ">
                  {`${data[`${item.content}`]} ` || "null"}
                </p>
              </div>:null
            ))}
            </div>
            <div className="flex flex-row gap-6 w-full justify-center">
                <button className="flex flex-col text-sm justify-around bg-red-600 h-10 w-96 rounded-lg border-red-300 text-white items-center">
                  Revoke car
                </button>
              </div>
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
              Select Car to view and manage
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
export default DriverDetails;
