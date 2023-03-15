import React from "react";
import { useState } from "react";
import { Entrepreneur } from "../Contentsignup";
import Shapecolon from "../../assets/images/Shapecolon.svg";
import "../signup.css";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import { Font } from "../../../styling/Styles";

function Signup() {
  const [n, setN] = useState(0);

  // const { name, companyname, designation, website, companyemail, instagram, facebook, linkedin, twitter, interests, dob, location, nationality, about, cultureidentity, earlylife, sourceofinterest, passionateabout, highestleveleducation, institute, societyorg, extracurricular, profexpossure, profyouwant, currdesignation, otherjobtitles, pastcareer, whychoose, valuablelessons, keysuccess, educationalachievement, professionalachievement, motivation, emotion, vision } = [];
  const [name, setname] = useState("");
  const [dob, setdob] = useState("");
  const [location, setlocation] = useState("");
  const [nationality, setnationality] = useState("");
  const [instagram, setinstagram] = useState("");
  const [linkedin, setlinkedin] = useState("");
  const [website, setwebsite] = useState("");
  const [companyemail, setcompanyemail] = useState("");
  const [youtube, setyoutube] = useState("");
  const [personalemail, setpersonalemail] = useState("");

  var inputs = Entrepreneur[n];
  const ProgressBar = ({ num }) => {
    return (
      <div
        style={{ backgroundColor: num <= n ? "#242424" : "#C7C7C7" }}
        className="pbar"
      ></div>
    );
  };

  const clicked = (i) => {
    setN(n + i);
    inputs = Entrepreneur[n];
  };

  const Common = ({ index, inputs }) => {
    return (
      <>
        <div className="signup-progress">
          <p>Step {`${index + 1}`} of 3</p>
          <div className="signup-bar">
            {Entrepreneur.map((content, i) => (
              <>
                <ProgressBar num={i} />
              </>
            ))}
          </div>
        </div>

        <div className="signup-text">
          <div>
            <h2 className={`${Font.font} ${Font.heading2} ${Font.medium}`}>
              {inputs["bold"]}
            </h2>
          </div>
          <p className={`${Font.font} ${Font.body1} ${Font.regular}`}>
            {inputs["text"]}
          </p>
        </div>
      </>
    );
  };

  return (
    <div>
      <div className="sign-up">
        <div className="signup-input">
          <Common index={n} inputs={inputs} />
          <div className="sign-up-inputs">
            {n === 0 && (
              <Page1
                setnationality={setnationality}
                nationality={nationality}
                setlocation={setlocation}
                location={location}
                setdob={setdob}
                dob={dob}
                setname={setname}
                name={name}
                input={inputs.page}
                n={n}
                clicked={clicked}
              />
            )}
            {n === 1 && (
              <Page2
                setyoutube={setyoutube}
                youtube={youtube}
                setlinkedin={setlinkedin}
                linkedin={linkedin}
                setinstagram={setinstagram}
                instagram={instagram}
                input={inputs.page}
                n={n}
                clicked={clicked}
              />
            )}
            {n === 2 && (
              <Page3
                data={{
                  youtube,
                  linkedin,
                  instagram,
                  nationality,
                  location,
                  dob,
                  name,
                  personalemail,
                  companyemail,
                  website,
                }}
                setwebsite={setwebsite}
                setpersonalemail={setpersonalemail}
                setcompanyemail={setcompanyemail}
                input={inputs.page}
                n={n}
                clicked={clicked}
              />
            )}
          </div>
        </div>

        <div className="signup-pic">
          <div className="signup-pic-container">
            <div className="text-sidebar">
              <>
                <p className={`${Font.font} ${Font.heading2} ${Font.medium}`}>
                  {inputs["textOnImg"]}{" "}
                </p>
              </>
            </div>
            <div className="big-colon-logo">
              <img src={Shapecolon} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
