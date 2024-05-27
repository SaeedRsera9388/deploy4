import React, { useState, useEffect } from "react";
import { Flex, Rate } from "antd";
import "./Featured.scss";
import axios from "axios";
import CountUp from "react-countup";

const Featured = () => {
  const [topReview, setTopReview] = useState(null);
  const [topComments, setTopComments] = useState(null);
  const [reviewCount, setReviewCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [ticketCount, setTicketCount] = useState(0);
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });

  useEffect(() => {
    fetchTopReview();
    fetchTopComments();
    fetchReviewCount();
    fetchCommentCount();
    fetchTicketCount();
  }, []);

  const fetchTopReview = async () => {
    try {
      const response = await axiosInstance.get("/reviews");
      const reviews = response.data;
      if (reviews.length > 0) {
        const sortedReviews = reviews.sort((a, b) => b.rate - a.rate);
        setTopReview(sortedReviews[0]);
      }
    } catch (error) {
      console.error("Error fetching top review:", error);
    }
  };

  const fetchTopComments = async () => {
    try {
      const response = await axiosInstance.get("/comments");
      const comments = response.data;
      if (comments.length > 0) {
        const sortedComments = comments.sort(
          (a, b) => b.text.length - a.text.length
        );
        setTopComments(sortedComments[0]);
      }
    } catch (error) {
      console.error("Error fetching top comments:", error);
    }
  };

  const fetchReviewCount = async () => {
    try {
      const response = await axiosInstance.get("/reviews/count");
      const { totalReviews } = response.data;
      setReviewCount(totalReviews);
    } catch (error) {
      console.error("Error fetching review count:", error);
    }
  };

  const fetchCommentCount = async () => {
    try {
      const response = await axiosInstance.get("/comments/count");
      const { totalComments } = response.data;
      setCommentCount(totalComments);
    } catch (error) {
      console.error("Error fetching comment count:", error);
    }
  };

  const fetchTicketCount = async () => {
    try {
      const response = await axiosInstance.get("/tickets/count");
      const { totalTickets } = response.data;
      setTicketCount(totalTickets);
    } catch (error) {
      console.error("Error fetching ticket count:", error);
    }
  };

  return (
    <div className="featured flex flex-col justify-center">
      <div className="featured-wrapper">
        <div className="featuredItem-box">
          <h1>Top Review</h1>
          {topReview ? (
            <>
              <img
                src={
                  topReview.photo ||
                  "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Download-Image.png"
                }
                alt="Avatar"
              />
              <Flex gap="middle" vertical className="flexrates">
                <Rate value={topReview.rate} disabled />
              </Flex>
              <span>Name: {topReview.name}</span>
              <span>Subject: {topReview.subject}</span>
              <span>
                desc: <br />
                {topReview.text}
              </span>
              <div className="mt-2">
                <p>{reviewCount} Top Rates</p>
                <p>Total Reviews: {reviewCount}</p>
              </div>
              <a href="/Overview-reviews">View Review</a>
            </>
          ) : (
            <span>No Reviews available</span>
          )}
        </div>
        <div className="featuredItem-box">
          <h1>Top Posts</h1>
          {topComments ? (
            <>
              <span>Name: {topComments.name}</span>
              <span>Subject: {topComments.subject}</span>
              <span className="small-screen-comment-deschidden">
                desc: {topComments.text}
              </span>
              <span>Total Post Count: {commentCount}</span>
              <a href="/Overview-post">View Posts</a>
            </>
          ) : (
            <span>No Posts available</span>
          )}
        </div>
        <div className="featuredItem-box">
          <div>
            <h1>Visitors</h1>
            <span>
              <CountUp
                start={0}
                end={153}
                duration={15}
                separator=" "
                prefix="Current total Clients: "
                onEnd={() => console.log("Ended! 👏")}
                onStart={() => console.log("Started! 💨")}
              ></CountUp>{" "}
            </span>
          </div>
          <div>
            <h1>Satisfied Clients!</h1>
            <span>
              <CountUp
                start={0}
                end={94}
                duration={15}
                separator=" "
                prefix="Classes 2024 Jan: "
                onEnd={() => console.log("Ended! 👏")}
                onStart={() => console.log("Started! 💨")}
              ></CountUp>{" "}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
