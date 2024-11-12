import { useState } from "react"

const useForm=(data={})=>{
    const [payload,setPayload]=useState(data)

    function handleChange(e){
        const value=e.target.value||e.target.checked
        const id=e.target?.id
       
        payload[id]=value
        setPayload(payload)
      
        console.log(payload)
        console.log(e.target.checked)
    
          }
         
          return {payload,handleChange}
}
export default useForm