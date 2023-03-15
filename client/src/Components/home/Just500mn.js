import React from "react";
import { Font } from "../../styling/Styles";
import Newspaper from "../assets/images/Newspaper.svg";
import NewspaperResp from "../assets/images/NewspaperResp.svg";
import "./Just500mn.css";

function Just500mn() {
  const className = `${Font.font} ${Font.heading2} ${Font.medium}`;

  return (
    <div className="just500">
      <div className="just500-inside">
        <div className="just500-text">
          <h1 className={`desktop ${Font.font} ${Font.display} ${Font.bold} `}>
            Uttertale has created
            <br /> <b className="colored">Ad-value</b> of above{" "}
            <b className="colored">500 Mn</b>
          </h1>
          <h1
            className={`resp  ${className}`}
            style={{ flexDirection: "row", flexWrap: "wrap", gap: 6 }}
          >
            Uttertale has created
            <br /> <p className={`colored ${className}`}>Ad-value</p> of above{" "}
            <p className={`colored ${className}`}> 500 Mn</p>
          </h1>
        </div>
        <div className="newspaper desktop">
          <img src={Newspaper} alt="" />
        </div>
        <div className="newspaper resp">
          <img src={NewspaperResp} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Just500mn;
