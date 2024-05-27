import React, { useState, useEffect } from 'react';
import { Form, Input, Button, notification, Modal } from 'antd';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SideBar from '../../components/sidebar/SideBar';
import Navbar from '../../components/navbar/Navbar';

const Photo = () => {
  const [photos, setPhotos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
});

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'photo', headerName: 'Photo', width: 70, renderCell: (params) => <img src={params.value} alt="Photo" style={{ width: 100 }} /> },
    { field: 'subject', headerName: 'Subject', width: 70 },
    { field: 'text', headerName: 'Text', width: 70 },
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
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => (
        <div>
          <Button onClick={() => handleDeletePhoto(params.row.id)} variant="contained" color="secondary">
            Delete
          </Button>
          <Link to={`/photos/${params.row.id}`} style={{ marginLeft: 10 }}>View</Link>
        </div>
      )
    }
  ];

  const getAllPhotos = async () => {
    try {
      const response = await axiosInstance.get('/photos');
      setPhotos(response.data);
      console.log('Photos fetched successfully:', response.data);
    } catch (error) {
      console.error('Error fetching photos:', error);
      notification.error({
        message: 'Fetch Failed',
        description: 'Failed to fetch photos. Please try again later.',
      });
    }
  };

  useEffect(() => {
    getAllPhotos();
  }, []);

  const handleSubmit = async (values) => {
    try {
      const timestamp = new Date().toISOString();
      const photoData = {
        photo: values.photo, // Assuming values.photo contains the URL input by the user
        subject: values.subject,
        text: values.text,
        timestamp: timestamp
      };
  
      await axiosInstance.post('/photos', photoData);
  
      setModalVisible(false);
      form.resetFields(); // Reset form fields
      getAllPhotos();
  
      notification.success({
        message: 'Photo Created',
        description: 'The photo has been created successfully.',
      });
    } catch (error) {
      notification.error({
        message: 'Creation Failed',
        description: 'Failed to create photo. Please try again later.',
      });
    }
  };

  const handleDeletePhoto = async (id) => {
    try {
      await axiosInstance.delete(`/photos/${id}`);
      setPhotos(photos.filter(photo => photo.id !== id));
      notification.success({
        message: 'Photo Deleted',
        description: 'The photo has been deleted successfully.',
      });
    } catch (error) {
      notification.error({
        message: 'Delete Failed',
        description: 'Failed to delete photo. Please try again later.',
      });
    }
  };

  return (
    <div className="new">
      <SideBar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Photos</h1>
          <Button type="primary" onClick={() => setModalVisible(true)}>Add New Photo</Button>
        </div>
        <Modal
          title="Add New Photo"
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
        >
          <Form
            form={form}
            name="photoForm"
            onFinish={handleSubmit}
            initialValues={{ subject: '', text: '', photo: '' }} // Assuming 'photo' is the field for inputting the photo URL
          >
            <Form.Item
              label="Subject"
              name="subject"
              rules={[{ required: true, message: 'Please input the subject!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Text"
              name="text"
              rules={[{ required: true, message: 'Please input the text!' }]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              label="Photo URL"
              name="photo"
              rules={[{ required: true, message: 'Please input the photo URL!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Create
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={photos}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            checkboxSelection
            sortingMode="server"
            disableSelectionOnClick
          />
        </div>
      </div>
    </div>
  );
};

export default Photo;
