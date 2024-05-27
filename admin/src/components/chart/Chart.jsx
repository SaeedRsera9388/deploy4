import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Chart = ({ title }) => {
  const [clientData, setClientData] = useState([]);
  const [userData, setUserData] = useState([]);
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientResponse = await axiosInstance.get("/totalPriceAmount");
        const userResponse = await axiosInstance.get("/countByClient");
        setClientData(clientResponse.data);
        setUserData(userResponse.data.totalCount);
      } catch (error) {
        console.error("Error fetching client and user data:", error);
      }
    };

    fetchData();
  }, []);

  const generateChartData = () => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const data = months.map(month => {
      const client = clientData.find(item => item._id === month);
      const user = userData.find(item => item._id === month);

      return {
        name: month,
        Total: client ? client.totalPriceAmount : 0,
        Users: user ? user.totalCount : 0
      };
    });

    return data;
  };

  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={3 / 1}>
        <LineChart
          width={730}
          height={250}
          data={generateChartData()}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="gray" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            name="Total Amount"
          />
          <Line
            type="monotone"
            dataKey="Users"
            stroke="#82ca9d"
            name="Number of Users"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
