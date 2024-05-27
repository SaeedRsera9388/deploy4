import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import SideBar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navbar/Navbar";
import { notification, Modal, Form, Input, Button } from "antd";

const Comment = () => {
  
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
});

  const columns = [
    { field: "name", headerName: "Name", width: 150 },
    { field: "subject", headerName: "Subject", width: 150 },
    { field: "text", headerName: "Text", width: 150 },
    { 
      field: "createdAt", 
      headerName: "Created At", 
      width: 180,
      valueGetter: (params) => {
        const date = new Date(params.row.createdAt);
        const formattedDate = date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
        const formattedTime = date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
        return `${formattedDate} ${formattedTime}`;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div>
          <Link to={`/comments/${params.row.id}`}>View</Link>{" "}
          <button onClick={() => handleDelete(params.row.id)}>Delete</button>
        </div>
      ),
    },
  ];

  const [comments, setComments] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axiosInstance.get("/comments");
      const updatedComments = response.data.map((comment) => ({
        ...comment,
        id: comment._id,
      }));
      setComments(updatedComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/comments/${id}`);
      // Remove the deleted comment from the list
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== id)
      );
      // Show success notification
      notification.success({
        message: "Comment Deleted",
        description: "The comment has been successfully deleted.",
      });
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await axiosInstance.post("/comments", values);
      form.resetFields();
      setIsModalVisible(false);
      fetchComments();
      notification.success({
        message: "Comment Created",
        description: "The comment has been successfully created.",
      });
    } catch (error) {
      console.error("Error creating comment:", error);
      notification.error({
        message: "Error",
        description: "Failed to create the comment. Please try again later.",
      });
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="new">
      <SideBar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Comments</h1>
        </div>
        <Button type="primary" onClick={showModal}>
          Add New Comment
        </Button>
        <Modal
          title="Add New Comment"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="subject"
              label="Subject"
              rules={[{ required: true, message: "Please input the subject!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="text"
              label="Text"
              rules={[{ required: true, message: "Please input the text!" }]}
            >
              <Input.TextArea />
            </Form.Item>
          </Form>
        </Modal>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid rows={comments} columns={columns} pageSize={5} />
        </div>
      </div>
    </div>
  );
};

export default Comment;
