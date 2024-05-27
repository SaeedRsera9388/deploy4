import React, { useEffect, useState, useContext } from "react";
import "./List.scss";
import PlanHeader from "../PlanHeader/PlanHeader";
import { useLocation, useNavigate } from "react-router-dom";
import { notification, DatePicker, Button } from "antd";
import moment from "moment";
import SearchItem from "../SearchItem/SearchItem";
import { SearchContext } from "../../../context/SearchContext";
import useFetch from "../../../hooks/useFetch";
import HeaderBar from "../Header/HeaderBar";
import Footer from "../Footer/SeraFooter";
import axios from "axios";

const List = () => {
  const location = useLocation();
  const locationState = location.state || {};
  const [classification, setClassification] = useState(location.state?.classification || "");

  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const { data, loading, error, reFetch } = useFetch(`/programs?type=${classification}&min=${min || 0}&max=${max || 999}`);

  const initialOptions = location.state?.options || { adult: 1, children: 0, group: 3 };
  const [options, setOptions] = useState(initialOptions);

  useEffect(() => {
    localStorage.setItem("options", JSON.stringify(options));
  }, [options]);

  const allowedGroupValues = [3, 6, 10, 15, 20];

  const handleInputChange = (e) => {
    const inputValue = parseInt(e.target.value, 10);
    if (!isNaN(inputValue) && inputValue >= 3 && allowedGroupValues.includes(inputValue)) {
      setOptions({ ...options, group: inputValue });
    }
  };

  const handleGroupChange = (action) => {
    const currentIndex = allowedGroupValues.indexOf(options.group);
    let updatedGroup = options.group;

    if (action === "i") {
      updatedGroup = currentIndex < allowedGroupValues.length - 1 ? allowedGroupValues[currentIndex + 1] : updatedGroup;
    } else if (action === "d") {
      updatedGroup = currentIndex > 0 ? allowedGroupValues[currentIndex - 1] : updatedGroup;
    }

    setOptions({ ...options, group: updatedGroup });
  };

  const navigate = useNavigate();

  const handleClick = () => {
    const newLocationState = {
      state: {
        classification,
        options,
      },
    };

    const queryParams = new URLSearchParams();

    navigate(`/ticket?${queryParams.toString()}`);

    dispatch({ type: "NEW_SEARCH", payload: newLocationState.state });

    reFetch();

    notification.success({
      message: "Search Successful!",
      description: "You will be able to successfully reserve after seeing all the necessary details.",
    });
  };

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });

  const { dispatch } = useContext(SearchContext);

  const [programPlans, setProgramPlans] = useState({});

  useEffect(() => {
    const fetchProgramPlans = async () => {
      if (data) {
        const programPlansData = {};
        for (const program of data) {
          try {
            const response = await axiosInstance.get(`/programs/plans/${program._id}`);
            programPlansData[program._id] = response.data;
          } catch (err) {
            console.error(`Error fetching plans for program ${program._id}:`, err);
            programPlansData[program._id] = [];
          }
        }
        setProgramPlans(programPlansData);
      }
    };
  
    fetchProgramPlans();
  }, [data]);
  
  return (
    <div>
      <HeaderBar />
      <PlanHeader type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Classification: </label>
              <input
                placeholder={classification}
                type="text"
                onChange={(e) => setClassification(e.target.value)}
              />
            </div>
            <div className="lsItem Listhiddenpage">
              <label>Options</label>
              <div className="lsOptions Listhiddenpage">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min-Budget <small>per month</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                    min={20}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem Listhiddenpage">
                  <span className="lsOptionText">
                    Max-Budget <small>per month</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                    min={9999999}
                    className="lsOptionInput"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="listResult">
            {loading ? "Loading..."
              : error ? "Error fetching data"
              : data ? data.map((item) => (
                <SearchItem
                  item={item}
                  key={item._id}
                  plans={programPlans[item._id]}
                />
              ))
              : "No data available"}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default List;
