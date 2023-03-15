import React, { useState } from "react";
import { Button, Font } from "../../../styling/Styles";
import { REACT_APP_BACKEND_URL } from "../../../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Page3(props) {
  const { n, data, setcompanyemail, setpersonalemail, setwebsite } = props;
  const { website, companyemail, personalemail } = data;
  const url = `${REACT_APP_BACKEND_URL}registerEntrepreneur/`;
  const [erremail, seterremail] = useState(false);
  const navigate = useNavigate();

  function submitHandler(e) {
    e.preventDefault();
    axios
      .post(url, data)
      .then((res) => {
        console.log(res);
        navigate("/sign-in");
      })
      .catch((e) => {
        console.log(e);
        seterremail(true);
      });
  }

  return (
    <>
      <div className="inputborder">
        <p className={`${Font.font} ${Font.label} ${Font.medium}`}>
          {props.input[0].heading}
        </p>
        <input
          type="email"
          placeholder={props.input[0].placeholder}
          value={personalemail}
          onChange={(e) => setpersonalemail(e.target.value)}
        />
        {(personalemail === null || erremail) && (
          <p
            className={`${Font.font} ${Font.label} ${Font.regular}`}
            style={{ color: "#FF0000" }}
          >
            Please correct it.
          </p>
        )}
      </div>
      <div className="inputborder">
        <p className={`${Font.font} ${Font.label} ${Font.medium}`}>
          {props.input[1].heading}
        </p>
        <input
          type="email"
          placeholder={props.input[1].placeholder}
          value={companyemail}
          onChange={(e) => setcompanyemail(e.target.value)}
        />
        {(erremail || companyemail === null) && (
          <p
            className={`${Font.font} ${Font.label} ${Font.regular}`}
            style={{ color: "#FF0000" }}
          >
            Enter correct email
          </p>
        )}
      </div>
      <div className="inputborder">
        <p className={`${Font.font} ${Font.label} ${Font.medium}`}>
          {props.input[2].heading}
        </p>
        <input
          type="url"
          placeholder={props.input[2].placeholder}
          value={website}
          onChange={(e) => setwebsite(e.target.value)}
        />
      </div>
      <div className="next-back-buttons">
        {n >= 0 && n < 2 && (
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
        {n === 2 && (
          <div>
            <div
              className={`${Button.button} ${Button.primary} ${Button.medium}`}
              onClick={submitHandler}
            >
              {" "}
              <h5
                className={`${Font.body2} ${Font.medium} ${Font.font}`}
                style={{ color: "#fff" }}
              >
                Next
              </h5>
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

export default Page3;
