import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import SideBar from "../../components/sidebar/SideBar";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import './SingleComment.scss';

const SingleComment = () => {
  const { id } = useParams();
  const [comment, setComment] = useState(null);
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
});
  useEffect(() => {
    const fetchComment = async () => {
      try {
        const response = await axiosInstance.get(`/comments/${id}`);
        setComment(response.data);
      } catch (error) {
        console.error("Error fetching comment:", error);
      }
    };
    if (id) {
      fetchComment();
    }
  }, [id]);

  return (
    <div className="new">
      <SideBar />
      <div className="newContainer">
        <Navbar />
        <div className="singleCommentContainer">
          {comment && (
            <div className="singleCommentContainer-wrapper">
              <h1>View Comment: {comment._id}</h1>
              <div>
                <span>Name: {comment.name}</span>
              </div>
              <div>
                <span>Subject: {comment.subject}</span>
              </div>
              <div>
                <span>Text: {comment.text}</span>
              </div>
              <div>
                <span>Date: {new Date(comment.date).toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleComment;
