import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, notification } from "antd";
import axios from "axios";
import SideBar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navbar/Navbar";
import moment from "moment";

const Video = () => {
  const [seraslingoVideos, setSeraslingoVideos] = useState([]);
  const [serastechVideos, setSerastechVideos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [videoType, setVideoType] = useState("");
  const [form] = Form.useForm();
  const [selectedVideo, setSelectedVideo] = useState("");
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });

  const allowedLanguages = [
    "English", "German", "Spanish", "Polish", "French", "Arabic",
    "Russia", "Korea", "Armenia", "Urdu", "Farsi", "Hindi", "China", "Japan"
  ];

  useEffect(() => {
    fetchSeraslingoVideos();
    fetchSerastechVideos();
  }, []);

  const fetchSeraslingoVideos = async () => {
    try {
      const response = await axiosInstance.get("/seraslingovideos");
      setSeraslingoVideos(response.data);
    } catch (error) {
      console.error("Error fetching Seraslingo videos:", error);
    }
  };

  const fetchSerastechVideos = async () => {
    try {
      const response = await axiosInstance.get("/serastechvideos");
      setSerastechVideos(response.data);
    } catch (error) {
      console.error("Error fetching Serastech videos:", error);
    }
  };

  const handleAddVideo = (type) => {
    setVideoType(type);
    setModalVisible(true);
  };

  const handleAddSeraslingo = async (values) => {
    try {
      const seraslingoData = {
        video: values.video,
        language: values.language,
        desc: values.desc,
      };

      await axiosInstance.post("/seraslingovideos", seraslingoData);
      notification.success({ message: "Seraslingo video added successfully" });
      setModalVisible(false);
      fetchSeraslingoVideos();
    } catch (error) {
      if (error.response && error.response.data.message === "Language already exists") {
        notification.error({ message: "This language already exists for Seraslingo" });
      } else {
        notification.error({ message: "Failed to add Seraslingo video" });
      }
    }
  };

  const handleAddSerastech = async (values) => {
    try {
      const serastechData = {
        video: values.video,
        language: values.language,
        desc: values.desc,
      };

      await axiosInstance.post("/serastechvideos", serastechData);
      notification.success({ message: "Serastech video added successfully" });
      setModalVisible(false);
      fetchSerastechVideos();
    } catch (error) {
      if (error.response && error.response.data.message === "Language already exists") {
        notification.error({ message: "This language already exists for Serastech" });
      } else {
        notification.error({ message: "Failed to add Serastech video" });
      }
    }
  };

  const handleDeleteSeraslingo = async (id) => {
    try {
      await axiosInstance.delete(`/seraslingovideos/${id}`);
      notification.success({ message: "Seraslingo video deleted successfully" });
      fetchSeraslingoVideos();
    } catch (error) {
      console.error("Error deleting Seraslingo video:", error);
      notification.error({ message: "Failed to delete Seraslingo video" });
    }
  };

  const handleDeleteSerastech = async (id) => {
    try {
      await axiosInstance.delete(`/serastechvideos/${id}`);
      notification.success({ message: "Serastech video deleted successfully" });
      fetchSerastechVideos();
    } catch (error) {
      console.error("Error deleting Serastech video:", error);
      notification.error({ message: "Failed to delete Serastech video" });
    }
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    form.resetFields();
  };

  const handleViewSeraSlingo = (record) => {
    Modal.info({
      title: 'Youtube Video Preview',
      content: (
        <div className="ratio ratio-16x9">
          <iframe
            src={record.video}
            title="SeraSlingo video"
            allowFullScreen
          />
        </div>
      ),
      onOk() {},
    });
  };

  const handleViewSeraStech = (record) => {
    Modal.info({
      title: 'Youtube Video Preview',
      content: (
        <div className="ratio ratio-16x9">
          <iframe
            src={record.video}
            title="SeraStech video"
            allowFullScreen
          />
        </div>
      ),
      onOk() {},
    });
  };

  const formatDate = (date) => {
    return moment(date).format('DD/MM/YYYY HH:mm:ss');
  };

  const uniqueLanguagesCount = seraslingoVideos
    .filter(video => allowedLanguages.includes(video.language))
    .map(video => video.language)
    .filter((value, index, self) => self.indexOf(value) === index).length;

  return (
    <div className="new">
      <SideBar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Video</h1>
        </div>
        <div>
          <Button
            type="primary"
            disabled={uniqueLanguagesCount >= 14}
            onClick={() => handleAddVideo("seraslingo")}
          >
            Add Seraslingo Video
          </Button>
          <Table
            dataSource={seraslingoVideos}
            columns={[
              { title: "Video", dataIndex: "video", key: "video" },
              { title: "Language", dataIndex: "language", key: "language" },
              { title: "Description", dataIndex: "desc", key: "desc" },
              { title: "Created At", dataIndex: "createdAt", key: "createdAt", render: (text) => formatDate(text) },
              {
                title: "Actions",
                key: "actions",
                render: (text, record) => (
                  <span>
                    <Button
                      type="danger"
                      onClick={() => handleDeleteSeraslingo(record._id)}
                    >
                      Delete
                    </Button>
                    <Button
                      type="primary"
                      onClick={() => handleViewSeraSlingo(record)}
                    >
                      View
                    </Button>
                  </span>
                ),
              },
            ]}
            pagination={{ pageSize: 5 }}
          />
        </div>
        <div>
          <Button
            type="primary"
            disabled={uniqueLanguagesCount >= 14}
            onClick={() => handleAddVideo("serastech")}
          >
            Add Serastech Video
          </Button>
          <Table
            dataSource={serastechVideos}
            columns={[
              { title: "Video", dataIndex: "video", key: "video" },
              { title: "Language", dataIndex: "language", key: "language" },
              { title: "Description", dataIndex: "desc", key: "desc" },
              { title: "Created At", dataIndex: "createdAt", key: "createdAt", render: (text) => formatDate(text) },
              {
                title: "Actions",
                key: "actions",
                render: (text, record) => (
                  <span>
                    <Button
                      type="danger"
                      onClick={() => handleDeleteSerastech(record._id)}
                    >
                      Delete
                    </Button>
                    <Button
                      type="primary"
                      onClick={() => handleViewSeraStech(record)}
                    >
                      View
                    </Button>
                  </span>
                ),
              },
            ]}
            pagination={{ pageSize: 5 }}
          />
        </div>
        <Modal
          title={`Add ${videoType === "seraslingo" ? "Seraslingo" : "Serastech"} Video`}
          visible={modalVisible}
          onCancel={handleModalCancel}
          onOk={() => {
            form.validateFields().then((values) => {
              if (videoType === "seraslingo") {
                handleAddSeraslingo(values);
              } else {
                handleAddSerastech(values);
              }
            });
          }}
        >
          <Form form={form}>
            <Form.Item
              name="video"
              label="Video URL"
              rules={[{ required: true, message: "Please input the video URL!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="language"
              label="Language"
              rules={[{ required: true, message: "Please input the language!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="desc"
              label="Description"
              rules={[{ required: true, message: "Please input the description!" }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Video;
