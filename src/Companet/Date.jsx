import React, { useEffect, useState } from "react";
import { DateRangePicker, Stack } from "rsuite";
import "rsuite/DateRangePicker/styles/index.css";

const Dates = ({
  rowsData,
  setRowsData,
  rowsDataPush,
  checkId,
  setRowsDataPush,
  rowsDateDataPush,
}) => {
  const [dateData, setDateData] = useState([]);
  const [oldData] = useState(rowsData);

  const formattedDate = (date) => {
    setDateData((x) => [
      ...x,
      `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(date.getDate()).padStart(2, "0")}`,
    ]);
  };

  const handleDateChange = (value) => {
    if (value) {
      const filteredRows = rowsData.filter((item) => {
        const createDate = new Date(item.createDate);
        return createDate >= value[0] && createDate <= value[1];
      });
      setRowsData(filteredRows);
      setDateData(value.map(formattedDate));
    } 
    else if(checkId.length > 0){
      setRowsData(rowsData)
      console.log("1")
    }
    else if(checkId.length === 0){
      setRowsData([...rowsDataPush])
      console.log("2")

    }
  };
  console.log(checkId, "checkId");

  console.log(checkId.length, "idddddd");
  console.log(rowsData, "dadaad");

  return (
    <div className="date-main">
      <DateRangePicker onChange={handleDateChange} />
    </div>
  );
};

export default Dates;
