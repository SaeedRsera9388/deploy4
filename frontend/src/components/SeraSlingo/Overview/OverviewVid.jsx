import React, { useState, useEffect } from "react";
import axios from "axios";
import HeaderBar from "../Header/HeaderBar";
import PlanHeader from "../PlanHeader/PlanHeader";
import MailList from "../MailList/MailList";
import Footer from "../Footer/SeraFooter";
import { Pagination, Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import './OverviewVid.scss'; // Import SCSS file

const OverviewVid = () => {
  const [videos, setVideos] = useState([]);
  const [totalVideos, setTotalVideos] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentVideo, setCurrentVideo] = useState('');
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });
  
  const videosPerPage = 4; // Adjusted to 4 per page

  useEffect(() => {
    fetchVideos();
    fetchTotalVideosCount();
  }, [currentPage]);

  const fetchVideos = async () => {
    try {
      const response = await axiosInstance.get(
        `/youtubes?_page=${currentPage}&_limit=${videosPerPage}`
      );
      const fetchedVideos = response.data;
      setVideos(fetchedVideos);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const fetchTotalVideosCount = async () => {
    try {
      const response = await axiosInstance.get("/youtubes/count");
      const { totalYoutubes } = response.data;
      setTotalVideos(totalYoutubes);
    } catch (error) {
      console.error("Error fetching total videos count:", error);
    }
  };

  const handleVideoClick = (videoUrl) => {
    setCurrentVideo(videoUrl);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    <div>
      <HeaderBar />
      <PlanHeader type="list" />
      <div className="planContainer">
        <div className="overview-wrapper-v">
          <div className="overview-container-v">
            <span className="overview-container-v-title">Overview Video</span>
            <span className="overview-container-v-subTitle">Explore moments and experiences through videos!</span>
            <p className="overview-totalCount">Total Videos: {totalVideos}</p>
            <div className="overview-review-container-v">
              <div className="overview-videos-v">
                {videos.map((video, index) => (
                  <div key={index} className="video-item-v" onClick={() => handleVideoClick(video.vid)}>
                    <div className="video-details-video">
                      {/* You can replace this with your preferred iframe implementation */}
                      <iframe className="video-iframe" src={video.vid} title={`Video ${index + 1}`} allowFullScreen />
                    </div>
                    <div className="video-details-v">
                      <p className="video-details-v-subject">Subject: {video.subject}</p>
                      <p className="video-details-v-text">Text: {video.text}</p>
                    </div>
                  </div>
                ))}
              </div>
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
        className="video-modal"
      >
        <div className="modal-video-container">
          {/* You can replace this with your preferred iframe implementation */}
          <iframe className="modal-video-iframe" src={currentVideo} title="Zoomed In Video" allowFullScreen />
        </div>
        <div className="modal-controls">
          <CloseOutlined className="control-icon" onClick={handleModalClose} />
        </div>
      </Modal>
    </div>
  );
};

export default OverviewVid;
