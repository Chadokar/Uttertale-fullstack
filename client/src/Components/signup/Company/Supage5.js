import axios from "axios";
import React, { useState } from "react";
import { Button, Font } from "../../../styling/Styles";
import Upload from "../../assets/images/upload.svg";
import Uploadred from "../../assets/images/uploadred.svg";
import { useNavigate } from "react-router-dom";
import { REACT_APP_BACKEND_URL } from "../../../config";

function Supage5(props) {
  const { setslink, data, seterremail, erremail } = props;
  const { slink } = data;
  const Navigation = useNavigate();
  const url = `${REACT_APP_BACKEND_URL}/buisnessprofile/registerBuisnessProfile/`;
  function onclick(e) {
    e.preventDefault();
    if (true) {
      axios
        .post(
          `http://localhost:3000/buisnessprofile/registerBuisnessProfile`,
          data
        )
        .then((res) => {
          console.log("data sent to backend");
          seterremail(false);
          if (!erremail) Navigation("/sign-in");
        })
        .catch((e) => {
          console.log(e);
          seterremail(true);
        });
    }
  }

  const [n, setN] = useState(0);
  const [file, setFile] = useState([]);
  const changeUploadhandler = (evnt) => {
    if (evnt.target.files.length > 0 && n < 5) {
      setN(n + 1);
      const selectedFIles = [];
      const targetFiles = evnt.target.files;
      const targetFilesObject = [...targetFiles];
      targetFilesObject.map((file) => {
        return selectedFIles.push(URL.createObjectURL(file));
      });
      setFile([...file, selectedFIles]);
    }
  };

  const removeHandler = (val) => {
    let remainingFile = file.filter((e) => e !== val);
    setFile([...remainingFile]);
    setN(n - 1);
  };

  const ImageUpload = ({ input }) => {
    return (
      <>
        <p className={`${Font.font} ${Font.label} ${Font.medium} color`}>
          Print Media
        </p>
        {n === 0 && (
          <label
            className="imgInput flex flex-row w-full justify-between"
            htmlFor="cupload"
          >
            {
              <div>
                <p>{input.placeholder}</p>
              </div>
            }
            <input
              style={{ display: "none" }}
              id="cupload"
              type="file"
              onChange={changeUploadhandler}
              accept="image/png, image/jpeg"
            />
            <img src={Upload} alt="" />
          </label>
        )}
        {
          <>
            {n > 0 && (
              <div className="flex w-full flex-col gap-2">
                <div className="flex w-full flex-row gap-2 p-1">
                  {/* <p>{fileName}</p> */}
                  {
                    <>
                      {file.map((image) => (
                        <img
                          onClick={() => removeHandler(image)}
                          src={image}
                          alt=""
                          style={{ width: 76, height: 76 }}
                        />
                      ))}
                    </>
                  }
                </div>
                <label
                  className="uploadmore flex flex-row gap-3 py-3"
                  htmlFor="cupload"
                >
                  {<p>Upload More</p>}
                  <input
                    style={{ display: "none" }}
                    id="cupload"
                    type="file"
                    onChange={changeUploadhandler}
                    accept="image/png, image/jpeg"
                  />
                  <img src={Uploadred} alt="" />
                </label>
                <p>Click on Image to remove it</p>
              </div>
            )}
          </>
        }
      </>
    );
  };

  const Next = () => {};

  return (
    <>
      <div className="inputborder">
        <ImageUpload input={props.input[0]} />
      </div>
      <div className="inputborder">
        <p className={`${Font.font} ${Font.label} ${Font.medium} color`}>
          {props.input[1].heading}
        </p>
        <input type="url" placeholder={props.input[1].placeholder} />
        {/* <Domain/> */}
      </div>
      <div className="next-back-buttons">
        {props.n >= 0 && props.n < 4 && (
          <div>
            <div onClick={() => props.clicked(1)} className="sign-button">
              <h5>Next</h5>
            </div>
            {console.log(props.n)}
            {console.log("view")}
          </div>
        )}
        {props.n === 4 && (
          <div>
            <div
              className={`${Button.button} ${Button.primary} ${Button.medium}`}
              onClick={onclick}
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
        {props.n > 0 && (
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

export default Supage5;
