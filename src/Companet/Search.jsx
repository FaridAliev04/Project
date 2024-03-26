import React, { useState } from 'react'
import { IoAddSharp } from "react-icons/io5";
import { data } from '../fakeData/linkData';
import uuid4 from 'uuid4';
import { IoTrashOutline } from "react-icons/io5";
import Link from './Link';
import { FaDownload } from "react-icons/fa";


const Search = () => {
  const [inpValue,setInpValue]=useState("")
  const [info,setInfo]=useState(data)
  const [pushData,setPushData]=useState()

  const infoAdd=()=>{
    setInfo([...info,{id:uuid4(),link:inpValue}])
    setInpValue('')
  }

  console.log(pushData)
  const downLoadFunc=()=>{
    if(info){
      setPushData(info)
      setInfo([])
    }
  }

  console.log(info)
  return (
    <div className='search-div'>
            <div className='search'>
                <div className='search-inp-div'>
                    <input placeholder='Add Link' value={inpValue} onChange={(e)=>setInpValue(e.target.value)} type="text"  id="search-inp" />
                      <IoAddSharp onClick={()=>infoAdd()} className='add-icons'/>                 
                </div>
                <div className='search-download-div'>
                   <FaDownload onClick={downLoadFunc} className='search-download-icons' />    
                </div>
            </div>

            <Link info={info} setInfo={setInfo}/>
    </div>
  )
}

export default Search