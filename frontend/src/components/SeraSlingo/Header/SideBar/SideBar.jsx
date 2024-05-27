import React, { useState } from "react";
import { Menu } from "antd";
import { AiOutlineHome } from "react-icons/ai";
import { HiInformationCircle } from "react-icons/hi2";
import { FaRunning } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import { CgMoreO } from "react-icons/cg";
import "./SideBar.scss";
import { Link } from "react-router-dom";
import { FaQuestion } from "react-icons/fa6";
import { GrOverview } from "react-icons/gr";

const SideBar = ({ darkTheme }) => {
  const [openKeys, setOpenKeys] = useState([]);

  const handleOpenChange = (keys) => {
    setOpenKeys(keys);
  };

  return (
    <Menu
      theme={darkTheme ? "dark" : "light"}
      mode="inline"
      className="side-bar"
      openKeys={openKeys}
      onOpenChange={handleOpenChange}
    >
      <Menu.Item key="home">
        <Link to="/SeraSLingo">
          <span className="SideBar-SeraSlingo-MenuBar"><AiOutlineHome  className="SideBar-SeraSlingo-MenuBar-Icon text-3xl"/></span>
        </Link>
      </Menu.Item>
      <Menu.Item key="about" >
        <Link to="/AboutSeraSLingo">
          <span className="SideBar-SeraSlingo-MenuBar"> <HiInformationCircle  className="SideBar-SeraSlingo-MenuBar-Icon"/> </span>
        </Link>
      </Menu.Item>
      <Menu.Item key="ViewPrograms" >
        <Link to="/ViewProgram">
          <span className="SideBar-SeraSlingo-MenuBar"><FaClipboardList  className="SideBar-SeraSlingo-MenuBar-Icon"/></span>
        </Link>
      </Menu.Item>
      <Menu.Item key="Expectation" >
        <Link to="/FAQ">
          <span className="SideBar-SeraSlingo-MenuBar"><FaQuestion className="SideBar-SeraSlingo-MenuBar-Icon" /></span>
        </Link>
      </Menu.Item>
      <Menu.Item key="Overview" >
        <Link to="/Overview">
          <span className="SideBar-SeraSlingo-MenuBar"><GrOverview  className="SideBar-SeraSlingo-MenuBar-Icon"/></span>
        </Link>
      </Menu.Item>
    </Menu>
  );
};

export default SideBar;
