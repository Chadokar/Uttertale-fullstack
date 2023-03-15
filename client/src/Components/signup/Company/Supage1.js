import React, { useState } from "react";
import ReactSelect from "react-select";
import { Button, Font } from "../../../styling/Styles";

function Supage1(props) {
  const n = props.n;
  const {
    brandname,
    setBrandname,
    company_type,
    setcompany_type,
    year_established,
    setyear_established,
    setyearerr,
    yearerr,
  } = { ...props };

  const data = [
    {
      name: "Individual",
      id: 1,
    },
    {
      name: "Proprietorship",
      id: 2,
    },
    {
      name: "Partnership",
      id: 3,
    },
    {
      name: "Private Limited Company",
      id: 4,
    },
    {
      name: "Public Limited Company",
      id: 5,
    },
    {
      name: "One Person Company",
      id: 6,
    },
    {
      name: "Public Sector Undertaking",
      id: 7,
    },
    {
      name: "Limited Liability Partnership",
      id: 8,
    },
    {
      name: "Government Department",
      id: 9,
    },
    {
      name: "Local Authority",
      id: 10,
    },
    {
      name: "Statutory Body",
      id: 11,
    },
    {
      name: "Foreign Limited Liability Partnership",
      id: 12,
    },
    {
      name: "Foreign Company Registered (in India)",
      id: 13,
    },
  ];
  const option = data.map((item) => {
    return {
      label: item.name,
      value: item.id,
      ...item,
    };
  });

  const options = {
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
        ":active": {
          ...styles[":active"],
          backgroundColor: "#F5F5F5",
        },
      };
    },
    menuList: (base) => ({
      ...base,

      "::-webkit-scrollbar": {
        width: "4px",
        borderRadius: "8px",
      },
      "::-webkit-scrollbar-track": {
        background: "#fff",
        marginTop: "10px",
        marginBottom: "10px",
      },
      "::-webkit-scrollbar-thumb": {
        background: "#D9D9D9",
      },
      "::-webkit-scrollbar-thumb:hover": {
        background: "#D9D9D9",
      },
    }),
  };

  let comty = "";
  if (company_type !== "") {
    comty = { label: company_type, id: "3333333333333333333" };
  }
  const [val, setVal] = useState(comty);
  // console.log(company_type)

  const Domain = () => {
    return (
      <div className="w-full">
        <p className={`${Font.font} ${Font.label} ${Font.medium} color mb-3`}>
          Company type
        </p>
        <ReactSelect
          id="country"
          name="country"
          label="country"
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
          styles={options}
          placeholder="Select"
          onChange={(value) => {
            {
              setVal(value);
              setcompany_type(value.name);
            }
          }}
        />
      </div>
    );
  };

  const Next = () => {
    if (year_established < 1900 || year_established > 2023) setyearerr(true);
    else if (brandname === "" || brandname === null) {
      setBrandname(null);
    } else if (company_type === "" || company_type === null) {
      setcompany_type(null);
    } else {
      props.clicked(1);
      setyearerr(false);
    }
  };

  return (
    <>
      <div className="inputborder">
        <p className={`${Font.font} ${Font.label} ${Font.medium} color`}>
          {props.input[0].heading}
        </p>
        <input
          type="text"
          placeholder={props.input[0].placeholder}
          value={brandname}
          onChange={(e) => setBrandname(e.target.value)}
        />
        {brandname === null && (
          <p
            className={`${Font.font} ${Font.label} ${Font.regular}`}
            style={{ color: "#FF0000" }}
          >
            Please correct it.
          </p>
        )}
      </div>
      <div className="inputborder">
        {/* <p>{props.input[1].heading}</p>
      <input type="text" placeholder={props.input[1].placeholder}  /> */}
        <Domain />
        {company_type === null && (
          <p
            className={`${Font.font} ${Font.label} ${Font.regular}`}
            style={{ color: "#FF0000" }}
          >
            Please correct it.
          </p>
        )}
      </div>
      <div className="inputborder">
        <p className={`${Font.font} ${Font.label} ${Font.medium} color`}>
          {props.input[2].heading}
        </p>
        <input
          type="number"
          value={year_established}
          onChange={(e) => setyear_established(e.target.value)}
          placeholder={props.input[2].placeholder}
        />
        {yearerr && (
          <p
            className={`${Font.font} ${Font.label} ${Font.regular}`}
            style={{ color: "#FF0000" }}
          >
            {console.log(yearerr)}
            Please Enter correct Year
          </p>
        )}
      </div>
      <div className="next-back-buttons">
        {n >= 0 && n < 4 && (
          <div>
            <div
              onClick={() => {
                Next();
                console.log(yearerr);
              }}
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
            <div
              className={`${Button.button} ${Button.primary} ${Button.medium}`}
            >
              <a href="/sign-in">
                {" "}
                <h5
                  className={`${Font.body2} ${Font.medium} ${Font.font}`}
                  style={{ color: "#fff" }}
                >
                  Next
                </h5>
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

export default Supage1;
