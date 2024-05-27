import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import Chart from "../../components/chart/Chart";
import Navbar from "../../components/navbar/Navbar";
import SideBar from "../../components/sidebar/SideBar";
import List from "../../components/table/Table";
import { userInputs, programInputs, plansInputs } from "../../formSource";
import "./Single.scss";
import { notification, Modal, Button, Carousel } from "antd";

const formSource = {
  users: userInputs,
  programs: programInputs,
  plans: plansInputs,
};

const Single = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const id = location.pathname.split("/")[2]; // Extract ID from the path
  const [info, setInfo] = useState({});
  const [originalInfo, setOriginalInfo] = useState({});
  const [category, setCategory] = useState(path);
  const dynamicPath = `/${category}/${id}`;
  const { data, loading, error, reFetch } = useFetch(dynamicPath);
  const [isEditing, setIsEditing] = useState(false); // State to track edit mode
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [viewingAllPhotos, setViewingAllPhotos] = useState(false); // State to track if viewing all photos
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0); // State to track the index of the current photo
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(dynamicPath);
        setInfo(response.data);
        setOriginalInfo(response.data); // Store the original data for canceling
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dynamicPath]);

  const handleInputChange = (e) => {
    if (isEditing) {
      setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    openNotification("Edit", "You are now in edit mode.");
  };

  const handleUpdateClick = async () => {
    try {
      await axiosInstance.put(dynamicPath, info);
      setIsEditing(false);
      openNotification("success", "Update success!");

      // Replace the history.push with the dynamic path construction
      window.location.href = `/${category}/${id}`;
    } catch (error) {
      console.error("Error updating data:", error);
      openNotification(
        "error",
        "Update failed. Please try again or contact your management."
      );
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setInfo(originalInfo); // Reset data to original state
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    reFetch();
  };

  const openNotification = (type, message) => {
    const validTypes = ["success", "info", "warning", "error"];

    if (validTypes.includes(type)) {
      notification[type]({
        message: type === "error" ? "Error" : "Notification",
        description: message,
      });
    } else {
      console.error(`Invalid notification type: ${type}`);
    }
  };

  const handleImageClick = () => {
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleViewPhotosClick = () => {
    setViewingAllPhotos(true);
  };

  const handlePreviousPhoto = () => {
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex === 0 ? info.photo.length - 1 : prevIndex - 1
    );
  };

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex === info.photo.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleBackClick = () => {
    setViewingAllPhotos(false);
  };

  return (
    <div className="single">
      <SideBar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="img">
              {category === "users" && (
                <img src={info.img} alt="User Image" className="userImage" />
              )}
              {category === "programs" && !viewingAllPhotos && (
                <img
                  src={info.photo && info.photo.length > 0 ? info.photo[0] : ""}
                  alt="Program Photo"
                  className="programImage"
                />
              )}
              {category === "programs" && viewingAllPhotos && (
                <img
                  src={
                    info.photo &&
                    info.photo.length > 0 &&
                    info.photo[currentPhotoIndex]
                  }
                  alt="Program Photo"
                  className="programImage"
                />
              )}
              {category === "programs" &&
                info.photo &&
                info.photo.length > 1 && (
                  <div className="viewPhotosButton">
                    {!viewingAllPhotos ? (
                      <Button
                        onClick={handleViewPhotosClick}
                        className="viewAllPhotosBtn"
                      >
                        View All Photos
                      </Button>
                    ) : (
                      <Button onClick={handleBackClick}>Back</Button>
                    )}
                  </div>
                )}
              {category === "programs" && viewingAllPhotos && (
                <div className="sliderButtons">
                  <Button onClick={handlePreviousPhoto}>Previous</Button>
                  <Button onClick={handleNextPhoto}>Next</Button>
                </div>
              )}
              {category === "users" && (
                <div className="item">
                  <label className="item-details">User Image :</label>
                  <Button onClick={handleImageClick}>View Image</Button>
                </div>
              )}
              {/* {category === "programs" && (
                <div className="item">
                  <label className="item-details">Program Photo :</label>
                  <Button onClick={handleImageClick} className="viewPhotosBtn">View Photos</Button>
                </div>
              )} */}
            </div>
            <div className="editButtons">
              {!isEditing && (
                <div className="editButton" onClick={handleEditClick}>
                  Edit
                </div>
              )}
              {isEditing && (
                <>
                  <div className="editButton" onClick={handleUpdateClick}>
                    Update
                  </div>
                  <div className="cancelButton" onClick={handleCancelClick}>
                    Cancel
                  </div>
                </>
              )}
            </div>
            <h1 className="title">information</h1>
            <div className="info">
              <div className="details">
                {formSource[category].map((input) => (
                  <div className="item" key={input.id}>
                    {input.id === "customerID" ? (
                      <h2 className="item-title">{input.label}:</h2>
                    ) : (
                      <>
                        <label htmlFor={input.id} className="item-details">
                          {input.label} :
                        </label>
                        {isEditing ? (
                          <input
                            type={input.type}
                            id={input.id}
                            placeholder={input.placeholder}
                            value={info[input.id] || ""}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <span>{info[input.id]}</span>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title="Image"
        visible={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
        centered
        bodyStyle={{ textAlign: "center" }}
      >
        <img
          src={
            category === "users"
              ? info.img
              : info.photo && info.photo.length > 0
              ? info.photo[0]
              : ""
          }
          alt="Image"
          className="modalImage"
        />
      </Modal>
    </div>
  );
};

export default Single;
