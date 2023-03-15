import React from "react";
import { Button, Font } from "../../../styling/Styles";
import { useNavigate } from "react-router-dom";

function Supage3(props) {
  const n = props.n;
  const {
    sminstagram,
    setsminstagram,
    smlinkedin,
    setsmlinkedin,
    invemail,
    setinvemail,
    erremail,
    seterremail,
  } = { ...props };

  const Next = () => {
    if (erremail || invemail === "") setinvemail("");
    else props.clicked(1);
  };

  return (
    <>
      <div className="inputborder">
        <p className={`${Font.font} ${Font.label} ${Font.medium} color`}>
          {props.input[0].heading}
        </p>
        <input
          type="email"
          value={invemail}
          onChange={(e) => setinvemail(e.target.value)}
          placeholder={props.input[0].placeholder}
        />
        {(erremail || invemail === "") && (
          <p
            className={`${Font.font} ${Font.label} ${Font.regular}`}
            style={{ color: "#FF0000" }}
          >
            Please Enter correct Email
          </p>
        )}
      </div>
      <div className="inputborder">
        <p className={`${Font.font} ${Font.label} ${Font.medium} color`}>
          {props.input[1].heading}
        </p>
        <input type="text" placeholder={props.input[1].placeholder} />
      </div>
      <div className="inputborder">
        <p className={`${Font.font} ${Font.label} ${Font.medium} color`}>
          {props.input[2].heading}
        </p>
        <input
          type="text"
          placeholder={props.input[2].placeholder}
          value={sminstagram}
          onChange={(e) => setsminstagram(e.target.value)}
        />
      </div>
      <div className="inputborder">
        <p className={`${Font.font} ${Font.label} ${Font.medium} color`}>
          {props.input[3].heading}
        </p>
        <input
          type="text"
          placeholder={props.input[2].placeholder}
          value={smlinkedin}
          onChange={(e) => setsmlinkedin(e.target.value)}
        />
      </div>
      <div className="next-back-buttons">
        {n >= 0 && n < 4 && (
          <div>
            <div
              onClick={() => Next()}
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

export default Supage3;
