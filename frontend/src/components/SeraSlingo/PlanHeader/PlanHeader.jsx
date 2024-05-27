import React, { useContext, useState } from "react";
import "./PlanHeader.scss";
import { MdScreenSearchDesktop } from "react-icons/md";
import { CiBookmarkCheck } from "react-icons/ci";
import { LiaClipboardListSolid } from "react-icons/lia";
import { MdRateReview } from "react-icons/md";
import { FaComments } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { SearchContext } from "../../../context/SearchContext";
import { BsFillQuestionSquareFill } from "react-icons/bs";
import VidbgPlanHeader from "../../assets/beach3.mp4";

const PlanHeader = ({ type }) => {
  const [classification, setClassification] = useState("");
  const navigate = useNavigate();
  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    dispatch({
      type: "NEW_SEARCH",
      payload: {
        classification,
      },
    });
    navigate("/Plans", {
      state: {
        classification,
      },
    });
    message.success(
      "Search Successful! You will be able to see all the programs and choose for further details."
    );
  };

  return (
    <div className="header">
      <div className="video-container">
        <video
          src={VidbgPlanHeader}
          autoPlay
          loop
          muted
          className="VidbgPlanHeader"
        />
      </div>
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="headerList">
          <a href="/ViewProgram" className="headerListItem">
            <LiaClipboardListSolid className="planHeader-icons" />
            <span className="headerListItem-Title">View Programs </span>
          </a>
          <a href="/Overview" className="headerListItem">
            <MdRateReview className="planHeader-icons" />
            <span className="headerListItem-Title">OverView</span>
          </a>
          <a href="/FAQ" className="headerListItem">
            <FaComments className="planHeader-icons" />
            <span className="headerListItem-Title">FAQ</span>
          </a>
          <a href="/Inquiry" className="headerListItem">
            <BsFillQuestionSquareFill className="planHeader-icons" />
            <span className="headerListItem-Title">send Inquiries</span>
          </a>
          <a href="/bookAppointment" className="headerListItem">
            <CiBookmarkCheck className="planHeader-icons" />
            <span className="headerListItem-Title">Book Appointment</span>
          </a>
        </div>
        {type !== "list" && (
          <>
            <h1 className="headerTitle">Find your Goals</h1>
            <p className="headerDesc">
              there are million of opportunity by having one simple click and
              you will reach your goal no matter what, Search below and find
              what you are looking for. input the detail required and you will
              be provided everything you want.
            </p>

            <div className="headerSearch">
              <div className="headerSearchItem">
                <input
                  type="text"
                  placeholder="Simply Click on Search or Type .........."
                  className="headerSearchInput"
                  onChange={(e) => setClassification(e.target.value)}
                />
              </div>
              <div className="headerSearchItem"></div>
              <button className="headerBtn" onClick={handleSearch}>
                Search
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PlanHeader;
