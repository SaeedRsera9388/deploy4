import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import SideBar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navbar/Navbar";
import { notification, Modal, Form, Input, Button } from "antd";

const Inquiry = () => {
  const columns = [
    { field: "name", headerName: "Name", width: 70 },
    { field: "email", headerName: "Email", width: 70 }, // Include email column
    { field: "program", headerName: "Program", width: 70 },
    { field: "subject", headerName: "Subject", width: 70 },
    { field: "text", headerName: "Text", width: 70 },
    { field: "Status", headerName: "Status", width: 70 },
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
          <Link to={`/inquiries/${params.row.id}`}>View</Link>{" "}
          <button onClick={() => handleDelete(params.row.id)}>Delete</button>
        </div>
      ),
    },
  ];

  const [inquiries, setInquiries] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
});
  

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const response = await axiosInstance.get("/inquiries");
      const updatedInquiries = response.data.map((inquiry) => ({
        ...inquiry,
        id: inquiry._id,
      }));
      setInquiries(updatedInquiries);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/inquiries/${id}`);
      // Remove the deleted inquiry from the list
      setInquiries((prevInquiries) =>
        prevInquiries.filter((inquiry) => inquiry.id !== id)
      );
      // Show success notification
      notification.success({
        message: "Inquiry Deleted",
        description: "The inquiry has been successfully deleted.",
      });
    } catch (error) {
      console.error("Error deleting inquiry:", error);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await axiosInstance.post("/inquiries", values); // Make sure your server accepts email field
      form.resetFields();
      setIsModalVisible(false);
      fetchInquiries();
      notification.success({
        message: "Inquiry Created",
        description: "The inquiry has been successfully created.",
      });
    } catch (error) {
      console.error("Error creating inquiry:", error);
      notification.error({
        message: "Error",
        description: "Failed to create the inquiry. Please try again later.",
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
          <h1>Inquiries</h1>
        </div>
        <Button type="primary" onClick={showModal}>
          Add New Inquiry
        </Button>
        <Modal
          title="Add New Inquiry"
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
              name="email" // Add email field
              label="Email"
              rules={[
                { required: true, message: "Please input your email!" },
                {
                  type: "email",
                  message: "Please enter a valid email address",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="program"
              label="Program"
              rules={[{ required: true, message: "Please input the program!" }]}
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
          <DataGrid rows={inquiries} columns={columns} pageSize={5} />
        </div>
      </div>
    </div>
  );
};

export default Inquiry;
