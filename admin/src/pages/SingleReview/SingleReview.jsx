import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import SideBar from "../../components/sidebar/SideBar";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import './SingleReview.scss';

const SingleReview = () => {
  const { id } = useParams();
  const [review, setReview] = useState(null);
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
});

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axiosInstance.get(`/reviews/${id}`);
        setReview(response.data);
      } catch (error) {
        console.error("Error fetching review:", error);
      }
    };
    if (id) {
      fetchReview();
    }
  }, [id]);

  return (
    <div className="new">
      <SideBar />
      <div className="newContainer">
        <Navbar />
        <div className="singleReviewContainer">
          {review && (
            <div className="singleReviewContainer-wrapper">
              <h1>Review ID: {review._id}</h1>
              <div>
                {review.photo ? (
                  <img
                    src={review.photo}
                    alt="Review"
                    style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                  />
                ) : (
                  <Avatar icon={<UserOutlined />} />
                )}
              </div>
              <div>
                <span>Name: {review.name}</span>
              </div>
              <div>
                <span>Subject: {review.subject}</span>
              </div>
              <div>
                <span>Rate: {review.rate}</span>
              </div>
              <div>
                <span>Text: {review.text}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleReview;
