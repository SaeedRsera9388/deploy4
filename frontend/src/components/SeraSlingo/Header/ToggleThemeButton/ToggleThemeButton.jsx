import { Component, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { TbSearch } from "react-icons/tb";
import { AiOutlineMessage } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { BiHome } from "react-icons/bi";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import { AiOutlineSetting } from "react-icons/ai";
import { CiCircleMore } from "react-icons/ci";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";

import { Menu } from "antd";


import React from "react";

const ToggleThemeButton = ({ darkTheme, toggleTheme }) => {
    return (
      <div className="toggle-theme-btn">
        <button onClick={toggleTheme} className="toggle-btn">
          {darkTheme ? <HiOutlineSun className="sun"/> : <HiOutlineMoon className="moon"/>}
        </button>
      </div>
    );
  };

export default ToggleThemeButton