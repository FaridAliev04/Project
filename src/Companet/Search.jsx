import React, { useState } from 'react'
import { IoAddSharp } from "react-icons/io5";
import { data } from '../fakeData/linkData';
import uuid4 from 'uuid4';
import { IoTrashOutline } from "react-icons/io5";
import Link from './Link';


const Search = () => {
  const [inpValue,setInpValue]=useState("")
  const [info,setInfo]=useState(data)

  const infoAdd=()=>{
    setInfo([...info,{id:uuid4(),link:inpValue}])
    setInpValue('')
  }


  console.log(info)
  return (
    <div className='search-div'>
            <div className='search'>
                <div className='search-inp-div'>
                    <input placeholder='Add Link' value={inpValue} onChange={(e)=>setInpValue(e.target.value)} type="text"  id="search-inp" />
                    {/* <div className="add-icons-div"> */}
                      <IoAddSharp onClick={()=>infoAdd()} className='add-icons'/>
                    {/* </div> */}
                   
                </div>
            </div>

            <Link info={info} setInfo={setInfo}/>
    </div>
  )
}

export default Search