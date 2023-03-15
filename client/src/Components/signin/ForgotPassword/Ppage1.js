import React, { useContext } from "react";
import { useState, useEffect } from "react";
import Shapecolon from "../../assets/images/Shapecolon.svg";
import Logo from "../../assets/images/Logo.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Font } from "../../../styling/Styles";
import { UserContext } from "../../Navigation";

function Ppage1(props) {
  const history = useNavigate();
  const { n, setN } = props;

  const [isEmail, setIsEmail] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const {
    selectedChat,
    setSelectedChat,
    user,
    setUser,
    chats,
    setChats,
    token,
    fetchAgain,
    setFetchAgain,
    setPasswordUrl,
    passwordUrl,
  } = useContext(UserContext);

  const clickHandler_e = async (e) => {
    setEmail(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("enterd");

    axios
      .post(`http://localhost:8000/getResetPasswordLink/`, { email: email })
      .then((res) => {
        console.log(res);
      })

      // navigate("/Profile/own");

      // localStorage.setItem("userInfo", JSON.stringify(data.user));
      // localStorage.setItem("userToken", JSON.stringify(data.accessToken));
      .catch((error) => {
        setError("Invalid email");
        console.log(error);
      });
  };

  const navigate = useNavigate();

  // onchange(() => {}, []);

  const Common = () => {
    return (
      <>
        <div className="signup-progress">
          <div className="signup-bar">
            <a href="/">
              <img src={Logo} alt="" />
            </a>
          </div>
        </div>
        <div className="signup-text">
          <div>
            <h2 className={`${Font.font} ${Font.heading2} ${Font.medium}`}>
              Forgot Password?
            </h2>
          </div>
          <p
            className={`${Font.font} ${Font.body1} ${Font.regular}`}
            style={{ color: "#424242" }}
          >
            Enter your email and get a restet password link on your email
          </p>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="signup-input">
        <Common />
        <form onSubmit={submitHandler}>
          {error && (
            <div
              className={`${Font.font} ${Font.label} ${Font.regular} mb-4`}
              style={{ color: "#FF0000" }}
            >
              {error}
            </div>
          )}
          <div className="sign-up-inputs">
            <div className="inputborder">
              <p className={`${Font.font} ${Font.label} ${Font.medium}`}>
                Email{" "}
              </p>
              <input
                type="email"
                name="email"
                value={email}
                onChange={clickHandler_e}
                id="email"
                placeholder="Enter your email"
              />
            </div>
            <div className="next-back-buttons">
              <div>
                <button
                  type="submit"
                  className={`${Button.button} ${Button.primary} ${Button.medium}`}
                  onClick={submitHandler}
                >
                  <h5
                    className={`${Font.body2} ${Font.medium} ${Font.font}`}
                    style={{ color: "#fff" }}
                  >
                    {" "}
                    Send Link
                  </h5>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Ppage1;
