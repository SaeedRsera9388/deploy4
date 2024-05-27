import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, notification } from "antd";
import HeaderBar from "../Header/HeaderBar";
import PlanHeader from "../PlanHeader/PlanHeader";
import MailList from "../MailList/MailList";
import Footer from "../Footer/SeraFooter";
import "./OverviewComments.scss";
import axios from "axios";

const Comment = () => {
  const [comments, setComments] = useState([]);
  const [totalComments, setTotalComments] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });

  useEffect(() => {
    fetchComments();
    fetchTotalCommentsCount();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axiosInstance.get("/comments");
      const fetchedComments = response.data.map((comment) => ({
        ...comment,
        createdAtFormatted: new Date(comment.createdAt).toLocaleString("en-GB"), // Fetch and format creation date and time
      }));
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

  const handleFormSubmit = async () => {
    try {
      const response = await axiosInstance.post("/comments", {
        name,
        subject,
        text,
      });
      const savedComment = response.data;
      setComments([...comments, savedComment]);
      setModalVisible(false);
      notification.success({
        message: "Comment Created",
        description: "Your comment has been successfully created.",
      });
    } catch (error) {
      console.error("Error creating comment:", error);
      notification.error({
        message: "Error",
        description: "Failed to create comment. Please try again later.",
      });
    }
  };

  return (
    <div>
      <HeaderBar />
      <PlanHeader type="list" />
      <div className="planContainer">
        <span className="Overview-Comment-header-maintitle">Post</span>
        <span className="Overview-Comment-header-subtitle">
          Share your Posts with Us!!
        </span>
        <div className="Overview-Comment-main-box">
          <div className="Overview-Comment-container">
            <div className="Overview-Comment-wrapper">
              <span>Total Posts: {totalComments}</span>
            </div>
            <div className="Overview-Comment-wrapper-box">
              <div className="Overview-Comment-wrapper-box-inner">
                <div className="Overview-Comment-wrapper-box-NewModalComments">
                  <Button type="primary" onClick={() => setModalVisible(true)}>
                    Add New Post
                  </Button>
                  <Modal
                    title="Add New Comment"
                    visible={modalVisible}
                    onCancel={() => setModalVisible(false)}
                    footer={null}
                  >
                    <Form layout="vertical" onFinish={handleFormSubmit}>
                      <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                          {
                            required: true,
                            message: "Please input your name!",
                          },
                        ]}
                      >
                        <Input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </Form.Item>
                      <Form.Item
                        label="Subject"
                        name="subject"
                        rules={[
                          {
                            required: true,
                            message: "Please input the subject!",
                          },
                        ]}
                      >
                        <Input
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                        />
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
                        />
                      </Form.Item>
                      <Form.Item>
                        <Button type="primary" htmlType="submit">
                          Add Post
                        </Button>
                      </Form.Item>
                    </Form>
                  </Modal>
                </div>
                <div className="Overview-Comment-wrapper-detailBox">
                  {comments.map((comment, index) => (
                    <div
                      key={index}
                      className="Overview-Comment-wrapper-detailBox-header"
                    >
                      <div className="Overview-Comment-wrapper-detailBox-header-inner">
                        <div className="Overview-Comment-wrapper-detailBox-header-inner-box">
                          <div className="Overview-Comment-wrapper-detailBox-header-inner-box-left">
                            <span className="Overview-Comment-wrapper-detailBox-header-inner-box-left-header">
                              NickName: <br/>{comment.name}
                            </span>
                          </div>
                          <div className="Overview-Comment-wrapper-detailBox-inner-text-right">
                            <p>Subject: {comment.subject}</p>
                            <span className="Overview-Comment-wrapper-detailBox-inner-text">
                              {comment.text}
                            </span>
                          </div>
                        </div>
                        <div className="Overview-Comment-wrapper-detailBox-Date">
                          <div>Date {comment.createdAtFormatted}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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

export default Comment;
