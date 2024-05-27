import React from "react";
import "./SeraFooter.scss";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { IoLogoWechat } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import CountUp from "react-countup";
import serasummer from "../../assets/1708807891283.JPG";
import { FaThreads } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { Image } from "antd";

function Footer() {
  return (
    <div className="SeraSLingo-Footer-container">
      <div className="SeraSLingo-Footer-wrapper-top">
        <div className="SeraSLingo-Footer-wrapper-top-topContainer">
          <a href="/FAQ">FAQ</a>
          <a href="/AboutSeraSLingo">About</a>
          <a href="/SeraSLingo">Home</a>
          <a href="/Overview">Overview</a>
          <a href="/Inquiry">Inquiry</a>
          <a href="/bookAppointment">Book an Appointment</a>
          <a href="/Overview-reviews">Reviews</a>
        </div>
        <div className="SeraSLingo-Footer-wrapper-top-MiddleContainer">
          <span>
            <Image src={serasummer} alt="" />
            Founder & CEO : Saeed Ranjbari
            <br />
            Co-Founder & COO : Elen Adamyan
            <br />
          </span>
          <span>
            <span className="SeraSLingo-Footer-wrapper-top-MiddleContainer-Countup">
              <CountUp
                className="SeraSLingo-Footer-wrapper-top-MiddleContainer-Countup-number"
                end={153}
                duration={50}
                separator=" "
                decimal=","
                suffix=" Visitors"
                style={{ fontSize: "10px" }} // Adjust the font size here
              >
                
              </CountUp>
            </span>
          </span>
          <span>
            <span>Contact</span>
            <span>+49 1573 4652454</span>
            <span>+374 93 801449</span>
            <span> info@Sera-Summer.com</span>
            <span>Available 24/7</span>
          </span>
          <div className="SeraSLingo-Footer-wrapper-top-MiddleContainer-logo">
            <p>SeraSlingo</p>
          </div>
        </div>
        <div className="social-icon">
          <div className="title-icons">
            <h6> Social Media</h6>
          </div>
          <div className="top-icon">
            <a
              href="https://www.facebook.com/profile.php?viewas=100000686899395&id=61556699482895"
              className="facebook"
            >
              <FaFacebookF className="socialmedia-seraslingofooter" />
            </a>
            <a
              href="https://www.instagram.com/serasummer2023"
              className="instagram"
            >
              <FaInstagram className="socialmedia-seraslingofooter" />
            </a>
            <a
              href="https://www.linkedin.com/company/sera-summer"
              className="linkedin"
            >
              <FaLinkedin className="socialmedia-seraslingofooter" />
            </a>
            <a
              href="https://www.tiktok.com/@sera.summer?is_from_webapp=1&sender_device=pc"
              className="tiktok"
            >
              <FaTiktok className="socialmedia-seraslingofooter" />
            </a>
            <a href="https://t.me/SeraSlingo" className="telegram">
              <FaTelegramPlane className="socialmedia-seraslingofooter" />
            </a>

            <a href="https://wa.me/message/VV6HVY6B4CB5N1" className="whatsapp">
              <FaWhatsapp className="socialmedia-seraslingofooter" />
            </a>
            <a
              href="https://www.youtube.com/@SeraSummer2023"
              className="youtube"
            >
              <FaYoutube className="socialmedia-seraslingofooter" />
            </a>

            <a
              href="https://www.threads.net/@serasummer20233"
              className="Threads"
            >
              <FaThreads className="socialmedia-seraslingofooter" />
            </a>
            <a href="https://twitter.com/serasummer2023" className="Twitter">
              <FaSquareXTwitter className="socialmedia-seraslingofooter" />
            </a>
          </div>
        </div>
        <div className="SeraSLingo-Footer-wrapper-Bottom-Container">
          <div className="SeraSLingo-Footer-wrapper-Bottom-Container-left"></div>
          <div className="SeraSLingo-Footer-wrapper-Bottom-Container-right">
            <a href="https://www.linkedin.com/in/saeed-ranjbari-18586a28"> Designed : Saeed Ranjbari</a>
            <a href="/Terms&Conditions">Terms and Conditions</a>
            <a href="/PrivacyPolicy">Privacy Policy</a>
          </div>
        </div>
      </div>
      <div className="SeraSLingo-Footer-wrapper-bottom"></div>
    </div>
  );
}

export default Footer;
