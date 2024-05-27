import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import SideBar from "../../components/sidebar/SideBar";
import { Table, Button, Form, Input, Select, Space, message } from "antd";
import './SingleTicket.scss';

const { Option } = Select;

const SingleTicket = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form] = Form.useForm();
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
});
  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axiosInstance.get(`/tickets/${id}`);
        setTicket(response.data);
      } catch (error) {
        console.error("Error fetching ticket:", error);
      }
    };
    if (id) {
      fetchTicket();
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
      await axiosInstance.put(`/tickets/${id}`, values);
      setTicket({ ...ticket, ...values });
      setEditing(false);
      message.success('Ticket updated successfully');
    } catch (error) {
      console.error("Error updating ticket:", error);
      message.error('Failed to update ticket');
    }
  };

  const ticketFields = [
    { key: "Name", label: "Name" },
    { key: "Company", label: "Company", options: ["Company", "Private"] },
    { key: "email", label: "Email" },
    { key: "Program", label: "Program" },
    { key: "plan", label: "Plan" },
    { key: "level", label: "Level" },
    { key: "phone", label: "Phone" },
    { key: "desc", label: "Description" },
    { key: "Status", label: "Status", options: ["Pending", "Review", "Approved"] },
  ];

  return (
    <div className="new">
      <SideBar />
      <div className="newContainer">
        <Navbar />
        <div className="singleTicketContainer">
          {ticket && (
            <div className="singleTicketContainer-wrapper">
              <h1>View Ticket: {ticket.trackingID}</h1>
              <h2>Customer ID: {ticket.customerID}</h2>
              <h2>Status: {ticket.Status}</h2>
              <Form form={form} onFinish={handleSubmit} initialValues={ticket}>
                {ticketFields.map(({ key, label, options }) => (
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
                      <span>{ticket[key]}</span>
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

export default SingleTicket;
