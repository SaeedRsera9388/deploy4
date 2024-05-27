import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import SideBar from "../../components/sidebar/SideBar";
import { Table, Button, Form, Input, Select, Space, Row, Col } from "antd";
import './SingleClient.scss'

const { Option } = Select;

const SingleClient = () => {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form] = Form.useForm();
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
});
  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await axiosInstance.get(`/clients/${id}`);
        setClient(response.data);
      } catch (error) {
        console.error("Error fetching client:", error);
      }
    };
    if (id) {
      fetchClient();
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
      await axiosInstance.put(`/clients/${id}`, values);
      setClient({ ...client, ...values });
      setEditing(false);
    } catch (error) {
      console.error("Error updating client:", error);
    }
  };

  const clientFields = [
    { key: "Name", label: "Name" },
    { key: "Company", label: "Company", options: ["Company", "Private"] },
    { key: "email", label: "Email" },
    { key: "Country", label: "Country" },
    { key: "program", label: "Program" },
    { key: "language", label: "Language" },
    { key: "Phone", label: "Phone" },
    { key: "Age", label: "Age" },
    { key: "participants", label: "Participants" },
    { key: "Price", label: "Price" },
    { key: "startingDate", label: "Starting Date" },
    { key: "endDate", label: "End Date" },
    { key: "createdAt", label: "Created At" },
    { key: "Payment", label: "Payment", options: ["Paid", "Unpaid"] },
    {
      key: "Status",
      label: "Status",
      options: ["Pending", "Review", "Approved"],
    },
    { key: "notes", label: "Notes" },
  ];

  return (
    <div className="new">
      <SideBar />
      <div className="newContainer">
        <Navbar />
      <div className="singleClientcontainer">
        {client && (
          <div className="singleClientcontainer-wrapper">
            <h1>View Client: {client.ClientTID}</h1>
            <h2>RIF: {client.RIF}</h2>
            <h2>status: {client.Status}</h2>
            <Form form={form} onFinish={handleSubmit} initialValues={client}>
              {clientFields.map(({ key, label, options }) => (
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
                    <span>{client[key]}</span>
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

export default SingleClient;
