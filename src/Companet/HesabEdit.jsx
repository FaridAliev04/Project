import React from 'react'
import { MdOutlineDone } from "react-icons/md";
import { HiMiniXMark } from "react-icons/hi2";




const HesabEdit = ({dustur,setHistory,setDustur,hesab,history,edit,setEdit,setHesab}) => {
    
  const handleUpdateData=()=>{
      setHistory(history.map((e)=>{
        if(e.id===edit){
          return {...e,dustur:dustur,hesab:hesab}
        }
        return e
      }))
      setEdit("")
  }

  const handleNoneUpdateData=()=>{
    setEdit("")
  }

  return (
    <div className='hesab-edit-div'>
          <input onChange={(e)=>setHesab(e.target.value)} placeholder={"Number"} className='hesab-edit-inp' type="number" />
        <div className="hesab-edit-div-box">
          <input onChange={(e)=>setDustur(e.target.value)} placeholder={"Formula"} className='hesab-edit-inp' type="text"  />
        <MdOutlineDone onClick={()=>handleUpdateData()} className='hesab-edit-icons'/>
        <HiMiniXMark onClick={()=>handleNoneUpdateData()} className='hesab-edit-icons'/>
        </div> 
               
    </div>
  )
}

export default HesabEdit