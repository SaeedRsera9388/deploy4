import React from "react";
import "./TermsConditionsPage.scss";
import HeaderBar from "../SeraSlingo/Header/HeaderBar";
import PlanHeader from "../SeraSlingo/PlanHeader/PlanHeader";
import MailList from "../SeraSlingo/MailList/MailList";
import Footer from "../SeraSlingo/Footer/SeraFooter";

const TermsConditionsPage = () => {
  return (
    <div >
     <HeaderBar />
      <PlanHeader type="list" />
      <div className="flexColCenter TermsandCondition-container">
       <h1>
        Terms and conditions 
       </h1>
       <p>Acceptance of Terms: Users must agree to abide by these terms to
          access the website. User Conduct: Outline expected behavior,
          prohibition of abusive language, etc. Intellectual Property Rights:
          Protection of website content, trademarks, and copyrights. Limitation
          of Liability: Disclaimer of responsibility for certain events or
          damages. Warranties: Clarify any warranties or guarantees provided by
          the website. Privacy Policy: Details about data collection, storage,
          and use of personal information. Cookies Policy: Explanation of how
          cookies are used and their purpose. Third-party Links: Disclaimer for
          external links and their content. Termination Clause: Conditions under
          which access to the website may be terminated. Governing Law: Specify
          which laws govern the terms and conditions. Dispute Resolution:
          Process for resolving disputes, often through arbitration or
          mediation. Updates to Terms: Notification of changes to the terms and
          conditions. Payment Terms: Information about fees, payment methods,
          and billing. Cancellation and Refund Policy: Rules regarding
          cancellations and refunds. Indemnification: Users agree to indemnify
          the website against certain liabilities. Prohibited Activities:
          Activities that are not allowed on the website. Age Restrictions:
          Minimum age requirements to use the website's services. Security
          Measures: Explanation of security measures taken to protect user data.
          Accessibility: Commitment to making the website accessible to all
          users. Disclaimer: Clarify the accuracy of information provided on the
          website.</p>
      </div>
      <MailList />
      <Footer />
    </div>
  );
};

export default TermsConditionsPage;
