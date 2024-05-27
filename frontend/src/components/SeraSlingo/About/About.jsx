import React from "react";

import "./About.scss";
import Footer from "../Footer/SeraFooter";
import HeaderBar from "../Header/HeaderBar";
import PlanHeader from "../PlanHeader/PlanHeader";
import MailList from "../MailList/MailList";
import { Image } from "antd";
import AboutSerslingoImg from "../../assets/1707939581161.JPG";
import { motion } from "framer-motion";

import SeraSlingoAboutitemsimg1 from "../../assets/BookcoverAbou.png";
import SeraSlingoAboutitemsimg2 from "../../assets/1707939581155.JPG";
import SeraSlingoAboutitemsimg3 from "../../assets/1711627488854.jfif";
import SeraSlingoAboutitemsimg4 from "../../assets/Aboutseralingoteambuilt1.jpeg";

import AboutSeraSlingorightpagetext1 from "../../assets/kidsAbouseraslingo.jpg";
import AboutSeraSlingorightpagetext2 from "../../assets/1618820038215.jfif";
import AboutSeraSlingorightpagetext3 from "../../assets/1618823515876-1.jfif";
import AboutSeraSlingorightpagetext4 from "../../assets/1677263712153.jpg";
import AboutSeraSlingorightpagetext5 from "../../assets/1707939581150.JPG";
import AboutSeraSlingorightpagetext6 from "../../assets/saeed.jpg";
import AboutSeraSlingorightpagetext7 from "../../assets/IMG-20230105-WA0008.jpg";

import { HiLocationMarker } from "react-icons/hi";
import CountUp from "react-countup";

