import React, { useState, useEffect } from "react";
import axios from "axios";

import "./UpdateLatestNews.scss";

const UpdateLatestNews = () => {
  const [photo, setPhoto] = useState(null);
  const [totalPhotos, setTotalPhotos] = useState(0);
  const [loading, setLoading] = useState(true);
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const photoResponse = await axiosInstance.get("/photos");
        const countResponse = await axiosInstance.get("/photos/count");
        const { totalPhotos } = countResponse.data;
        setTotalPhotos(totalPhotos);
        if (photoResponse.data.length > 0) {
          setPhoto(photoResponse.data[0]); // Only display the first photo
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false in case of error
      }
    };
    fetchData();
  }, []);

  return (
    <div className="UpdateLatestNews-container flex justify-center">
      <div className="UpdateLatestNews-wrapper">
        <div className="">
          {!loading ? (
            photo ? (
              <div className="UpdateLatestNews-photo">
                <img src={photo.photo} alt="photo" />
                <span>{photo.subject}</span>
                <span className="UpdateLatestNews-photo-block">{photo.text}</span>
                <p>Total Photos: {totalPhotos}</p>
                <a href="/Overview">View Photo</a>
              </div>
            ) : (
              <div className="UpdateLatestNews-photo">
                <img
                  src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Download-Image.png"
                  alt="Avatar"
                />
                <span>No Photo available</span>
                <p>Total Photos: 0</p>
                <a href="/Overview">View Photo</a>
              </div>
            )
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className="UpdateLatestNews-vid">
          <div className="ratio ratio-16x9">
            <iframe
              src="https://www.youtube.com/embed/Sn2oj28jit0"
              title="YouTube video"
              allowFullScreen
            />
          </div>
          <span className="UpdateLatestNews-vid-header">Don't hesitate to secure your spot now!</span>
          <span className="UpdateLatestNews-vid-text">
            🌟 Join Sera Summer! 🌟 Embark on a transformative journey, unlock your potential, and dive into a world of empowerment. 🚀 Elevate your career, sharpen your communication prowess, and become part of a vibrant global community.
          </span>
          <a href="/OverviewVid">Youtube Vid</a>
        </div>
      </div>
    </div>
  );
};

export default UpdateLatestNews;
