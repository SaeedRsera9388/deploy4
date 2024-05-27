import React from "react";
import "./SeraSTechHomePage.scss";
import SSTechLogo1 from "../../assets/SS.svg";
import SSTechLogo2 from "../../assets/tech.svg";

const SeraSTechHomePage = () => {
  return (
    <header className="SeraSTechHomePage-Header">
      <div className="SeraSTechHomePage-Container-topHeader">
        <div>
          <h1 className="SeraSTechHomePage-Header-title">
            Welcome to SeraStech
            <br /> Coming Soon
          </h1>
        </div>
      </div>
      <div>
        <div className="container">
          <div className="cube">
            <div style={{ "--x": -1, "--y": 0 }}>
              <span style={{ "--i": 3 }}></span>
              <span style={{ "--i": 2 }}></span>
              <span style={{ "--i": 1 }}></span>
            </div>
            <div style={{ "--x": 0, "--y": 0 }}>
              <span style={{ "--i": 3 }}></span>
              <span style={{ "--i": 2 }}></span>
              <span style={{ "--i": 1 }}></span>
            </div>
            <div style={{ "--x": 1, "--y": 0 }}>
              <span style={{ "--i": 3 }}></span>
              <span style={{ "--i": 2 }}></span>
              <span style={{ "--i": 1 }}></span>
            </div>
          </div>
          <div className="cube">
            <div style={{ "--x": -1, "--y": 0 }}>
              <span style={{ "--i": 3 }}></span>
              <span style={{ "--i": 2 }}></span>
              <span style={{ "--i": 1 }}></span>
            </div>
            <div style={{ "--x": 0, "--y": 0 }}>
              <span style={{ "--i": 3 }}></span>
              <span style={{ "--i": 2 }}></span>
              <span style={{ "--i": 1 }}></span>
            </div>
            <div style={{ "--x": 1, "--y": 0 }}>
              <span style={{ "--i": 3 }}></span>
              <span style={{ "--i": 2 }}></span>
              <span style={{ "--i": 1 }}></span>
            </div>
          </div>
          <div className="cube">
            <div style={{ "--x": -1, "--y": 0 }}>
              <span style={{ "--i": 3 }}></span>
              <span style={{ "--i": 2 }}></span>
              <span style={{ "--i": 1 }}></span>
            </div>
            <div style={{ "--x": 0, "--y": 0 }}>
              <span style={{ "--i": 3 }}></span>
              <span style={{ "--i": 2 }}></span>
              <span style={{ "--i": 1 }}></span>
            </div>
            <div style={{ "--x": 1, "--y": 0 }}>
              <span style={{ "--i": 3 }}></span>
              <span style={{ "--i": 2 }}></span>
              <span style={{ "--i": 1 }}></span>
            </div>
          </div>
        </div>
      </div>
      <div className="BseraStechHomePageBottomfooter">
        <div className="BseraStechHomePageBottomfooter-details">
          <a href="/">wwww.sera-summer.com</a>
        </div>
      </div>
    </header>
  );
};

export default SeraSTechHomePage;
