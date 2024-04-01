import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import uuid4 from 'uuid4';
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import HesabEdit from './HesabEdit';

const Hesab = ({setHesabDisplay,hesabDisplay,hesabDataPush,setHesabDataPush,setRowsDataPush,rowsDataPush}) => {
    const [hesab,setHesab]=useState()
    const [dustur,setDustur]=useState('')
    const [history,setHistory]=useState([ ])
    const [edit,setEdit]=useState()




    const handleData = () => {
      const updatedRowsData = rowsDataPush.map((e) => {
          for (const key in hesabDataPush) {
              if (hesabDataPush[key] === e.id) {
                  if (dustur === "Toplama") {
                    setHistory([...history,{id:uuid4(),hesab:hesab,dustur:dustur}])
                      return { ...e, sourcePrice: String(Number(e.sourcePrice) + Number(hesab)) };
                  }
              }
          }
          return e; 
      }); 
      setRowsDataPush(updatedRowsData); 
      console.log(history); 

  }

  const handleEditFunc=(e)=>{
    setEdit(e.id)
  }
  useEffect(()=>{

  },[rowsDataPush])
  return (
    <div className={hesabDisplay?'hesab':"hesab-none"}>
            <div className="hesab-inp">
                <input placeholder='Number' onChange={(e)=>setHesab(e.target.value)} className='hesab-comment' type="number" />
                <div className="hesablama">
                    <input onChange={(e)=>setDustur(e.target.value)} className='hesab-comment' type="text" />
                    <button className='hesab-add-btn' onClick={handleData}>Add</button>
                </div>
            </div>
            <div className="history">
                <span>History</span>
              {history?.map((e)=>{
                return edit===e.id?<HesabEdit setHistory={setHistory} history={history} setHesab={setHesab} hesab={hesab} dustur={dustur} edit={edit} setEdit={setEdit} setDustur={setDustur}/>: <div className={'history-div'}>
                    <p className='hesab-text'>{e.hesab}</p>
                    <p className='hesab-text'>{e.dustur}</p>
                    <div className="history-edit-div">
                    <CiEdit onClick={()=>handleEditFunc(e)} className="history-icons" />
                    <MdDeleteOutline
                      className="history-icons"/>
                    </div>
                </div>

              })}
            </div>
    </div>
  )
}

export default Hesab