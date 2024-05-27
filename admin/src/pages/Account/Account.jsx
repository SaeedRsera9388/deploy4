import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
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

const Account = () => {


  
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
});



  const columns = [
    { field: "Title", headerName: "Title", width: 50 },
    { field: "name", headerName: "Name", width: 50 },
    { field: "recipient", headerName: "Recipient", width: 50 },
    { field: "paymentType", headerName: "Payment Type", width: 50 },
    { field: "invoiceID", headerName: "Invoice ID", width: 50 },
    { field: "Payment", headerName: "Payment", width: 50 },
    { field: "remainingCost", headerName: "Remaining Cost", width: 50 },
    { field: "expiryDate", headerName: "Expiry Date", width: 50 },
    { field: "actionText", headerName: "Action Text", width: 50 },
    { field: "paymentAmount", headerName: "Payment Amount", width: 50 },
    { field: "notes", headerName: "Notes", width: 50 },
    { field: "referenceID", headerName: "Reference ID", width: 50 },
    { field: "renew", headerName: "Renew", width: 50 },
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
    {
      field: "Status",
      headerName: "Status",
      width: 120,
      cellClassName: (params) => getStatusClass(params.row.Status),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div>
          <Link to={`/accounts/${params.row.id}`}>View</Link>{" "}
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

  const [accounts, setAccounts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await axiosInstance.get("/accounts");
      const formattedAccounts = response.data.map((account) => ({
        ...account,
        id: account._id, // Assign _id as the id property
      }));
      setAccounts(formattedAccounts);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/accounts/${id}`);
      // Remove the deleted account from the list
      setAccounts((prevAccounts) =>
        prevAccounts.filter((account) => account.id !== id)
      );
      // Show success notification
      notification.success({
        message: "Account Deleted",
        description: "The account has been successfully deleted.",
      });
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await axiosInstance.post("/accounts", values);
      form.resetFields();
      setIsModalVisible(false);
      fetchAccounts();
      notification.success({
        message: "Account Created",
        description: "The account has been successfully created.",
      });
    } catch (error) {
      console.error("Error creating account:", error);
      notification.error({
        message: "Error",
        description: "Failed to create the account. Please try again later.",
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
          <h1>Accounts</h1>
        </div>
        <Button type="primary" onClick={showModal}>
          Add New Account
        </Button>
        <Modal
          title="Add New Account"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="Title"
              label="Title"
              rules={[{ required: true, message: "Please input title!" }]}
            >
              <Input placeholder="Title" />
            </Form.Item>

            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please input name!" }]}
            >
              <Input placeholder="Name" />
            </Form.Item>

            <Form.Item
              name="recipient"
              label="Recipient"
              rules={[{ required: true, message: "Please select recipient!" }]}
            >
              <Select>
                <Option value="Company">Company</Option>
                <Option value="Private">Private</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="paymentType"
              label="Payment Type"
              rules={[
                { required: true, message: "Please select payment type!" },
              ]}
            >
              <Select>
                <Option value="Receive">Receive</Option>
                <Option value="Send">Send</Option>
              </Select>
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
              name="expiryDate"
              label="Expiry Date"
              rules={[
                { required: true, message: "Please select expiry date!" },
              ]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              name="actionText"
              label="Action Text"
              rules={[{ required: true, message: "Please input action text!" }]}
            >
              <Input placeholder="Action Text" />
            </Form.Item>

            <Form.Item
              name="paymentAmount"
              label="Payment Amount"
              rules={[
                { required: true, message: "Please input payment amount!" },
              ]}
            >
              <Input type="number" placeholder="Payment Amount" />
            </Form.Item>

            <Form.Item
              name="notes"
              label="Notes"
              rules={[{ required: true, message: "Please input notes!" }]}
            >
              <Input.TextArea rows={4} placeholder="Notes" />
            </Form.Item>

            <Form.Item
              name="renew"
              label="Renew"
              rules={[
                { required: true, message: "Please select renew status!" },
              ]}
            >
              <Select>
                <Option value="Yes">Yes</Option>
                <Option value="No">No</Option>
              </Select>
            </Form.Item>

            {/* Default Status */}
            <Form.Item
              name="Status"
              initialValue="Pending"
              style={{ display: "none" }}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>

        <div style={{ height: 400, width: "100%" }}>
          <DataGrid rows={accounts} columns={columns} pageSize={5} />
        </div>
      </div>
    </div>
  );
};

export default Account;
