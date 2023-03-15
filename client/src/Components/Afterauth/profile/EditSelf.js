import React, { useState } from "react";
import ReactSelect from "react-select";
import { Button, Font, Options, Themes } from "../../../styling/Styles";
import { Plus, X } from "../../assets/Icons";
import "./editSelf.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EditSelf(props) {
  const user = props.user;
  const token = props.token;
  const [firstName, setFirstName] = useState(user.firstname);
  const [lastName, setLastName] = useState(user.lastname);
  const [about, setAbout] = useState(user.about);
  const [education, setEducation] = useState(user.education);
  const [location, setLocation] = useState(user.location);
  const [website, setWebsite] = useState(user.website_link);
  const [instagram, setInstagram] = useState(user.social_media.instagram);
  const [twitter, setTwitter] = useState(user.social_media.twitter);
  const [youtube, setYoutube] = useState(user.social_media.youtube);
  const [facebook, setFacebook] = useState(user.social_media.facebook);
  const [linkedin, setLinkedin] = useState(user.social_media.linkedin);

  const [isWorking, setIsWorking] = useState(false);

  const [openaddnewexp, setOpenAddnewexp] = useState(false);
  const [experience, setExperience] = useState([...user.experience]);
  const exp = user.experience;
  // const [addNewexp, setAddNewexp] = useState([...exp]);

  const [error, setError] = useState(false);

  const Experience = ({ show, item, i }) => {
    const [compName, setCompName] = useState(item.comName);
    const [startDateM, setstartDateM] = useState(item.start["month"] || "");
    const [startDateY, setstartDateY] = useState(item.start["year"] || "");
    const [endDateM, setendDateM] = useState(item.end["month"] || "");
    const [endDateY, setendDateY] = useState(item.end["year"] || "");
    // comName: "",
    // start: { month: "", year: "" },
    // end: { month: "", year: "" },

    const ClickAddHandler = () => {
      const expob = [
        {
          comName: compName,
          start: { month: startDateM, year: startDateY },
          end: { month: endDateM, year: endDateY },
        },
      ];
      if (compName !== "" && startDateM !== "" && startDateY !== "") {
        console.log("added");
        let a = [];
        a = [...experience, ...expob];
        // setExperience([...experience, ...expob]);
        setOpenAddnewexp(false);
        setExperience([...a]);
      }
    };

    return (
      <>
        <div className="edit-experience flex flex-col p-0 gap-6 w-full">
          <div className="flex flex-row justify-between items-center py-4 px-0 ">
            <p className={`${Font.font} ${Font.subheadline} ${Font.medium}`}>
              Experience {`${i + 1}`}
            </p>
            {/* On click below button experience remove the experiece from backend data */}
            <div
              onClick={() => deleteExp(item)}
              className={`${Button.button} ${Button.tertiary} ${Button.large}`}
            >
              <p
                className={`${Font.font} ${Font.body1} ${Font.medium}`}
                style={{ color: "#FF3520" }}
              >
                Remove
              </p>
            </div>
          </div>
          <div
            className="flex flex-col p-0 edit-name-box"
            style={{ width: "100%" }}
          >
            <p className={`${Font.font} ${Font.medium} ${Font.label}`}>
              Company Name
            </p>
            <label
              htmlFor="editcomp"
              className={`input ${false && "error"} ${false && "disable"}`}
            >
              <input
                type="text"
                id="editcomp"
                value={compName}
                onChange={(e) => setCompName(e.target.value)}
                placeholder="Hindustan Times"
              />
            </label>
          </div>
          <div
            className="flex flex-col p-0 edit-name-box inputborder"
            style={{ width: "100%" }}
          >
            <p className={`${Font.font} ${Font.medium} ${Font.label}`}>
              Start Date
            </p>
            <div className="w-full flex flex-row justify-between">
              <div style={{ width: 423 }}>
                <Dropdown
                  placeholder="Month"
                  onChange={(e) => console.log(e)}
                  val={startDateM}
                  options={month}
                  setvalue={setstartDateM}
                />
              </div>
              <div style={{ width: 423 }}>
                <Dropdown
                  placeholder="Year"
                  options={years}
                  val={startDateY}
                  setvalue={setstartDateY}
                />
              </div>
            </div>
          </div>
          <div
            className="flex flex-col p-0 edit-name-box inputborder"
            style={{ width: "100%" }}
          >
            <p className={`${Font.font} ${Font.medium} ${Font.label}`}>
              End Date
            </p>
            <div className="w-full flex flex-row justify-between">
              <div style={{ width: 423 }}>
                <Dropdown
                  placeholder="Month"
                  disable={isWorking}
                  val={endDateM}
                  options={month}
                  setvalue={setendDateM}
                />
              </div>
              <div style={{ width: 423 }}>
                <Dropdown
                  placeholder="Year"
                  disable={isWorking}
                  val={endDateY}
                  options={years}
                  setvalue={setendDateY}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row p-1 gap-3 h-6">
            <input
              type="checkbox"
              id=""
              style={{ width: 16, height: 16 }}
              onChange={(e) => setIsWorking(e.target.checked)}
            />
            <p
              className={`${Font.font} ${Font.label} ${Font.regular} text-end`}
              style={{ marginTop: 2 }}
            >
              I am currently working in this role
            </p>
          </div>
        </div>
        {openaddnewexp && show && (
          <div className="w-full flex">
            <div
              className={`${Button.button} ${Button.secondary} ${Button.medium}`}
              onClick={() => {
                ClickAddHandler();
                // console.log(experience);s
              }}
            >
              <p
                className={`${Font.font} ${Font.body2} ${Font.medium}`}
                style={{ color: "#242424" }}
              >
                Add
              </p>
            </div>
          </div>
        )}
      </>
    );
  };

  var currentYear = new Date().getFullYear();
  var years = [];

  for (let i = currentYear; i >= 1980; i--) {
    years.push(i);
  }

  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const navigate = useNavigate();

  const Dropdown = (props) => {
    const [val, setVal] = useState(
      props.val === "" ? "" : { label: props.val, value: null }
    );
    const options = props.options;

    const option = options.map((item, i) => {
      return {
        label: item,
        value: i,
        ...item,
      };
    });

    const onChange = (value) => {
      const a = value.label;
      props.setvalue(a);
    };

    return (
      <ReactSelect
        options={option}
        value={val}
        className="w-full"
        classNamePrefix="mySelect"
        theme={(theme) => Themes(theme)}
        styles={Options}
        placeholder={props.placeholder}
        onChange={(value) => {
          {
            setVal(value);
            onChange(value);
          }
        }}
        isDisabled={props.disable}
      />
    );
  };

  const deleteExp = (val) => {
    if (val.comName !== "") {
      let arr = [];
      arr = [...arr, ...experience];
      arr = arr.filter(function (item) {
        return item !== val;
      });
      setExperience([...arr]);
    } else setOpenAddnewexp(false);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      console.log("clicked");

      const sendData = {
        userid: user._id,
        firstname: firstName,
        lastname: lastName,
        about: about,
        education: education,
        location: location,
        website_link: website,
        social_media: {
          instagram: instagram,
          twitter: twitter,
          facebook: facebook,
          youtube: youtube,
          linkedin: linkedin,
        },
        experience: [...experience],
      };
      console.log(sendData);
      const { data } = await axios
        .put("/update", { ...sendData }, config)
        .catch((err) => console.log(err));

      props.setEditPop(false);

      localStorage.setItem("userInfo", JSON.stringify(data));
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      props.setUser(userInfo);

      props.setEditPop(!props.editPop);
    } catch (error) {
      setError("Invalid user");
      console.log("error");
    }
  };

  const expnew = {
    comName: "",
    start: { month: "", year: "" },
    end: { month: "", year: "" },
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="edit-box">
        <div className="edit-container flex flex-col justify-center pt-6 px-8 pb-8 gap-6">
          <div className="edit-head">
            <p className={`${Font.font} ${Font.heading1} ${Font.medium}`}>
              Edit Profile
            </p>
            <div
              onClick={() => props.setEditPop(false)}
              style={{ cursor: "pointer" }}
            >
              <X height="24" width="24" color="#101828" />
            </div>
          </div>
          <div className="flex flex-col items-center p-0 gap-6 w-full">
            <div className="flex flex-row p-0 justify-between gap-8 w-full">
              <div
                className="flex flex-col p-0 edit-name-box"
                style={{ width: 423 }}
              >
                <p className={`${Font.font} ${Font.medium} ${Font.label}`}>
                  First Name
                </p>
                <label
                  htmlFor="editname"
                  className={`input ${false && "error"} ${false && "disable"}`}
                >
                  <input
                    type="text"
                    id="editname"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
              </div>
              <div
                className="flex flex-col p-0 edit-name-box"
                style={{ width: 423 }}
              >
                <p className={`${Font.font} ${Font.medium} ${Font.label}`}>
                  Last Name
                </p>
                <label
                  htmlFor="editname"
                  className={`input ${false && "error"} ${false && "disable"}`}
                >
                  <input
                    type="text"
                    id="editname"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
              </div>
            </div>

            <div className="flex flex-col justify-center p-0 edit-name-box w-full">
              <p className={`${Font.font} ${Font.label} ${Font.medium}`}>
                About
              </p>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                id="aboutComp"
                maxLength={400}
                cols={6}
                className={`${Font.font} ${Font.body1} ${Font.regular} edit-prof-about`}
                style={{ height: 153, width: "100%" }}
              />
            </div>
            <div className="flex flex-row p-0 justify-between gap-8 w-full">
              <div
                className="flex flex-col p-0 edit-name-box"
                style={{ width: 423 }}
              >
                <p className={`${Font.font} ${Font.medium} ${Font.label}`}>
                  Education
                </p>
                <label
                  htmlFor="editEducation"
                  className={`input ${false && "error"} ${false && "disable"}`}
                >
                  <input
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    type="text"
                    id="editEducation"
                    placeholder="Education"
                  />
                </label>
              </div>
              <div
                className="flex flex-col p-0 edit-name-box"
                style={{ width: 423 }}
              >
                <p className={`${Font.font} ${Font.medium} ${Font.label}`}>
                  Location
                </p>
                <label
                  htmlFor="editLocation"
                  className={`input ${false && "error"} ${false && "disable"}`}
                >
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    type="text"
                    id="editLocation"
                    placeholder="Location"
                  />
                </label>
              </div>
            </div>

            <div className="flex flex-row p-0 justify-between gap-8 w-full">
              <div
                className="flex flex-col p-0 edit-name-box"
                style={{ width: 423 }}
              >
                <p className={`${Font.font} ${Font.medium} ${Font.label}`}>
                  Website Link
                </p>
                <label
                  htmlFor="editEducation"
                  className={`input ${false && "error"} ${false && "disable"}`}
                >
                  <input
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    type="text"
                    id="editEducation"
                    placeholder="Paste website link here"
                  />
                </label>
              </div>
              <div
                className="flex flex-col p-0 edit-name-box"
                style={{ width: 423 }}
              >
                <p className={`${Font.font} ${Font.medium} ${Font.label}`}>
                  Social Media Link
                </p>
                <label
                  htmlFor="editLocation"
                  className={`input ${false && "error"} ${false && "disable"}`}
                >
                  <input
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    type="text"
                    id="editLocation"
                    placeholder="Instagram"
                  />
                </label>
                {/* <p className={`${Font.font} ${Font.regular} ${Font.label}`} style={{color:'#616161'}} >You can add multiple links here</p> */}
              </div>
            </div>
            <div className="flex flex-row p-0 justify-between gap-8 w-full">
              <div
                className="flex flex-col p-0 edit-name-box"
                style={{ width: 423 }}
              >
                <p className={`${Font.font} ${Font.medium} ${Font.label}`}>
                  Social Media Link
                </p>
                <label
                  htmlFor="editLocation"
                  className={`input ${false && "error"} ${false && "disable"}`}
                >
                  <input
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                    type="text"
                    id="editLocation"
                    placeholder="Twitter"
                  />
                </label>
                {/* <p className={`${Font.font} ${Font.regular} ${Font.label}`} style={{color:'#616161'}} >You can add multiple links here</p> */}
              </div>
              <div
                className="flex flex-col p-0 edit-name-box"
                style={{ width: 423 }}
              >
                <p className={`${Font.font} ${Font.medium} ${Font.label}`}>
                  Social Media Link
                </p>
                <label
                  htmlFor="editLocation"
                  className={`input ${false && "error"} ${false && "disable"}`}
                >
                  <input
                    value={youtube}
                    onChange={(e) => setYoutube(e.target.value)}
                    type="text"
                    id="editLocation"
                    placeholder="Youtube"
                  />
                </label>
                {/* <p className={`${Font.font} ${Font.regular} ${Font.label}`} style={{color:'#616161'}} >You can add multiple links here</p> */}
              </div>
            </div>
            <div className="flex flex-row p-0 justify-between gap-8 w-full">
              <div
                className="flex flex-col p-0 edit-name-box"
                style={{ width: 423 }}
              >
                <p className={`${Font.font} ${Font.medium} ${Font.label}`}>
                  Social Media Link
                </p>
                <label
                  htmlFor="editLocation"
                  className={`input ${false && "error"} ${false && "disable"}`}
                >
                  <input
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    type="text"
                    id="editLocation"
                    placeholder="LinkedIn"
                  />
                </label>
                {/* <p className={`${Font.font} ${Font.regular} ${Font.label}`} style={{color:'#616161'}} >You can add multiple links here</p> */}
              </div>
              <div
                className="flex flex-col p-0 edit-name-box"
                style={{ width: 423 }}
              >
                <p className={`${Font.font} ${Font.medium} ${Font.label}`}>
                  Social Media Link
                </p>
                <label
                  htmlFor="editLocation"
                  className={`input ${false && "error"} ${false && "disable"}`}
                >
                  <input
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                    type="text"
                    id="editLocation"
                    placeholder="Facebook"
                  />
                </label>
                {/* <p className={`${Font.font} ${Font.regular} ${Font.label}`} style={{color:'#616161'}} >You can add multiple links here</p> */}
              </div>
            </div>
            {experience.map((item, i) => (
              <Experience show={false} key={i} item={item} i={i} />
            ))}
            {openaddnewexp && (
              <Experience show={true} item={expnew} i={experience.length} />
            )}
            {!openaddnewexp && (
              <div className="w-full flex">
                <div
                  className={`${Button.button} ${Button.secondary} ${Button.medium}`}
                  onClick={() => setOpenAddnewexp(true)}
                >
                  <Plus color="#242424" width={16} height={16} />
                  <p
                    className={`${Font.font} ${Font.body2} ${Font.medium}`}
                    style={{ color: "#242424" }}
                  >
                    Add New
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-row items-center pt-3 gap-1">
            <div className="flex flex-row items-start p-0 gap-4">
              <button
                type="submit"
                className={`${Button.button} ${Button.primary} ${Button.large}`}
              >
                <p className={`${Font.font} ${Font.body1} ${Font.medium}`}>
                  Save Changes
                </p>
              </button>
              <div
                className={`${Button.button} ${Button.secondary} ${Button.large}`}
                onClick={() => props.setEditPop(false)}
              >
                <p className={`${Font.font} ${Font.body1} ${Font.medium}`}>
                  Cancel
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

const exp = [
  {
    comName: "Hindustan Times",
    start: { month: "July", year: 2022 },
    end: { month: "Nov", year: 2022 },
  },
  {
    comName: "Hindustan Times",
    start: { month: "July", year: 2020 },
    end: { month: "Nov", year: 2021 },
  },
];

export default EditSelf;
