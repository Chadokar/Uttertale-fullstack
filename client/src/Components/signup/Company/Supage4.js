import React from "react";
import { useState } from "react";
import ReactSelect from "react-select";
import { Button, Font } from "../../../styling/Styles";
import { Company } from "../Contentsignup";

function Supage4(props) {
  const {
    websitelink,
    setwebsitelink,
    gstin,
    setgstin,
    pan,
    setpan,
    bdomain,
    setbdomain,
  } = { ...props };

  const data = [
    {
      name: "Entrepreneur",
      id: 1,
    },
    {
      name: "Company/Business",
      id: 2,
    },
  ];

  const option = data.map((item) => {
    return {
      label: item.name,
      value: item.id,
      ...item,
    };
  });

  let nas = "";
  if (bdomain !== "") {
    nas = { label: bdomain, id: "3333333333333333333" };
  }

  const [val, setVal] = useState(nas);
  const n = props.n;

  const Domain = () => {
    return (
      <div className="w-full">
        <p className={`${Font.font} ${Font.label} ${Font.medium} color mb-2`}>
          Domain of the Business/ Industry of operation
        </p>
        <ReactSelect
          options={option}
          value={val}
          className="w-full"
          classNamePrefix="mySelect"
          theme={(theme) => ({
            ...theme,
            borderRadius: 10,
            colors: {
              ...theme.colors,
              primary: "#2E65E5",
            },
          })}
          styles={{
            control: (base) => ({
              ...base,
              boxShadow: "none",
            }),
            option: (styles, { isFocused, isSelected }) => {
              return {
                ...styles,
                // backgroundColor: isDisabled?'blueviolet':'red',
                backgroundColor: isSelected
                  ? "#F5F5F5"
                  : isFocused
                  ? "#F5F5F5"
                  : undefined,
                color: "#242424",
              };
            },
          }}
          placeholder="Select"
          onChange={(value) => {
            setVal(value);
            setbdomain(value.label);
          }}
        />
      </div>
    );
  };

  const Next = () => {
    if (websitelink === "" || websitelink === null) {
      setwebsitelink(null);
    } else if (gstin === "" || gstin === null) {
      setgstin(null);
    } else if (pan === "" || pan === null) {
      setpan(null);
    } else if (bdomain === "" || bdomain === null) {
      setbdomain(null);
    } else props.clicked(1);
  };

  return (
    <>
      <div className="inputborder">
        <p className={`${Font.font} ${Font.label} ${Font.medium} color`}>
          {props.input[0].heading}
        </p>
        <input
          type="url"
          placeholder={props.input[0].placeholder}
          value={websitelink}
          onChange={(e) => setwebsitelink(e.target.value)}
        />
        {websitelink === null && (
          <p
            className={`${Font.font} ${Font.label} ${Font.regular}`}
            style={{ color: "#FF0000" }}
          >
            Please Enter
          </p>
        )}
      </div>
      <div className="inputborder">
        <div className="flex justify-between w-full">
          <div className=" flex flex-col ">
            <p
              className={`${Font.font} ${Font.label} ${Font.medium} color mb-1`}
            >
              {props.input[1]["heading"][0]}
            </p>
            <input
              type="number"
              min={0}
              placeholder={props.input[1]["placeholder"][0]}
              value={gstin}
              onChange={(e) => setgstin(e.target.value)}
            />
            {gstin === null && (
              <p
                className={`${Font.font} ${Font.label} ${Font.regular} mt-2`}
                style={{ color: "#FF0000" }}
              >
                Please Enter
              </p>
            )}
          </div>
          <div className=" flex flex-col ">
            <p
              className={`${Font.font} ${Font.label} ${Font.medium} color mb-1`}
            >
              {props.input[1]["heading"][1]}
            </p>
            <input
              type="number"
              min={0}
              placeholder={props.input[1]["placeholder"][1]}
              value={pan}
              onChange={(e) => setpan(e.target.value)}
            />
            {pan === null && (
              <p
                className={`${Font.font} ${Font.label} ${Font.regular} mt-2`}
                style={{ color: "#FF0000" }}
              >
                Please Enter
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="inputborder">
        <Domain />
        {bdomain === null && (
          <p
            className={`${Font.font} ${Font.label} ${Font.regular} mt-2`}
            style={{ color: "#FF0000" }}
          >
            Please Enter
          </p>
        )}
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

export default Supage4;
