import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Menu, Dropdown, Image } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ChatIcon from "@mui/icons-material/Chat";
import { AuthContext } from "../../context/AuthContext";
import { DarkModeContext } from "../../context/darkModeContext";
import "./Navbar.scss";

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);
  const [totalNotificationCount, setTotalNotificationCount] = useState(0);
  const [totalMessageCount, setTotalMessageCount] = useState(0);
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          pendingClientRes,
          reviewClientRes,
          pendingTicketRes,
          reviewTicketRes,
          pendingAccountRes,
          reviewAccountRes,
          pendingInquiryRes,
          reviewInquiryRes,
        ] = await Promise.all([
          axiosInstance.get("/clients/pendingCount"),
          axiosInstance.get("/clients/reviewCount"),
          axiosInstance.get("/tickets/pendingCount"),
          axiosInstance.get("/tickets/reviewCount"),
          axiosInstance.get("/accounts/pendingCount"),
          axiosInstance.get("/accounts/reviewCount"),
          axiosInstance.get("/inquiries/pendingCount"),
          axiosInstance.get("/inquiries/reviewCount"),
        ]);

        const totalNotification =
          pendingClientRes.data.pendingCount +
          reviewClientRes.data.reviewCount +
          pendingTicketRes.data.pendingCount +
          reviewTicketRes.data.reviewCount;

        const totalMessage =
          pendingAccountRes.data.pendingCount +
          reviewAccountRes.data.reviewCount +
          pendingInquiryRes.data.pendingCount +
          reviewInquiryRes.data.reviewCount;

        setTotalNotificationCount(totalNotification);
        setTotalMessageCount(totalMessage);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      dispatch({ type: "LOGOUT" });
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const menu = (
    <Menu>
      <Menu.Item onClick={handleLogout} icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search"></div>
        <div className="items">
          <div className="item">
            <NotificationsActiveIcon className="icon" />
            <div className="counter">{totalNotificationCount}</div>
          </div>
          <div className="item">
            <ChatIcon className="icon" />
            <div className="counter">{totalMessageCount}</div>
          </div>
          <div className="item">
            {user ? (
              <Dropdown overlay={menu} placement="bottomRight" className="Dropdown-right">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Image src={user.img} alt="Profile" className="profile-image" />
                  <span style={{ marginLeft: "8px" }}>{user.username}</span>
                </div>
              </Dropdown>
            ) : (
              <div className="hAuth">
                <Link to="/register">
                  <button className="authButton">Register</button>
                </Link>
                <Link to="/login">
                  <button className="authButton">Login</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
