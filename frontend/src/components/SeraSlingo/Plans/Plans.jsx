import React, { useContext, useEffect, useState } from "react";
import "./Plans.scss";
import PlanHeader from "../PlanHeader/PlanHeader";
import { FaLocationDot } from "react-icons/fa6";
import MailList from "../MailList/MailList";
import { LuArrowLeftCircle, LuArrowRightCircle } from "react-icons/lu";
import { RiCloseCircleLine } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import HeaderBar from "../Header/HeaderBar";
import Footer from "../Footer/SeraFooter";
import useFetch from "../../../hooks/useFetch";
import { FaFolderPlus } from "react-icons/fa";
import axios from "axios";
import ReactReadMoreReadLess from "react-read-more-read-less";

const Plans = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [open, setOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [plans, setPlans] = useState([]);

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });

  const { data, loading, error } = useFetch(`/programs/find/${id}`);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleNextPhoto = () => {
    if (data && data.photo) {
      setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % data.photo.length);
    }
  };

  const handlePreviousPhoto = () => {
    if (data && data.photo) {
      setCurrentPhotoIndex((prevIndex) =>
        prevIndex === 0 ? data.photo.length - 1 : prevIndex - 1
      );
    }
  };

  const handleViewAllPhotos = () => {
    setOpen(true);
    setCurrentPhotoIndex(0);
  };

  useEffect(() => {
    if (data && data._id) {
      axiosInstance
        .get(`/programs/plans/${data._id}`)
        .then((response) => {
          setPlans(response.data);
        })
        .catch((err) => {
          console.error(`Error fetching plans for program ${data._id}:`, err);
          setPlans([]);
        });
    }
  }, [data]);

  return (
    <div>
      <HeaderBar />
      <PlanHeader type="list" />
      <div className="planContainer">
        {open && (
          <div className="planSlider">
            <RiCloseCircleLine
              className="sliderClose"
              onClick={() => setOpen(false)}
            />
            <LuArrowLeftCircle
              className="sliderArrow"
              onClick={handlePreviousPhoto}
            />
            <div className="slideWrapper">
              {data && data.photo && data.photo.length > 0 && (
                <img
                  src={data.photo[currentPhotoIndex]}
                  alt=""
                  className="sliderImg"
                />
              )}
            </div>
            <LuArrowRightCircle
              className="sliderArrow"
              onClick={handleNextPhoto}
            />
          </div>
        )}
        <div className="planWrapper">
          <div className="planWrapper-btn">
            <a className="bookNow" href="/bookAppointment">
              Book an appointment!
            </a>
          </div>
          <h1 className="planTitle">{data && data.title}</h1>
          <span className="planFeature">{data && data.type}</span>
          <div className="planAddress">
            <span>{data && data.address}</span>
          </div>
          <span className="planPriceHighlight">
            Join us! only {data && data.cheapestPrice} $ and Get a FREE
            Membership with UNLIMITED Access to the Speaking Club!
          </span>
          <div className="planImages">
            <div className="planImgWrapper">
              {data && data.photo && data.photo.length > 0 && (
                <img
                  onClick={handleOpen}
                  src={data.photo[0]}
                  alt=""
                  className="planImg"
                />
              )}
              {data && data.photo && data.photo.length > 1 && (
                <div className="viewAllPhotos" onClick={handleViewAllPhotos}>
                  <span className="viewAllPhotos-icon">
                    <FaFolderPlus />
                  </span>
                  {data.photo.length - 1}
                </div>
              )}
            </div>
          </div>
          <div className="planDetails">
            <div className="planDetailsText">
              <p className="planDesc">
                {data && data.desc && (
                  <ReactReadMoreReadLess
                    charLimit={200}
                    readMoreText={"Read more ▼"}
                    readLessText={"Read less ▲"}
                  >
                    {data.desc}
                  </ReactReadMoreReadLess>
                )}
              </p>
            </div>
            <div className="planDetailsPrice">
              <h1 className="planTitle">{data && data.name} </h1>
              <div className="fpPlanInner">
                <div className="fpPlanRight">
                  {plans.length > 0 ? (
                    plans.map((plan) => (
                      <div key={plan._id} className="fpPlan">
                        <span className="fpPlanRight-text">Duration: {plan.title}</span>
                        <p className="fpPlanRight-text">Max Participants: {plan.maxParticipant}</p>
                        <p className="fpPlanRight-text-desc">
                          {plan.desc && (
                            <ReactReadMoreReadLess
                              charLimit={100}
                              readMoreText={"Read more ▼"}
                              readLessText={"Read less ▲"}
                            >
                              {plan.desc}
                            </ReactReadMoreReadLess>
                          )}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="fpPlan">
                      <p>Contact us for further details!</p>
                    </div>
                  )}
                </div>
                <div className="fpPlanLeft">
                  <h2 className="fpPlanLeft-price">
                    <b>Price: {data && data.cheapestPrice}$</b>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MailList />
      <Footer />
    </div>
  );
};

export default Plans;
