import React, { useState } from 'react';
import axios from 'axios';
import { notification } from 'antd'; // Import notification from Ant Design
import './MailList.scss';

const MailList = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:8800/backend',
});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axiosInstance.post('/subscribes', { email }); // Sending email as an object
      setEmail('');
      setLoading(false);
      notification.success({ // Show success notification
        message: 'Subscribed successfully, thank you!',
        description: 'You will receive all the updates to your mail. Thank you for considering SeraSlingo..',
      });
    } catch (error) {
      console.error('Error creating subscription:', error);
      notification.error({ // Show error notification
        message: 'Error',
        description: 'Failed to create the subscription. Please try again later.',
      });
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="mail">
      <h1 className="mailTitle">For more Exciting news and updates, Subscribe </h1>
      <span className="mailDesc"></span>
      <div className="mailInputContainer">
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Your Email" value={email} onChange={handleChange} />
          <button type="submit" disabled={loading}>
            {loading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MailList;
