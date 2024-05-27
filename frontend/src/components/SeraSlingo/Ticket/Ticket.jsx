import React, { useEffect } from 'react';
import { Button, message, Form, Input, Select } from "antd";
import axios from 'axios';
import HeaderBar from '../Header/HeaderBar';
import PlanHeader from '../PlanHeader/PlanHeader';
import Footer from '../Footer/SeraFooter';

const { Option } = Select;

const Ticket = () => {
  const [form] = Form.useForm();
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });

  const handleSubmit = async () => {
    try {
      const formData = await form.validateFields();
      const response = await axiosInstance.post('/tickets', formData);

      if (response.status === 201) {
        message.success('😊Your appointment has been successfully booked!😁 You will receive an email shortly with a confirmation of the appointment😃. Thank you for considering SeraSlingo😊.');
        form.resetFields();
      } else {
        throw new Error('Failed to create the ticket.');
      }
    } catch (error) {
      console.error('Error creating ticket:', error);
      message.error('Failed to create the ticket. Please try again later.');
    }
  };

  return (
    <div>
      <HeaderBar />
      <PlanHeader type="list" />
      <div className="planContainer">
        <h1>Book an appointment</h1>
        <Form
          layout="vertical"
          form={form}
          onFinish={handleSubmit}
        >
          <Form.Item
            name="Name"
            label="Name"
            rules={[{ required: true, message: "Please input name!" }]}
          >
            <Input placeholder='Name or Company' />
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
            <Input placeholder='What program you looking for.....' />
          </Form.Item>
          <Form.Item
            name="plan"
            label="Plan"
            rules={[{ required: true, message: "Please input plan!" }]}
          >
            <Input placeholder="duration" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please input email!" }]}
          >
            <Input placeholder='email@email.com' />
          </Form.Item>
          <Form.Item
            name="level"
            label="Level"
            rules={[{ required: true, message: "Please input level!" }]}
          >
            <Input placeholder='A1,A2,B1,B2,C1,C2?' />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true, message: "Please input phone!" }]}
          >
            <Input placeholder='+1 (412) 315-5061' />
          </Form.Item>
          <Form.Item
            name="desc"
            label="Description"
            rules={[{ required: true, message: "Please input description!" }]}
          >
            <Input placeholder='add more details can help us understand what you looking for!' />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Book!
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Footer />
    </div>
  );
};

export default Ticket;
