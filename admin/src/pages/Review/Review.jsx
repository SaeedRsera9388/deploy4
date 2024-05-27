import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import SideBar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navbar/Navbar";
import { notification, Modal, Form, Input, Button, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const Review = () => {


  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
});


  const columns = [
    {
      field: "photo",
      headerName: "Photo",
      width: 150,
      renderCell: (params) =>
        params.value ? (
          <img
            src={params.value}
            alt="Review"
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          />
        ) : (
          <Avatar icon={<UserOutlined />} />
        ),
    },
    { field: "name", headerName: "Name", width: 70 },
    { field: "subject", headerName: "Subject", width: 70 },
    { field: "rate", headerName: "Rate", width: 70 },
    { field: "text", headerName: "Text", width: 70 },
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
    },    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div>
          <Link to={`/reviews/${params.row.id}`}>View</Link>{" "}
          <button onClick={() => handleDelete(params.row.id)}>Delete</button>
        </div>
      ),
    },
  ];

  const [reviews, setReviews] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

 

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axiosInstance.get("/reviews");
      const updatedReviews = response.data.map((review) => ({
        ...review,
        id: review._id,
      }));
      setReviews(updatedReviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/reviews/${id}`);
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review.id !== id)
      );
      notification.success({
        message: "Review Deleted",
        description: "The review has been successfully deleted.",
      });
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await axiosInstance.post("/reviews", values);
      form.resetFields();
      setIsModalVisible(false);
      fetchReviews();
      notification.success({
        message: "Review Created",
        description: "The review has been successfully created.",
      });
    } catch (error) {
      console.error("Error creating review:", error);
      notification.error({
        message: "Error",
        description: "Failed to create the review. Please try again later.",
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
          <h1>Reviews</h1>
        </div>
        <Button type="primary" onClick={showModal}>
          Add New Review
        </Button>
        <Modal
          title="Add New Review"
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
              name="rate"
              label="Rate"
              rules={[
                { required: true, message: "Please input the rate!" },
                { min: 1, message: "Rate must be at least 1" },
                { max: 10, message: "Rate must be at most 10" },
              ]}
            >
              <Input type="number" min={1} max={10} />
            </Form.Item>
            <Form.Item
              name="text"
              label="Text"
              rules={[{ required: true, message: "Please input the text!" }]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              name="photo"
              label="Photo URL"
              rules={[{ required: true, message: "Please input the photo URL!" }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid rows={reviews} columns={columns} pageSize={5} />
        </div>
      </div>
    </div>
  );
};

export default Review;
