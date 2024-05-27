import React, { useState, useEffect } from "react";
import HeaderBar from "../Header/HeaderBar";
import PlanHeader from "../PlanHeader/PlanHeader";
import MailList from "../MailList/MailList";
import Footer from "../Footer/SeraFooter";
import axios from "axios";

import "./Overview.scss";
import { Flex, Rate } from "antd";

const Overview = () => {
  const [photos, setPhotos] = useState([]);
  const [totalPhotos, setTotalPhotos] = useState(0);
  const [comments, setComments] = useState([]);
  const [totalComments, setTotalComments] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [totalReviews, setTotalReviews] = useState(0);
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });

  useEffect(() => {
    fetchPhotos();
    fetchTotalPhotosCount();
    fetchComments();
    fetchTotalCommentsCount();
    fetchReviews();
    fetchTotalReviewsCount();
  }, []);

  const fetchPhotos = async () => {
    try {
      const response = await axiosInstance.get("/photos");
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

  const fetchComments = async () => {
    try {
      const response = await axiosInstance.get("/comments");
      const fetchedComments = response.data;
      setComments(fetchedComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const fetchTotalCommentsCount = async () => {
    try {
      const response = await axiosInstance.get("/comments/count");
      const { totalComments } = response.data;
      setTotalComments(totalComments);
    } catch (error) {
      console.error("Error fetching total comments count:", error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axiosInstance.get("/reviews");
      const fetchedReviews = response.data;
      setReviews(fetchedReviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const fetchTotalReviewsCount = async () => {
    try {
      const response = await axiosInstance.get("/reviews/count");
      const { totalReviews } = response.data;
      setTotalReviews(totalReviews);
    } catch (error) {
      console.error("Error fetching total reviews count:", error);
    }
  };

  return (
    <div>
      <HeaderBar />
      <PlanHeader type="list" />
      <div className="planContainer">
        <div>
          <div className="overview-wrapper">
            <div className="overview-container">
              <span className="Overview-container-title">OverView Latest Updates</span>
              <span className="Overview-container-subTitle">
                Find all the latest updates and reviews related to the programs
                from our best students!
              </span>
            </div>
            <div className="overview-review-container">
              <div className="overview-photos">
                {photos.slice(0, 8).map((photo, index) => (
                  <img
                    key={index}
                    src={photo.photo}
                    alt={`Photo ${index + 1}`}
                  />
                ))}
              </div>
              <div>
                <p className="overview-totalCount">
                  Total Photos: {totalPhotos}
                </p>
                <a href="/Overview-photos" className="view-more">
                  View More Photo
                </a>
              </div>
            </div>

            <div className="overview-review-container">
              <div className="overview-comments">
                {comments.slice(0, 8).map((comment, index) => (
                  <div key={index} className="comment">
                    <h3 className="comment-name-container">{comment.name}</h3>
                    <p>
                      <strong>Subject: </strong> {comment.subject}
                    </p>
                    <p className="comment-text comment-text-hidden">
                      {" "}
                      <strong>Comment: </strong>
                      {comment.text}
                    </p>
                  </div>
                ))}
              </div>
              <div>
                <p className="overview-totalCount">
                  Total Posts: {totalComments}
                </p>
                <a href="/Overview-post" className="view-more">
                  View More Posts
                </a>
              </div>
            </div>

            <div className="overview-review-container">
              <div className="overview-review">
                {reviews.slice(0, 8).map((review, index) => (
                  <div key={index} className="review">
                    <img
                      src={
                        review.photo ||
                        "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Download-Image.png"
                      }
                      alt="Avatar"
                    />
                    <Flex gap="middle" vertical className="flexrateoverreview-reviewpart">
                      <Rate value={review.rate} disabled />
                    </Flex>
                    <h3>{review.Name}</h3>
                    <p>
                      <strong>Subject:</strong> {review.subject}
                    </p>
                    <p className="comment-text-hidden">{review.text}</p>
                  </div>
                ))}
              </div>
              <div>
                <p className="overview-totalCount">
                  Total Reviews: {totalReviews}
                </p>
                <a href="/Overview-reviews" className="view-more">
                  View More Reviews
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
        <MailList />
      <Footer />
    </div>
  );
};

export default Overview;
