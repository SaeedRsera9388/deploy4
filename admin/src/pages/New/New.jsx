import "./New.scss";
import Navbar from "../../components/navbar/Navbar";
import SideBar from "../../components/sidebar/SideBar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import { notification } from "antd";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const data = new FormData();
    if (file) {
      data.append("file", file);
      data.append("upload_preset", "upload");

      try {
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dfxjkmghr/image/upload",
          data
        );
        const { url } = uploadRes.data;
        info.img = url;
      } catch (err) {
        notification.error({
          message: "Error",
          description: "Image upload failed. Please try again.",
        });
        console.error("Image upload error:", err);
        return;
      }
    }

    try {
      // Validate all required fields are present
      const requiredFields = [
        "firstName",
        "lastName",
        "username",
        "email",
        "dateOfBirth",
        "nationality",
        "country",
        "city",
        "phone",
        "password",
      ];
      for (let field of requiredFields) {
        if (!info[field]) {
          throw new Error(`${field} is required`);
        }
      }

      // Log the data being sent
      console.log("Sending user data:", info);

      const response = await axiosInstance.post("/auth/register", info);

      // Log the response
      console.log("User creation response:", response.data);

      // Notification for successful user addition
      notification.success({
        message: "User Added",
        description: "The user has been successfully added.",
      });
    } catch (err) {
      notification.error({
        message: "Error",
        description: "Couldn't add the user. Please try again.",
      });
      console.error("User creation error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="new">
      <SideBar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                  />
                </div>
              ))}
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
