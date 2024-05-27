import React, { useState } from 'react'
import './ChooseYourPlan.scss'
import PlanHeader from '../PlanHeader/PlanHeader'
import Featured from '../Featured/Featured'
import FeaturedType from '../FeaturedType/FeaturedType'
import MailList from '../MailList/MailList'
import HeaderBar from '../Header/HeaderBar'
import Footer from '../Footer/SeraFooter'
import UpdateLatestNews from '../UpdateLatestNews/UpdateLatestNews'

const ChooseYourPlan = () => {
  
  return (
    <div>
      <HeaderBar />
      <PlanHeader />
      <div className="chooseYourPlan-Container">
      <h1 className="chooseYourPlan-Title">Latest Updates</h1>
      < UpdateLatestNews />
      <h1 className="chooseYourPlan-Title">Overview</h1>
      <Featured />
      <h1 className="chooseYourPlan-Title">🔥🔥🔥🔥Recently added 🔥🔥🔥🔥Best Offer🔥🔥🔥🔥</h1>
      <FeaturedType />  
      <MailList /> 
      </div>
      <Footer />
    </div>
  )
}

export default ChooseYourPlan