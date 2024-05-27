import React, { useState, useEffect } from "react";
import axios from "axios";
import HeaderBar from "../Header/HeaderBar";
import PlanHeader from "../PlanHeader/PlanHeader";
import MailList from "../MailList/MailList";
import Footer from "../Footer/SeraFooter";
import { Image, Pagination, Modal } from "antd";
import { ZoomInOutlined, ZoomOutOutlined, CloseOutlined } from "@ant-design/icons";
import './OverviewPhoto.scss';

const OverviewPhoto = () => {
  const [photos, setPhotos] = useState([]);
  const [totalPhotos, setTotalPhotos] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState('');
  const photosPerPage = 4; // Adjusted to 4 per page
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });
  

  useEffect(() => {
    fetchPhotos();
    fetchTotalPhotosCount();
  }, [currentPage]);

  const fetchPhotos = async () => {
    try {
      const response = await axiosInstance.get(
        `/photos?_page=${currentPage}&_limit=${photosPerPage}`
      );
      const fetchedPhotos = response.data;
      setPhotos(fetchedPhotos);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  const fetchTotalPhotosCount = async () => {
    try {
      const response = await axiosInstance.get("/photos/count");
      const { totalPhotos } = response.data;
      setTotalPhotos(totalPhotos);
    } catch (error) {
      console.error("Error fetching total photos count:", error);
    }
  };

  const handleImageClick = (imageUrl) => {
    setCurrentImage(imageUrl);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  // const handlePageChange = (page) => {
  //   setCurrentPage(page);
  // };

  return (
    <div>
      <HeaderBar />
      <PlanHeader type="list" />
      <div className="planContainer">
        <div className="overview-wrapper-p">
          <div className="overview-container-p">
            <span className="overview-container-p-title">Overview Photo</span>
            <span className="overview-container-p-subTitle">Memories and achievements captured to manifest the moments!!</span>
            <p className="overview-totalCount">Total Photos: {totalPhotos}</p>
            <div className="overview-review-container-p">
              <div className="overview-photos-p">
                {photos.map((photo, index) => (
                  <div key={index} className="photo-item-p" onClick={() => handleImageClick(photo.photo)}>
                    <div className="photo-details-photo">
                      <Image src={photo.photo} alt={`Photo ${index + 1}`} />
                    </div>
                    <div className="photo-details-p">
                      <p className="photo-details-p-subject">Subject: {photo.subject}</p>
                      <p className="photo-details-p-text">Text: {photo.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              {/* <Pagination
                showQuickJumper
                defaultCurrent={1}
                pageSize={photosPerPage}
                total={totalPhotos}
                onChange={handlePageChange}
              /> */}
            </div>
          </div>
        </div>
      </div>
        <MailList />
      <Footer />
      <Modal
        visible={modalVisible}
        footer={null}
        onCancel={handleModalClose}
        centered
        closable={false}
        className="image-modal"
      >
        <div className="modal-image-container">
          <Image src={currentImage} alt="Zoomed In Image" />
        </div>
        <div className="modal-controls">
          {/* <ZoomInOutlined className="control-icon" />
          <ZoomOutOutlined className="control-icon" /> */}
          <CloseOutlined className="control-icon" onClick={handleModalClose} />
        </div>
      </Modal>
    </div>
  );
};

export default OverviewPhoto;
