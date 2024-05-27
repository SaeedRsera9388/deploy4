import React, { useState, useEffect } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import axios from "axios";

const Featured = () => {
  const [totalSalesToday, setTotalSalesToday] = useState(0);
  const [monthlyTarget, setMonthlyTarget] = useState(1500000); // Fixed monthly target
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [isTargetPositive, setIsTargetPositive] = useState(false);
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accountRes = await axiosInstance.get("/accounts/totalPriceAmount");
        const clientRes = await axiosInstance.get("/clients/totalPriceAmount");

        const accountTotal = accountRes.data.totalPriceAmount || 0;
        const clientTotal = clientRes.data.totalPriceAmount || 0;

        const monthlyTarget = 1500000; // Fixed monthly target
        // Calculate total featured amount
        const totalFeaturedAmount = clientTotal - monthlyTarget;
        setMonthlyTarget(totalFeaturedAmount);

        // Display monthly target
        setIsTargetPositive(totalFeaturedAmount >= 0);

        // Calculate daily total amount
        const dailyTotalAmount = clientTotal / 30;

        // Calculate progress percentage based on client total and dailyTotalAmount
        const progress = (dailyTotalAmount / 50000) * 100; // Calculate percentage based on 50000 as 100%
        setProgressPercentage(progress);

        // Set total sales made today
        setTotalSalesToday(clientTotal);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Revenue</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar
            value={progressPercentage}
            text={`${Math.round(progressPercentage)}%`}
            strokeWidth={3}
          />
          <p>Daily Target: AMD {(totalSalesToday / 30).toFixed(2)}</p>{" "}
          {/* Display daily target here */}
        </div>
        <p className="title">Total sales made today</p>
        <p className="amount">AMD {totalSalesToday}</p>

        <div className="summary">
          <div className="item">
            <div className="itemTitle">Monthly Target</div>
            <div
              className={`itemResult ${
                isTargetPositive ? "positive" : "negative"
              }`}
            >
              {isTargetPositive ? (
                <KeyboardDoubleArrowUpIcon
                  fontSize="small"
                  style={{ color: "green" }}
                />
              ) : (
                <KeyboardDoubleArrowDownIcon
                  fontSize="small"
                  style={{ color: "red" }}
                />
              )}
              <div className="resultAmount">AMD {monthlyTarget}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
