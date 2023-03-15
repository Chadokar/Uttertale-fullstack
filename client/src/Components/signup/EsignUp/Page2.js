import React from "react";
import { Button, Font } from "../../../styling/Styles";

function Page2(props) {
  const {
    linkedin,
    setlinkedin,
    youtube,
    setyoutube,
    instagram,
    setinstagram,
  } = { ...props };

  const n = props.n;

  return (
    <>
      <div className="inputborder">
        <p className={`${Font.font} ${Font.label} ${Font.medium}`}>
          {props.input[1].heading}
        </p>
        <input
          type="url"
          placeholder={props.input[1].placeholder}
          value={youtube}
          onChange={(e) => setyoutube(e.target.value)}
        />
      </div>
      <div className="inputborder">
        <p className={`${Font.font} ${Font.label} ${Font.medium}`}>
          {props.input[2].heading}
        </p>
        <input
          type="url"
          placeholder={props.input[2].placeholder}
          value={instagram}
          onChange={(e) => setinstagram(e.target.value)}
        />
      </div>
      <div className="inputborder">
        <p className={`${Font.font} ${Font.label} ${Font.medium}`}>
          {props.input[3].heading}
        </p>
        <input
          type="url"
          placeholder={props.input[3].placeholder}
          value={linkedin}
          onChange={(e) => setlinkedin(e.target.value)}
        />
      </div>
      <div className="next-back-buttons">
        {n >= 0 && n < 4 && (
          <div>
            <div
              onClick={() => props.clicked(1)}
              className={`${Button.button} ${Button.primary} ${Button.medium}`}
            >
              <h5
                className={`${Font.body2} ${Font.medium} ${Font.font}`}
                style={{ color: "#fff" }}
              >
                Next
              </h5>
            </div>
          </div>
        )}
        {n === 4 && (
          <div>
            <div className="sign-button">
              <a href="/sign-in">
                {" "}
                <h5>Next</h5>
              </a>
            </div>
          </div>
        )}
        {n > 0 && (
          <div
            onClick={() => props.clicked(-1)}
            className={`${Button.button} ${Button.secondary} ${Button.medium}`}
          >
            <p className={`${Font.font} ${Font.medium} ${Font.body2}`}>Back</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Page2;
