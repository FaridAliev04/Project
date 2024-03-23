import React,{useEffect, useState} from 'react'
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { initialRows } from '../fakeData/initialRows';
const Date = () => {
    const [selectedDate, setSelectedDate] = useState(""); 
    const [rowsData,setRowsData]=useState(initialRows)


    // const handleDateFunc = () => {
    //   setRowsData(rowsData.filter((event)=>event.createDate===dayjs(selectedDate.toString())))
    //   console.log(rowsData)
    // };
    const handleDateFunc = () => {
      const filteredData = rowsData.filter(event => dayjs(event.createDate).isSame(selectedDate, 'day'));
      setRowsData(filteredData);
      console.log(filteredData);
    };
    useEffect(()=>{
    console.log(dayjs(selectedDate)?.format("YYYY-MM-DD"))

      handleDateFunc()
 
    
    },[selectedDate])

 
  return (
    <div className='date'>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
        <DatePicker />
        <DatePicker
          value={selectedDate}
          format='YYYY-MM-DD'
         onChange={(event)=>{
          setSelectedDate(event)
          
         }}
        />
      </DemoContainer>
    </LocalizationProvider>
  </div>
  )
}

export default Date