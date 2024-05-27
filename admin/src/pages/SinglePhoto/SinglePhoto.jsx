import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import SideBar from "../../components/sidebar/SideBar";
import { Form, Input, Button, message } from "antd";
import './SinglePhoto.scss';

const SinglePhoto = () => {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form] = Form.useForm();
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
});
  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await axiosInstance.get(`/photos/${id}`);
        setPhoto(response.data);
      } catch (error) {
        console.error("Error fetching photo:", error);
        message.error('Failed to fetch photo');
      }
    };
    if (id) {
      fetchPhoto();
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
      const updatedPhoto = { ...photo, ...values };
      const response = await axiosInstance.put(`/photos/${id}`, updatedPhoto);
      setPhoto(response.data);
      setEditing(false);
      message.success('Photo updated successfully');
    } catch (error) {
      console.error("Error updating photo:", error);
      message.error('Failed to update photo');
    }
  };

  const photoFields = [
    { key: "photo", label: "Photo URL" },
    { key: "subject", label: "Subject" },
    { key: "text", label: "Text" }
  ];

  return (
    <div className="new">
      <SideBar />
      <div className="newContainer">
        <Navbar />
        <div className="singlePhotoContainer">
          {photo && (
            <div className="singlePhotoContainer-wrapper">
              <h1>Photo ID: {photo._id}</h1>
              <h1>View Photo: {photo.subject}</h1>
              <div>
                <img src={photo.photo} alt="Photo" style={{ maxWidth: '100%', maxHeight: '500px' }} />
              </div>
              <p>Created At: {new Date(photo.createdAt).toLocaleString()}</p>
              <Form form={form} onFinish={handleSubmit} initialValues={photo}>
                {photoFields.map(({ key, label }) => (
                  <Form.Item key={key} label={label} name={key}>
                    {editing ? <Input /> : <span>{photo[key]}</span>}
                  </Form.Item>
                ))}
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

export default SinglePhoto;
