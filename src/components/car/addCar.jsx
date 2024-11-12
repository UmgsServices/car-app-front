import { useState } from "react";
import { Close } from "../../assets/icons/root";
import useForm from "../../hook/useForm";
import { axiosPrivate } from "../../api/axios";
import message from 'react-message-popup'
function addCar() {
  const [visible, setVisible] = useState(false)
const {payload,handleChange}=useForm()
const [make,setmake]=useState('')
  const cancelAction=()=>{
          setVisible(false);
  }
  async function handleSubmit(){
    try{
       const res= await axiosPrivate.post('/car/new',payload)
       console.log(res)
       message.success(res.data.message,2000)
       
    }catch(err){
console.log(err.response.data)
message.error(err.response.data.message,2000)
    }
   
  }
  async function handleEdit() {
    if (true) {
    
     
      try {
        await handleSubmit()
        setVisible(false)
        //setVisible(false)
      } catch (err) {
        console.error(err);

      }
    }
  }
  const carmakes=[
    { make: "Toyota", "model": ["Corolla", "Camry", "RAV4", "Highlander", "Tacoma", "Avalon", "Sienna", "Land Cruiser", "4Runner", "Prius"] },
    { make: "Honda", "model": ["Civic", "Accord", "CR-V", "HR-V", "Pilot", "Ridgeline", "Insight", "Odyssey", "Fit", "Civic Type R"] },
    { make: "Ford", "model": ["F-150", "Mustang", "Explorer", "Escape", "Fusion", "Bronco", "Edge", "Ranger", "Expedition", "Maverick"] },
    { make: "Chevrolet", "model": ["Silverado", "Malibu", "Equinox", "Cruze", "Traverse", "Tahoe", "Suburban", "Camaro", "Blazer", "Trailblazer"] },
    { make: "Nissan", "model": ["Altima", "Sentra", "Rogue", "Murano", "Pathfinder", "Frontier", "Titan", "370Z", "Juke", "Leaf"] },
    { make: "BMW", "model": ["3 Series", "X5", "Z4", "5 Series", "X3", "X1", "7 Series", "i3", "i4", "iX"] },
    { make: "Mercedes-Benz", "model": ["C-Class", "E-Class", "GLE", "GLC", "A-Class", "S-Class", "GLA", "CLS", "G-Class", "AMG GT"] },
    { make: "Volkswagen", "model": ["Golf", "Jetta", "Tiguan", "Passat", "Atlas", "Beetle", "Arteon", "ID.4", "ID.3", "Touareg"] },
    { make: "Hyundai", "model": ["Elantra", "Sonata", "Tucson", "Santa Fe", "Kona", "Palisade", "Ioniq", "Veloster", "Azera", "Genesis"] },
    { make: "Kia", "model": ["Forte", "Optima", "Sportage", "Sorento", "Telluride", "Seltos", "Rio", "Stinger", "Cadenza", "Soul"] },
    { make: "Subaru", "model": ["Outback", "Forester", "Crosstrek", "Impreza", "Legacy", "Ascent", "BRZ", "WRX", "SVX", "Baja"] },
    { make: "Mazda", "model": ["Mazda3", "CX-5", "Mazda6", "CX-30", "MX-5 Miata", "CX-50", "RX-8", "MPV", "Mazda2", "Mazda5"] },
    { make: "Audi", "model": ["A4", "Q5", "A6", "Q7", "A8", "Q3", "TT", "e-tron", "RS5", "S3"] },
    { make: "Lexus", "model": ["ES", "RX", "NX", "GX", "LS", "IS", "LC", "LX", "RC", "UX"] },
    { make: "Tesla", "model": ["Model S", "Model 3", "Model X", "Model Y", "Roadster", "Cybertruck", "Model X Plaid", "Model 3 Performance", "Model S Plaid", "Model Y Performance"] },
    { make: "Porsche", "model": ["911", "Cayenne", "Macan", "Panamera", "Taycan", "718 Cayman", "718 Boxster", "Panamera Sport Turismo", "Cayenne Coupe", "Taycan Cross Turismo"] },
    { make: "Jaguar", "model": ["F-PACE", "XE", "XF", "I-PACE", "F-TYPE", "E-PACE", "XJ", "F-PACE SVR", "XE SV Project 8", "I-PACE EV400"] },
    { make: "Land Rover", "model": ["Range Rover", "Discovery", "Defender", "Range Rover Sport", "Range Rover Velar", "Discovery Sport", "Defender 90", "Defender 110", "Freelander", "LR4"] },
    { make: "Chrysler", "model": ["300", "Pacifica", "Voyager", "Aspen", "Saratoga", "New Yorker", "Dodge Charger", "Dodge Challenger", "Dodge Durango", "Chrysler Imperial"] },
    { make: "Dodge", "model": ["Charger", "Challenger", "Durango", "Journey", "Ram 1500", "Dart", "Grand Caravan", "Neon", "Viper", "Stratus"] },
    { make: "Ram", "model": ["1500", "2500", "3500", "ProMaster City", "ProMaster", "Ram 4500", "Ram 5500", "Ram 2500 Power Wagon", "Ram Rebel", "Ram Tradesman"] },
    { make: "Buick", "model": ["Encore", "Enclave", "Envision", "LaCrosse", "Regal", "Verano", "Rainier", "Terraza", "Park Avenue", "Buick Cascada"] },
    { make: "GMC", "model": ["Sierra", "Terrain", "Acadia", "Yukon", "Canyon", "Sierra HD", "GMC Savana", "GMC Envoy", "GMC Jimmy", "Sierra Denali"] },
    { make: "Mitsubishi", "model": ["Outlander", "Eclipse Cross", "RVR", "Mirage", "Galant", "Lancer", "Montero", "Pajero", "i-MiEV", "Outlander PHEV"] },
    { make: "Volvo", "model": ["S60", "XC60", "V60", "XC90", "S90", "V90", "C40 Recharge", "S40", "V50", "850"] },
    { make: "Fiat", "model": ["500", "Panda", "500X", "500L", "Ducato", "Freemont", "Punto", "Tipo", "Barchetta", "Stilo"] },
    { make: "Alfa Romeo", "model": ["Giulia", "Stelvio", "4C", "Giulietta", "Alfa Romeo 8C", "Alfa Romeo GTV", "Alfa Romeo Spider", "Alfa Romeo SZ", "Alfa Romeo Brera", "Alfa Romeo 33 Stradale"] },
    { make: "Mini", "model": ["Cooper", "Countryman", "Clubman", "Convertible", "Electric", "Paceman", "Mini Coupe", "Mini Roadster", "Mini John Cooper Works", "Mini Paceman"] },
    { "make": "Acura", "model": ["TLX", "RDX", "MDX", "ILX", "NSX", "ZDX", "RLX", "RSX", "Legend", "Integra"] },
    { "make": "Infiniti", "model": ["Q50", "QX60", "QX80", "Q60", "QX50", "Q70", "M37", "G37", "EX35", "JX35"] },
    { "make": "Lincoln", "model": ["Navigator", "Aviator", "Corsair", "MKZ", "Continental", "MKT", "MKX", "Zephyr", "Lincoln Town Car", "Lincoln Blackwood"] },
    { "make": "Genesis", "model": ["G70", "G80", "GV80", "G90", "G80 Electrified", "G70 Shooting Brake", "Genesis X", "G80 Sport", "GV70", "G70 N"] },
    { "make": "Smart", "model": ["Fortwo", "Forfour", "Smart EQ Fortwo", "Smart EQ Forfour"] },
    { "make": "Peugeot", "model": ["208", "308", "508", "3008", "5008", "Partner", "Rifter", "Expert", "Traveller", "e-208"] },
    { "make": "Tesla", "model": ["Roadster", "Cybertruck", "Model S Plaid", "Model 3 Performance", "Model Y Performance", "Model X Plaid"] },
    { "make": "Rivian", "model": ["R1T", "R1S"] },
    { "make": "Lucid", "model": ["Air"] },
    { "make": "Polestar", "model": ["1", "2"] }
]
  function ShowAddCar(){
    return <div className={`popup z-10 ${visible ? "" : 'hidden'}`}  >
    <div className="bg-white  p-4 h-fit flex flex-col gap-10 scrollbarc overflow-y-auto ">
     
    <form action="" className="flex bg-white  flex-col gap-3 ">
    <div className="flex flex-col">
     <div className="flex justify-end cursor-pointer" onClick={()=>cancelAction()}>
        <Close/>
      </div>
      <p className="text-3xl font-semibold">Add new car </p>
     </div>
      <div className="flex flex-row gap-10  ">
        <div className="w-full">
        <label htmlFor="make">Make</label>
            <select className="input-field " id="make" name="make" 
          onChange={(e)=>{handleChange(e) 
            
            setmake(carmakes.filter(item=>item.make==e.target.value))
            console.log(carmakes.filter(item=>item.make==e.target.value))}}

          value={payload['make']} >
            
            {make?'': <option value={null} className="text-slate-500">Select Car Make</option>}
            {
              carmakes.map((item,index)=><>
              <option key={index}>{item.make}</option>
              </>
              )
             
              
            }
           
          
          </select>
        </div>

        <div className="w-full">
        <label htmlFor="model">Model</label>
            <select className="input-field " id="model" name="model" 
          onChange={(e)=>handleChange(e)}

          value={payload['model']} >
        
        {
 make? make?.[0]?.model.map((model,index)=><>
  <option key={index}>{model}</option>
  </>): <option value={null} className="text-slate-500">Select Car Make</option>
  }


          </select>
        </div>
      </div>
      <div className="flex flex-row gap-10  ">
        <div className="w-full">
        <label htmlFor="phonenumber">Car color</label>
        <input
          type="text"
          name="color"
          id="color"
          className="input-field "
          placeholder="Red"
            value={payload['color']}
 onChange={(e)=>handleChange(e)}/>
        </div>

        <div className="w-full">
        <label htmlFor="chasisnumber">Chasis number</label>
        <input
          type="text"
          name="chasisnumber"
          id="chasisnumber"
          className="input-field "
          placeholder="08037498749"
            value={payload['chasisnumber']}
 onChange={(e)=>handleChange(e)}/>
        </div>
      </div>
      <div className="flex flex-row gap-10  ">
        <div className="w-full">
        <label htmlFor="purchaseprice">Purchase price </label>
        <input
          type="text"
          name="purchaseprice"
          id="purchaseprice"
          className="input-field "
          placeholder="08037498749"
            value={payload['purchaseprice']}
 onChange={(e)=>handleChange(e)}/>
        </div>

        <div className="w-full">
        <label htmlFor="purchasedate">Date of purchase</label>
        <input
          type="date"
          name="purchasedate"
          id="purchasedate"
          className="input-field "
          placeholder="08037498749"
            value={payload['purchasedate']}
 onChange={(e)=>handleChange(e)}/>
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
  function newCar() {
    setVisible(true);
  }
    return {ShowAddCar,newCar}
  }
  export default addCar;
  