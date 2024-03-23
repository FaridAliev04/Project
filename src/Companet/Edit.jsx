import React, { useState } from 'react'
import { MdOutlineDone } from "react-icons/md";
import { HiMiniXMark } from "react-icons/hi2";
import uuid4 from 'uuid4';

const Edit = ({e,infoTable,setInfoTable,setTableTest,tableTest}) => {

    const [classNameValue,setClassNameValue]=useState("")
    const [typeValue,setTypeValue]=useState("")
    const [hoursValue,setHoursValue]=useState("")

    const deleteFunc=({id})=>{
        setInfoTable(infoTable.filter((e)=>e.id!==id))
    }
    console.log(infoTable)
    const editFunc=(e)=>{
        if(classNameValue==="",hoursValue==="",typeValue===""){
            setTableTest(uuid4())
        }else{
            setInfoTable(infoTable.map((event)=>{
            if(tableTest===event.id){
               return {...event,className:classNameValue,type:typeValue,hours:hoursValue} 
            }
            return event
        }))
       setTableTest(uuid4())
        }
        
    }

  return (
                      <tr>
                        <td className={e.id%2?'tbody-td':"tbody-td-bg"}>{e.id}</td>
                        <td className={e.id%2?'tbody-td':"tbody-td-bg"}><input onChange={(e)=>setClassNameValue(e.target.value)} placeholder={e.className} className='edit-inp' type="text" id="" /></td>
                        <td className={e.id%2?'tbody-td':"tbody-td-bg"}><input onChange={(e)=>setTypeValue(e.target.value)} placeholder={e.type}  className='edit-inp' type="text" id="" /></td>
                        <td className={e.id%2?'tbody-td':"tbody-td-bg"}><input onChange={(e)=>setHoursValue(e.target.value)} placeholder={e.hours}  className='edit-inp' type="text" id="" /></td>
                        <td className={e.id%2?'tbody-td':"tbody-td-bg"}>
                            <HiMiniXMark  onClick={()=>deleteFunc(e)} className='tbody-trash-icons'/>
                            <MdOutlineDone onClick={()=>editFunc(e)} className='edit-done-icons' />
                        </td>
                      </tr>

            
  )
}

export default Edit