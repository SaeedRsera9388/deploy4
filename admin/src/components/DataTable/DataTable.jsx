import "./DataTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { notification } from "antd";

const DataTable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState([]);
  const { data, loading, error } = useFetch(`/${path}`);
  
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
});
  

  useEffect(() => {
    if (data) {
      setList(data);
    }
  }, [data]);

  const handleDelete = async (id, entityType, programId) => {
    try {
      if (entityType === "plans") {
        await axiosInstance.delete(`/plans/${id}`, { data: { programId } });
      } else {
        await axiosInstance.delete(`/${entityType}/${id}`);
      }
  
      setList((prevList) => prevList.filter((item) => item._id !== id));
      notification.success({ message: "Delete Successful" });
    } catch (err) {
      console.error(`Error deleting ${entityType}:`, err);
      notification.error({ message: "Couldn't delete. Try again." });
    }
  };
  
  const handleView = (row) => {
    const itemId = row._id;
    const dynamicPath = `/${path}/${itemId}`;
    return (
      <Link to={dynamicPath} style={{ textDecoration: "none" }}>
        <div
          className="viewButton"
          onClick={() => notification.info({ message: "View" })}
        >
          View
        </div>
      </Link>
    );
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {handleView(params.row)}
            <div className="deleteButton" onClick={() => handleDelete(params.row._id, path, params.row.programId)}>
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="dataTable">
      <div className="dataTableTitle">
        {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>

      <DataGrid
        className="dataGrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default DataTable;
