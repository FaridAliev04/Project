import React from 'react'
import { IoTrashOutline } from "react-icons/io5";
import { HiOutlineXMark } from "react-icons/hi2";

const Link = ({info,setInfo}) => {

    const deleteFunc=(id)=>{
        setInfo(info.filter((e,index)=>index!==id))
    }

  return (
    <div className='link-div'>
        {info?.map((e,index)=>{
                  return <div key={e.index} className="link-map-div">
                      <a target='_blank' className='link-map-value' href={e}>{e}</a>
                      <HiOutlineXMark onClick={()=>deleteFunc(index)}  className='trash-icons'/>
                      
                  </div>
                })}
    </div>
  )
}

export default Link