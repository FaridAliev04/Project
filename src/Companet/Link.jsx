import React from 'react'
import { IoTrashOutline } from "react-icons/io5";
import { HiOutlineXMark } from "react-icons/hi2";

const Link = ({info,setInfo}) => {

    const deleteFunc=({id})=>{
        setInfo(info.filter((e)=>e.id!=id))
    }

  return (
    <div className='link-div'>
        {info?.map((e)=>{
                  return <div key={e.id} className="link-map-div">
                      <a target='_blank' className='link-map-value' href={e.link}>{e.link}</a>
                      <HiOutlineXMark onClick={()=>deleteFunc(e)}  className='trash-icons'/>
                      
                  </div>
                })}
    </div>
  )
}

export default Link