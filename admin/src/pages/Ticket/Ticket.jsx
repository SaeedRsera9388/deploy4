import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import SideBar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navbar/Navbar";
import { Button, Modal, notification, Form, Input, DatePicker, Select } from "antd";

const { Option } = Select;

const Ticket = () => {
  const columns = [
    { field: "trackingID", headerName: "Tracking ID", width: 150 },
    { field: "Program", headerName: "Program", width: 70 },
    { field: "Company", headerName: "Company", width: 70 },
    { field: "plan", headerName: "Plan", width: 70 },
    { field: "customerID", headerName: "Customer ID", width: 70 },
    { field: "Name", headerName: "Name", width: 70 },
    { field: "email", headerName: "Email", width: 70 },
    { field: "level", headerName: "Level", width: 70 },
    { field: "phone", headerName: "Phone", width: 70 },
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
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div>
          <Link to={`/tickets/${params.row.id}`}>View</Link>{" "}
          <button onClick={() => handleDelete(params.row.id)}>Delete</button>
        </div>
      ),
    },
  ];

  const [tickets, setTickets] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
});

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axiosInstance.get("/tickets");
      const updatedTickets = response.data.map((ticket) => ({
        ...ticket,
        id: ticket._id,
      }));
      setTickets(updatedTickets);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/tickets/${id}`);
      // Remove the deleted ticket from the list
      setTickets((prevTickets) =>
        prevTickets.filter((ticket) => ticket.id !== id)
      );
      // Show success notification
      notification.success({
        message: "Ticket Deleted",
        description: "The ticket has been successfully deleted.",
      });
    } catch (error) {
      console.error("Error deleting ticket:", error);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await axiosInstance.post("/tickets", values);
      form.resetFields();
      setIsModalVisible(false);
      fetchTickets();
      notification.success({
        message: "Ticket Created",
        description: "The ticket has been successfully created.",
      });
    } catch (error) {
      console.error("Error creating ticket:", error);
      notification.error({
        message: "Error",
        description: "Failed to create the ticket. Please try again later.",
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
          <h1>Tickets</h1>
        </div>
        <Button type="primary" onClick={showModal}>
          Add New Ticket
        </Button>
        <Modal
          title="Add New Ticket"
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
              <Input placeholder='Name or Company'/>
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
              name="Program"
              label="Program"
              rules={[{ required: true, message: "Please input program!" }]}
            >
              <Input placeholder='What program you looking for.....'/>
            </Form.Item>
            <Form.Item
              name="plan"
              label="Plan"
              rules={[{ required: true, message: "Please input plan!" }]}
            >
              <Input placeholder="duration"/>
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Please input email!" }]}
            >
              <Input placeholder='email@email.com'/>
            </Form.Item>
            
            
            <Form.Item
              name="level"
              label="Level"
              rules={[{ required: true, message: "Please input level!" }]}
            >
              <Input placeholder='A1,A2,B1,B2,C1,C2?'/>
            </Form.Item>
            <Form.Item
              name="phone"
              label="Phone"
              rules={[{ required: true, message: "Please input phone!" }]}
            >
              <Input placeholder='+1 (412) 315-5061'/>
            </Form.Item>
            <Form.Item
              name="desc"
              label="Description"
              rules={[{ required: true, message: "Please input description!" }]}
            >
              <Input placeholder='add more details can help us understand what you looking for'/>
            </Form.Item>
          </Form>
        </Modal>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid rows={tickets} columns={columns} pageSize={5} />
        </div>
      </div>
    </div>
  );
};

export default Ticket;
