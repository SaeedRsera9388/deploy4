import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button, message } from 'antd';
import Navbar from '../../components/navbar/Navbar';
import SideBar from '../../components/sidebar/SideBar';
import './SingleSubscribe.scss';

const SingleSubscribe = () => {
  const { id } = useParams();
  const [subscription, setSubscription] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form] = Form.useForm();
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
});
  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const response = await axiosInstance.get(`/subscribes/${id}`);
        setSubscription(response.data.subscription);
      } catch (error) {
        console.error('Error fetching subscription:', error);
        message.error('Failed to fetch subscription');
      }
    };
    if (id) {
      fetchSubscription();
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
      const updatedEmail = values.email; // Use 'email' field from form values
      await axiosInstance.put(`/subscribes/${id}`, { newEmail: updatedEmail });
      setSubscription({ ...subscription, email: updatedEmail });
      setEditing(false);
      message.success('Subscription updated successfully');
    } catch (error) {
      console.error('Error updating subscription:', error);
      message.error('Failed to update subscription');
    }
  };
  
  return (
    <div className="new">
      <SideBar />
      <div className="newContainer">
        <Navbar />
        <div className="singleSubscribeContainer">
          {subscription && (
            <div className="singleSubscribeContainer-wrapper">
              <h1>View Subscription: {subscription._id}</h1>
              <Form form={form} onFinish={handleSubmit} initialValues={subscription}>
                <Form.Item label="Email" name="email">
                  {!editing ? <span>{subscription.email}</span> : <Input />}
                </Form.Item>
                {editing ? (
                  <div>
                    <Button type="primary" htmlType="submit">
                      Save
                    </Button>
                    <Button onClick={handleCancelEdit}>Cancel</Button>
                  </div>
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

export default SingleSubscribe;
