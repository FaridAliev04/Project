import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBInput,
  MDBBtn,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdbreact";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { initialRows } from "../fakeData/initialRows";
import RowsEdit from "./RowsEdit";
import { MdDone } from "react-icons/md";
import Calendar from "./Date";
import { Stack } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Hesab from "./Hesab";
import { MdDownload } from "react-icons/md";
import { getAllLists } from "../API/requestApi";


const Table = (props) => {
  const [rowsData, setRowsData] = useState([]);
  const [checkBoxId, setCheckBoxId] = useState([]);
  const [checkId, setCheckId] = useState([]);
  const [editData, setEditData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedValues, setEditedValues] = useState({});
  const [searchColumns, setSearchColumns] = useState(null);
  const [dataSort, setDataSort] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hesabDataPush,setHesabDataPush]=useState([])
  const itemsPerPage = 4;
  const [hesabDisplay,setHesabDisplay]=useState(false)
  const [rowsDataPush, setRowsDataPush] = useState([]);
  const [sortStyle,setSortStyle]=useState()

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = rowsData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(rowsData.length / itemsPerPage);

  useEffect(() => {
    getAllLists().then(res => {
      if(res.status !== 200){
        setRowsData(initialRows)
        setRowsDataPush(initialRows)
      }else{
        setRowsData(res)
        setRowsDataPush(res)
      }
    }).catch(err => {
      setRowsData(initialRows)
      setRowsDataPush(initialRows)
      console.log(err);
    })
  }, [])
 

  const handleDeleteChecked = () => {
    let filtered = rowsData;

    for (const key in checkBoxId) {
      if (checkBoxId[key] > 0) {
        filtered = filtered.filter((e) => e.id !== checkBoxId[key]);
      }
    }

    setRowsData(filtered);
  };

  const handleCheckBoxFunc = (row) => {
    const { id } = row;
    if (!checkBoxId.includes(id)) {
      setCheckBoxId([...checkBoxId, id]);
      setHesabDataPush([...hesabDataPush,row.id])
    } else {
      setCheckBoxId(checkBoxId.filter((checkboxId) => checkboxId !== id));
      setHesabDataPush(hesabDataPush.filter((e)=>e !== id))
    }
    console.log(hesabDataPush)
    };
  const handleEditFunc = () => {
    let selectedRows = [];

    for (const id of checkBoxId) {
      const find = rowsData.find((obj) => obj.id === id);
      if (find) {
        selectedRows.push(find);
      }
    }

    setEditData(selectedRows);
    setIsEditing(true);
  };

  const handleInputChange = (e, rowId, fieldName) => {
    const { value } = e.target;
    setEditedValues((prevState) => ({
      ...prevState,
      [rowId]: {
        ...prevState[rowId],
        [fieldName]: value,
      },
    }));
  };

  const handleEditDataFunc = () => {
    const updatedRowsData = rowsData.map((row) => {
      if (checkBoxId.includes(row.id)) {
        return {
          ...row,
          createDate: editedValues[row.id]?.createDate || row.createDate,
          articleId: editedValues[row.id]?.articleId || row.articleId,
          productMergeId: editedValues[row.id]?.productMergeId || row.productMergeId,
          brandName: editedValues[row.id]?.brandName || row.brandName,
          productTitle: editedValues[row.id]?.productTitle || row.productTitle,
          sourcePrice: editedValues[row.id]?.sourcePrice || row.sourcePrice,
          finalPrice: editedValues[row.id]?.finalPrice || row.finalPrice,
          color: editedValues[row.id]?.color || row.color,
          description: editedValues[row.id]?.description || row.description,
          beforeDiscountPrice: editedValues[row.id]?.beforeDiscountPrice || row.beforeDiscountPrice,
          productSize	: editedValues[row.id]?.productSize	 || row.productSize	,
          mainPhotoLink: editedValues[row.id]?.mainPhotoLink || row.mainPhotoLink,         
          additionalPhotoLinks: editedValues[row.id]?.additionalPhotoLinks || row.additionalPhotoLinks,
          colorFromList: editedValues[row.id]?.colorFromList || row.colorFromList,
          originCountry: editedValues[row.id]?.originCountry || row.originCountry,
          materialName: editedValues[row.id]?.materialName || row.materialName,
          materialOuterShell: editedValues[row.id]?.materialOuterShell || row.materialOuterShell,
          materialLinerShell: editedValues[row.id]?.materialLinerShell || row.materialLinerShell,
          careGuide: editedValues[row.id]?.careGuide || row.careGuide,
          inStock: editedValues[row.id]?.inStock || row.inStock,
          productLink: editedValues[row.id]?.productLink || row.productLink,
        };
      }
      return row;
    });
    setRowsData(updatedRowsData);
    setRowsDataPush(updatedRowsData);
    setCheckBoxId([]);

    setIsEditing(false);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const hesabDisplayFunc=()=>{
    if(hesabDisplay===false){
      setHesabDisplay(true)
    }else{
      setHesabDisplay(false)
    }
  }
    function formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  
  // Kullanım örneği:

  return (
    <div className="table-main">
      <div className="call-companet">
        <Calendar
        checkId={checkId}
        rowsDataPush={rowsDataPush}
        setRowsDataPush={setRowsDataPush}
        rowsData={rowsData}
        setRowsData={setRowsData}
      />
       <button onClick={()=>hesabDisplayFunc()} className="hesab-btn">Formula</button>
       <MdDownload className="table-download-icons" />

       <Hesab rowsDataPush={rowsDataPush} setRowsDataPush={setRowsDataPush} hesabDataPush={hesabDataPush} setHesabDataPush={setHesabDataPush} setHesabDisplay={setHesabDisplay} hesabDisplay={hesabDisplay}/>
      </div>
      
      <MDBCard className="table-card" narrow>
        <div
          onClick={() => (
            setDataSort(null), setSearchColumns(null), setSearchQuery(""),setSortStyle("")
          )}
          className={searchColumns ? "blackBg" : "blackBg-none"}
        ></div>
        <RowsEdit
          setCheckId={setCheckId}
          checkId={checkId}
          rowsDataPush={rowsDataPush}
          setRowsDataPush={setRowsDataPush}
          dataSort={dataSort}
          setDataSort={setDataSort}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setSearchColumns={setSearchColumns}
          searchColumns={searchColumns}
          rowsData={rowsData}
          setRowsData={setRowsData}
          sortStyle={sortStyle}
          setSortStyle={setSortStyle}
        />
        <MDBCardHeader className="MDBCardHeader view view-cascade gradient-card-header blue-gradient d-flex justify-content-between align-items-center py-2 mx-4 mb-3">
          <div></div>
          <div className="table-name"></div>
          <div className="table-actions-icons">
            <CiEdit onClick={handleEditFunc} className="table-icons" />
            <MdDeleteOutline
              onClick={() => handleDeleteChecked()}
              className="table-icons"
            />
            <MdDone
              onClick={handleEditDataFunc}
              className={
                isEditing === false ? "table-icons" : "done-table-icons"
              }
            />
          </div>
        </MDBCardHeader>
        <MDBCardBody cascade>
          <MDBTable width={10} btn fixed>
            <MDBTableHead>
              <tr>
                <th>
                  {/* <input
                    type="checkbox"
                    onClick={handleCheckBoxFunc}
                    className="custom-control-input"
                    id="defaultUnchecked"
                  /> */}
                </th>
                <th   className="table-th" onClick={() => setSearchColumns("createDate")}>
                  Create Date
                </th>
                <th  className="table-th" onClick={() => setSearchColumns("articleId")}
                >
                  Article ID
                </th>
                <th  onClick={() => setSearchColumns("productMergeId")} className="table-th">Product Merge Id</th>
                <th  onClick={() => setSearchColumns("brandName")} className="table-th">Brand Name</th>
                <th  onClick={() => setSearchColumns("productTitle")} className="table-th">productTitle</th>
                <th onClick={() => setSearchColumns("sourcePrice")} className="table-th"> sourcePrice</th>
                <th  onClick={() => setSearchColumns("finalPrice")} className="table-th">finalPrice</th>
                <th  onClick={() => setSearchColumns("color")} className="table-th"> color</th>
                <th  onClick={() => setSearchColumns("description")} className="table-th"> description</th>
                <th  onClick={() => setSearchColumns("beforeDiscountPrice")} className="table-th"> beforeDiscountPrice</th>
                <th  onClick={() => setSearchColumns("productSize")} className="table-th"> productSize</th>
                <th  onClick={() => setSearchColumns("mainPhotoLink")} className="table-th"> mainPhotoLink</th>
                <th  onClick={() => setSearchColumns("additionalPhotoLinks")} className="table-th"> additionalPhotoLinks</th>
                <th  onClick={() => setSearchColumns("colorFromList")} className="table-th"> colorFromList</th>
                <th  onClick={() => setSearchColumns("originCountry")} className="table-th"> originCountry</th>
                <th  onClick={() => setSearchColumns("materialName")} className="table-th"> materialName</th>
                <th onClick={() => setSearchColumns("materialOuterShell")} className="table-th"> materialOuterShell</th>
                <th onClick={() => setSearchColumns("materialLinerShell")} className="table-th"> materialLinerShell</th>
                <th onClick={() => setSearchColumns("careGuide")} className="table-th"> careGuide</th>
                <th onClick={() => setSearchColumns("inStock")} className="table-th"> inStock</th>
                <th onClick={() => setSearchColumns("productLink")} className="table-th"> productLink</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {currentItems?.map((row) => (
                <tr key={row.id}>
                  <td>
                    <input
                      type="checkbox"
                      onClick={() => handleCheckBoxFunc(row)}
                      checked={checkBoxId.includes(row.id)}
                      className="custom-control-input"
                      id={`defaultUnchecked${row.id}`}
                    />
                  </td>
                  {isEditing &&
                  isEditing &&
                  editData.some((item) => item.id === row.id) ? (
                    <>
                      <td>
                        <input 
                          type="text"
                          className="table-rows-edit"
                          value={
                            editedValues[row.id]?.createDate || row.createDate
                          }
                          onChange={(e) =>
                            handleInputChange(e, row.id, "createDate")
                          }
                          disabled={!isEditing || !checkBoxId.includes(row.id)}
                        />
                      </td>
                      <td>
                        <input className="table-rows-edit"
                          value={
                            editedValues[row.id]?.articleId || row.articleId
                          }
                          onChange={(e) =>
                            handleInputChange(e, row.id, "articleId")
                          }
                          disabled={!isEditing || !checkBoxId.includes(row.id)}   type="text" defaultValue={row.articleId} />
                      </td>
                      <td>
                        <input className="table-rows-edit"
                          value={
                            editedValues[row.id]?.productMergeId || row.productMergeId
                          }
                          onChange={(e) =>
                            handleInputChange(e, row.id, "productMergeId")
                          }
                          disabled={!isEditing || !checkBoxId.includes(row.id)}  type="text" defaultValue={row.productMergeId} />
                      </td>
                      <td>
                        <input className="table-rows-edit"
                          value={
                            editedValues[row.id]?.brandName || row.brandName
                          }
                          onChange={(e) =>
                            handleInputChange(e, row.id, "brandName")
                          }
                          disabled={!isEditing || !checkBoxId.includes(row.id)} type="text" defaultValue={row.brandName} />
                      </td>
                      <td>
                        <input className="table-rows-edit"
                          value={
                            editedValues[row.id]?.productTitle || row.productTitle
                          }
                          onChange={(e) =>
                            handleInputChange(e, row.id, "productTitle")
                          }
                          disabled={!isEditing || !checkBoxId.includes(row.id)} type="text" defaultValue={row.productTitle} />
                      </td>
                      <td>
                        <input className="table-rows-edit"
                          value={
                            editedValues[row.id]?.sourcePrice || row.sourcePrice
                          }
                          onChange={(e) =>
                            handleInputChange(e, row.id, "sourcePrice")
                          }
                          disabled={!isEditing || !checkBoxId.includes(row.id)} type="text" defaultValue={row.sourcePrice} />
                      </td>
                      <td>
                        <input className="table-rows-edit"
                          value={
                            editedValues[row.id]?.finalPrice || row.finalPrice
                          }
                          onChange={(e) =>
                            handleInputChange(e, row.id, "finalPrice")
                          }
                          disabled={!isEditing || !checkBoxId.includes(row.id)} type="text" defaultValue={row.finalPrice} />
                      </td>
                      <td>
                        <input className="table-rows-edit"
                          value={
                            editedValues[row.id]?.color || row.color
                          }
                          onChange={(e) =>
                            handleInputChange(e, row.id, "color")
                          }
                          disabled={!isEditing || !checkBoxId.includes(row.id)} type="text" defaultValue={row.color} />
                      </td>
                      <td>
                        <input className="table-rows-edit"
                          value={
                            editedValues[row.id]?.description || row.description
                          }
                          onChange={(e) =>
                            handleInputChange(e, row.id, "description")
                          }
                          disabled={!isEditing || !checkBoxId.includes(row.id)} type="text" defaultValue={row.description} />
                      </td>
                      <td>
                        <input
                        className="table-rows-edit"
                        value={
                          editedValues[row.id]?.beforeDiscountPrice || row.beforeDiscountPrice
                        }
                        onChange={(e) =>
                          handleInputChange(e, row.id, "beforeDiscountPrice")
                        }
                        disabled={!isEditing || !checkBoxId.includes(row.id)}
                          type="text"
                          defaultValue={row.beforeDiscountPrice}
                        />
                      </td>
                      <td>
                        <input
                        className="table-rows-edit"
                        value={
                          editedValues[row.id]?.productSize || row.productSize
                        }
                        onChange={(e) =>
                          handleInputChange(e, row.id, "productSize")
                        }
                        disabled={!isEditing || !checkBoxId.includes(row.id)}
                         type="text" defaultValue={row.productSize} />
                      </td>
                      <td>
                        <input  className="table-rows-edit"
                        value={
                          editedValues[row.id]?.mainPhotoLink || row.mainPhotoLink
                        }
                        onChange={(e) =>
                          handleInputChange(e, row.id, "mainPhotoLink")
                        }
                        disabled={!isEditing || !checkBoxId.includes(row.id)} type="text" defaultValue={row.mainPhotoLink} />
                      </td>
                      <td>
                        <input
                        className="table-rows-edit"
                        value={
                          editedValues[row.id]?.additionalPhotoLinks || row.additionalPhotoLinks
                        }
                        onChange={(e) =>
                          handleInputChange(e, row.id, "additionalPhotoLinks")
                        }
                        disabled={!isEditing || !checkBoxId.includes(row.id)}
                          type="text"
                          defaultValue={row.additionalPhotoLinks}
                        />
                      </td>
                      <td>
                        <input className="table-rows-edit"
                        value={
                          editedValues[row.id]?.colorFromList || row.colorFromList
                        }
                        onChange={(e) =>
                          handleInputChange(e, row.id, "colorFromList")
                        }
                        disabled={!isEditing || !checkBoxId.includes(row.id)} type="text" defaultValue={row.colorFromList} />
                      </td>
                      <td>
                        <input className="table-rows-edit"
                        value={
                          editedValues[row.id]?.originCountry || row.originCountry
                        }
                        onChange={(e) =>
                          handleInputChange(e, row.id, "originCountry")
                        }
                        disabled={!isEditing || !checkBoxId.includes(row.id)} type="text" defaultValue={row.originCountry} />
                      </td>
                      <td>
                        <input  className="table-rows-edit"
                        value={
                          editedValues[row.id]?.materialName || row.materialName
                        }
                        onChange={(e) =>
                          handleInputChange(e, row.id, "materialName")
                        }
                        disabled={!isEditing || !checkBoxId.includes(row.id)} type="text" defaultValue={row.materialName} />
                      </td>
                      <td>
                        <input
                        className="table-rows-edit"
                        value={
                          editedValues[row.id]?.materialOuterShell || row.materialOuterShell
                        }
                        onChange={(e) =>
                          handleInputChange(e, row.id, "materialOuterShell")
                        }
                        disabled={!isEditing || !checkBoxId.includes(row.id)}
                          type="text"
                          defaultValue={row.materialOuterShell}
                        />
                      </td>
                      <td>
                        <input
                         className="table-rows-edit"
                         value={
                           editedValues[row.id]?.materialLinerShell || row.materialLinerShell
                         }
                         onChange={(e) =>
                           handleInputChange(e, row.id, "materialLinerShell")
                         }
                         disabled={!isEditing || !checkBoxId.includes(row.id)}
                          type="text"
                          defaultValue={row.materialLinerShell}
                        />
                      </td>
                      <td>
                        <input  className="table-rows-edit"
                         value={
                           editedValues[row.id]?.careGuide || row.careGuide
                         }
                         onChange={(e) =>
                           handleInputChange(e, row.id, "careGuide")
                         }
                         disabled={!isEditing || !checkBoxId.includes(row.id)} type="text" defaultValue={row.careGuide} />
                      </td>
                      <td>
                        <input className="table-rows-edit"
                         value={
                           editedValues[row.id]?.inStock || row.inStock
                         }
                         onChange={(e) =>
                           handleInputChange(e, row.id, "inStock")
                         }
                         disabled={!isEditing || !checkBoxId.includes(row.id)} type="text" defaultValue={row.inStock} />
                      </td>
                      <td>
                        <input className="table-rows-edit"
                         value={
                           editedValues[row.id]?.productLink || row.productLink
                         }
                         onChange={(e) =>
                           handleInputChange(e, row.id, "productLink")
                         }
                         disabled={!isEditing || !checkBoxId.includes(row.id)} type="text" defaultValue={row.productLink} />
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="rowsData-value">{formatDate(row.createDate)}</td>
                      <td className="rowsData-value">{row.articleId}</td>
                      <td className="rowsData-value">{row.productMergeId}</td>
                      <td className="rowsData-value">{row.brandName}</td>
                      <td className="rowsData-value">{row.productTitle}</td>
                      <td className="rowsData-value">{row.sourcePrice}</td>
                      <td className="rowsData-value">{row.finalPrice}</td>
                      <td className="rowsData-value">{row.color}</td>
                      <td className="rowsData-value">{row.description}</td>
                      <td className="rowsData-value">
                        {row.beforeDiscountPrice}
                      </td>
                      <td className="rowsData-value">{row.productSize}</td>
                      <td className="rowsData-value">{row.mainPhotoLink}</td>
                      <td className="rowsData-value">
                        {row.additionalPhotoLinks}
                      </td>
                      <td className="rowsData-value">{row.colorFromList}</td>
                      <td className="rowsData-value">{row.originCountry}</td>
                      <td className="rowsData-value">{row.materialName}</td>
                      <td className="rowsData-value">
                        {row.materialOuterShell}
                      </td>
                      <td className="rowsData-value">
                        {row.materialLinerShell}
                      </td>
                      <td className="rowsData-value">{row.careGuide}</td>
                      <td className="rowsData-value">{row.inStock}</td>
                      <td className="rowsData-value">{row.productLink}</td>
                    </>
                  )}
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>
        </MDBCardBody>
      </MDBCard>
      <Stack
        className="stack"
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Stack>
    </div>
  );
};

export default Table;
