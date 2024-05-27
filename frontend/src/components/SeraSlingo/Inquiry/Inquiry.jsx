import React, { useEffect } from 'react';
import { Button, message, Form, Input } from 'antd';
import axios from 'axios';
import HeaderBar from '../Header/HeaderBar';
import PlanHeader from '../PlanHeader/PlanHeader';
import Footer from '../Footer/SeraFooter';

const Inquiry = () => {
  const [form] = Form.useForm();
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });

  const handleSubmit = async () => {
    try {
      const formData = await form.validateFields();
      const response = await axiosInstance.post('/inquiries', formData);

      if (response.status === 201) {
        message.success('Your inquiry has been successfully created. You will receive a response shortly.');
        form.resetFields();
      } else {
        throw new Error('Failed to create the inquiry.');
      }
    } catch (error) {
      console.error('Error creating inquiry:', error);
      message.error('Failed to create the inquiry. Please try again later.');
    }
  };

  return (
    <div>
      <HeaderBar />
      <PlanHeader type="list" />
      <div className="planContainer">
        <h1>Submit your Inquiry and receive a prompt response!</h1>
        <Form
          layout="vertical"
          form={form}
          onFinish={handleSubmit}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input placeholder='John Wick' />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input placeholder='john@gmail.com' />
          </Form.Item>
          <Form.Item
            name="program"
            label="Program"
            rules={[{ required: true, message: 'Please enter the program' }]}
          >
            <Input placeholder='English C2 level' />
          </Form.Item>
          <Form.Item
            name="subject"
            label="Subject"
            rules={[{ required: true, message: 'Please enter the subject' }]}
          >
            <Input placeholder='duration of the program......' />
          </Form.Item>
          <Form.Item
            name="text"
            label="Text"
            rules={[{ required: true, message: 'Please enter the inquiry text' }]}
          >
            <Input.TextArea placeholder='kindly inform me.........' />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit Inquiry
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Footer />
    </div>
  );
};

export default Inquiry;
