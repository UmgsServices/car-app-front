import { useState } from "react"
import { Checkmark, Delete } from "../assets/icons/root";
import { axiosPrivate } from "../api/axios";


function Confirm() {
  const [visible, setVisible] = useState(false)
  
  const [item, setItem] = useState(null);
  const [role, setRole] = useState(item?.role|| null);
const roles=[
    1,2,3,5
]
  async function handleEdit() {
    if (item !== null) {
      setVisible(true);
      try {
        switch (role) {
          case 5:
            console.log(item.username)
            axiosPrivate.post('revoke',{accept:{username:item?.username
            }}).then( setVisible(false))
           
            break;
            case 1:
              console.log(item.username)
              axiosPrivate.post('accept',{accept:{username:item?.username
              }}).then( setVisible(false))
              break;
          default:
          axiosPrivate.post('role',{accept:{username:item?.username,
            role:role?role:item?.role
          }}).then(setVisible(false))
            break;
        }
        // const response= await axiosPrivate.get('/auth')
        // console.log(response.data)
       
      } catch (err) {
        console.error(err);

      } finally {
        setItem(null)
        setRole(null)
        ;
      }
    }
  }
const cancelAction=()=>{
  setItem(null)
        setRole(null)
        setVisible(false);
}
  const getRole=(role)=>{
    switch (role) {
       case 3:
          return ['Manager','bg-blue-200']
       case 2:
          return ['Admin','bg-green-200']
       case 1:
          return ['Edittor','bg-yellow-200'] 
        case 5:
            return ['Revok','bg-red-200'] 
    
       default:
       return ['New','bg-purple-200']
    }}
  function EditMessage() {
    return <>
      <div className={`popup fixed ${visible ? "" : 'hidden'}`}  >
        <div className=" w-[600px] h-fit flex flex-col scale-[.80] gap-10 items-center p-10 rounded-lg font-satoshi bg-white
">
         <div className="flex flex-col gap-4">
         
        {
         roles.map((items)=>
<div className="flex flex-row justify-center w-36 cursor-pointer" onClick={()=>setRole(items)}>
       <p className={`px-3 rounded-2xl w-fit ${getRole(items)[1]}`}>
         {getRole(items)[0]}
         </p>
       {role}
        {role!=null?
       ( role==items?<Checkmark/>:
        ''):(item?.role==items?<Checkmark/>:'')} 
    </div>
         ) 
        } 
         

         </div>
          <div className="flex flex-row gap-6 w-full">
            <button onClick={() => cancelAction()} className="flex flex-col text-sm justify-around bg-white  h-10 w-full rounded-lg text-black items-center border-black">Cancel</button>
            <button onClick={() => handleEdit()} className="flex flex-col text-sm justify-around bg-red-600 h-10 w-full rounded-lg border-red-300 text-white items-center">Edit</button>
          </div>
        </div>
      </div>
    </>
  }

  function Edit(item) {
    setItem(item);
    setVisible(true);
  }

  return { EditMessage,Edit,visible}
}

export { Confirm }
