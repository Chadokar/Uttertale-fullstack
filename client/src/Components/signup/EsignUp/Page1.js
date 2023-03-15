import React, { useState } from "react";
import ReactSelect from "react-select";
import { City, Country, State } from "country-state-city";
import { Button, Font } from "../../../styling/Styles";

function Page1(props) {
  const n = props.n;
  const {
    location,
    setlocation,
    nationality,
    setnationality,
    dob,
    setdob,
    name,
    setname,
  } = { ...props };
  const [countryId, setCountryId] = useState("");
  let nas = "";
  if (nationality !== "") {
    nas = { label: nationality, id: "3333333333333333333" };
  }
  const [country, setCountry] = useState(nas);

  const countries = Country.getAllCountries();

  const updatedCountries = countries.map((country) => {
    return {
      label: country.name,
      value: country.isoCode,
      ...country,
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

  const themes = (theme) => ({
    ...theme,
    borderRadius: 10,
    colors: {
      ...theme.colors,
      primary: "#2E65E5",
    },
  });

  const Nationality = () => {
    return (
      <>
        <ReactSelect
          id="country"
          name="country"
          label="country"
          options={updatedCountries}
          value={country}
          className="w-full"
          classNamePrefix="mySelect"
          theme={(theme) => themes(theme)}
          styles={options}
          placeholder="Nationality"
          onChange={(value) => {
            {
              setCountry(value);
              setnationality(value.name);
            }
          }}
        />
      </>
    );
  };

  const Next = () => {
    if (name === "" || name === null) {
      setname(null);
    } else if (dob === "" || dob === null) {
      setdob(null);
    } else if (location === "" || location === null) {
      setlocation(null);
    } else if (nationality === "" || nationality === null) {
      setnationality(null);
    } else props.clicked(1);
  };

  return (
    <>
      <div className="inputborder">
        <p className={`${Font.font} ${Font.label} ${Font.medium}`}>Name</p>
        <input
          type="text"
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />
        {name === null && (
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
          {props.input[0].heading}
        </p>
        <input
          type="text"
          placeholder={props.input[0].placeholder}
          value={dob}
          onChange={(e) => setdob(e.target.value)}
        />
        {dob === null && (
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
          type="text"
          placeholder={props.input[1].placeholder}
          value={location}
          onChange={(e) => setlocation(e.target.value)}
        />
        {location === null && (
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
          {props.input[2].heading}
        </p>
        <Nationality />
        {nationality === null && (
          <p
            className={`${Font.font} ${Font.label} ${Font.regular}`}
            style={{ color: "#FF0000" }}
          >
            Please correct it.
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

export default Page1;
