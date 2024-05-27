import React from "react";
import "./Home.scss";

import SideBar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";

const Home = () => {
  return (
    <div className="home">
      <SideBar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="clients" />
          <Widget type="tickets" />
          <Widget type="earning" />
          <Widget type="inquiries" />
        </div>
        <div className="charts">
          <Chart />
          <Featured />
        </div>
      </div>
    </div>
  );
};

export default Home;
