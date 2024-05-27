import React from "react";
import Banner from "./Banner/Banner";

import "./SeraSLingoHomePage.scss";
import Category from "./Category/Category";
import HeaderBar from "../Header/HeaderBar";
import Footer from "../Footer/SeraFooter";

function SeraSLingoHomePage() {
  return (
    <div>
      <div>

      <HeaderBar />
      </div>
      <div className="main-content">
      <Banner />
      <Category />
      <Footer />

      </div>
    </div>
  );
}

export default SeraSLingoHomePage;
