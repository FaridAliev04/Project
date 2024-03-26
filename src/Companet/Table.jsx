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
import Date from "./Date";
import { Stack } from "@mui/material";
import Pagination from '@mui/material/Pagination';



const Table = (props) => {
  const [rowsData, setRowsData] = useState(initialRows);
  const [checkBoxId, setCheckBoxId] = useState([]);
  const [editData, setEditData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [date, setDate] = useState();
  const [searchColumns,setSearchColumns]=useState(null)
  const[dataSort,setDataSort]=useState(null)
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; 
  const [updata,setUpdata]=useState([])
const [rowsDataPush, setRowsDataPush] = useState(rowsData);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = rowsData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(rowsData.length / itemsPerPage);

  console.log(currentItems)
  const handleCheckBoxFunc = (e) => {
    if (checkBoxId) {
      setCheckBoxId([...checkBoxId, e.id]);
    }
  };
  const handleDeleteChecked = () => {
    let filtered = rowsData;

    for (const key in checkBoxId) {
      if (checkBoxId[key] > 0) {
        filtered = filtered.filter((e) => e.id !== checkBoxId[key]);
      }
    }

    setRowsData(filtered);
  };

  const handleEditFunc = () => {
    let findData = rowsData;
    for (const key in checkBoxId) {
      if (checkBoxId[key] > 0) {
        const find = findData.find((obj) => obj.id === checkBoxId[key]);
        setEditData((data) => [...data, find]);
      }
    }
    setIsEditing(true);
  };
  console.log(editData);

  const handleEditDataFunc = () => {
    const updatedRowsData = rowsData.map((row) => {
      for(const key in checkBoxId){
        if(checkBoxId[key] === row.id){
          return { ...row, createDate: date };
        }
      }
      return row;
    });
    setRowsData(updatedRowsData);
    setUpdata(updatedRowsData)
    setIsEditing(false);
    console.log(rowsData)
  };

  useEffect(() => {
    console.log(rowsData);
  }, []);
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (<div className="table-main">
    <Date updata={updata} rowsDataPush={rowsDataPush} setRowsDataPush={setRowsDataPush} rowsData={rowsData} setRowsData={setRowsData}/>
    <MDBCard className="table-card" narrow>
              <div onClick={()=>(setDataSort(null),setSearchColumns(null),setSearchQuery(""))} className={searchColumns?"blackBg":"blackBg-none"}></div>
        <RowsEdit updata={updata} rowsDataPush={rowsDataPush} setRowsDataPush={setRowsDataPush} dataSort={dataSort} setDataSort={setDataSort} searchQuery={searchQuery} setSearchQuery={setSearchQuery}  setSearchColumns={setSearchColumns} searchColumns={searchColumns} rowsData={rowsData} setRowsData={setRowsData}/>
      <MDBCardHeader className="MDBCardHeader view view-cascade gradient-card-header blue-gradient d-flex justify-content-between align-items-center py-2 mx-4 mb-3">
        <div></div>
        <div className="table-name">

        </div>
        <div className="table-actions-icons">
          <CiEdit onClick={handleEditFunc} className="table-icons" />
          <MdDeleteOutline
            onClick={() => handleDeleteChecked()}
            className="table-icons"
          />
          <MdDone  onClick={handleEditDataFunc} className={isEditing===false?"table-icons":"done-table-icons"} />
        </div>
      </MDBCardHeader>
      <MDBCardBody cascade>
        <MDBTable 
        width={10}
   btn fixed>
          <MDBTableHead  >
            <tr>
              <th>
                <input
                  type="checkbox"
                  onClick={handleCheckBoxFunc}
                  className="custom-control-input"
                  id="defaultUnchecked"
                />
              </th>
              <th onClick={()=>setSearchColumns("createDate")}>Create Date</th>
              <th style={{width:10}} className="table-th" onClick={()=>setSearchColumns("articleId")}>Article ID</th>
              <th className="table-th">Product Merge Id</th>
              <th className="table-th">Brand Name</th>
              <th className="table-th">productTitle</th>
              <th className="table-th"> sourcePrice</th>
              <th className="table-th">finalPrice</th>
              <th className="table-th"> color</th>
              <th className="table-th"> description</th>
              <th className="table-th"> beforeDiscountPrice</th>
              <th className="table-th"> productSize</th>
              <th className="table-th"> mainPhotoLink</th>
              <th className="table-th"> additionalPhotoLinks</th>
              <th className="table-th"> colorFromList</th>
              <th className="table-th"> originCountry</th>
              <th className="table-th"> materialName</th>
              <th className="table-th"> materialOuterShell</th>
              <th className="table-th"> materialLinerShell</th>
              <th className="table-th"> careGuide</th>
              <th className="table-th"> inStock</th>
              <th className="table-th"> productLink</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {currentItems?.map((row) => (
              <tr key={row.id}>
                <td>
                  <input
                    onClick={() => handleCheckBoxFunc(row)}
                    type="checkbox"
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
                        onChange={(e) => setDate(e.target.value)}
                        type="text"
                        defaultValue={row.createDate}
          
                      />
                    </td>
                    <td>
                      <input type="text" defaultValue={row.articleId} />
                    </td>
                    <td>
                      <input type="text" defaultValue={row.productMergeId} />
                    </td>
                    <td>
                      <input type="text" defaultValue={row.brandName} />
                    </td>
                    <td>
                      <input type="text" defaultValue={row.productTitle} />
                    </td>
                    <td>
                      <input type="text" defaultValue={row.sourcePrice} />
                    </td>
                    <td>
                      <input type="text" defaultValue={row.finalPrice} />
                    </td>
                    <td>
                      <input type="text" defaultValue={row.color} />
                    </td>
                    <td>
                      <input type="text" defaultValue={row.description} />
                    </td>
                    <td>
                      <input
                        type="text"
                        defaultValue={row.beforeDiscountPrice}
                      />
                    </td>
                    <td>
                      <input type="text" defaultValue={row.productSize} />
                    </td>
                    <td>
                      <input type="text" defaultValue={row.mainPhotoLink} />
                    </td>
                    <td>
                      <input type="text" defaultValue={row.mainPhotoLink} />
                    </td>
                    <td>
                      <input
                        type="text"
                        defaultValue={row.additionalPhotoLinks}
                      />
                    </td>
                    <td>
                      <input type="text" defaultValue={row.colorFromList} />
                    </td>
                    <td>
                      <input type="text" defaultValue={row.originCountry} />
                    </td>
                    <td>
                      <input type="text" defaultValue={row.materialName} />
                    </td>
                    <td>
                      <input
                        type="text"
                        defaultValue={row.materialOuterShell}
                      />
                    </td>
                    <td>
                      {" "}
                      <input
                        type="text"
                        defaultValue={row.materialLinerShell}
                      />
                    </td>
                    <td>
                      <input type="text" defaultValue={row.careGuide} />
                    </td>
                    <td>
                      <input type="text" defaultValue={row.inStock} />
                    </td>
                    <td>
                      <input type="text" defaultValue={row.productLink} />
                    </td>
                  </>
                ) : (
                  <>
                    <td>{row.createDate}</td>
                    <td>{row.articleId}</td>
                    <td>{row.productMergeId}</td>
                    <td>{row.brandName}</td>
                    <td>{row.productTitle}</td>
                    <td>{row.sourcePrice}</td>
                    <td>{row.finalPrice}</td>
                    <td>{row.color}</td>
                    <td>{row.description}</td>
                    <td>{row.beforeDiscountPrice}</td>
                    <td>{row.productSize}</td>
                    <td>{row.mainPhotoLink}</td>
                    <td>{row.additionalPhotoLinks}</td>
                    <td>{row.colorFromList}</td>
                    <td>{row.originCountry}</td>
                    <td>{row.materialName}</td>
                    <td>{row.materialOuterShell}</td>
                    <td>{row.materialLinerShell}</td>
                    <td>{row.careGuide}</td>
                    <td>{row.inStock}</td>
                    <td>{row.productLink}</td>
                  </>
                )}
              </tr>
            ))}
          </MDBTableBody>

        </MDBTable>
      </MDBCardBody>
    </MDBCard>
          <Stack className="stack" display={"flex"} justifyContent={"center"} alignItems={"center"}>
              <Pagination         
              count={totalPages} 
              page={currentPage} 
              onChange={handlePageChange}  
              color="primary"  />
          </Stack>
  </div>);
};

export default Table;
