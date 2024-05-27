import React, { useEffect, useRef, useState } from "react";
import "./MainHomePage.scss";
import { FaPhoneFlip } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { IoIosPeople } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import UXandUI from "./../assets/UXandUIicon.png";
import reactjs from "./../assets/reactjs.png";
import javascript from "./../assets/javascript.png";
import html from "./../assets/html.png";
import nodejs from "./../assets/nodejs.png";
import nextjs from "./../assets/nextjs.png";
import { IoLanguageOutline } from "react-icons/io5";
import axios from "axios";
import { Modal, Button, List } from "antd";

import img3 from "./../assets/javascript.png";
import img4 from "./../assets/nativejs.png";
import img5 from "./../assets/nodejs.png";
import img7 from "./../assets/reactjs.png";
import img8 from "./../assets/reactnative.png";

import Deutsch from "./../assets/deutsch.png";
import Russian from "./../assets/russian.png";
import Armenian from "./../assets/armenian.png";
import Spanish from "./../assets/spanish.png";
import English from "./../assets/English.png";
import Arabic from "./../assets/arabic.png";
import Chinese from "./../assets/chinese.png";
import Hindi from "./../assets/hindi.png";
import French from "./../assets/french.png";
import Farsi from "./../assets/farsi.png";
import InteractiveComponent from "../../InteractiveComponent";
import { GrStatusGood } from "react-icons/gr";

