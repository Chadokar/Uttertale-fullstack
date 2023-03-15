import React from "react";
import { useState } from "react";
import { Company } from "../Contentsignup";
import Shapecolon from "../../assets/images/Shapecolon.svg";

import Supage2 from "./Supage2";
import Supage4 from "./Supage4";
import Supage5 from "./Supage5";
import Supage1 from "./Supage1";
import Supage3 from "./Supage3";
import { Font } from "../../../styling/Styles";
function Companysign() {
  const [brandname, setBrandname] = useState("");
  const [buisness_as, setbuisness_as] = useState("");
  const [company_type, setcompany_type] = useState("");
  const [locations, setlocations] = useState("*");
  const [hcity, sethcity] = useState("");
  const [hstate, sethstate] = useState("");
  const [hpincode, sethpincode] = useState(null);
  const [year_established, setyear_established] = useState("");
  const [websitelink, setwebsitelink] = useState("");
  const [smfacebook, setsmfacebook] = useState("");
  const [sminstagram, setsminstagram] = useState("");
  const [smlinkedin, setsmlinkedin] = useState("");
  const [smtwitter, setsmtwitter] = useState("");
  const [usp, setups] = useState("");
  const [bmodel, setbmodel] = useState("");
  const [bsize, setbsize] = useState("");
  const [coi, setcoi] = useState("");
  const [gstin, setgstin] = useState("");
  const [pan, setpan] = useState("");
  const [bdomain, setbdomain] = useState("");
  const [motive, setmotive] = useState("");
  const [taudiences, settaudience] = useState("");
  const [competitors, setcompetitors] = useState("");
  const [r_n_d, setr_n_d] = useState("");
  const [awards, setawards] = useState("");
  const [recognition, setrecognition] = useState("");
  const [collabration, setcollabration] = useState("");
  const [print_media, setprint_media] = useState("");
  const [online, setonline] = useState("");
  const [revenue, setrevenue] = useState("");
  const [growth, setgrowth] = useState("");
  const [nooffundraised, setnooffundraised] = useState("");
  const [valuation, setvaluation] = useState("");
  const [marketshare, setmarketshare] = useState("");
  const [invname, setinvname] = useState("");
  const [invemail, setinvemail] = useState("");
  const [invqual, setinvqual] = useState("");
  const [invhobbies, setinvhobbies] = useState("");
  const [invdesignation, setinvdesignation] = useState("");
  const [invstake, setinvstake] = useState("");
  const [sname, setsname] = useState("");
  const [sdesc, setsdesc] = useState("");
  const [slink, setslink] = useState("");
  const [sspecs, setsspecs] = useState("");
  const [yearerr, setyearerr] = useState(false);
  const [erremail, seterremail] = useState(false);

  const [n, setN] = useState(0);

  var inputs = Company[n];
  const ProgressBar = ({ num }) => {
    return (
      <div
        style={{
          width: 85.6,
          backgroundColor: num <= n ? "#242424" : "#C7C7C7",
        }}
        className="pbar"
      ></div>
    );
  };

  const clicked = (i) => {
    setN(n + i);
    inputs = Company[n];
  };

  const Common = ({ index, inputs }) => {
    return (
      <>
        <div className="signup-progress ">
          <p className={`${Font.body2} ${Font.medium} ${Font.medium}`}>
            Step {`${index + 1}`} of 5
          </p>
          <div className="signup-bar">
            {Company.map((content, i) => (
              <ProgressBar key={i} num={i} />
            ))}
          </div>
        </div>

        <div className="signup-text">
          <div>
            <h2 className={`${Font.font} ${Font.heading2} ${Font.medium}`}>
              {inputs["bold"][0]}
            </h2>
            <h2 className={`${Font.font} ${Font.heading2} ${Font.medium}`}>
              {inputs["bold"][1]}
            </h2>
          </div>
          <p className={`${Font.font} ${Font.body1} ${Font.regular}`}>
            {inputs["text"]}
          </p>
        </div>
      </>
    );
  };

  const [val, setVal] = useState(null);

  return (
    <div>
      {/* {console.log('entered')} */}
      <div className="sign-up">
        <div className="signup-input">
          <Common index={n} inputs={inputs} />
          <div className="sign-up-inputs">
            {n === 0 && (
              <Supage1
                setyear_established={setyear_established}
                year_established={year_established}
                setcompany_type={setcompany_type}
                company_type={company_type}
                setBrandname={setBrandname}
                brandname={brandname}
                yearerr={yearerr}
                setyearerr={setyearerr}
                input={inputs.page}
                n={n}
                clicked={clicked}
              />
            )}
            {n === 1 && (
              <Supage2
                sethpincode={sethpincode}
                hpincode={hpincode}
                hstate={hstate}
                sethstate={sethstate}
                sethcity={sethcity}
                hcity={hcity}
                setlocations={setlocations}
                locations={locations}
                input={inputs.page}
                n={n}
                clicked={clicked}
              />
            )}
            {n === 2 && (
              <Supage3
                setinvemail={setinvemail}
                invemail={invemail}
                setsmlinkedin={setsmlinkedin}
                smlinkedin={smlinkedin}
                setsminstagram={setsminstagram}
                sminstagram={sminstagram}
                input={inputs.page}
                erremail={erremail}
                seterremail={seterremail}
                n={n}
                clicked={clicked}
              />
            )}
            {n === 3 && (
              <Supage4
                setbdomain={setbdomain}
                bdomain={bdomain}
                setpan={setpan}
                pan={pan}
                setgstin={setgstin}
                gstin={gstin}
                setwebsitelink={setwebsitelink}
                websitelink={websitelink}
                input={inputs.page}
                n={n}
                clicked={clicked}
              />
            )}
            {n === 4 && (
              <Supage5
                data={{
                  invemail,
                  bdomain,
                  pan,
                  gstin,
                  smlinkedin,
                  sminstagram,
                  websitelink,
                  year_established,
                  hpincode,
                  hstate,
                  hcity,
                  locations,
                  company_type,
                  brandname,
                  slink,
                }}
                setslink={setslink}
                erremail={erremail}
                seterremail={seterremail}
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

export default Companysign;
