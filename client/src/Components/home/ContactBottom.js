import React from "react";
import Logo from "../assets/images/Logo.svg";
import SocialMedia from "../assets/images/SocialMedia.svg";
import SocialMedia1 from "../assets/images/SocialMedia1.svg";
import SocialMedia2 from "../assets/images/SocialMedia2.svg";
import SocialMedia3 from "../assets/images/SocialMedia3.svg";
import "./ContactBottom.css";
function ContactBottom() {
  return (
    <>
      <div className="Contacts-bottom pb-9 pt-12">
        <div className="flex flex-row justify-between w-full">
          <div className="contact-text">
            <a href="/">
              <img src={Logo} alt="" style={{ width: 119.68, height: 32 }} />
            </a>
            <div className="terms">
              <p>Privacy Policy</p>
              <a href="/term-service">
                <p>Terms of Service</p>
              </a>
            </div>
          </div>
          <div className="contact-icons">
            <img src={SocialMedia} alt="" />
            <a
              href="https://www.linkedin.com/company/uttertale/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={SocialMedia1} alt="" />
            </a>
            <img src={SocialMedia2} alt="" />
            <img src={SocialMedia3} alt="" />
          </div>
        </div>
        <div className="resp-terms">
          <p>Privacy Policy</p>
          <a href="/term-service">
            <p>Terms of Service</p>
          </a>
        </div>
      </div>
    </>
  );
}

export default ContactBottom;
