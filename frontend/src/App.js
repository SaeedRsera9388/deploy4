import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Button, Layout, Menu, Dropdown, theme } from "antd";
import "./App.scss";
import PrivacyPolicyPage from "./components/PrivacyPolicyPage/PrivacyPolicyPage";
import TermsConditionsPage from "./components/TermsConditionsPage/TermsConditionsPage";
import MainHomePage from "./components/MainHomePage/MainHomePage";
import SeraSTechHomePage from "./components/SeraStech/SeraSTechHomePage/SeraSTechHomePage";
import About from "./components/SeraSlingo/About/About";
import SideBar from "./components/SeraSlingo/Header/SideBar/SideBar";
import Logo from "./components/SeraSlingo/Logo/Logo";
import ToggleThemeButton from "./components/SeraSlingo/Header/ToggleThemeButton/ToggleThemeButton";
import GetStart from "./components/SeraSlingo/GetStart/GetStart";
import List from "./components/SeraSlingo/List/List";
import Plans from "./components/SeraSlingo/Plans/Plans";
import ChooseYourPlan from "./components/SeraSlingo/ChooseYourPlan/ChooseYourPlan";
import SeraSLingoHomePage from "./components/SeraSlingo/Home/SeraSLingoHomePage";
import Ticket from "./components/SeraSlingo/Ticket/Ticket";
import Overview from "./components/SeraSlingo/Overview/Overview";
import Inquiry from "./components/SeraSlingo/Inquiry/Inquiry";
import Comment from "./components/SeraSlingo/Overview/Comment";
import Review from "./components/SeraSlingo/Overview/Review";
import OverviewPhoto from "./components/SeraSlingo/Overview/OverviewPhoto";
import OverviewVid from "./components/SeraSlingo/Overview/OverviewVid";

const { Header, Content } = Layout;

function App() {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(true);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const handleDropdownVisibleChange = (visible) => {
    setDropdownVisible(visible);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menu = (
    <Menu
      style={{
        backgroundColor: darkTheme ? "#001529" : "#f0f2f5",
        borderColor: darkTheme ? "#001529" : "#f0f2f5",
      }}
    >
      <Menu.Item key="1">
        <Logo />
      </Menu.Item>
      <Menu.Item key="2">
        <SideBar darkTheme={darkTheme} />
      </Menu.Item>
      <Menu.Item key="3">
        <ToggleThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
      </Menu.Item>
    </Menu>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainHomePage />} />
        <Route path="/SeraSLingo" element={<SeraSLingoHomePage />} />
        <Route path="/SeraSTech" element={<SeraSTechHomePage />} />
        <Route path="/AboutSeraSLingo" element={<About />} />
        <Route path="/FAQ" element={<GetStart />} />
        <Route path="/Overview" element={<Overview />} />
        <Route path="/Overview-post" element={<Comment />} />
        <Route path="/Overview-photos" element={<OverviewPhoto />} />
        <Route path="/OverviewVid" element={<OverviewVid />} />
        <Route path="/Overview-reviews" element={<Review />} />
        <Route path="/bookAppointment" element={<Ticket />} />
        <Route path="/Inquiry" element={<Inquiry />} />
        <Route path="/ViewProgram" element={<ChooseYourPlan />} />
        <Route path="/Plans" element={<List />} />
        <Route path="/Plans/:id" element={<Plans />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicyPage />} />
        <Route path="/Terms&Conditions" element={<TermsConditionsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
