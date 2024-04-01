import React, { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { initialRows } from "../fakeData/initialRows";
import { MdOutlineDone } from "react-icons/md";

const RowsEdit = ({
  rowsData,
  setRowsData,
  searchColumns,
  setSearchColumns,
  dataSort,
  setDataSort,
  searchQuery,
  setSearchQuery,
  rowsDataPush,
  setRowsDataPush,
  setCheckId,
  checkId,
  sortStyle,
  setSortStyle
}) => {
  const [rename, setRename] = useState("");

  console.log(rowsDataPush);
  const data = rowsDataPush?.map((e) => {
    return e[searchColumns];
  });
  let columnsFilter = [...new Set(data)];

  const closeColumnsFunc = () => {
    setDataSort(null);
    setSearchColumns(null);
    setSearchQuery("");
    setSortStyle("")
    setRename("")
  };

  const filteredResults = columnsFilter.filter((result) => {
    return result?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const sortAscending = () => {
    const data = filteredResults.sort();
    setDataSort(data);
    setSortStyle("ASC")
  };

  const sortZA = () => {
    const data = filteredResults.sort().reverse();
    setDataSort(data);
    setSortStyle("DESC")
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
    if (checkId) {
      setCheckId((prevCheckId) => {
        if (prevCheckId.includes(e)) {
          return prevCheckId.filter((id) => id !== e);
        } else {
          return [...prevCheckId, e];
        }
      });
    }
  };


  const x = () => {
    let filteredData = [...rowsDataPush];
  
    for (const key of checkId) {
      if (!checkId.includes(key)) {
        const findObj = rowsDataPush.find((row) => row[searchColumns] === key);
        if (findObj) {
          filteredData.push(findObj);
        }
      } else {
        filteredData = filteredData.filter((row) => row[searchColumns] !== key);
      }
    }
  
    return filteredData;
  };
  
  console.log(checkId);

  useEffect(() => {
    const func = x();

    setRowsData(func);
  }, [checkId, rowsDataPush]);

  const renameFunc = () => {
    if (checkId.length > 0 && rename) {
      const pushData = rowsDataPush.map((row) => {
        let newRow = { ...row };
        for (const key of checkId) {
          if (row[searchColumns] === key) {
            newRow = { ...newRow, [searchColumns]: rename };
          }
        }
        return newRow;
      });
      setCheckId([]);
      setRowsData(pushData);
      setRowsDataPush(pushData);
    }
  };


  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  return (
    <div className="center-rowsEdit">
<div className={searchColumns ? "rowsEdit" : "rowsEdit-none"}>
      <div className="close-div">
        <div className="rowsEdit-sort">
          <button onClick={sortAscending} className={sortStyle==="ASC"?"sort-btn-style":"sort-btn"}>
            ASC 
          </button>
          <button onClick={sortZA} className={sortStyle==="DESC"?"sort-btn-style":"sort-btn"}>
            DESC
          </button>
        </div>
        <button className="close-btn" onClick={() => closeColumnsFunc()}>
          <IoIosClose />
        </button>
      </div>
      <div className="rowsEdit-search-div">
        <div className="search-div">
          <input
            onChange={handleSearch}
            placeholder="Search"
            className="search-inp"
            type="text"
            // name=""
            // id=""
          />
          <CiSearch className="search-icons" />
        </div>
        <div className="rename-div">
          <input
            placeholder="Rename"
            className="search-inp"
            type="text"
            name=""
            onChange={(e) => setRename(e.target.value)}
          />
          <MdOutlineDone onClick={renameFunc} className="rowsEdit-icons" />
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
                    id={e}
                    onClick={() => filterFunc(e)}
                    checked={checkId.includes(e)}
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
                    onClick={() => filterFunc(e)}
                    value={e}
                    checked={checkId.includes(e)}
                  />
                  {/* <span className="dataSort-text">{formatDate(e)}</span> */}
                  <span className="dataSort-text">{e}</span>
                </div>
              );
            })}
      </div>
    </div>
    </div>
    
  );
};

export default RowsEdit;
