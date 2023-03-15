import React from "react";
import { Font } from "../../styling/Styles";
import Graphics from "../assets/images/Graphics.svg";
import HIW1 from "../assets/images/HIW1.svg";
import HIW2 from "../assets/images/HIW2.svg";
import HIW3 from "../assets/images/HIW3.svg";
import "./HowItworks.css";

function HowItworks() {
  const arr = [
    {
      imgLink: HIW1,
      bold: "Join Uttertale",
      text: "Become a member of a group that have Businesses, Entrepreneurs and Content creators from same industry",
    },
    {
      imgLink: HIW2,
      bold: "Use groups",
      text: "Use these groups to create/access early and officials news and announcements from businesses and collabrate with them.",
    },
    {
      imgLink: HIW3,
      bold: "Collabrate",
      text: "Reach out to members of groups and conncet with them for collabration and get best for your marketing needs.",
    },
  ];

  const Design = ({ num }) => {
    return (
      <div className="how-inside">
        <div className="how-img">
          <img src={arr[num].imgLink} className="how-img-box" alt="" />
        </div>
        <div className="how-t-box">
          <h1
            className={`howtext ${Font.font} ${Font.heading1} ${Font.medium} desktop`}
          >
            {arr[num].bold}
          </h1>
          <h1
            className={`resp ${Font.font} ${Font.heading3} ${Font.medium}`}
            style={{ color: "#242424" }}
          >
            {arr[num].bold}
          </h1>
          <p className={`desktop ${Font.body2} ${Font.font} ${Font.regular}`}>
            {arr[num].text}
          </p>
          <p className={`${Font.font} ${Font.body2} ${Font.regular} resp`}>
            {arr[num].text}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="Howitworks flex flex-col items-center justify-center my-20">
      <h1 className={`desktop ${Font.font} ${Font.bold} ${Font.display}`}>
        How It Works
      </h1>
      <h1 className={`${Font.font} ${Font.heading2} ${Font.bold} resp h-i-w-h`}>
        How It Works
      </h1>
      <div className="how-works">
        <Design num={0} />
        <Design num={1} />
        <Design num={2} />
      </div>
    </div>
  );
}

export default HowItworks;
