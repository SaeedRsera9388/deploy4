import React, { useContext, useState } from "react";
import { Button, Menu, Dropdown, Image } from "antd";

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import Sidebar from "./SideBar/SideBar";
import Logo from "./../Logo/Logo";
import "./HeaderBar.scss";

const HeaderBar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <header
      className="header"
      style={{
        padding: "10px 50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        backgroundColor: "#F2F2F2",
        zIndex: 999,
      }}
    >
      <div className="header-left">
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="1">
                <Logo />
              </Menu.Item>
              <Menu.Item key="2">
                <Sidebar />
              </Menu.Item>
              {/* Other menu items */}
            </Menu>
          }
          trigger={["click"]}
          open={dropdownVisible}
          onOpenChange={setDropdownVisible}
        >
          <Button
            className="toggle-header"
            type="text"
            onClick={toggleCollapsed}
            style={{ marginRight: 16 }}
            icon={
              collapsed ? (
                <MenuUnfoldOutlined
                  className="menubar"
                  style={{ fontSize: "20px" }}
                />
              ) : (
                <MenuFoldOutlined
                  className="closebar"
                  style={{ fontSize: "20px" }}
                />
              )
            }
          />
        </Dropdown>
      </div>
      <div className="SeraLogo">
        <a href="/SeraSLingo">SeraSlingo</a>
      </div>
      <div className="header-right"></div>
    </header>
  );
};

export default HeaderBar;