const About = () => {
  return (
    <div>
      <HeaderBar />
      <PlanHeader type="list" />
      <div className="SeraSlingoAbout-container">
        <div className="SeraSlingoAbout-container-wrapper">
          <div className="SeraSlingoAbout-container-left-box">
            <div className="hero-title">
              <div className="orange-circle" />
              <motion.h1
                initial={{ y: "10rem", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 2,
                  type: "spring",
                }}
              >
                Learn <br />
                and Join <br />
                SeraSlingo
              </motion.h1>
            </div>
            <div className="flexColCenter hero-desc">
              <span className="secondaryText">
                SeraSlingo : To be Global Go Local.
              </span>
            </div>

            <div className="flexCenter stats">
              {/* First Row  */}
              <div className="flexColStart row">
                <div className="flexColStart stats">
                  <span>
                    <CountUp start={0} end={153} duration={9} />
                    <span>+</span>
                  </span>
                  <span className="secondaryText stats-text-About-seraslingo">Visit</span>
                </div>

                <div className="flexColStart stats">
                  <span>
                    <CountUp start={0} end={123} duration={8} />
                    <span>+</span>
                  </span>
                  <span className="secondaryText stats-text-About-seraslingo">Satisfied Customer</span>
                </div>
              </div>

              {/* second row  */}
              <div className="flexColStart row">
                <div className="flexColStart stats">
                  <span>
                    <CountUp end={15} duration={15} />
                    <span>+</span>
                  </span>
                  <span className="secondaryText stats-text-About-seraslingo">Languages</span>
                </div>
                <div className="flexColStart stats">
                  <span>
                    <CountUp end={15} duration={20} />
                    <span>+</span>
                  </span>
                  <span className="secondaryText stats-text-About-seraslingo">Groups</span>
                </div>
              </div>
            </div>
          </div>
          <div className="SeraSlingoAbout-container-right-box">
            <motion.div
              className="SeraSlingoAbout-container-right-box-inner"
              initial={{ x: "20rem", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 1,
                type: "spring",
              }}
            >
              <Image
                src={AboutSerslingoImg}
                className="SeraSlingoAbout-container-right-box-imgImage"
                alt=""
              />
            </motion.div>
          </div>
        </div>

        <div className="SeraSlingoAbout-container-middle-box-details">
          <div className="SeraSlingoAbout-container-middle-box-details-header">
            <h1 className="SeraSlingoAbout-container-middle-box-details-header-text">
              SeraSlingo's Mission and vision
            </h1>
          </div>
          <div className="SeraSlingoAbout-container-middle-box-details-Middle-mid">
            <div className="SeraSlingoAbout-container-middle-box-details-Middle-mid-left">
              <h1 className="SeraSlingoAbout-container-middle-box-details-Middle-mid-left-text">
                Our Mission: Empowering Individuals and Organizations Through
                Language
              </h1>
              <div className="SeraSlingoAbout-container-middle-box-details-Middle-mid-left-text-p">
                <div className="SeraSlingoAbout-container-middle-box-details-Middle-mid-left-text-p-items">
                  <div className="SeraSlingoAbout-container-middle-box-details-Middle-mid-left-text-p-items-img">
                    <Image src={SeraSlingoAboutitemsimg1} className="" alt="" />
                  </div>
                  <span className="SeraSlingoAbout-container-middle-box-details-Middle-mid-left-text-p-items-text">
                    At our core, we are driven by a singular mission: to empower
                    individuals and organizations through comprehensive language
                    education. With a deep commitment to excellence and a
                    passion for fostering meaningful connections, we strive to
                    create an inclusive learning environment where learners of
                    all backgrounds and proficiency levels can thrive.
                  </span>
                </div>
                <div className="SeraSlingoAbout-container-middle-box-details-Middle-mid-left-text-p-items">
                  <span className="SeraSlingoAbout-container-middle-box-details-Middle-mid-left-text-p-items-text">
                    Empowering Individuals: Our mission begins with the
                    individual learner in mind. Whether you're a complete
                    beginner or a seasoned language enthusiast, we believe in
                    equipping you with the tools and resources necessary to
                    achieve your language learning goals. From mastering grammar
                    and expanding vocabulary to honing speaking and writing
                    skills, our tailored programs cater to diverse learning
                    styles and preferences, ensuring that each individual
                    receives the support they need to succeed.
                  </span>
                  <div className="SeraSlingoAbout-container-middle-box-details-Middle-mid-left-text-p-items-img">
                    <Image src={SeraSlingoAboutitemsimg2} className="" alt="" />
                  </div>
                </div>
                <div className="SeraSlingoAbout-container-middle-box-details-Middle-mid-left-text-p-items">
                  <div className="SeraSlingoAbout-container-middle-box-details-Middle-mid-left-text-p-items-img">
                    <Image src={SeraSlingoAboutitemsimg3} className="" alt="" />
                  </div>
                  <span className="SeraSlingoAbout-container-middle-box-details-Middle-mid-left-text-p-items-text">
                    Empowering Organizations: Beyond individual growth, we
                    recognize the pivotal role that language proficiency plays
                    in today's globalized world. That's why we partner with
                    organizations across various industries, including banking,
                    finance, IT, and beyond, to elevate their teams' language
                    skills and enhance their professional capabilities. Through
                    customized training programs and consultancy services, we
                    empower businesses to communicate effectively, navigate
                    diverse linguistic landscapes, and achieve greater success
                    in their respective fields. Fostering Lifelong Learning: Our
                    mission extends beyond the confines of traditional classroom
                    settings. We believe in fostering a culture of lifelong
                    learning, where language education transcends boundaries and
                    enriches lives on a continuous basis. Whether it's through
                    private classes for high school students, personalized
                    coaching for professionals, or specialized courses for
                    individuals looking to embark on new adventures abroad, we
                    are committed to being a lifelong partner in our learners'
                    educational journeys.
                  </span>
                </div>
                <div className="SeraSlingoAbout-container-middle-box-details-Middle-mid-left-text-p-items">
                  <span className="SeraSlingoAbout-container-middle-box-details-Middle-mid-left-text-p-items-text">
                    Cultivating Community: At the heart of our mission lies a
                    commitment to building vibrant and inclusive communities.
                    Through our diverse range of programs, including speaking
                    clubs, podcast sessions, and collaborative group activities,
                    we foster connections that transcend linguistic barriers and
                    celebrate cultural diversity. By bringing people together in
                    a supportive and interactive environment, we aim to
                    cultivate a sense of belonging and camaraderie that extends
                    far beyond the classroom.
                  </span>
                  <div className="SeraSlingoAbout-container-middle-box-details-Middle-mid-left-text-p-items-img">
                    <img src={SeraSlingoAboutitemsimg4} className="" alt="" />
                  </div>
                </div>
                <p className="SeraSlingoAbout-container-middle-box-details-Middle-mid-left-text-p-items-text-last-part">
                  our mission is rooted in the belief that language education
                  has the power to transform lives, empower individuals, and
                  strengthen communities. Through our unwavering dedication to
                  excellence, innovation, and inclusivity, we strive to be a
                  driving force behind the language learning journey of every
                  individual and organization we serve.
                </p>
              </div>
            </div>
            <div className="SeraSlingoAbout-container-middle-box-details-Middle-mid-right">
              <h1 className="SeraSlingoAbout-container-middle-box-details-Middle-mid-right-text">
                Our Vision: Bridging Cultures, Enriching Lives
              </h1>
              <div className="SeraSlingoAbout-container-middle-box-details-Middle-mid-right-text-p">
                <div className="SeraSlingoAbout-container-middle-box-details-Middle-mid-right-text-p-items-differ">
                  <span className="SeraSlingoAbout-container-middle-box-details-Middle-mid-right-text-p-items-text">
                    As we look towards the future, our vision is guided by a
                    deep sense of purpose and a commitment to making a positive
                    impact on the world around us. Drawing inspiration from our
                    rich history of collaboration with diverse organizations and
                    learners, we aspire to be the leading force in bridging
                    cultures, enriching lives, and fostering mutual
                    understanding across linguistic divides.
                  </span>
                  <div className="SeraSlingoAbout-container-middle-box-details-Middle-mid-right-text-p-items-differ-img">
                    <img src={AboutSeraSlingorightpagetext1} alt="" />
                  </div>
                </div>
                <div className="SeraSlingoAbout-container-middle-box-details-Middle-mid-right-text-p-items">
                  <span className="SeraSlingoAbout-container-middle-box-details-Middle-mid-right-text-p-items-text">
                    Bridging Cultures: Central to our vision is the belief in
                    the transformative power of language as a bridge between
                    cultures. We envision a world where linguistic diversity is
                    celebrated and embraced, where communication barriers are
                    dismantled, and where individuals from all corners of the
                    globe can connect and collaborate with ease. By promoting
                    cross-cultural exchange and understanding, we strive to
                    build bridges that transcend differences and unite people in
                    a shared pursuit of knowledge and mutual respect.
                  </span>
                  <div className="SeraSlingoAbout-container-middle-box-details-Middle-mid-right-text-p-items-img">
                    <img src={AboutSeraSlingorightpagetext2} alt="" />
                  </div>
                </div>
                <div className="SeraSlingoAbout-container-middle-box-details-Middle-mid-right-text-p-items">
                  <div className="SeraSlingoAbout-container-middle-box-details-Middle-mid-right-text-p-items-img">
                    <img src={AboutSeraSlingorightpagetext3} alt="" />
                  </div>
                  <span className="SeraSlingoAbout-container-middle-box-details-Middle-mid-right-text-p-items-text">
                    Enriching Lives: At the heart of our vision lies a deep
                    commitment to enriching the lives of individuals and
                    communities through language education. We envision a future
                    where language learning is not just a means to an end, but a
                    lifelong journey of discovery, growth, and personal
                    enrichment. By providing accessible, engaging, and
                    high-quality language education, we seek to empower
                    individuals to unlock their full potential, pursue their
                    passions, and lead fulfilling lives enriched by the beauty
                    of language and culture.
                  </span>
                </div>
                <div className="SeraSlingoAbout-container-middle-box-details-Middle-mid-right-text-p-items">
                  <span className="SeraSlingoAbout-container-middle-box-details-Middle-mid-right-text-p-items-text">
                    Creating Opportunities: As we work towards our vision, we
                    are driven by a relentless commitment to creating
                    opportunities for all. Whether it's through our innovative
                    language programs, customized training solutions for
                    organizations, or community outreach initiatives, we strive
                    to break down barriers to education and empower individuals
                    from all walks of life to thrive in an increasingly
                    interconnected world. By democratizing access to language
                    education and fostering a culture of lifelong learning, we
                    aim to open doors to new possibilities and create pathways
                    to success for individuals and communities worldwide.
                  </span>
                  <div className="SeraSlingoAbout-container-middle-box-details-Middle-mid-right-text-p-items-img">
                    <Image src={AboutSeraSlingorightpagetext4} alt="" />
                  </div>
                </div>
                <div className="SeraSlingoAbout-container-middle-box-details-Middle-mid-right-text-p-items">
                  <div className="SeraSlingoAbout-container-middle-box-details-Middle-mid-right-text-p-items-img">
                    <Image src={AboutSeraSlingorightpagetext5} alt="" />
                  </div>
                  <span className="SeraSlingoAbout-container-middle-box-details-Middle-mid-right-text-p-items-text">
                    Inspiring Change: Ultimately, our vision is one of hope,
                    inspiration, and positive change. We believe that by
                    empowering individuals with the language skills and cultural
                    competence they need to navigate an ever-changing world, we
                    can create a more inclusive, harmonious, and prosperous
                    global community. Through our unwavering dedication to
                    excellence, innovation, and social responsibility, we aspire
                    to be a catalyst for positive transformation, inspiring
                    individuals to reach beyond their perceived limits and
                    embrace the limitless possibilities that language learning
                    affords.
                  </span>
                </div>
                <div className="SeraSlingoAbout-container-middle-box-details-Middle-mid-right-text-p-items last-part-items-seraslingo">
                  <div>
                    <Image src={AboutSeraSlingorightpagetext6} alt="" />
                  </div>
                  <span className="SeraSlingoAbout-container-middle-box-details-Middle-mid-right-text-p-items-text">
                    our vision is a testament to our unwavering commitment to
                    building a better, more connected world through the
                    transformative power of language education. By bridging
                    cultures, enriching lives, and creating opportunities for
                    all, we strive to leave a lasting legacy of empowerment,
                    inspiration, and positive change for generations to come.
                  </span>
                  <div>
                    <Image src={AboutSeraSlingorightpagetext7} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="SeraSlingoAbout-container-middle-box-details-Middle-bottom">
            Chart
          </div>
        </div>
      </div>
      <MailList />
      <Footer />
    </div>
  );
};

export default About;
