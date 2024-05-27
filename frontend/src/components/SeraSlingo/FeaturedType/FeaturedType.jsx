import React, { useState, useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import axios from "axios";
import "./FeaturedType.scss";

const FeaturedType = () => {
  // Fetch data for programs
  const { data, loading, error } = useFetch("/programs?featured=true&limit=3");
  const [plans, setPlans] = useState({});

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });

  // Fetch plans for each program
  useEffect(() => {
    if (data && data.length > 0) {
      data.forEach((program) => {
        axiosInstance.get(`/programs/plans/${program._id}`)
          .then(response => {
            setPlans(prevPlans => ({
              ...prevPlans,
              [program._id]: response.data,
            }));
          })
          .catch(err => {
            console.error(`Error fetching plans for program ${program._id}:`, err);
            setPlans(prevPlans => ({
              ...prevPlans,
              [program._id]: [],
            }));
          });
      });
    }
  }, [data]);
  

  // Slice the data to show only 3 items
  const slicedData = data && data.slice(0, 2);

  return (
    <div className="fp">
      {loading ? (
        "Loading"
      ) : (
        <>
          {slicedData && slicedData.length > 0 ? (
            slicedData.map((item) => (
              <div className="fpItem" key={item._id}>
                <img
                  src={item.photo[0]}
                  alt=""
                  className="fpImg"
                />
                <span className="fpType">{item.name}</span>
                <span className="fpGroupName">{item.type}</span>
                {item.rating && (
                  <div className="fpRating">
                    <button>{item.rating}</button>
                    <span>Excellent</span>
                  </div>
                )}
                {item.cheapestPrice && (
                  <div className="fpPrice">
                    Price: {item.cheapestPrice}$
                  </div>
                )}
                {plans[item._id] && plans[item._id].length > 0 ? (
                  plans[item._id].map(plan => (
                    <div key={plan._id} className="fpPlan">
                      <span>Duration: {plan.title}</span>
                      <p>Max Participants: {plan.maxParticipant}</p>
                    </div>
                  ))
                ) : (
                  <div className="fpPlan">
                    <p>Contact us for further details!</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="fpItem">
              <img
                src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Download-Image.png"
                alt="No Program Available"
                className="fpImg"
              />
              <span className="fpType">No Program available</span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FeaturedType;
