// NewProgram.js
import React, { useState } from "react";
import axios from "axios";
import { notification } from 'antd';
import Navbar from "../../components/navbar/Navbar";
import SideBar from "../../components/sidebar/SideBar";
import { programInputs } from "../../formSource";
import "./NewProgram.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import useFetch from "../../hooks/useFetch";

const NewProgram = () => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [plans, setPlans] = useState([]);

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });

  const { data, loading, error, reFetch } = useFetch("/plans");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setPlans(value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");

          const uploadRes = await axiosInstance.post(
            "https://api.cloudinary.com/v1_1/dfxjkmghr/image/upload",
            data
          );

          const { url } = uploadRes.data;
          return url;
        })
      );

      const newProgram = {
        ...info,
        plans,
        photo: list, // Correct field name here
      };

      await axiosInstance.post("/programs", newProgram);
      notification.success({
        message: 'Program Added',
        description: 'The program has been added successfully.',
      });
      // Trigger a re-fetch after successful addition
      reFetch();
    } catch (err) {
      console.error(err);
      notification.error({
        message: 'Error',
        description: 'Failed to add the program. Please try again.',
      });
    }
  };

  return (
    <div className="new">
      <SideBar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Program</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {programInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Featured</label>
                <select id="featured" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <div className="selectPlans">
                <label>Plans</label>
                <select id="plans" multiple onChange={handleSelect}>
                  {loading
                    ? "loading"
                    : data &&
                      data.map((plan) => (
                        <option key={plan._id} value={plan._id}>
                          {plan.title}
                        </option>
                      ))}
                </select>
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProgram;
