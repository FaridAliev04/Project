// import React, { useEffect, useState } from "react";
// import { IoIosClose } from "react-icons/io";
// import { CiSearch } from "react-icons/ci";
// import { initialRows } from "../fakeData/initialRows";
// import { MdOutlineDone } from "react-icons/md";

// const RowsEdit = ({
//   rowsData,
//   setRowsData,
//   searchColumns,
//   setSearchColumns,
//   dataSort,
//   setDataSort,
//   searchQuery,
//   setSearchQuery,
//   rowsDataPush,
//   setRowsDataPush
// }) => {
//   const [checkId, setCheckId] = useState([]);
//   const [rename, setRename] = useState("");
//   const [isChecked, setIsChecked] = useState(false);

//   const data = rowsDataPush?.map((e) => {
//     return e[searchColumns];
//   });
//   let columnsFilter = [...new Set(data)];

//   const closeColumnsFunc = () => {
//     setDataSort(null);
//     setSearchColumns(null);
//     setSearchQuery("");
//   };

//   const filteredResults = columnsFilter.filter((result) => {
//     return result?.includes(searchQuery.toLowerCase());
//   });

//   const sortAscending = () => {
//     const data = filteredResults.sort();
//     setDataSort(data);
//   };

//   const sortZA = () => {
//     const data = filteredResults.sort().reverse();
//     setDataSort(data);
//   };

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   useEffect(() => {
//     if (dataSort !== null) {
//       setDataSort(filteredResults);
//     }
//   }, [searchQuery]);

//   const filterFunc = (e) => {
//     if(checkId){
//       setCheckId((prevCheckId) => {
//       if (prevCheckId.includes(e)) {
//         return prevCheckId.filter((id) => id !== e);
//       } else {
//         return [...prevCheckId, e];
//       }
//     });
//     }

//   };

//   const x = () => {
//     let filteredData = rowsData;
//     for (const key of checkId) {
//       filteredData = filteredData.filter((row) => {
//         return row[searchColumns] !== key;
//       });
//     }
//     return filteredData;
//   };

//   useEffect(() => {
//     const func = x();
//     setRowsData(func);
//   }, [checkId]);

//   const renameFunc = () => {
//     if (checkId.length > 0 && rename) {
//       const pushData = rowsDataPush.map((row) => {
//         let newRow = { ...row };
//         for (const key of checkId) {
//           if (row[searchColumns] === key) {
//             newRow = { ...newRow, [searchColumns]: rename };
//           }
//         }
//         return newRow;
//       });
//       setCheckId([]);
//       setRowsData(pushData);
//       setRowsDataPush(pushData);
//       // setIsChecked(false); // Reset the isChecked state to false
//     }
//   };
//   console.log(checkId);

//   return (
//     <div className={searchColumns ? "rowsEdit" : "rowsEdit-none"}>

//         <div className="close-div">
//       <div className="rowsEdit-sort">
//         <button onClick={sortAscending} className="sort-btn">
//           ASC
//         </button>
//         <button onClick={sortZA} className="sort-btn">
//           DESC
//         </button>
//       </div>
//         <button className="close-btn" onClick={() => closeColumnsFunc()}>
//           <IoIosClose />
//         </button>
//       </div>
//       <div className="rowsEdit-search-div">
//         <div className="search-div">
//           <input
//             onChange={handleSearch}
//             placeholder="Search"
//             className="search-inp"
//             type="text"
//             name=""
//             id=""
//           />
//           <CiSearch className="search-icons" />
//         </div>
//         <div className="rename-div">
//           <input
//             placeholder="Rename"
//             className="search-inp"
//             type="text"
//             name=""
//             onChange={(e) => setRename(e.target.value)}
//           />
//           <MdOutlineDone onClick={renameFunc} className="rowsEdit-icons" />
//         </div>
//       </div>
//       <div className="rowsData-search">
//         {dataSort !== null ? (
//           dataSort?.map((e) => {
//             return (
//               <div className="dataSort">
//                 <input
//                   type="checkbox"
//                   className="custom-control-input"
//                   id={e}
//                   onClick={() => filterFunc(e)}
//                   checked={checkId.includes(e)}
//                 />
//                 <span className="dataSort-text">{e}</span>
//               </div>
//             );
//           })
//         ) : (
//           filteredResults.map((e) => {
//             return (
//               <div className="dataSort">
//                 <input
//                   type="checkbox"
//                   className="custom-control-input"
//                   onClick={() => filterFunc(e)}
//                   value={e}
//                   checked={checkId.includes(e)}
//                 />
//                 <span className="dataSort-text">{e}</span>
//               </div>
//             );
//           })
//         )}

//       </div>

//     </div>
//   );
// };

// export default RowsEdit;

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
  checkId
}) => {
  const [rename, setRename] = useState("");
  const [isChecked, setIsChecked] = useState(false);

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
      // If the key is not in checkId, find the corresponding item from rowsDataPush and add it back
      if (!checkId.includes(key)) {
        const findObj = rowsDataPush.find((row) => row[searchColumns] === key);
        if (findObj) {
          filteredData.push(findObj);
        }
      } else {
        // If the key is in checkId, filter out the corresponding item
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

  return (
    <div className={searchColumns ? "rowsEdit" : "rowsEdit-none"}>
      <div className="close-div">
        <div className="rowsEdit-sort">
          <button onClick={sortAscending} className="sort-btn">
            ASC
          </button>
          <button onClick={sortZA} className="sort-btn">
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
                  <span className="dataSort-text">{e}</span>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default RowsEdit;
