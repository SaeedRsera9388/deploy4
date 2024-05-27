// src/Category.js
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Category.scss";
import Lottie from "lottie-react"; // Import Lottie
import animationData1 from "../../../assets/start.json"; // Import Lottie JSON data
import animationData2 from "../../../assets/selectoptions.json";
import animationData3 from "../../../assets/calendarduration.json";
import animationData4 from "../../../assets/thinkexpectation.json";
import animationData5 from "../../../assets/sendmail.json";
import { MdAdsClick } from "react-icons/md";

const animationData = [
  animationData1,
  animationData2,
  animationData3,
  animationData4,
  animationData5,
  // Add other animation data imports here...
];

const categories = [
  {
    id: 1,
    animationDataIndex: 1,
    title: "View Program",
    description: "",
  },
  {
    id: 2,
    animationDataIndex: 2,
    title: "Overview ",
    description: "",
  },
  {
    id: 3,
    animationDataIndex: 3,
    title: "FAQ",
    description: "",
  },
  {
    id: 4,
    animationDataIndex: 4,
    title: "Book Appointment",
    description: "",
  },
];

function getCategoryLink(id) {
  switch (id) {
    case 1:
      return "/ViewProgram";
    case 2:
      return "/Overview";
    case 3:
      return "/FAQ";
    case 4:
      return "/bookAppointment";
    default:
      return "/";
  }
}

function truncateDescription(descriptionRef) {
  const description = descriptionRef.current;
  if (description && description.scrollHeight > description.clientHeight) {
    const fullText = description.innerText;
    let cutOff = Math.floor(fullText.length / 2);
    while (description.scrollHeight > description.clientHeight && cutOff > 0) {
      description.innerText = fullText.slice(0, cutOff) + "...";
      cutOff -= 10;
    }
  }
}

function CategoryItem({ category }) {
  const descriptionRef = useRef(null);

  useEffect(() => {
    truncateDescription(descriptionRef);
  }, []);

  const link = getCategoryLink(category.id);
  
  return (
    <div className="category-item" key={category.id}>
      <Lottie animationData={animationData[category.animationDataIndex]} />
      <div className="category-title-box">
        <div className="category-title">
          <Link to={link}>
            <a className="category-icon">
              <MdAdsClick className="category-icon" />
            </a>
            <span className="category-title-text">{category.title}</span>
          </Link>
        </div>
      </div>

      <span className="category-title-text-desc" ref={descriptionRef}>{category.description}</span>
    </div>
  );
}

function Category() {
  return (
    <div className="category">
      <h2>Explore SeraSlingo</h2>
      <div className="category-list">
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </div>
      <Link to="/Plans" className="category-bottom">
        Get Start
      </Link>{" "}
    </div>
  );
}

export default Category;
