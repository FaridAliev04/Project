import React, { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { initialRows } from "../fakeData/initialRows";

const RowsEdit = ({
  rowsData,
  setRowsData,
  searchColumns,
  setSearchColumns,
  dataSort,
  setDataSort,
  searchQuery,
  setSearchQuery,
}) => {
  const [checkId, setCheckId] = useState([]);
  const [rowsDataPush,setRowsDataPush]=useState(initialRows)

  const data = rowsDataPush?.map((e) => {
    return e[searchColumns];
  });
  let columnsFilter = [...new Set(data)];

  const closeColumnsFunc = () => {
    setDataSort(null);
    setSearchColumns(null);
    setSearchQuery("");
  };

  const filteredResults = columnsFilter.filter((result) => {
    return result?.includes(searchQuery.toLowerCase());
  });

  const sortAscending = () => {
    const data = filteredResults.sort();
    setDataSort(data);
  };

  const sortZA = () => {
    const data = filteredResults.sort().reverse();
    setDataSort(data);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (dataSort !== null) {
      setDataSort(filteredResults);
    }
  }, [searchQuery]);

  const filterFunc = (e) => {
    setCheckId((name) =>[...name, e]);

  };

  const x = () => {

      let filteredData = rowsData;
      for (const key of checkId) {
      filteredData = filteredData.filter((row) => {
        return row[searchColumns] !== key;
      });
    }
    return filteredData;

    
  };

  useEffect(() => {
    const func = x();
    setRowsData(func);
  }, [checkId]);

  console.log(checkId);
  return (
    <div className={searchColumns ? "rowsEdit" : "rowsEdit-none"}>
      <div className="close-div">
        <button className="close-btn" onClick={() => closeColumnsFunc()}>
          <IoIosClose />
        </button>
      </div>

      <div className="rowsEdit-sort">
        <button onClick={sortAscending} className="sort-btn">
          ASC
        </button>
        <button onClick={sortZA} className="sort-btn">
          DESC
        </button>
      </div>
      <div className="rowsEdit-search-div">
        <div className="search-div">
          <input
            onChange={handleSearch}
            placeholder="Search"
            className="search-inp"
            type="text"
            name=""
            id=""
          />
          <CiSearch className="search-icons" />
        </div>
        <div className="rename-div">
          <input
            placeholder="Rename"
            className="search-inp"
            type="text"
            name=""
          />
        </div>
      </div>
      <div className="rowsData-search">
        {dataSort !== null
          ? dataSort?.map((e) => {
              return (
                <div className="dataSort">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="defaultUnchecked"
                    onClick={() => filterFunc(e)}
                  />
                  <span className="dataSort-text">{e}</span>
                </div>
              );
            })
          : filteredResults.map((e) => {
              return (
                <div className="dataSort">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="defaultUnchecked"
                    onClick={() => filterFunc(e)}
                  />
                  <span className="dataSort-text">{e}</span>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default RowsEdit;
