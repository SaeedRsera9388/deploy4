import React from 'react';
import './SearchItem.scss';
import { Link } from 'react-router-dom';
import ReactReadMoreReadLess from "react-read-more-read-less";

const SearchItem = ({ item, plans }) => {
  return (
    <div className='searchItem'>
      <img src={item.photo[0]} alt="" className='siImg' />
      <div className="siDesc">
        <h1 className='siTitle'>{item.title}</h1>
        <span className="siLanguageProficiencyAreas">{item.name}</span>
        <span className="siSubTitle">{item.title}</span>
        <span className="siFeature">
          <ReactReadMoreReadLess
            charLimit={100}
            readMoreText={"Read more ▼"}
            readLessText={"Read less ▲"}
          >
            {item.desc}
          </ReactReadMoreReadLess>
        </span>
        <span className="siLevel">{item.level}</span>
        <span className="siLevelOpSubtitle">{item.plan}</span>
        <div className="siPlans">
          {plans && plans.length > 0 ? (
            plans.map(plan => (
              <div key={plan._id} className="siPlan">
                <span className='siSubTitle'>Plans Duration: {plan.title}</span>
                <span className='siFeature'>Max Participants: {plan.maxParticipant}</span>
              </div>
            ))
          ) : (
            <div className="siPlan">
              <p>Contact us for further details!</p>
            </div>
          )}
        </div>
      </div>
      <div className="siDetails">
        {item.rating && (
          <div className="siRating">
            <span>Excellent</span>
            <button>{item.rating}</button>
          </div>
        )}
        <div className="siDetailTexts">
          <span className="siPrice">${item.cheapestPrice}</span>
          <span className="siTaxOp">Include taxes and fees</span>
          <Link to={`/plans/${item._id}`}>
            <button className="siCheckButton">View</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
