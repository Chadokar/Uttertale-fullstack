import React, { useState, useContext, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Font } from "../../styling/Styles";
import { Images, ImgHome } from "./assets/Assets";
import "./sidenavbar.css";
import { UserContext } from "../Navigation";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  BarChart2,
  ChevronDown,
  ChevronUP,
  Home,
  Link,
  Users,
} from "../assets/Icons";

function Sidenavbar() {
  const [loggedUser, setLoggedUser] = useState();

  const {
    selectedChat,
    setSelectedChat,
    user,
    chats,
    setChats,
    token,
    fetchAgain,
    setFetchAgain,
  } = useContext(UserContext);

  const navigate = useNavigate();
  const url = window.location.href;
  const [showgroups, setShowgroups] = useState(false);
  const [showcon, setShowcon] = useState(false);

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get("/chat", config);
      setChats(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchChats();
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
  }, []);

  useEffect(() => {
    fetchChats();
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
  }, [fetchAgain]);
  const color = "#616161";
  const activeColor = "#FF3520";

  const [hac, setHac] = useState(true);
  const [Aac, setAac] = useState(false);

  return (
    <div className="groupchat flex flex-row w-full">
      <div className="group-chat-side h-screen">
        <div className="py-4 px-6">
          <a href="/">
            <img src={Images.logo} alt="" />
          </a>
        </div>
        <div className="sidebar-nav ">
          <NavLink
            to="/Profile/own"
            className={`sidebar-nav-item `}
            onClick={() => {
              setHac(true);
              setAac(false);
            }}
          >
            <Home color={hac ? activeColor : color} />
            <p style={{ color: hac ? activeColor : color }}>Home</p>
          </NavLink>
          <NavLink
            to="/Profile/Competitor-Analysis"
            className={`sidebar-nav-item `}
            onClick={() => {
              setAac(true);
              setHac(false);
            }}
          >
            <BarChart2 color={Aac ? activeColor : color} />
            <p>Competitor Analysis</p>
          </NavLink>
        </div>
        <div className="my-network ">
          <h4 className={`${Font.label} ${Font.medium} ${Font.font} py-2 px-4`}>
            My Networks
          </h4>
          <div className="sidebar-groups">
            <div
              className="sidebar-nav-item"
              onClick={() => setShowgroups(!showgroups)}
            >
              {/* <img src={Images.down} alt="" /> */}
              <Users color="#616161" />
              <div className="flex justify-between w-full">
                <p className={` ${Font.body2} ${Font.medium} ${Font.font} `}>
                  Groups
                </p>
                {/* <img src={Images.down} alt="" /> */}
                {showgroups && <ChevronUP color="#616161" />}
                {!showgroups && <ChevronDown color="#616161" />}
              </div>
            </div>
            {showgroups && (
              <div className="sidebar-group-point">
                {chats &&
                  chats.map((chat) => (
                    <NavLink
                      to="/chat-box"
                      className={`${chat.isGroupChat && "myactive"}`}
                      onClick={() => {
                        setAac(false);
                        setHac(false);
                      }}
                    >
                      {" "}
                      <div>
                        {chat.isGroupChat && (
                          <p
                            onClick={() => {
                              setSelectedChat(chat);
                              localStorage.setItem(
                                "selectedChatInfo",
                                JSON.stringify(chat)
                              );
                            }}
                            className={` ${Font.body2} ${Font.medium} ${Font.font} `}
                            key={chat._id}
                          >
                            {" "}
                            {chat.chatName}{" "}
                          </p>
                        )}
                      </div>
                    </NavLink>
                  ))}
                {/* <p className={` ${Font.body2} ${Font.medium} ${Font.font} `} >Crypto</p> */}
              </div>
            )}
          </div>
          <div className="sidebar-groups">
            <div
              className="sidebar-nav-item"
              onClick={() => setShowcon(!showcon)}
            >
              {/* <img src={Images.down} alt="" /> */}
              <Link color="#616161" />
              <div className="flex justify-between w-full">
                <p
                  className={` ${Font.body2} ${Font.medium} ${Font.font} `}
                  style={{ color: "#616161" }}
                >
                  Connections
                </p>
                {/* <img src={Images.down} alt="" /> */}
                {showcon && <ChevronUP color="#616161" />}
                {!showcon && <ChevronDown color="#616161" />}
              </div>
            </div>
            {showcon && (
              <div className="sidebar-group-point">
                {chats &&
                  chats.map((chat) => (
                    <NavLink
                      to="/chat-box-member"
                      className={`${!chat.isGroupChat && "myactive"}`}
                      onClick={() => {
                        setAac(false);
                        setHac(false);
                      }}
                    >
                      {" "}
                      <div>
                        {!chat.isGroupChat && (
                          <p
                            onClick={() => {
                              setSelectedChat(chat);
                              localStorage.setItem(
                                "selectedChatInfo",
                                JSON.stringify(chat)
                              );
                            }}
                            className={` ${Font.body2} ${Font.medium} ${Font.font} `}
                            key={chat._id}
                          >
                            {" "}
                            {chat.users[1].firstname}{" "}
                          </p>
                        )}
                      </div>
                    </NavLink>
                  ))}
                {/* <p className={` ${Font.body2} ${Font.medium} ${Font.font} `} >Shubham</p>
                    <p className={` ${Font.body2} ${Font.medium} ${Font.font} `} >Nitin</p> */}
              </div>
            )}
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Sidenavbar;
