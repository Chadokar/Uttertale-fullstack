import React from "react";
import ImgMic from "../assets/images/Mic.svg";
import ImgPhone from "../assets/images/Phone.svg";
import ImgPaper from "../assets/images/PaperBundel.svg";
import ImgLaptop from "../assets/images/Laptop.svg";
import LastImage from "../assets/images/lastImage.svg";
import "./WhyUttertale.css";
import { Font } from "../../styling/Styles";

function WhyUttertale() {
  const arr = [
    {
      heading: "Connect with Journalist",
      text: "Wondering who are the right set of journalists to connect to for getting my brand/startup story covered in the media? Or at least start building good relations with journalists? Worry no more. At Uttertale, we have verified pool of journalists and writers who are the right fit for your industry/domain and can be reached out directly.",
      imgLink: ImgMic,
    },
    {
      heading: "Reach Influencer",
      text: "Be it a micro or macro-influencer, or those with billions of follower base, getting them onboarded and aligned to tell your brand story by producing superlative strategically-curated content on social media and other media platforms is now easier than ever before with Uttertale.",
      imgLink: ImgPhone,
    },
    {
      heading: "Get Best Coverage",
      text: "Never again miss another chance to get your brand/startup featured in the best media outlets, in the best way possible, and also to create optimal buzz around it. After all, Uttertale is here to solve all your media coverage woes and to help you remain the ‘talk of the Media town’ forever!",
      imgLink: ImgPaper,
    },
    {
      heading: "Coverage Analytics",
      text: "Through Uttertale’s in-app dashboard, we take pride in bringing you the most relevant, productive and superlative data and analytics relating to your company’s media efforts and spends. So, now it’s time to take the best lessons using data, align and realign and derive the ‘edge’ with our cutting-edge tech-enabled data analytics solution.",
      imgLink: ImgLaptop,
    },
    {
      heading: "Collaborate with Industry Leaders",
      text: "If you are a content creator or an influencer looking for projects, Uttertale’s platform would be your ultimate destination to help you connect directly or collaborate with so many relevant and reputable industry leaders, CXOs, entrepreneurs, and/or business owners. Essentially, never again do you need to worry about finding the right connections in your industry.",
      imgLink: LastImage,
    },
  ];

  const WhyText = ({ num }) => {
    var Flexdirection = "row-reverse";
    if (num % 2 === 0) Flexdirection = "row";

    return (
      <>
        <div
          className="text-and-img desktop"
          style={{
            flexDirection: Flexdirection,
          }}
        >
          <div className="w-1/2">
            <div className="why-img" style={{ flex: 1, display: "flex" }}>
              <img src={arr[num].imgLink} alt="" />
            </div>
          </div>
          <div style={{ flexDirection: Flexdirection }} className="w-1/2 flex">
            <div style={{ width: 112 }}></div>
            <div className="why-text" style={{ flex: 1 }}>
              <h1
                className={`${Font.font} ${Font.heading1} ${Font.medium}`}
                style={{ color: "#242424" }}
              >
                {arr[num].heading}
              </h1>
              <p className={`${Font.font} ${Font.body2} ${Font.regular}`}>
                {arr[num].text}
              </p>
              {/* <a href="">Read More</a> */}
            </div>
          </div>
        </div>
        <div className="text-and-img resp">
          <div className="why-img">
            <img src={arr[num].imgLink} alt="" style={{ width: "100%" }} />
          </div>
          <div className="why-text">
            <h1
              className={`${Font.font} ${Font.heading3} ${Font.medium}`}
              style={{ color: "#242424" }}
            >
              {arr[num].heading}
            </h1>
            <p className={`${Font.font} ${Font.body2} ${Font.regular}`}>
              {arr[num].text}
            </p>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <div className="why-bold items-center justify-center my-20 desktop flex">
        <h1 className={`${Font.font} ${Font.bold} ${Font.display}`}>
          Why Uttertale?
        </h1>
      </div>
      <div className="why-bold items-center justify-center resp">
        <h1 className={`${Font.font} ${Font.heading2} ${Font.bold} resp`}>
          Why Uttertale?
        </h1>
      </div>
      <div className="flex flex-col items-center w-full gap-6">
        <WhyText num={0} />
        <div className="border" style={{ width: 1120 }}></div>
        <WhyText num={1} />
        <div className="border" style={{ width: 1120 }}></div>
        <WhyText num={2} />
        <div className="border" style={{ width: 1120 }}></div>
        <WhyText num={3} />
        <div className="border" style={{ width: 1120 }}></div>
        <WhyText num={4} />
        {/* <WhyText num={4} /> */}
      </div>
    </>
  );
}

export default WhyUttertale;
