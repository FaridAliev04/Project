import React, { useEffect, useState } from 'react'

const RowsEdit = ({rowsData,setRowsData,searchColumns,setSearchColumns}) => {

    const[dataSort,setDataSort]=useState(null)
    
    const data = rowsData.map((e)=>{
        return  e[searchColumns]
    })
     let columnsFilter=[...new Set(data)]

useEffect(()=>{
    if(dataSort!==null){
        const datas=columnsFilter
        setDataSort(datas)
    }
},[searchColumns])

const closeColumnsFunc=()=>{
    setDataSort(null)
    setSearchColumns(null)
    
}

const sortAscending = () => {
    const data= columnsFilter.sort();
    setDataSort(data)

   
  };

  // DESC sıralama işlevi
  const sortZA = () => {
    const data=  columnsFilter.sort().reverse();  
    setDataSort(data)

  };

  return (
    <div className='rowsEdit'>
        <button onClick={()=>closeColumnsFunc()}>X</button>
        <div className="rowsEdit-sort">
            <button  onClick={sortAscending} className='sort-btn'>ASC</button>
            <button onClick={sortZA} className='sort-btn'>DESC</button>
        </div>
        <div className="rowsEdit-search-div">
            <div className='search-div'>
                <input type="text" name="" />
            </div>
            <div className="rename-div">
                <input type="text" name="" />
            </div>
        </div>
        <div className="rowsData-search">
            {dataSort!==null?dataSort?.map((e)=>{
                return <h1>{e}</h1>
            }):columnsFilter.map((e)=>{
                return <h1>{e}</h1>
            })}
        </div>
    </div>
  )
}

export default RowsEdit



