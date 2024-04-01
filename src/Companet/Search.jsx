import React, { useState } from 'react'
import { IoAddSharp } from "react-icons/io5";
import { data } from '../fakeData/linkData';
import Link from './Link';
import { FaDownload } from "react-icons/fa";
import { addLinks } from '../API/requestApi';


const Search = () => {
  const [inpValue,setInpValue]=useState("")
  const [info,setInfo]=useState(data)
  const [pushData,setPushData]=useState()

  const infoAdd=()=>{
    if(info){
      setInfo([...info,inpValue])
    setInpValue('')
    }
    
  }

  const downLoadFunc=()=>{
    if(info){
      addLinks([...info])
      setPushData([...info])
      setInfo([])
    }
  }
  
  console.log(pushData)
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