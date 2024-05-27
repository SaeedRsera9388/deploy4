import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import SideBar from "../../components/sidebar/SideBar";
import { Form, Input, Button, Select, Space, message } from "antd";
import './SingleInquiry.scss';

const { Option } = Select;

const SingleInquiry = () => {
  const { id } = useParams();
  const [inquiry, setInquiry] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form] = Form.useForm();
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
});
  useEffect(() => {
    const fetchInquiry = async () => {
      try {
        const response = await axiosInstance.get(`/inquiries/${id}`);
        setInquiry(response.data);
      } catch (error) {
        console.error("Error fetching inquiry:", error);
      }
    };
    if (id) {
      fetchInquiry();
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
      await axiosInstance.put(`/inquiries/${id}`, values);
      setInquiry({ ...inquiry, ...values });
      setEditing(false);
      message.success('Inquiry updated successfully');
    } catch (error) {
      console.error("Error updating inquiry:", error);
      message.error('Failed to update inquiry');
    }
  };

  const inquiryFields = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "program", label: "Program" },
    { key: "subject", label: "Subject" },
    { key: "text", label: "Text" },
    { key: "Status", label: "Status", options: ["Pending", "Review", "Approved"] },
  ];

  return (
    <div className="new">
      <SideBar />
      <div className="newContainer">
        <Navbar />
        <div className="singleInquiryContainer">
          {inquiry && (
            <div className="singleInquiryContainer-wrapper">
              <h1>View Inquiry: {inquiry._id}</h1>
              <h1>Status: {inquiry.Status}</h1>
              <Form form={form} onFinish={handleSubmit} initialValues={inquiry}>
                {inquiryFields.map(({ key, label, options }) => (
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
                      <span>{inquiry[key]}</span>
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

export default SingleInquiry;
