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
import { FaRegEyeSlash } from "react-icons/fa";
import { initialRows } from "../fakeData/initialRows";
import RowsEdit from "./RowsEdit";

const Table = (props) => {
  const [rowsData, setRowsData] = useState(initialRows);
  const [checkBoxId, setCheckBoxId] = useState([]);
  const [editData, setEditData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [date, setDate] = useState();
  const [searchColumns,setSearchColumns]=useState(null)
  // const [id, setId] = useState([]);

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
    setIsEditing(false);
    console.log(rowsData)
  };

  useEffect(() => {
    console.log(rowsData);
  }, []);

  return (
    <MDBCard narrow>
        <RowsEdit setSearchColumns={setSearchColumns} searchColumns={searchColumns} rowsData={rowsData} setRowsData={setRowsData}/>
      <MDBCardHeader className="MDBCardHeader view view-cascade gradient-card-header blue-gradient d-flex justify-content-between align-items-center py-2 mx-4 mb-3">
        <div></div>
        <div className="table-name">
          <h1 className="table-header">Table</h1>
        </div>
        <div className="table-actions-icons">
          <CiEdit onClick={handleEditFunc} className="table-icons" />
          <MdDeleteOutline
            onClick={() => handleDeleteChecked()}
            className="table-icons"
          />
          <FaRegEyeSlash onClick={handleEditDataFunc} className="table-icons" />
        </div>
      </MDBCardHeader>
      <MDBCardBody cascade>
        <MDBTable className="MDBCard" btn fixed>
          <MDBTableHead>
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
              <th onClick={()=>setSearchColumns("articleId")}>Article ID</th>
              <th>Product Merge Id</th>
              <th>Brand Name</th>
              <th>productTitle</th>
              <th> sourcePrice</th>
              <th>finalPrice</th>
              <th> color</th>
              <th> description</th>
              <th> beforeDiscountPrice</th>
              <th> productSize</th>
              <th> mainPhotoLink</th>
              <th> additionalPhotoLinks</th>
              <th> colorFromList</th>
              <th> originCountry</th>
              <th> materialName</th>
              <th> materialOuterShell</th>
              <th> materialLinerShell</th>
              <th> careGuide</th>
              <th> inStock</th>
              <th> productLink</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {rowsData.map((row) => (
              <tr key={row.id}>
                <td>
                  <input
                    onClick={() => handleCheckBoxFunc(row)}
                    type="checkbox"
                    className="custom-control-input"
                    id="defaultUnchecked"
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
  );
};

export default Table;
