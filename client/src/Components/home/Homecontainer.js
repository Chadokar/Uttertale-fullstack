import React, { useState } from "react";
import "./homecontainer.css";
import Hexagonbig from "../assets/images/Heading.svg";
import ImgHome from "../assets/images/Home.svg";
import ImgMan from "../assets/images/Man.svg";
import ImgPC from "../assets/images/PC.svg";
import { Button, Font } from "../../styling/Styles";
import Homepop from "./Homepop";
import { Dialog } from "@mui/material";
import { Hexagon, ShapeOfLogo } from "../assets/Icons";

function Homecontainer() {
  const arrimg = [ImgHome, ImgMan, ImgPC];

  const [sign, setSign] = useState(false);

  const Datastyle = ({ num, Name, imgLink }) => {
    return (
      <>
        <div className="data-box flex flex-row items-center justify-start desktop">
          <div style={{ marginRight: 24, marginLeft: 12 }}>
            <img
              src={arrimg[imgLink]}
              style={{ width: 80, height: 80 }}
              alt=""
            />
          </div>
          <div className="data-box-text flex flex-col items-start p-0">
            <h1
              className={`${Font.font} ${Font.display} ${Font.bold}`}
              style={{ color: "#fff" }}
            >
              {num}+
            </h1>
            <p
              className={`${Font.font} ${Font.heading3} ${Font.regular}`}
              style={{ color: "#fff" }}
            >
              {Name}
            </p>
          </div>
        </div>
        <div className="data-box flex flex-row items-center justify-start resp">
          <div>
            <img
              src={arrimg[imgLink]}
              alt=""
              style={{ width: 60, height: 60 }}
            />
          </div>
          <div className="data-box-text flex flex-col items-start p-0">
            <h1
              className={`${Font.font} ${Font.heading2} ${Font.bold}`}
              style={{ color: "#fff" }}
            >
              {num}+
            </h1>
            <p
              className={`${Font.font} ${Font.body1} ${Font.regular}`}
              style={{ color: "#fff" }}
            >
              {Name}
            </p>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <Dialog
        fullWidth={false}
        maxWidth="xl"
        open={sign}
        onClose={() => setSign(false)}
      >
        <Homepop setEditPop={setSign} />
      </Dialog>
      <div className="flex flex-col items-center justify-center w-full">
        <header className="homecontainer flex flex-col items-center">
          <div className="home-text flex flex-col items-center justify-between">
            <div className="flex w-full items-start flex-row">
              <ShapeOfLogo />
            </div>
            <div className="hc-two-text flex items-center justify-between flex-col mb-10 gap-4">
              <div className="home-bold-text flex items-center justify-center flex-col mb-4 ">
                <h1
                  className={`${Font.bold} ${Font.display} ${Font.font} desktop`}
                >
                  Building a community for Businesses,
                </h1>
                <h1
                  className={`${Font.bold} ${Font.display} ${Font.font} desktop`}
                >
                  Entrepreneur and Content creators
                </h1>
                <h1
                  className={`${Font.bold} ${Font.heading2} ${Font.font} resp`}
                >
                  Building a community for Businesses,
                </h1>
                <h1
                  className={`${Font.bold} ${Font.heading2} ${Font.font} resp`}
                >
                  Entrepreneur and Content creators
                </h1>
              </div>
              <div className="home-light-text flex flex-col items-center justify-center ">
                <p
                  className={`${Font.regular} ${Font.heading2} ${Font.font}  desktop`}
                >
                  Join the community to get all solution to your{" "}
                </p>
                <p
                  className={`${Font.regular} ${Font.heading2} ${Font.font} desktop`}
                >
                  market and media needs at one place
                </p>
                <p
                  className={`${Font.font} ${Font.regular} ${Font.body1} resp`}
                >
                  Join the community to get all solution to your market and
                  media needs at one place.
                </p>
              </div>
            </div>
            <div
              onClick={() => setSign(true)}
              className={`${Button.button} ${Button.primary} ${Button.large} desktop`}
            >
              <p className={`${Font.font} ${Font.body1} ${Font.medium}`}>
                Join the community
              </p>
            </div>
            <div
              onClick={() => setSign(true)}
              className={`${Button.button} ${Button.primary} ${Button.medium} resp`}
            >
              <p className={`${Font.font} ${Font.body2} ${Font.medium}`}>
                Join the community
              </p>
            </div>
          </div>
        </header>
        <div className="black-box flex items-center justify-center w-full ">
          <div className="black-box-container flex flex-col items-center pb-12 desktop">
            <div className="trusted box-border flex items-center justify-center rounded-xl">
              <img src={Hexagonbig} alt="" />
            </div>
            <div className="data flex w-full flex-row justify-between">
              <Datastyle num={600} Name={"Businesses"} imgLink={0} />
              <Datastyle num={150} Name={"Entrepreneurs"} imgLink={1} />
              <Datastyle num={200} Name={"Content creators"} imgLink={2} />
            </div>
          </div>
          <div className="black-box-container flex flex-col items-center resp">
            <div className="trusted box-border flex items-center justify-center">
              <Hexagon color="#fff" height="16" width="16" />
              <p
                className={`${Font.font} ${Font.label} ${Font.medium}`}
                style={{ color: "#fff" }}
              >
                Trusted by
              </p>
            </div>
            <div className="data flex w-full flex-col p-1 gap-4 justify-between">
              <Datastyle num={600} Name={"Businesses"} imgLink={0} />
              <Datastyle num={150} Name={"Entrepreneurs"} imgLink={1} />
              <Datastyle num={200} Name={"Content creators"} imgLink={2} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Homecontainer;
