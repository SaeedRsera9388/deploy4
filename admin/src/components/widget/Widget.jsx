import "./Widget.scss";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { FaFileCircleQuestion } from "react-icons/fa6";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import { useEffect, useState } from "react";
import axios from "axios";

const Widget = ({ type }) => {
  const [data, setData] = useState({
    title: "",
    amount: 0,
    diff: 0,
    icon: null,
  });
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
});


  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        switch (type) {
          case "clients":
            response = await axiosInstance.get("/clients/countByClient");
            setData({
              title: "Clients",
              amount: response.data.totalCount,
              icon: (
                <PersonOutlineIcon
                  className="icon"
                  style={{
                    color: "crimson",
                    backgroundColor: "rgba(255, 0, 0, 0.2)",
                  }}
                />
              ),
            });
            break;
          case "tickets":
            response = await axiosInstance.get("/tickets/count");
            setData({
              title: "Tickets",
              amount: response.data.totalTickets,
              icon: (
                <AddShoppingCartIcon
                  className="icon"
                  style={{
                    color: "goldenrod",
                    backgroundColor: "rgba(218,165,32,0.2)",
                  }}
                />
              ),
            });
            break;
          case "earning":
            response = await axiosInstance.get("/clients/totalPriceAmount");
            setData({
              title: "Total Earnings (AMD)",
              amount: response.data.totalPriceAmount + " AMD",
              icon: (
                <PointOfSaleIcon
                  className="icon"
                  style={{
                    color: "green",
                    backgroundColor: "rgba(0,128,0,0.2)",
                  }}
                />
              ),
            });
            break;
          case "inquiries":
            response = await axiosInstance.get("/inquiries/count");
            setData({
              title: "Inquiries",
              amount: response.data.totalInquiries,
              icon: (
                <FaFileCircleQuestion
                  className="icon"
                  style={{
                    color: "purple",
                    backgroundColor: "rgba(128,0,128,0.2)",
                  }}
                />
              ),
            });
            break;
          default:
            break;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [type]);

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{data.amount}</span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
