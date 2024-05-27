import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import SideBar from "../../components/sidebar/SideBar";
import { plansInputs } from "../../formSource";
import "./NewPlans.scss";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { notification } from 'antd';

const NewPlans = () => {
  const [info, setInfo] = useState({});
  const [programId, setProgramId] = useState(undefined);

  const { data, loading, error } = useFetch('/programs');

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });

  const handleClick = async (e) => {
    e.preventDefault();
  
    try {
      // Include the program field in the request body
      await axiosInstance.post(`/plans/${programId}`, { ...info, program: programId });
      notification.success({
        message: 'Success',
        description: 'Plan added successfully.',
      });
    } catch (err) {
      console.log(err);
      notification.error({
        message: 'Error',
        description: 'Failed to add plan.',
      });
    }
  };
  

  return (
    <div className="new">
      <SideBar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Plan</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {plansInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}
              
              <div className="formInput">
                <label>Choose a Program</label>
                <select
                  id="programId"
                  onChange={(e) => setProgramId(e.target.value)}
                >
                  {loading
                    ? "loading"
                    : data &&
                      data.map((program) => (
                        <option key={program._id} value={program._id}>{program.name}</option>
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

export default NewPlans;