const MainHomePage = () => {
  const [shouldAnimateLeft, setShouldAnimateLeft] = useState(true);
  const [shouldAnimateRight, setShouldAnimateRight] = useState(true);
  const sliderInnerRefLeft = useRef(null);
  const sliderInnerRefRight = useRef(null);
  const [showSeraslingoLanguages, setShowSeraslingoLanguages] = useState(false);
  const [seraslingoLanguages, setSeraslingoLanguages] = useState([]);
  const [selectedSeraslingoLanguage, setSelectedSeraslingoLanguage] =
    useState("");
  const [seraslingoVideos, setSeraslingoVideos] = useState([]);
  const [showSeraslingoVideoModal, setShowSeraslingoVideoModal] =
    useState(false);
  const [selectedSeraslingoVideoUrl, setSelectedSeraslingoVideoUrl] =
    useState("");
  const [selectedSeraslingoVideoDesc, setSelectedSeraslingoVideoDesc] =
    useState("");
  const [showSerastechLanguages, setShowSerastechLanguages] = useState(false);
  const [serastechLanguages, setSerastechLanguages] = useState([]);
  const [selectedSerastechLanguage, setSelectedSerastechLanguage] =
    useState("");
  const [serastechVideos, setSerastechVideos] = useState([]);
  const [showSerastechVideoModal, setShowSerastechVideoModal] = useState(false);
  const [selectedSerastechVideoUrl, setSelectedSerastechVideoUrl] =
    useState("");
  const [selectedSerastechVideoDesc, setSelectedSerastechVideoDesc] =
    useState("");

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      addAnimation();
    } else {
      setShouldAnimateLeft(false);
      setShouldAnimateRight(false);
    }
  }, []);

  const addAnimation = () => {
    const sliders = document.querySelectorAll(".sliders");
    sliders.forEach((slider) => {
      slider.setAttribute("data-animated", true);

      const sliderInner = slider.querySelector(".sliders-inner");
      const sliderContent = Array.from(sliderInner.children);

      sliderContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        duplicatedItem.setAttribute("aria-hidden", true);
        sliderInner.appendChild(duplicatedItem);
      });
    });
  };

  const fetchSeraslingoLanguages = async () => {
    try {
      const response = await axiosInstance.get("/seraslingovideos/languages");
      setSeraslingoLanguages(response.data);
    } catch (error) {
      console.error("Error fetching Seraslingo languages:", error);
    }
  };

  const fetchSeraslingoVideosByLanguage = async (language) => {
    try {
      const response = await axiosInstance.get(
        `/seraslingovideos?language=${language}`
      );
      setSeraslingoVideos(response.data);
    } catch (error) {
      console.error("Error fetching Seraslingo videos:", error);
    }
  };

  useEffect(() => {
    fetchSeraslingoLanguages();
  }, []);

  const handleSeraslingoLanguageClick = async (language) => {
    setSelectedSeraslingoLanguage(language);
    await fetchSeraslingoVideosByLanguage(language);
    setShowSeraslingoLanguages(false);
    if (seraslingoVideos.length > 0) {
      setSelectedSeraslingoVideoUrl(seraslingoVideos[0].video);
      setSelectedSeraslingoVideoDesc(seraslingoVideos[0].desc);
      setShowSeraslingoVideoModal(true);
    }
  };

  const handleSeraslingoVideoClick = (videoUrl, videoDesc) => {
    setSelectedSeraslingoVideoUrl(videoUrl);
    setSelectedSeraslingoVideoDesc(videoDesc);
    setShowSeraslingoVideoModal(true);
  };

  const closeSeraslingoVideoModal = () => {
    setShowSeraslingoVideoModal(false);
    setSelectedSeraslingoVideoUrl("");
    setSelectedSeraslingoVideoDesc("");
  };

  const closeSeraslingoModals = () => {
    setShowSeraslingoLanguages(false);
    setSelectedSeraslingoLanguage("");
    setSeraslingoVideos([]);
    closeSeraslingoVideoModal();
  };

  const fetchSerastechLanguages = async () => {
    try {
      const response = await axiosInstance.get("/serastechvideos/languages");
      setSerastechLanguages(response.data);
    } catch (error) {
      console.error("Error fetching Serastech languages:", error);
    }
  };

  const fetchSerastechVideosByLanguage = async (language) => {
    try {
      const response = await axiosInstance.get(
        `/serastechvideos?language=${language}`
      );
      setSerastechVideos(response.data);
    } catch (error) {
      console.error("Error fetching Serastech videos:", error);
    }
  };

  useEffect(() => {
    fetchSerastechLanguages();
  }, []);

  const handleSerastechLanguageClick = async (language) => {
    setSelectedSerastechLanguage(language);
    await fetchSerastechVideosByLanguage(language);
    setShowSerastechLanguages(false);
    if (serastechVideos.length > 0) {
      setSelectedSerastechVideoUrl(serastechVideos[0].video);
      setSelectedSerastechVideoDesc(serastechVideos[0].desc);
      setShowSerastechVideoModal(true);
    }
  };

  const handleSerastechVideoClick = (videoUrl, videoDesc) => {
    setSelectedSerastechVideoUrl(videoUrl);
    setSelectedSerastechVideoDesc(videoDesc);
    setShowSerastechVideoModal(true);
  };

  const closeSerastechVideoModal = () => {
    setShowSerastechVideoModal(false);
    setSelectedSerastechVideoUrl("");
    setSelectedSerastechVideoDesc("");
  };

  const closeSerastechModals = () => {
    setShowSerastechLanguages(false);
    setSelectedSerastechLanguage("");
    setSerastechVideos([]);
    closeSerastechVideoModal();
  };

  return (
    <body>
      <div>
        <div class="top">
          <div>
            <div class="topleftheadercard">
              <a
                href="https://twitter.com/serasummer2023"
                class="socialContainer containerTwo"
              >
                <svg class="socialSvg twitterSvg" viewBox="0 0 16 16">
                  {" "}
                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"></path>{" "}
                </svg>{" "}
              </a>

              <a
                href="https://www.linkedin.com/company/sera-summer"
                class="socialContainer containerThree"
              >
                <svg class="socialSvg linkdinSvg" viewBox="0 0 448 512">
                  <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
                </svg>
              </a>

              <a
                href="https://wa.me/message/VV6HVY6B4CB5N1"
                class="socialContainer containerFour"
              >
                <svg class="socialSvg whatsappSvg" viewBox="0 0 16 16">
                  {" "}
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"></path>{" "}
                </svg>
              </a>
            </div>
          </div>
          <div>
            <div className="T-container">
              <div className="SeraHLogo">
                <span className="logotext-1">Sera</span>
                <span className="logotext-2">Summer</span>
                <span className="logotext-3">Group</span>
              </div>
            </div>
          </div>
          <div>
            <div class="T-righteart">
              <div id="star-1">
                <div class="curved-corner-star">
                  <div id="curved-corner-bottomright"></div>
                  <div id="curved-corner-bottomleft"></div>
                </div>
                <div class="curved-corner-star">
                  <div id="curved-corner-topright"></div>
                  <div id="curved-corner-topleft"></div>
                </div>
              </div>

              <div id="star-2">
                <div class="curved-corner-star">
                  <div id="curved-corner-bottomright"></div>
                  <div id="curved-corner-bottomleft"></div>
                </div>
                <div class="curved-corner-star">
                  <div id="curved-corner-topright"></div>
                  <div id="curved-corner-topleft"></div>
                </div>
              </div>

              <div id="star-3">
                <div class="curved-corner-star">
                  <div id="curved-corner-bottomright"></div>
                  <div id="curved-corner-bottomleft"></div>
                </div>
                <div class="curved-corner-star">
                  <div id="curved-corner-topright"></div>
                  <div id="curved-corner-topleft"></div>
                </div>
              </div>

              <div id="star-4">
                <div class="curved-corner-star">
                  <div id="curved-corner-bottomright"></div>
                  <div id="curved-corner-bottomleft"></div>
                </div>
                <div class="curved-corner-star">
                  <div id="curved-corner-topright"></div>
                  <div id="curved-corner-topleft"></div>
                </div>
              </div>

              <div id="star-5">
                <div class="curved-corner-star">
                  <div id="curved-corner-bottomright"></div>
                  <div id="curved-corner-bottomleft"></div>
                </div>
                <div class="curved-corner-star">
                  <div id="curved-corner-topright"></div>
                  <div id="curved-corner-topleft"></div>
                </div>
              </div>

              <div id="star-6">
                <div class="curved-corner-star">
                  <div id="curved-corner-bottomright"></div>
                  <div id="curved-corner-bottomleft"></div>
                </div>
                <div class="curved-corner-star">
                  <div id="curved-corner-topright"></div>
                  <div id="curved-corner-topleft"></div>
                </div>
              </div>

              <div id="star-7">
                <div class="curved-corner-star">
                  <div id="curved-corner-bottomright"></div>
                  <div id="curved-corner-bottomleft"></div>
                </div>
                <div class="curved-corner-star">
                  <div id="curved-corner-topright"></div>
                  <div id="curved-corner-topleft"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="middle">
          <div className="middle-wrapper">
            <div class="pack-button-container">
              <a href="/SeraSLingo" type="button" className="buttonLM">
                Get Started
              </a>
              <Button
                type="primary"
                onClick={() => setShowSeraslingoLanguages(true)}
              >
                <IoLanguageOutline />
              </Button>
              <Modal
                title="Select a Language"
                visible={showSeraslingoLanguages}
                onCancel={closeSeraslingoModals}
                footer={[
                  <Button
                    key="cancel"
                    onClick={closeSeraslingoModals}
                    icon={<IoMdClose />}
                  >
                    Cancel
                  </Button>,
                ]}
              >
                
                {seraslingoLanguages.map((language) => (
                  <Button
                    key={language}
                    onClick={() => handleSeraslingoLanguageClick(language)}
                    >
                    {language}
                  </Button>
                ))}
              </Modal>
              <Modal
                title={`${selectedSeraslingoLanguage}`}
                visible={showSeraslingoVideoModal}
                onCancel={closeSeraslingoVideoModal}
                footer={[
                  <Button
                    key="cancel"
                    onClick={closeSeraslingoVideoModal}
                    icon={<IoMdClose />}
                  >
                    Cancel
                  </Button>,
                ]}
              >
                <div className="ratio ratio-16x9">
                  <iframe
                    src={selectedSeraslingoVideoUrl}
                    title="SeraSlingo Instruction"
                    allowFullScreen
                    width="100%"
                    height="315"
                  />
                </div>
                <h3 style={{ marginTop: "20px", marginRight: "10px" }}>
                  {selectedSeraslingoVideoDesc}
                </h3>
              </Modal>
            </div>
            <div class="middleleftcontainer">
              <div class="middleLccard">
                <div class="front">
                  <div class="phoneContainer">
                    <div class="screen">
                      <div class="camera"></div>
                      <div class="appsContainer">
                        <div class="widgets">
                          <div class="one">
                            <span className="phonetitle">SeraSlingo</span>
                          </div>
                        </div>
                        <div class="apps">
                          <div class="oneApp">Pre-A1</div>
                          <div class="oneApp">A1</div>
                          <div class="oneApp">A2</div>
                          <div class="oneApp">B1</div>
                          <div class="oneApp">B2</div>
                          <div class="oneApp">C1</div>
                          <div class="oneApp">C2</div>
                          <div class="oneApp">
                            Podcast
                          </div>
                          <div class="oneApp">English</div>
                          <div class="oneApp">Interview</div>
                          <div class="oneApp">Consultant</div>
                          <div class="oneApp More">
                            Start with Seraslingo <br /> GET STARTED
                          </div>
                        </div>

                        <div class="menuBar">
                          <div class="twoApp menuBar-show">
                            <FaPhoneFlip />
                          </div>
                          <div class="twoApp menuBar-hidden">
                            <FaWhatsapp />
                          </div>
                          <div class="twoApp menuBar-show">
                            <CiMail />
                          </div>
                          <div class="twoApp menuBar-hidden">
                            <IoIosPeople />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="back">
                  <div class="pack-container">
                    <div class="pack-header">
                      <p class="pack-title">Start with only</p>
                      <div class="price-container">
                        <span>$</span>60
                        <span>/mo</span>
                      </div>
                    </div>
                    <div class="pack-lists">
                      <span class="pack-list pack-list-small">
                        <GrStatusGood />
                        PreA1 - C2 Level
                      </span>
                      <span class="pack-list pack-list-small">
                        <GrStatusGood />
                        Speaking Club
                      </span>
                      <span class="pack-list pack-list-small">
                        <GrStatusGood />
                        Professional Career Training
                      </span>
                      <span class="pack-list ">
                        <GrStatusGood />
                        Speaking, Grammar, Writing Enhancement
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="RMHContainer">
            <div className="pack-button-container">
              <a href="/SeraSTech" className="buttonLM">
                Get Started
              </a>
              <Button
                type="primary"
                onClick={() => setShowSerastechLanguages(true)}
              >
                <IoLanguageOutline />
              </Button>
              <Modal
                title="Select a Language"
                visible={showSerastechLanguages}
                onCancel={closeSerastechModals}
                footer={[
                  <Button
                    key="cancel"
                    onClick={closeSerastechModals}
                    icon={<IoMdClose />}
                  >
                    Cancel
                  </Button>,
                ]}
              >
                {serastechLanguages.map((language) => (
                  <Button
                    key={language}
                    onClick={() => handleSerastechLanguageClick(language)}
                    style={{ marginBottom: "10px" }}
                  >
                    {language}
                  </Button>
                ))}
              </Modal>
              <Modal
                title={` ${selectedSerastechLanguage}`}
                visible={showSerastechVideoModal}
                onCancel={closeSerastechVideoModal}
                footer={[
                  <Button
                    key="cancel"
                    onClick={closeSerastechVideoModal}
                    icon={<IoMdClose />}
                  >
                    Cancel
                  </Button>,
                ]}
              >
                <div className="ratio ratio-16x9">
                  <iframe
                    src={selectedSerastechVideoUrl}
                    title="Serastech Video"
                    allowFullScreen
                    width="100%"
                    height="315"
                  />
                </div>
                <h3 style={{ marginTop: "20px", marginRight: "10px" }}>
                  {selectedSerastechVideoDesc}
                </h3>
              </Modal>
            </div>
            <div>
              <div class="RMcontainer">
                <div class="terminal_toolbar">
                  <div class="butt">
                    <span class="RMBtn RMBtn-color RMBtn-show"></span>
                    <span class="RMBtn RMBtn-color"></span>
                    <span class="RMBtn RMBtn-color"></span>
                    <span class="RMBtn RMBtn-color"></span>
                    <span class="RMBtn RMBtn-color"></span>

                    <p class="user">SeraStech</p>
                  </div>
                </div>
                <div class="terminal_body">
                  <div class="terminal_promt">
                    <span class="terminal_user">Best Tech Solution:</span>
                    <span class="terminal_bling">
                      Looking for the best Tech solution that fits your budget $
                    </span>
                    <span class="terminal_cursor"></span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="e-card playing">
                <div class="image"></div>

                <div class="wave"></div>
                <div class="wave"></div>
                <div class="wave"></div>

                <div class="infotop">
                  <div className="infoTop-Container">
                    <div className="RMMIcons">
                      <div className="uxanduiicon">
                        <img src={UXandUI} alt="" />
                      </div>
                      <div>
                        <img src={javascript} alt="" />
                      </div>
                      <div>
                        <img src={reactjs} alt="" />
                      </div>
                      <div>
                        <img src={html} alt="" />
                      </div>
                      <div>
                        <img src={nodejs} alt="" />
                      </div>
                      <div>
                        <img src={nextjs} alt="" />
                      </div>
                    </div>
                    <div className="RMMTexts">
                      <div>UX / UI Designer</div>
                      <div>Full Stack</div>
                      <div>E - Commerce</div>
                      <div>Web Development</div>
                      <div>Cutting-edge designs</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div className="smallphoneMainHomepagehiddenbtn-container">
            <div className="smallphoneMainHomepagehiddenbtn-container-inner">
              <div>
              <Button
                type="primary"
                onClick={() => setShowSeraslingoLanguages(true)}
              >
                <IoLanguageOutline />
              </Button>
              <Modal
                title="Select a Language"
                visible={showSeraslingoLanguages}
                onCancel={closeSeraslingoModals}
                footer={[
                  <Button
                    key="cancel"
                    onClick={closeSeraslingoModals}
                    icon={<IoMdClose />}
                  >
                    Cancel
                  </Button>,
                ]}
              >
                
                {seraslingoLanguages.map((language) => (
                  <Button
                    key={language}
                    onClick={() => handleSeraslingoLanguageClick(language)}
                    >
                    {language}
                  </Button>
                ))}
              </Modal>
              <Modal
                title={`${selectedSeraslingoLanguage}`}
                visible={showSeraslingoVideoModal}
                onCancel={closeSeraslingoVideoModal}
                footer={[
                  <Button
                    key="cancel"
                    onClick={closeSeraslingoVideoModal}
                    icon={<IoMdClose />}
                  >
                    Cancel
                  </Button>,
                ]}
              >
                <div className="ratio ratio-16x9">
                  <iframe
                    src={selectedSeraslingoVideoUrl}
                    title="SeraSlingo Instruction"
                    allowFullScreen
                    width="100%"
                    height="315"
                  />
                </div>
                <h3 style={{ marginTop: "20px", marginRight: "10px" }}>
                  {selectedSeraslingoVideoDesc}
                </h3>
              </Modal>
              </div>
              <a href="/SeraSLingo">SeraSlingo</a>
            </div>
            <div className="smallphoneMainHomepagehiddenbtn-container-inner">
              <div>
              <Button
                type="primary"
                onClick={() => setShowSerastechLanguages(true)}
              >
                <IoLanguageOutline />
              </Button>
              <Modal
                title="Select a Language"
                visible={showSerastechLanguages}
                onCancel={closeSerastechModals}
                footer={[
                  <Button
                    key="cancel"
                    onClick={closeSerastechModals}
                    icon={<IoMdClose />}
                  >
                    Cancel
                  </Button>,
                ]}
              >
                {serastechLanguages.map((language) => (
                  <Button
                    key={language}
                    onClick={() => handleSerastechLanguageClick(language)}
                    style={{ marginBottom: "10px" }}
                  >
                    {language}
                  </Button>
                ))}
              </Modal>
              <Modal
                title={` ${selectedSerastechLanguage}`}
                visible={showSerastechVideoModal}
                onCancel={closeSerastechVideoModal}
                footer={[
                  <Button
                    key="cancel"
                    onClick={closeSerastechVideoModal}
                    icon={<IoMdClose />}
                  >
                    Cancel
                  </Button>,
                ]}
              >
                <div className="ratio ratio-16x9">
                  <iframe
                    src={selectedSerastechVideoUrl}
                    title="Serastech Video"
                    allowFullScreen
                    width="100%"
                    height="315"
                  />
                </div>
                <h3 style={{ marginTop: "20px", marginRight: "10px" }}>
                  {selectedSerastechVideoDesc}
                </h3>
              </Modal>
              </div>
              <a href="/SeraSTech">SeraStech</a>
            </div>
          </div>
          <div className="BTbox-slider">
            <div
              className="sliders animated"
              data-animated={shouldAnimateLeft}
              data-direction="left"
            >
              <ul className="tag-list sliders-inner" ref={sliderInnerRefLeft}>
                <div className="slide-imgTop">
                  <img src={Deutsch} alt="" />
                </div>
                <div className="slide-imgTop">
                  <img src={Russian} alt="" />
                </div>
                <div className="slide-imgTop">
                  <img src={Armenian} alt="" />
                </div>
                <div className="slide-imgTop">
                  <img src={Spanish} alt="" />
                </div>
                <div className="slide-imgTop">
                  <img src={English} alt="" />
                </div>
                <div className="slide-img-arabic">
                  <img src={Arabic} alt="" />
                </div>
                <div className="slide-imgTop">
                  <img src={Chinese} alt="" />
                </div>
                <div className="slide-img-hindi">
                  <img src={Hindi} alt="" />
                </div>
                <div className="slide-img-french">
                  <img src={French} alt="" />
                </div>
                <div className="slide-imgTop">
                  <img src={Farsi} alt="" />
                </div>
              </ul>
            </div>
            <div
              className="sliders animated "
              data-animated={shouldAnimateRight}
              data-direction="right"
            >
              <ul className="tag-list sliders-inner" ref={sliderInnerRefRight}>
                <li>UI/UX Design</li>

                <div className="slide-img">
                  <img src={img3} alt="" />
                </div>
                <div className="slide-img">
                  <img src={img4} alt="" />
                </div>
                <li>Frontend</li>
                <div className="slide-img">
                  <img src={img5} alt="" />
                </div>
                <div className="slide-img">
                  <img src={img8} alt="" />
                </div>
                <li>Backend</li>
                <div className="slide-img">
                  <img src={img7} alt="" />
                </div>
                <li>Fullstack</li>
              </ul>
            </div>
          </div>
          <div className="M-Bottom p-5 mt-3 mb-2">
            <div className="M-B-Bottom MBBottomshow">
              <div>
                <h1>Tel</h1>
                <li className="tel-show">+49 1573 4652454</li>

                <li className="tel-show">+374 93 801449</li>
              </div>
            </div>
            <div className="M-B-Bottom MBBottomshow">
              <div>
                <h1>Email Address</h1>
                <li className="mail-show">info@sera-summer.com</li>
                <li className="contact-hidden">sales@sera-summer.com</li>
              </div>
            </div>
          </div>
          <div className="B-Bottom">
            <div className="B-Bottom-bottomFooterMainHomePage">
              <a href="https://www.linkedin.com/in/saeed-ranjbari-18586a28">
                Designed: Saeed Ranjbari
              </a>
            </div>

            <div className="B-Bottom-bottomFooterMainHomePage">
              <a href="/">www.sera-summer.com</a>
            </div>
          </div>
        </div>
      </div>
      <div class="gradient-bg">
        <svg xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="goo">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="10"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
        <div class="gradients-container">
          <div class="g1"></div>
          <div class="g2"></div>
          <div class="g3"></div>
          <div class="g4"></div>
          <div class="g5"></div>
          <InteractiveComponent />
        </div>
      </div>
      <script type="module" src="/src/main.ts"></script>
    </body>
  );
};

export default MainHomePage;
