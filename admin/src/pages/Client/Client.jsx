import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import {
  Button,
  Modal,
  notification,
  Form,
  Input,
  DatePicker,
  Select,
} from "antd";
import SideBar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navbar/Navbar";

const { Option } = Select;

const Client = () => {

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
});



  const columns = [
    { field: "ClientTID", headerName: "ClientTID", width: 120 },
    { field: "RIF", headerName: "RIF", width: 120 },
    { field: "Name", headerName: "Name", width: 70 },
    { field: "Company", headerName: "Company", width: 70 },
    { field: "language", headerName: "language", width: 70 },
    { field: "email", headerName: "Email", width: 70 },
    { field: "Country", headerName: "Country", width: 70 },
    { field: "program", headerName: "Program", width: 70 },
    { field: "Phone", headerName: "Phone", width: 70 },
    { field: "Age", headerName: "Age", width: 70 },
    { field: "participants", headerName: "Participants", width: 70 },
    { field: "Price", headerName: "Price", width: 80 },
    { field: "startingDate", headerName: "Starting Date", width: 70 },
    { field: "endDate", headerName: "End Date", width: 70 },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 180,
      valueGetter: (params) => {
        const date = new Date(params.row.createdAt);
        const formattedDate = date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
        const formattedTime = date.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
        return `${formattedDate} ${formattedTime}`;
      },
    },
    { field: "Payment", headerName: "Payment", width: 70 },
    {
      field: "Status",
      headerName: "Status",
      width: 70,
      cellClassName: (params) => getStatusClass(params.row.Status),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div>
          <Link to={`/clients/${params.row.id}`}>View</Link>{" "}
          <button onClick={() => handleDelete(params.row.id)}>Delete</button>
        </div>
      ),
    },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "yellow";
      case "Review":
        return "red";
      case "Approved":
        return "green";
      default:
        return "";
    }
  };

  const [clients, setClients] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axiosInstance.get("/clients");
      const updatedClients = response.data.map((client) => ({
        ...client,
        id: client._id,
        createdAt: new Date(client.createdAt).toLocaleString(), // Format createdAt date
      }));
      setClients(updatedClients);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/clients/${id}`);
      // Remove the deleted client from the list
      setClients((prevClients) =>
        prevClients.filter((client) => client.id !== id)
      );
      // Show success notification
      notification.success({
        message: "Client Deleted",
        description: "The client has been successfully deleted.",
      });
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await axiosInstance.post("/clients", values);
      form.resetFields();
      setIsModalVisible(false);
      fetchClients();
      notification.success({
        message: "Client Created",
        description: "The client has been successfully created.",
      });
    } catch (error) {
      console.error("Error creating client:", error);
      notification.error({
        message: "Error",
        description: "Failed to create the client. Please try again later.",
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
          <h1>Clients</h1>
        </div>
        <Button type="primary" onClick={showModal}>
          Add New Client
        </Button>
        <Modal
          title="Add New Client"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="Name"
              label="Name"
              rules={[{ required: true, message: "Please input name!" }]}
            >
              <Input placeholder="Name" />
            </Form.Item>

            <Form.Item
              name="Company"
              label="Company"
              rules={[{ required: true, message: "Please select company!" }]}
            >
              <Select>
                <Option value="Company">Company</Option>
                <Option value="Private">Private</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Please input email!" }]}
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="language"
              label="Language"
              rules={[{ required: true, message: "Please input language!" }]}
            >
              <Input placeholder="Language" />
            </Form.Item>
            <Form.Item
              name="program"
              label="Program"
              rules={[{ required: true, message: "Please input program!" }]}
            >
              <Input placeholder="Program" />
            </Form.Item>
            <Form.Item
              name="Country"
              label="Country"
              rules={[{ required: true, message: "Please input country!" }]}
            >
              <Input placeholder="Country" />
            </Form.Item>
            <Form.Item
              name="Phone"
              label="Phone"
              rules={[{ required: true, message: "Please input phone!" }]}
            >
              <Input placeholder="Phone" />
            </Form.Item>

            <Form.Item
              name="Age"
              label="Age"
              rules={[{ required: true, message: "Please input age!" }]}
            >
              <Input placeholder="Age / Age Range" />
            </Form.Item>

            <Form.Item name="participants" label="Participants">
              <Input type="number" placeholder="Participants" />
            </Form.Item>
            <Form.Item
              name="Price"
              label="Price"
              rules={[{ required: true, message: "Please input price!" }]}
            >
              <Input type="number" placeholder="Price" />
            </Form.Item>
            <Form.Item
              name="startingDate"
              label="Starting Date"
              rules={[
                { required: true, message: "Please select starting date!" },
              ]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              name="endDate"
              label="End Date"
              rules={[{ required: true, message: "Please select end date!" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              name="Payment"
              label="Payment"
              rules={[
                { required: true, message: "Please select payment status!" },
              ]}
            >
              <Select>
                <Option value="Paid">Paid</Option>
                <Option value="Unpaid">Unpaid</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="notes" // Corrected field name to match the schema
              label="Notes"
              rules={[{ required: true, message: "Please input notes!" }]}
            >
              <Input placeholder="Notes" />
            </Form.Item>
          </Form>
        </Modal>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid rows={clients} columns={columns} pageSize={5} />
        </div>
      </div>
    </div>
  );
};

export default Client;
