// src/Banner.js
import React, { useState, useEffect, useRef } from "react";
import { ImFacebook } from "react-icons/im";
import { AiFillLinkedin, AiFillInstagram } from "react-icons/ai";
import { FaYoutube } from "react-icons/fa";


import "bootstrap/dist/css/bootstrap.css";
import "./Banner.scss"; // Import the SCSS file for styling
import vid1 from "../../../assets/seraslingoweb.mp4";

const initialActiveSlide = localStorage.getItem("activeSlide") || 0; // Get the stored activeSlide value
const initialShowContent =
  localStorage.getItem("showContent") === "true" || false; // Get the stored showContent value

const videoSources = [
  {
    src: vid1,
  },
];

function Banner() {
  const [activeSlide, setActiveSlide] = useState(initialActiveSlide);
  const [showContent, setShowContent] = useState(initialShowContent);
  const slideInterval = useRef(null); // Use useRef to maintain reference
  const autoscroll = true;
  const intervalTime = 15000;

  // const handleNext = () => {
  //   const nextSlide = (activeSlide + 1) % videoSources.length;
  //   setActiveSlide(nextSlide);
  //   setShowContent(true);
  //   localStorage.setItem("activeSlide", nextSlide); // Store the updated activeSlide
  // };

  // const handlePrev = () => {
  //   const prevSlide =
  //     (activeSlide - 1 + videoSources.length) % videoSources.length;
  //   setActiveSlide(prevSlide);
  //   setShowContent(true);
  //   localStorage.setItem("activeSlide", prevSlide); // Store the updated activeSlide
  // };

  useEffect(() => {
    localStorage.setItem("showContent", showContent); // Store the showContent value
  }, [showContent]);

  useEffect(() => {
    if (autoscroll) {
      const auto = () => {
        slideInterval.current = setInterval(() => {
          const nextSlide = (activeSlide + 1) % videoSources.length;
          setActiveSlide(nextSlide);
          setShowContent(true);
          localStorage.setItem("activeSlide", nextSlide); // Store the updated activeSlide
        }, intervalTime);
      };
      auto();
    }
    return () => clearInterval(slideInterval.current); // Clear interval using slideInterval.current
  }, [activeSlide, intervalTime, autoscroll]);

  return (
    <div className="banner">
      <div className="video-container">
  <video
    className="video-slide"
    src={videoSources[activeSlide].src}
    autoPlay
    loop
    muted
  />
</div>
      
      <div className="media-icons">
        <a href="https://www.facebook.com/profile.php?viewas=100000686899395&id=61556699482895" className="facebook-icon">
          <ImFacebook />
        </a>
        <a href="https://www.linkedin.com/company/sera-summer" className="linkedin-icon">
          <AiFillLinkedin />
        </a>
        <a href="https://www.instagram.com/serasummer2023" className="instagram-icon">
          <AiFillInstagram />
        </a>
        <a href="https://www.youtube.com/@SeraSummer2023" className="youtube-icon">
          <FaYoutube />
        </a>
      </div>

      {/* <div className="slider-navigation">
        <div className="prev" onClick={handlePrev}>
          <ImPrevious />
        </div>
        <div className="next" onClick={handleNext}>
          <ImNext />
        </div>
      </div> */}
    </div>
  );
}

export default Banner;
