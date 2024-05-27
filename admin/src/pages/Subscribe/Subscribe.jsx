import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Modal, Form, Input, Button, notification } from "antd";
import SideBar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";

const Subscribe = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedSubscriptionId, setSelectedSubscriptionId] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
});
  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/subscribes");
      const subscriptionsWithIds = response.data.subscriptions.map((subscription, index) => ({
        ...subscription,
        id: index + 1, // Generate a unique id for each row
      }));
      setSubscriptions(subscriptionsWithIds);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
    }
    setLoading(false);
  };
  

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await axiosInstance.post("/subscribes", values);
      form.resetFields();
      setIsModalVisible(false);
      fetchSubscriptions();
      notification.success({
        message: "Subscription Created",
        description: "The subscription has been successfully created.",
      });
    } catch (error) {
      console.error("Error creating subscription:", error);
      notification.error({
        message: "Error",
        description:
          "Failed to create the subscription. Please try again later.",
      });
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleViewSubscription = (id) => {
    // Handle view subscription logic if needed
  };

  const handleDeleteSubscription = async () => {
    try {
      await axiosInstance.delete(`/subscribes/${selectedSubscriptionId}`);
      notification.success({
        message: "Subscription Deleted",
        description: "The subscription has been successfully deleted.",
      });
      fetchSubscriptions();
    } catch (error) {
      console.error("Error deleting subscription:", error);
      notification.error({
        message: "Error",
        description:
          "An error occurred while deleting the subscription.",
      });
    }
    setDeleteModalVisible(false); // Close the delete confirmation modal after deletion
  };

  const handleDeleteModalOpen = (id) => {
    setSelectedSubscriptionId(id);
    setDeleteModalVisible(true);
  };

  const handleDeleteModalClose = () => {
    setDeleteModalVisible(false);
  };

  const columns = [
    {
      field: "email",
      headerName: "Email",
      width: 200,
      sortable: false,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 200,
      sortable: false,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        return (
          <div>
            <Link to={`/subscribes/${params.row._id}`}>View</Link>{" "}
            <Button
              type="link"
              onClick={() => handleDeleteModalOpen(params.row._id)}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="new">
      <SideBar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Subscriptions</h1>
        </div>
        <Button type="primary" onClick={showModal}>
          Add New Subscription
        </Button>
        <Modal
          title="Add New Subscription"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title="Delete Subscription"
          visible={deleteModalVisible}
          onOk={handleDeleteSubscription}
          onCancel={handleDeleteModalClose}
        >
          <p>Are you sure you want to delete this subscription?</p>
        </Modal>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={subscriptions}
            columns={columns}
            loading={loading}
            pageSize={5}
          />
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
