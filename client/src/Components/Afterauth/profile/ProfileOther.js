import React, { useState } from "react";
import Tooltip from "react-power-tooltip";
import { Avtar, Button, Font } from "../../../styling/Styles";
import {
  AlertOctagon,
  Bell,
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
import "./profile.css";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../Navigation";
import { useContext, useEffect } from "react";
import axios from "axios";
import { NavLink, Outlet } from "react-router-dom";

function ProfileOther(props) {
  // console.log(props)

  const {
    selectedChat,
    setSelectedChat,
    setUser,
    chats,
    setChats,
    token,
    fetchAgain,
    setFetchAgain,
  } = useContext(UserContext);

  const { state } = useLocation();
  console.log(state);
  const user = state;
  const [allLinks, setAllLinks] = useState(user.featured_link);
  const [allAchive, setAllAchive] = useState(user.achivement);
  // console.log(state)

  const [profilepop, setProfilepop] = useState(false);

  const PopupIN = () => {
    return (
      <>
        <Tooltip
          show={profilepop}
          position="bottom left"
          textBoxWidth="320px"
          padding="10px 16px"
          hoverBackground="#F5F5F5"
          backgroundColor="#fff"
          // moveUp="-70px"
          moveRight="-255px"
          flat={true}
        >
          <div className="prof-pop">
            <UserX color="#616161" />
            <p className={`${Font.body2} ${Font.medium} ${Font.font} `}>
              Remove from connections
            </p>
          </div>
          <div className="prof-pop">
            <Share2 color="#616161" />
            <p className={`${Font.body2} ${Font.medium} ${Font.font} `}>
              Share profile
            </p>
          </div>
          <div className="prof-pop">
            <AlertOctagon color="#616161" />
            <p className={`${Font.body2} ${Font.medium} ${Font.font} `}>
              Report this user
            </p>
          </div>
        </Tooltip>
      </>
    );
  };

  //change the array size with the number of links used in APIS with initialize with value false
  const [linkpoparr, setLinkpoparr] = useState([true, false, false]);
  const [achievmentpoparr, setAchievmentpoparr] = useState([
    false,
    false,
    false,
  ]);

  const Links = ({ type, val, i }) => {
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
        arr[i] = true;
        setAchievmentpoparr([...arr]);
      }
    };

    return (
      <div className="link-box ">
        <div className="flex flex-row justify-between items-start py-3 px-4 w-full">
          <p className={`${Font.font} ${Font.medium} ${Font.label}`}>{type}</p>
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
          <img src="" alt="" className="p-link-img" />
        </div>
        <div className="flex flex-col items-start py-3 px-4 gap-3 w-full">
          <div className="flex flex-col items-start p-0 gap-1 w-full">
            <p className={`${Font.font} ${Font.label} ${Font.regular}`}>
              20 Jul 2022
            </p>
            <p
              className={`${Font.font} ${Font.body1} ${Font.medium}`}
              style={{ color: "#242424" }}
            >
              Truth and Accuracy about the stock market
            </p>
          </div>
        </div>
      </div>
    );
  };

  const messageHandle = async (user) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      // console.log(user.data._id)
      const { data } = await axios.post(
        `/chat`,
        { userId: user.data._id },
        config
      );
      setSelectedChat(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [request, setRequest] = useState(true);

  return (
    <>
      <div className="profile-name-box">
        <div className={`p-n-b-avtar ${Avtar["avtar-3"]} ${Avtar.avtar}`}></div>
        <div className="p-n-b-container">
          <div className="member-info-top">
            <div className="m-i-t-left">
              <p className={`${Font.heading2} ${Font.medium} ${Font.font}`}>
                {user.name}{" "}
              </p>
              <p className={`${Font.body1} ${Font.regular} ${Font.font}`}>
                {user.data.role}
              </p>
            </div>
            <div className="m-i-t-right">
              {request && false && (
                <div
                  onClick={() => setRequest(false)}
                  className={`${Button.button} ${Button.primary} ${Button.medium}`}
                >
                  <h1>
                    <UserPlus color={"#fff"} />
                  </h1>
                  <p className={`${Font.body2} ${Font.medium} ${Font.font}`}>
                    Connect
                  </p>
                </div>
              )}
              {!request && false && (
                <div
                  style={{ opacity: 0.55 }}
                  className={`${Button.button} ${Button.disable} ${Button.primary} ${Button.medium}`}
                >
                  <h1>
                    <UserCheck color={"#fff"} />
                  </h1>
                  <p className={`${Font.body2} ${Font.medium} ${Font.font}`}>
                    Request sent
                  </p>
                </div>
              )}
              {true && (
                <div
                  className={`${Button.button} ${Button.secondary} ${Button.medium}`}
                >
                  <NavLink to="/chat-box">
                    <p
                      onClick={() => messageHandle(user)}
                      className={`${Font.body2} ${Font.medium} ${Font.font}`}
                    >
                      Message
                    </p>
                  </NavLink>
                </div>
              )}

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
            {user.data.about}
          </p>
        </div>
        <div className="flex flex-col items-start py-6 gap-4">
          <p className={`${Font.heading3} ${Font.medium} ${Font.font}`}>
            Experience
          </p>
          <div className={`flex flex-col items-start p-0 gap-4`}>
            <div className={`flex flex-col items-start gap-1 p-0`}>
              <p className={`${Font.subheadline} ${Font.medium} ${Font.font}`}>
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
              <p className={`${Font.subheadline} ${Font.medium} ${Font.font}`}>
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
              {user.data.education}
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
              {user.data.location}
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
            <p
              className={`${Font.body2} ${Font.regular} ${Font.font}`}
              style={{ color: "#616161" }}
            >
              {user.data.website_link}
            </p>
          </div>
          <div
            className={`flex flex-col items-start p-0 profile-about-des w-1/2`}
          >
            <p className={`${Font.heading3} ${Font.medium} ${Font.font}`}>
              Social Handles
            </p>
            <div className="flex flex-row items-start p-0">
              {user.social_media && user.social_media.twitter && (
                <a href={user.social_media.twitter}>
                  {" "}
                  <MediaImage
                    link={SocialMediaIcon.twitter}
                    height={40}
                    width={40}
                  />
                </a>
              )}
              {user.social_media && user.social_media.instagram && (
                <a href={user.social_media.instagram}>
                  {" "}
                  <MediaImage
                    link={SocialMediaIcon.instagram}
                    height={40}
                    width={40}
                  />
                </a>
              )}
              {user.social_media && user.social_media.linkedin && (
                <a href={user.social_media.linkedin}>
                  {" "}
                  <MediaImage
                    link={SocialMediaIcon.linkedin}
                    height={40}
                    width={40}
                  />
                </a>
              )}
              {user.social_media && user.social_media.youtube && (
                <a href={user.social_media.youtube}>
                  {" "}
                  <MediaImage
                    link={SocialMediaIcon.youTube}
                    height={40}
                    width={40}
                  />
                </a>
              )}
              {user.social_media && user.social_media.facebook && (
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
        <div className="flex flex-row py-2 px-3 justify-between w-full">
          <p className={`${Font.heading3} ${Font.medium} ${Font.font} `}>
            Featured Links
          </p>
        </div>
        <div className="flex flex-wrap justify-between items-start p-0  w-full gap-4">
          {allLinks &&
            allLinks.map((item, i) => (
              <Links data={item} type="Link" val="link" i={i} />
            ))}
          {/* <Links type='Link' val='link' i={0} /> */}
          {/* <Links type='Link' val='link' i={1} />
          <Links type='Link' val='link' i={2} /> */}
        </div>
      </div>

      <div className="profile-link flex flex-col items-start p-0 gap-5 w-full mb-8">
        <div className="flex flex-row py-2 px-3 justify-between w-full">
          <p className={`${Font.heading3} ${Font.medium} ${Font.font} `}>
            Achievements
          </p>
        </div>
        <div className="flex flex-wrap justify-between items-start p-0  w-full gap-4">
          {allAchive &&
            allAchive.map((item, i) => (
              <Links data={item} type="Achievements" val="achie" i={i} />
            ))}
          {/* <Links type='Award' val='achie' i={0} />
          <Links type='Achievements' val='achie' i={1} />
          <Links type='Achievements' val='achie' i={2} /> */}
        </div>
      </div>
    </>
  );
}

export default ProfileOther;
