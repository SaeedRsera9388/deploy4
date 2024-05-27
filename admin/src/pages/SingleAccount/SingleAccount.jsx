import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import SideBar from "../../components/sidebar/SideBar";
import { Button, Form, Input, Select, Space } from "antd";
import "./SingleAccount.scss";

const { Option } = Select;

const SingleAccount = () => {
  const { id } = useParams();
  const [account, setAccount] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form] = Form.useForm();
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
});
  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const response = await axiosInstance.get(`/accounts/${id}`);
        setAccount(response.data);
      } catch (error) {
        console.error("Error fetching account:", error);
      }
    };
    if (id) {
      fetchAccount();
    }
  }, [id]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancelEdit = () => {
    setEditing(false);
    form.resetFields();
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await axiosInstance.put(`/accounts/${id}`, values);
      setAccount({ ...account, ...values });
      setEditing(false);
    } catch (error) {
      console.error("Error updating account:", error);
    }
  };

  const accountFields = [
    { key: "Title", label: "Title" },
    { key: "name", label: "Name" },
    { key: "recipient", label: "Recipient", options: ["Company", "Private"] },
    {
      key: "paymentType",
      label: "Payment Type",
      options: ["Receive", "Send"],
    },
    { key: "Payment", label: "Payment", options: ["Paid", "Unpaid"] },
    {
      key: "remainingCost",
      label: "Remaining Cost",
      options: ["Paid", "Unpaid", "None"],
    },
    { key: "expiryDate", label: "Expiry Date" },
    { key: "actionText", label: "Action Text" },
    { key: "paymentAmount", label: "Payment Amount" },
    { key: "notes", label: "Notes" },
    { key: "renew", label: "Renew", options: ["Yes", "No"] },
    { key: "createdAt", label: "Created At" },
    {
      key: "Status",
      label: "Status",
      options: ["Pending", "Review", "Approved"],
    },
  ];

  return (
    <div className="new">
      <SideBar />
      <div className="newContainer">
        <Navbar />
        <div className="singleAccountContainer">
          {account && (
            <div className="singleAccountContainer-wrapper">
              <h1>Invoice ID: {account.invoiceID}</h1>
              <h1>Reference ID: {account.referenceID}</h1>
              <h1>Status: {account.Status}</h1>
              <h1>Payment Amount: {account.paymentAmount} AMD</h1>
              <Form form={form} onFinish={handleSubmit} initialValues={account}>
                {accountFields.map(({ key, label, options }) => (
                  <Form.Item key={key} label={label} name={key}>
                    {editing ? (
                      options ? (
                        <Select style={{ width: 200 }}>
                          {options.map((option) => (
                            <Option key={option} value={option}>
                              {option}
                            </Option>
                          ))}
                        </Select>
                      ) : (
                        <Input />
                      )
                    ) : (
                      <span>{account[key]}</span>
                    )}
                  </Form.Item>
                ))}
                {editing ? (
                  <Space>
                    <Button type="primary" htmlType="submit">
                      Save
                    </Button>
                    <Button onClick={handleCancelEdit}>Cancel</Button>
                  </Space>
                ) : (
                  <Button onClick={handleEdit}>Edit</Button>
                )}
              </Form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleAccount;
