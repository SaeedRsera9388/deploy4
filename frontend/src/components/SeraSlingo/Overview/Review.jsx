import React, { useState, useEffect } from "react";
import HeaderBar from "../Header/HeaderBar";
import PlanHeader from "../PlanHeader/PlanHeader";
import MailList from "../MailList/MailList";
import Footer from "../Footer/SeraFooter";
import axios from "axios";
import {
  Flex,
  Rate,
  Input,
  Button,
  Modal,
  Form,
  notification,
  Image,
} from "antd";
import "./OverviewReviews.scss";

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [totalReviews, setTotalReviews] = useState(0);
  const [countByReviewTop, setCountByReviewTop] = useState(0);
  const [countByReviewTopSecond, setCountByReviewTopSecond] = useState(0);
  const [countByReviewMiddle, setCountByReviewMiddle] = useState(0);
  const [countByReviewSecondLast, setCountByReviewSecondLast] = useState(0);
  const [countByReviewLast, setCountByReviewLast] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [rate, setRate] = useState(0);
  const [text, setText] = useState("");
  const [photo, setPhoto] = useState("");
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });
  useEffect(() => {
    fetchReviews();
    fetchTotalReviewsCount();
    fetchReviewCounts();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axiosInstance.get("/reviews");
      const fetchedReviews = response.data.map((review) => ({
        ...review,
        createdAtFormatted: new Date(review.createdAt).toLocaleString("en-GB"), // Fetch and format creation date and time
      }));
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

  const fetchReviewCounts = async () => {
    try {
      const [
        topResponse,
        topSecondResponse,
        middleResponse,
        secondLastResponse,
        lastResponse,
      ] = await Promise.all([
        axiosInstance.get("/reviews/countByReviewRate"),
        axiosInstance.get("/reviews/countByReviewTopSecond"),
        axiosInstance.get("/reviews/countByReviewMiddle"),
        axiosInstance.get("/reviews/countByReviewSecondLast"),
        axiosInstance.get("/reviews/countByReviewLast"),
      ]);

      setCountByReviewTop(topResponse.data.totalReviews);
      setCountByReviewTopSecond(topSecondResponse.data.totalReviews);
      setCountByReviewMiddle(middleResponse.data.totalReviews);
      setCountByReviewSecondLast(secondLastResponse.data.totalReviews);
      setCountByReviewLast(lastResponse.data.totalReviews);
    } catch (error) {
      console.error("Error fetching review counts:", error);
    }
  };

  const handleFormSubmit = async () => {
    try {
      const formData = {
        name,
        subject,
        rate,
        text,
        photo,
      };
      await axiosInstance.post("/reviews", formData);
      notification.success({
        message: "Review Created",
        description: "The review has been successfully created.",
      });
      fetchReviews(); // Refresh reviews after creating a new one
      setModalVisible(false); // Close the modal after review creation
      // Reset form fields
      setName("");
      setSubject("");
      setRate(0);
      setText("");
      setPhoto("");
    } catch (error) {
      console.error("Error creating review:", error);
      notification.error({
        message: "Error",
        description: "Failed to create the review. Please try again later.",
      });
    }
  };

  return (
    <div>
      <HeaderBar />
      <PlanHeader type="list" />
      <div className="planContainer-Reviews">
        <span className="Overview-container-c-title">Overview All Reviews</span>
        <span className="Overview-container-c-subTitle">
          Find all Reviews below posted from our best Students! <br /> Share
          with Us!!
        </span>
        <div className="Overview-Review-Main-box">
          <div className="Overview-Review-container">
            <div className="Overview-Review-wrapper">
              <h1 className="Overview-Review-wrapper-header-text-titlecount">Overview Total Review: {totalReviews}</h1>
              <span className="overview-review-box-inner-detail-header">
                <span className="overview-review-box-inner-header-textdetail">
                  5 Star Review : {countByReviewTop}
                </span>
                <Flex
                  gap="middle"
                  vertical
                  className="overview-review-box-inner-detail-header-stars"
                >
                  <Rate value={5} disabled />
                </Flex>
              </span>
              <span className="overview-review-box-inner-detail-header">
                <span className="overview-review-box-inner-header-textdetail">
                  4 Star Review : {countByReviewTopSecond}
                </span>

                <Flex
                  gap="middle"
                  vertical
                  className="overview-review-box-inner-detail-header-stars"
                >
                  <Rate value={4} disabled />
                </Flex>
              </span>
              <span className="overview-review-box-inner-detail-header">
                <span className="overview-review-box-inner-header-textdetail">
                  3 Star Review : {countByReviewMiddle}
                </span>

                <Flex
                  gap="middle"
                  vertical
                  className="overview-review-box-inner-detail-header-stars"
                >
                  <Rate value={3} disabled />
                </Flex>
              </span>
              <span className="overview-review-box-inner-detail-header">
                <span className="overview-review-box-inner-header-textdetail">
                  2 Star Review : {countByReviewSecondLast}
                </span>
                <Flex
                  gap="middle"
                  vertical
                  className="overview-review-box-inner-detail-header-stars"
                >
                  <Rate value={2} disabled />
                </Flex>
              </span>
              <span className="overview-review-box-inner-detail-header">
                <span className="overview-review-box-inner-header-textdetail">
                  1 Star Review : {countByReviewLast}
                </span>

                <Flex
                  gap="middle"
                  vertical
                  className="overview-review-box-inner-detail-header-stars"
                >
                  <Rate value={1} disabled />
                </Flex>
              </span>
            </div>
          </div>
          Review Details
          <div className="Overview-Review-detail-container">
            <div className="Overview-Review-detail-container-main-box">
              <Button type="primary" onClick={() => setModalVisible(true)} className="overview-review-detail-container-btn">
                <span>Add New Review</span>
              </Button>
              <Modal
                title="Add New Review"
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={null}
              >
                <Form layout="vertical" onFinish={handleFormSubmit}>
                  <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                      { required: true, message: "Please input your name!" },
                    ]}
                  >
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Wick"
                    />
                  </Form.Item>
                  <Form.Item
                    label="Subject"
                    name="subject"
                    rules={[
                      { required: true, message: "Please input the subject!" },
                    ]}
                  >
                    <Input
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Subject"
                    />
                  </Form.Item>
                  <Form.Item
                    label="Rate"
                    name="rate"
                    rules={[
                      { required: true, message: "Please input the rate!" },
                      {
                        type: "number",
                        min: 1,
                        max: 5,
                        message: "Rate must be between 1 and 5",
                      },
                    ]}
                  >
                    <Rate count={5} value={rate} onChange={setRate} />
                  </Form.Item>

                  <Form.Item
                    label="Text"
                    name="text"
                    rules={[
                      { required: true, message: "Please input the text!" },
                    ]}
                  >
                    <Input.TextArea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="The Best Time ever!!!"
                    />
                  </Form.Item>
                  <Form.Item label="Photo URL" name="photo">
                    <Input
                      value={photo}
                      onChange={(e) => setPhoto(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      placeholder="place the URL please.... Link...."
                    >
                      Add Review
                    </Button>
                  </Form.Item>
                </Form>
              </Modal>
            </div>
            <div className="Overview-Review-detail-container-box">
              {reviews.slice(0, 8).map((review, index) => (
                <div key={index} className="Overview-Review-detailReview">
                  <Image
                    src={
                      review.photo ||
                      "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Download-Image.png"
                    }
                    alt="Avatar"
                  />
                  <div className="Overview-Review-detailReview-box">
                    <div className="Overview-Review-detailReview-header">
                      <span className="Overview-Review-detailReview-Name">
                        Name: {review.name}
                      </span>
                      <Flex
                        gap="middle"
                        vertical
                        className="flexratesReviewContainer"
                      >
                        <Rate value={review.rate} disabled />
                      </Flex>
                    </div>
                    <div className="Overview-Review-detailReview-details">
                      <p className="Overview-Review-detailReview-subject">
                        Subject: {review.subject}
                      </p>
                      <span className="Overview-Review-detailReview-text">
                        {review.text}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="Overview-Review-detailReview-date">
                      Created on: {review.createdAtFormatted}
                    </span>{" "}
                  </div>
                  {/* Display creation date and time all perfect  */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <MailList />
      <Footer />
    </div>
  );
};

export default Review;
