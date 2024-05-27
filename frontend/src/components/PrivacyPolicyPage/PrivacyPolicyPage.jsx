import React from "react";
import "./PrivacyPolicyPage.scss";
import HeaderBar from "../SeraSlingo/Header/HeaderBar";
import PlanHeader from "../SeraSlingo/PlanHeader/PlanHeader";
import MailList from "../SeraSlingo/MailList/MailList";
import Footer from "../SeraSlingo/Footer/SeraFooter";

const PrivacyPolicyPage = () => {
  return (
    <div >
      <HeaderBar />
      <PlanHeader type="list" />
      <div className="flexColCenter paddings PrivacyPolicy-container">
        <h1>Privacy Policy: </h1>
        <p> Data Collection: Describe what data is collected
          (personal information, cookies, IP addresses, etc.) and how it's
          obtained. Usage of Information: Explain how collected data is used
          (improving services, marketing, analytics). Data Sharing: Clarify if
          and how data is shared with third parties and for what purposes. User
          Rights: Inform users about their rights to access, modify, or delete
          their data. Security Measures: Detail the security protocols
          implemented to protect user data. Cookies Policy: Types of Cookies:
          Explain the different types of cookies used (session, persistent,
          third-party). Purpose of Cookies: Describe the purpose of each type of
          cookie and how they enhance user experience. Managing Cookies: Explain
          how users can manage or disable cookies in their browsers. Refund and
          Cancellation Policy: Refund Conditions: Clearly state the conditions
          under which refunds are provided (cancellation period, product
          condition, etc.). Cancellation Process: Outline the steps users need
          to take to cancel services or orders. Refund Timeline: Mention the
          timeline for processing refunds once requested by users. Terms of
          Service: User Conduct: Specify the expected behavior of users on the
          platform (no harassment, hate speech, etc.). Intellectual Property:
          Explain the ownership of content shared on the platform by users.
          Liability Limitations: Clarify the limitations of liability for the
          platform in certain situations. Termination of Service: Outline the
          conditions under which the platform may terminate user access.
          Accessibility Policy: Commitment to Accessibility: Express commitment
          to ensuring the platform is accessible to users with disabilities.
          Accessibility Features: Detail the features implemented to enhance
          accessibility (alt text for images, keyboard navigation, etc.).
          Feedback Mechanism: Provide a method for users to report accessibility
          issues. Age Restrictions: Minimum Age Requirement: Specify the minimum
          age for users to access the platform or services. Parental Consent:
          Describe any requirements for parental consent for underage users.
          Disclaimers: Information Accuracy: Clarify that the information
          provided on the platform is for informational purposes and not
          guaranteed to be accurate. Third-party Content: Disclaim
          responsibility for content provided by third parties or external
          links.</p>
      </div>
      <MailList />
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
