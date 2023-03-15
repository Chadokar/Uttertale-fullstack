import { Dialog } from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import Tooltip from "react-power-tooltip";
import { Avtar, Button, Font } from "../../../styling/Styles";
import {
  AlertOctagon,
  AlertTriangle,
  Bell,
  Edit2,
  LogOut,
  MoreVertical,
  Plus,
  Search,
  Share2,
  TV,
  UserCheck,
  UserPlus,
  UserX,
} from "../../assets/Icons";
import SocialMediaIcon, { MediaImage } from "../../assets/SocialMediaIcon";
import EditSelf from "./EditSelf";
import "./profile.css";
import { UserContext } from "../../Navigation";
import NotificationPop from "./NotificationPop";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

function ProfileSelf() {
  const navigate = useNavigate();

  const [profilepop, setProfilepop] = useState(false);
  const [editPop, setEditPop] = useState(false);

  const [noticeProg, setNoticeProg] = useState(true);
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
  } = useContext(UserContext);
  // console.log(token)
  // console.log(user)
  const [sharepop, setSharepop] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("userToken");
    localStorage.removeItem("selectedChatInfo");
    navigate("/");
  };
  const PopupIN = () => {
    return (
      <>
        <Tooltip
          show={profilepop}
          position="bottom left"
          textBoxWidth="320px"
          padding="12px 16px"
          hoverBackground="#F5F5F5"
          backgroundColor="#fff"
          moveRight="-255px"
          flat={true}
        >
          <div className="prof-pop">
            <Share2 color="#616161" />
            <p className={`${Font.body2} ${Font.medium} ${Font.font} `}>
              Share profile
            </p>
          </div>
          <div className="prof-pop">
            <LogOut color="#616161" />
            <p
              onClick={handleLogout}
              className={`${Font.body2} ${Font.medium} ${Font.font} `}
            >
              Logout
            </p>
          </div>
        </Tooltip>
      </>
    );
  };

  const [linkpoparr, setLinkpoparr] = useState([false, false, false]);
  const [achievmentpoparr, setAchievmentpoparr] = useState([
    false,
    false,
    false,
  ]);
  const [allLinks, setAllLinks] = useState(user.featured_link);
  const [allAchive, setAllAchive] = useState(user.achivement);
  const [link, setLink] = useState();
  const [title, setTitle] = useState();
  const [date, setDate] = useState();
  const [achive, setAchive] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      setAllLinks(...allLinks, { link, title, date });

      // setAllAchive(...allAchive,{link,title,date})

      const { data } = await axios.put(
        "/update",
        {
          userid: user._id,
          featured_link: allLinks,
          achivement: allAchive,
        },
        config
      );

      console.log(allLinks);

      localStorage.setItem("userInfo", JSON.stringify(data));
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      setUser(userInfo);
    } catch (error) {
      console.log("Invalid user");
    }
  };

  const Links = ({ type, val, i, data }) => {
    const Share = () => {
      return (
        <>
          <Tooltip
            show={val === "link" ? linkpoparr[i] : achievmentpoparr[i]}
            position="top left"
            textBoxWidth="100px"
            padding="8px 0px"
            hoverBackground="#fff"
            backgroundColor="#fff"
            moveRight="15px"
            flat={true}
          >
            <div className="prof-pop">
              <Share2 color="#616161" />
              <p className={`${Font.body2} ${Font.medium} ${Font.font} `}>
                Share
              </p>
            </div>
          </Tooltip>
        </>
      );
    };

    //change the array size with the number of links used in APIS with initialize with value false

    const handleClickSharepop = (type, i) => {
      if (type === "link") {
        let arr = [];
        for (let i = 0; i < linkpoparr.length; i++) {
          arr.push(false);
        }
        arr[i] = !linkpoparr[i];
        setLinkpoparr([...arr]);
      } else if (type === "achie") {
        let arr = [];
        for (let i = 0; i < achievmentpoparr.length; i++) {
          arr.push(false);
        }
        arr[i] = !achievmentpoparr[i];
        setAchievmentpoparr([...arr]);
      }
    };

    return (
      <>
        <a className="link-box " href={data.link}>
          <div className="flex flex-row justify-between items-start py-3 px-4 w-full">
            <p className={`${Font.font} ${Font.medium} ${Font.label}`}>
              {type}
            </p>
            <div
              className="share-pop"
              onClick={() => handleClickSharepop(val, i)}
              style={{ position: "relative", cursor: "pointer" }}
            >
              <Share />
              <MoreVertical color="#101828" />
            </div>
          </div>
          <div className="p-2 w-full">
            {<img src="" alt="" className="p-link-img" />}
            {!data.image && (
              <div className="profile-dummy-link">
                <p className=""></p>
              </div>
            )}
          </div>
          <div className="flex flex-col items-start py-3 px-4 gap-3 w-full">
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <p className={`${Font.font} ${Font.label} ${Font.regular}`}>
                {data.date}
              </p>
              <p
                className={`${Font.font} ${Font.body1} ${Font.medium}`}
                style={{ color: "#242424" }}
              >
                {data.title}
              </p>
            </div>
          </div>
        </a>
      </>
    );
  };

  const [addlinkpop, setAddlinkpop] = useState(false);

  return (
    <>
      <Dialog
        fullWidth={false}
        maxWidth="xl"
        open={editPop}
        onClose={() => setEditPop(false)}
      >
        <EditSelf
          editPop={editPop}
          user={user}
          setUser={setUser}
          setEditPop={setEditPop}
          token={token}
        />
      </Dialog>
      <Dialog
        fullWidth={false}
        maxWidth="xl"
        open={addlinkpop}
        onClose={() => setAddlinkpop(false)}
      >
        <div className="addlinkpop">
          <label htmlFor="thislink" className="inputborder">
            <p>Fill the link</p>
            <input
              required
              onChange={(e) => setLink(e.target.value)}
              type="url"
              name=""
              id="thislink"
            />
          </label>
          <label htmlFor="heading" className="inputborder">
            <p>Heading</p>
            <input
              required
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              name=""
              id="heading"
            />
          </label>
          <label htmlFor="date" className="inputborder">
            <p>Date of publish</p>
            <input
              required
              onChange={(e) => setDate(e.target.value)}
              type="date"
              name=""
              id="date"
            />
          </label>
          <div
            onClick={async (e) => {
              console.log("yaha");
              e.preventDefault();

              try {
                const config = {
                  headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                };

                const newf = { link, title, date };
                if (!link || !title || !date) return;

                if (!achive) {
                  if (allLinks) {
                    setAllLinks([...allLinks, newf]);
                  } else {
                    setAllLinks([newf]);
                  }
                } else {
                  if (allAchive) {
                    setAllAchive([...allAchive, newf]);
                  } else {
                    setAllLinks([newf]);
                  }
                }

                // setAllAchive(...allAchive,{link,title,date})

                const { data } = await axios.put(
                  "/update",
                  {
                    userid: user._id,
                    featured_link: allLinks,
                    achivement: allAchive,
                  },
                  config
                );

                setLink();
                setTitle();
                setDate();

                localStorage.setItem("userInfo", JSON.stringify(data));
                const userInfo = JSON.parse(localStorage.getItem("userInfo"));
                setUser(userInfo);
                setAddlinkpop(false);
              } catch (error) {
                console.log("Invalid user");
                setAddlinkpop(false);
              }
            }}
            className={`${Button.button} ${Button.primary} ${Button.medium}`}
          >
            <p className={`${Font.font} ${Font.body2} ${Font.medium}`}>Save</p>
          </div>
        </div>
      </Dialog>

      <>
        <div className={`progress-prof ${!noticeProg && "mydisplay"}`}>
          <div className="flex flex-row items-center p-0 gap-6">
            <AlertTriangle color="#BF9C0C" height="28" width="28" />
            <div className="pp-div flex flex-col items-start p-0 justify-between">
              <p className={`${Font.body1} ${Font.medium} ${Font.font}`}>
                75% Done
              </p>
              <p
                className={`${Font.font} ${Font.body2} ${Font.regular}`}
                style={{ color: "#616161" }}
              >
                We suggest you to complete your profile so people can find you
                easily.
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center p-0 gap-2 h-9">
            <div
              onClick={() => setNoticeProg(!noticeProg)}
              style={{ color: "#BF9C0C" }}
              className={`${Button.tertiary} ${Button.medium} ${Button.button}`}
            >
              Dismiss
            </div>
            <div
              style={{ backgroundColor: "#BF9C0C", color: "#fff" }}
              onClick={() => setEditPop(true)}
              className={`${Button.button} ${Button.secondary} ${Button.medium}`}
            >
              Complete now
            </div>
          </div>
        </div>

        <div className="profile-name-box">
          <div
            className={`p-n-b-avtar ${Avtar["avtar-3"]} ${Avtar.avtar}`}
          ></div>
          <div className="p-n-b-container">
            <div className="member-info-top">
              <div className="m-i-t-left">
                <p className={`${Font.heading2} ${Font.medium} ${Font.font}`}>
                  {user.firstname} {user.lastname}{" "}
                </p>
                <p className={`${Font.body1} ${Font.regular} ${Font.font}`}>
                  {user.role}
                </p>
              </div>
              <div className="m-i-t-right">
                <div
                  onClick={() => setEditPop(true)}
                  className={`${Button.button} ${Button.secondary} ${Button.medium}`}
                >
                  <h1>
                    <Edit2 height="16" width="16" color={"#242424"} />
                  </h1>
                  <p className={`${Font.body2} ${Font.medium} ${Font.font}`}>
                    Edit
                  </p>
                </div>

                <div
                  style={{ position: "relative" }}
                  className={`profile-pop ${Button.button} ${Button.secondary} ${Button.iconmedium}`}
                  onClick={() => setProfilepop(!profilepop)}
                >
                  <MoreVertical color={"#242424"} />
                  <PopupIN />
                </div>
              </div>
            </div>
            <div className="member-info-bottom">
              <p
                className={`${Font.font} ${Font.label} ${Font.medium}`}
                style={{ color: "#B3B3B3" }}
              >
                Expertise Tags:
              </p>
              <div className="bottom-bottom">
                <p className="tag">Prime Reporter</p>
                <p className="tag">International Media</p>
                <p className="tag">Sports Journamlism</p>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-about w-full box-border flex flex-col items-start py-6 px-10 mb-10">
          <div className="profile-about-des flex flex-col items-start py-6">
            <p className={`${Font.heading3} ${Font.medium} ${Font.font}`}>
              About
            </p>
            <p
              className={`${Font.font} ${Font.body2} ${Font.regular} text-left`}
              style={{ maxWidth: 600, color: "#616161" }}
            >
              {user.about}
            </p>
          </div>
          <div className="flex flex-col items-start py-6 gap-4">
            <p className={`${Font.heading3} ${Font.medium} ${Font.font}`}>
              Experience
            </p>
            <div className={`flex flex-col items-start p-0 gap-4`}>
              <div className={`flex flex-col items-start gap-1 p-0`}>
                <p
                  className={`${Font.subheadline} ${Font.medium} ${Font.font}`}
                >
                  Hindustan Times
                </p>
                <p
                  className={`${Font.body2} ${Font.regular} ${Font.font}`}
                  style={{ color: "#616161" }}
                >
                  Sep 20 - Jun 22 • 1 yr 8 mos
                </p>
              </div>
              <div className={`flex flex-col items-start gap-1 p-0`}>
                <p
                  className={`${Font.subheadline} ${Font.medium} ${Font.font}`}
                >
                  Prime Time
                </p>
                <p
                  className={`${Font.body2} ${Font.regular} ${Font.font}`}
                  style={{ color: "#616161" }}
                >
                  Sep 20 - Jun 22 • 1 yr 8 mos
                </p>
              </div>
            </div>
          </div>
          <div className={`flex flex-row items-start py-6 gap-6 w-full`}>
            <div
              className={`flex flex-col items-start p-0 profile-about-des w-1/2`}
            >
              <p className={`${Font.heading3} ${Font.medium} ${Font.font}`}>
                Education
              </p>
              <p
                className={`${Font.body2} ${Font.regular} ${Font.font}`}
                style={{ color: "#616161" }}
              >
                {user.education}
              </p>
            </div>
            <div
              className={`flex flex-col items-start p-0 profile-about-des w-1/2`}
            >
              <p className={`${Font.heading3} ${Font.medium} ${Font.font}`}>
                Location
              </p>
              <p
                className={`${Font.body2} ${Font.regular} ${Font.font}`}
                style={{ color: "#616161" }}
              >
                {user.location}
              </p>
            </div>
          </div>
          <div className={`flex flex-row items-start py-6 gap-6 w-full`}>
            <div
              className={`flex flex-col items-start p-0 profile-about-des w-1/2`}
            >
              <p className={`${Font.heading3} ${Font.medium} ${Font.font}`}>
                Website
              </p>
              <a
                href={`${user.website_link}`}
                className={`${Font.body2} ${Font.regular} ${Font.font}`}
                style={{ color: "#616161" }}
              >
                {user.website_link}
              </a>
            </div>
            <div
              className={`flex flex-col items-start p-0 profile-about-des w-1/2`}
            >
              <p className={`${Font.heading3} ${Font.medium} ${Font.font}`}>
                Social Handles
              </p>
              <div className="flex flex-row items-start p-0">
                {user.social_media.twitter && (
                  <a href={user.social_media.twitter}>
                    {" "}
                    <MediaImage
                      link={SocialMediaIcon.twitter}
                      height={40}
                      width={40}
                    />
                  </a>
                )}
                {user.social_media.instagram && (
                  <a href={user.social_media.instagram}>
                    {" "}
                    <MediaImage
                      link={SocialMediaIcon.instagram}
                      height={40}
                      width={40}
                    />
                  </a>
                )}
                {user.social_media.linkedin && (
                  <a href={user.social_media.linkedin}>
                    {" "}
                    <MediaImage
                      link={SocialMediaIcon.linkedin}
                      height={40}
                      width={40}
                    />
                  </a>
                )}
                {user.social_media.youtube && (
                  <a href={user.social_media.youtube}>
                    {" "}
                    <MediaImage
                      link={SocialMediaIcon.youTube}
                      height={40}
                      width={40}
                    />
                  </a>
                )}
                {user.social_media.facebook && (
                  <a href={user.social_media.facebook}>
                    {" "}
                    <MediaImage
                      link={SocialMediaIcon.facebook}
                      height={40}
                      width={40}
                    />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="profile-link flex flex-col items-start p-0 gap-5 w-full mb-8">
          <div className="flex flex-row py-2 justify-between w-full">
            <p className={`${Font.heading3} ${Font.medium} ${Font.font} `}>
              Featured Links
            </p>
            <button
              className={`${Button.button} ${Button.secondary} ${Button.medium}`}
              onClick={() => {
                setAddlinkpop(true);
                setAchive(false);
              }}
            >
              <Plus color="#242424" />
              <p className={`${Font.font} ${Font.body2} ${Font.medium}`}>ADD</p>
            </button>
          </div>
          <div className="flex flex-wrap justify-between items-start p-0  w-full gap-4">
            {allLinks &&
              allLinks.map((item, i) => (
                <Links data={item} key={i} type="Link" val="link" i={i} />
              ))}
            {/* <Links type='Link' val='link' i={0} />
          <Links type='Link' val='link' i={1} />
          <Links type='Link' val='link' i={2} /> */}
          </div>
        </div>

        <div className="profile-link flex flex-col items-start p-0 gap-5 w-full mb-8">
          <div className="flex flex-row py-2 justify-between w-full">
            <p className={`${Font.heading3} ${Font.medium} ${Font.font} `}>
              Achievements
            </p>
            <button
              className={`${Button.button} ${Button.secondary} ${Button.medium}`}
              onClick={() => {
                setAddlinkpop(true);
                setAchive(true);
              }}
            >
              <Plus color="#242424" />
              <p className={`${Font.font} ${Font.body2} ${Font.medium}`}>ADD</p>
            </button>
          </div>
          <div className="flex flex-wrap justify-between items-start p-0 w-full gap-4">
            {allAchive &&
              allAchive.map((item, i) => (
                <Links
                  data={item}
                  key={i}
                  type="Achievements"
                  val="achie"
                  i={i}
                />
              ))}
            {/* <Links type='Award' val='achie' i={0} />
          <Links type='Achievements' val='achie' i={1} />
          <Links type='Achievements' val='achie' i={2} /> */}
          </div>
        </div>
      </>
    </>
  );
}

export default ProfileSelf;
