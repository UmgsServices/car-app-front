import { SVGProps } from "react";
interface props{
    Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
    message1:string
    message2:string
    func:any
}
function EmptyState({
    Icon,
    message1,
    message2,
    func
}:props){





return <div className="flex flex-col gap-6 items-center h-[394px] w-[343px] mx-auto my-auto">
                <div className="w-[250px] h-[250px]">
                  {<Icon/>}
                </div>
                <div className="flex flex-col justify-between  gap-2 text-center w-[343px] ">
                <p className="font-satoshi text-xl font-medium text-black ">{message1} </p>
                <p className=" font-normal text-base">{message2} </p>
              </div>
              <button onClick={()=>func()} className="flex flex-col justify-around bg-[#1A1A1A] h-10 w-[300px] rounded-lg text-white items-center"><p className="my-auto">Add new</p></button>
          </div>
}
export default EmptyState