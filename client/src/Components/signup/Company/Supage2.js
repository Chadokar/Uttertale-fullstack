import { City, Country, State } from "country-state-city";
import React, { useState } from "react";
import ReactSelect from "react-select";
import { Button, Font, Options, Themes } from "../../../styling/Styles";
import "./style.css";

function Supage2(props) {
  const {
    locations,
    setlocations,
    hcity,
    sethcity,
    sethstate,
    hstate,
    hpincode,
    sethpincode,
  } = { ...props };

  const [countryId, setCountryId] = useState("IN");
  const [country, setCountry] = useState(null);
  const [stateId, setStateId] = useState(hstate === "" ? "" : hstate.isoCode);
  const [state, setState] = useState(
    hstate !== "" ? { label: hstate.label, isoCode: hstate.isoCode } : ""
  );
  const [city, setCity] = useState(
    hcity !== "" ? { label: hcity.label, isoCode: hcity.isoCode } : ""
  );

  const countries = Country.getAllCountries();

  const updatedCountries = countries.map((country) => {
    return {
      label: country.name,
      value: country.isoCode,
      ...country,
    };
  });
  // console.log('All states')
  // State.getStatesOfCountry('IN').map((state)=> console.log(state) )
  const updatedStates = State.getStatesOfCountry(countryId).map((state) => {
    return {
      label: state.name,
      value: state.isoCode,
      ...state,
    };
  });
  const updatedCities = City.getCitiesOfState(countryId, stateId).map(
    (city) => {
      // console.log(city)
      return {
        label: city.name,
        value: city.latitude,
        ...city,
      };
    }
  );

  let substate = "";
  if (hstate !== "") {
    substate = { label: hstate.label, isoCode: hstate.isoCode };
  }

  let line1 = [];
  let line2 = [];
  let n = 0;
  for (let i = 0; i < locations.length && locations[i] !== "*"; i++) {
    line1 = line1 + locations[i];
    n = i;
  }
  for (let i = n + 2; i < locations.length; i++) {
    line2 = line2 + locations[i];
  }

  const [addre1, setaddre1] = useState(line1);
  const [addre2, setaddre2] = useState(line2);

  const Address = (props) => {
    const [pin, setPin] = useState(hpincode);

    const india = {
      label: "India",
      value: "IN",
      name: "India",
      isoCode: "IN",
      flag: "🇮🇳",
    };

    return (
      <>
        {/* <input type="number" value={pin} onChange={(e)=>setPin(e.target.value)} /> */}
        <div className="flex flex-row w-full justify-between mb-5" style={{}}>
          <ReactSelect
            id="country"
            name="country"
            label="country"
            options={updatedCountries}
            value={india}
            className="place"
            classNamePrefix="mySelect"
            theme={(theme) => Themes(theme)}
            styles={Options}
            placeholder="Select your country"
            isDisabled
            // onChange={(value) => {
            //   setCountry(value);
            //   console.log(value);
            //   setCountryId(value.isoCode)
            //   setCity(null)
            //   setState(null)
            // }}
          />
          <div className="place">
            <input
              type="text"
              value={props.hpincode}
              onChange={(e) => props.sethpincode(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-row w-full justify-between">
          <ReactSelect
            id="state"
            name="state"
            options={updatedStates}
            value={state}
            className="place"
            classNamePrefix="mySelect"
            theme={(theme) => Themes(theme)}
            styles={Options}
            placeholder="State"
            onChange={(value) => {
              setState(value);
              const a = { label: value.label, isoCode: value.isoCode };
              sethstate(a);
              setStateId(value.isoCode);
              setCity(null);
              sethcity("");
            }}
          />
          <ReactSelect
            id="city"
            name="city"
            options={updatedCities}
            value={city}
            className="place"
            noOptionsMessage={() => "No results"}
            classNamePrefix="mySelect"
            theme={(theme) => Themes(theme)}
            styles={Options}
            placeholder="City"
            onChange={(value) => {
              setCity(value);
              const a = { label: value.label, isoCode: value.isoCode };
              sethcity(a);
            }}
          />
        </div>
      </>
    );
  };

  const next = () => {
    if (locations === "*" || locations === null) {
      setlocations("*");
    } else props.clicked(1);
    setlocations(addre1 + "*" + addre2);
  };

  return (
    <>
      <div className="inputborder">
        <p className={`${Font.font} ${Font.label} ${Font.medium} color`}>
          {props.input[0].heading}
        </p>
        <input
          type="text"
          value={addre1}
          onChange={(e) => setaddre1(e.target.value)}
          placeholder={props.input[0].placeholder}
        />
        {locations === "*" && (
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
          {props.input[1].heading}
        </p>
        <input
          type="text"
          value={addre2}
          onChange={(e) => setaddre2(e.target.value)}
          placeholder={props.input[1].placeholder}
        />
      </div>
      <div className="inputborder">
        <Address sethpincode={sethpincode} hpincode={hpincode} />
      </div>
      <div className="next-back-buttons">
        <div>
          <div
            onClick={() => next()}
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
        <div
          onClick={() => props.clicked(-1)}
          className={`${Button.button} ${Button.secondary} ${Button.medium}`}
        >
          <p className={`${Font.font} ${Font.medium} ${Font.body2}`}>Back</p>
        </div>
      </div>
    </>
  );
}

export default Supage2;
