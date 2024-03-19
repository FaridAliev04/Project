import React, { useState } from 'react'
import { tableData } from '../fakeData/tableData'
import { HiMiniXMark } from "react-icons/hi2";
import { MdEdit } from "react-icons/md";
import Edit from './Edit';



const Table = () => {
    const [infoTable,setInfoTable]=useState(tableData)
    const [tableTest,setTableTest]=useState()

    const deleteFunc=({id})=>{
        setInfoTable(infoTable.filter((e)=>e.id!==id))
    }

    const editFunc=(e)=>{
        setTableTest(e.id)
    }
  return (
    <div className='table'> 
<section className="intro">
  <div className="bg-image h-100" style={{ backgroundColor: "#f5f7fa" }}>
    <div className="mask d-flex align-items-center h-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="card">
              <div className="card-body p-0">
                <div
                  className="table-responsive table-scroll"
                  data-mdb-perfect-scrollbar="true"
                  style={{ position: "relative", height: 700 }}
                >
                  <table className="table table-striped mb-0">
                    
                    <thead style={{ backgroundColor: "#002d72" }}>
                      <tr>
                        <th scope="col">N</th>
                        <th scope="col">Class name</th>
                        <th scope="col">Type</th>
                        <th scope="col">Hours</th>
                        <th scope="col">Edit</th>
                      </tr>
                    </thead>
                    { 
                        infoTable.map((e)=>{
                        return <tbody >
                     {e.id===tableTest?<Edit tableTest={tableTest} setTableTest={setTableTest} infoTable={infoTable} setInfoTable={setInfoTable} e={e}/>:<tr className="infoTable-tr">
                        <td className={e.id%2?'tbody-td':"tbody-td-bg"}>{e.id}</td>
                        <td className={e.id%2?'tbody-td':"tbody-td-bg"}>{e.className}</td>
                        <td className={e.id%2?'tbody-td':"tbody-td-bg"}>{e.type}</td>
                        <td className={e.id%2?'tbody-td':"tbody-td-bg"}>{e.hours}</td>
                        <td className={e.id%2?'edit-td':"tbody-td-bg"}>
                          <HiMiniXMark  onClick={()=>deleteFunc(e)} className='tbody-trash-icons'/>
                        <MdEdit onClick={()=>editFunc(e)} className='tbody-edit-icons' />

                        </td>

                      </tr>}

                    </tbody> 
                        })
                    }
                    
    
                   
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

    </div>
  )
}

export default Table