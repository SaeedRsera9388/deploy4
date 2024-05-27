import React, { useState, useEffect } from 'react';
import { Form, Input, Button, notification, Modal, Table, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import SideBar from '../../components/sidebar/SideBar';
import Navbar from '../../components/navbar/Navbar';

const { Option } = Select;

const Youtube = () => {
  const [youtubes, setYoutubes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [uploadMethod, setUploadMethod] = useState('url'); // Default to URL upload
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
});
  const columns = [
    { title: 'Subject', dataIndex: 'subject', key: 'subject' },
    { title: 'Text', dataIndex: 'text', key: 'text' },
    { 
      title: 'Date Time', 
      dataIndex: 'date', 
      key: 'date', 
      render: (date) => (new Date(date)).toLocaleString() 
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button type="primary" onClick={() => handleViewYoutube(record)}>View</Button>
          <Button type="danger" onClick={() => handleDeleteYoutube(record._id)}>Delete</Button>
        </span>
      ),
    },
  ];

  // Define handleDeleteYoutube function
  const handleDeleteYoutube = async (id) => {
    try {
      await axiosInstance.delete(`/youtubes/${id}`);
      setYoutubes(youtubes.filter(youtube => youtube._id !== id));
      notification.success({
        message: 'Youtube Video Deleted',
        description: 'The Youtube video has been deleted successfully.',
      });
    } catch (error) {
      notification.error({
        message: 'Delete Failed',
        description: 'Failed to delete Youtube video. Please try again later.',
      });
    }
  };

  useEffect(() => {
    getAllYoutubes();
  }, []);

  const getAllYoutubes = async () => {
    try {
      const response = await axiosInstance.get('/youtubes');
      setYoutubes(response.data);
    } catch (error) {
      console.error('Error fetching Youtube videos:', error);
    }
  };

  const handleSubmit = async (values) => {
    try {
      const youtubeData = {
        vid: values.vid,
        subject: values.subject,
        text: values.text,
      };

      // Create the Youtube video
      await axiosInstance.post('/youtubes', youtubeData);

      setModalVisible(false);
      form.resetFields();
      getAllYoutubes();

      notification.success({
        message: 'Youtube Video Created',
        description: 'The Youtube video has been created successfully.',
      });
    } catch (error) {
      notification.error({
        message: 'Creation Failed',
        description: 'Failed to create Youtube video. Please try again later.',
      });
    }
  };


  const handleViewYoutube = (record) => {
    Modal.info({
      title: 'Youtube Video Preview',
      content: (
        <div className="ratio ratio-16x9">
          <iframe
            src={record.vid}
            title="YouTube video"
            allowFullScreen
          />
        </div>
      ),
      onOk() {},
    });
  };


   return (
    <div className="new">
      <SideBar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Youtube</h1>
          <Button type="primary" onClick={() => setModalVisible(true)}>Add New Youtube Video</Button>
        </div>
        <Modal
          title="Add New Youtube Video"
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
        >
          <Form
            form={form}
            name="youtubeForm"
            onFinish={handleSubmit}
            initialValues={{ subject: '', text: '', vid: '', uploadMethod: 'url' }}
          >
            {/* <Form.Item
              label="Vid"
              name="vid"
              rules={[{ required: true, message: 'Please input the vid!' }]}
            >
              <Input />
            </Form.Item> */}
            <Form.Item
              label="Upload Method"
              name="uploadMethod"
            >
              <Select defaultValue="url" onChange={(value) => setUploadMethod(value)}>
                <Option value="url">URL</Option>
                <Option value="file">File</Option>
              </Select>
            </Form.Item>
            {uploadMethod === 'url' ? (
              <Form.Item
              label="Vid"
              name="vid"
                rules={[{ required: true, message: 'Please input the video URL!' }]}
              >
                <Input />
              </Form.Item>
            ) : (
              <Form.Item
                label="Video File"
                name="videoFile"
                valuePropName="fileList"
                getValueFromEvent={(e) => e.fileList}
                rules={[{ required: true, message: 'Please upload the video file!' }]}
              >
                <Upload name="video" action="/api/upload" accept="video/*" maxCount={1}>
                  <Button icon={<UploadOutlined />}>Upload Video</Button>
                </Upload>
              </Form.Item>
            )}
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
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form>
        </Modal>
        <Table columns={columns} dataSource={youtubes} />
      </div>
    </div>
  );
};

export default Youtube;