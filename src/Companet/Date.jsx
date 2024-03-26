import React, { useEffect, useState } from "react";
import { DateRangePicker, Stack } from "rsuite";
import "rsuite/DateRangePicker/styles/index.css";
import { set } from "rsuite/esm/utils/dateUtils";
import { initialRows } from "../fakeData/initialRows";

const Dates = ({ rowsData, setRowsData,rowsDataPush,
  setRowsDataPush,updata }) => {
  const [dateData, setDateData] = useState([]);
  // const [oldData] = useState(initialRows)

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
    else{
      setRowsData(updata);
    }
  };
  // console.log(oldData);

  return (
    <div className="date-main">
      <DateRangePicker onChange={handleDateChange} />
    </div>
  );
};

export default Dates;
