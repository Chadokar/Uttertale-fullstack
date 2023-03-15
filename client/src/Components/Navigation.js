import React from "react";
import Home from "./home/Home";
import Navbar from "./home/Navbar";
import { Outlet, Route, Routes } from "react-router-dom";
import About from "./about us/About";
import Contact from "./contact/Contact";
import Terms from "./bottom-contacts/Terms";
import Blogs from "./blogs/Blogs";
import Signup from "./signup/EsignUp/Signup";
import Companysign from "./signup/Company/Companysign";
import Signin from "./signin/Signin";
import Groupchat from "./Afterauth/groupchat/Groupchat";
import ProfileOther from "./Afterauth/profile/ProfileOther";
import Sidenavbar from "./Afterauth/Sidenavbar";
import ProfileSelf from "./Afterauth/profile/ProfileSelf";
import Analysis from "./Afterauth/profile/Analysis";
import Forgot from "./signin/ForgotPassword/Forgot";
import Profile from "./Afterauth/profile/Profile";
import Ppage2 from "./signin/ForgotPassword/Ppage2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

// import ChatState from '../Context/ChatProvider'
export const UserContext = React.createContext(null);

function Navigation() {
  const [selectedChat, setSelectedChat] = useState();
  const [allUsers, setAllUsers] = useState();
  const [passwordUrl, setPasswordUrl] = useState("/");
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  const [chats, setChats] = useState();
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("userToken"))
  );
  const [fetchAgain, setFetchAgain] = useState(false);
  const navigate = useNavigate();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get("/chat", config);
      setChats(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const userToken = JSON.parse(localStorage.getItem("userToken"));
    setUser(userInfo);
    setToken(userToken);
    if (!userInfo || !userToken) navigate("/sign-in");

    const selectedChatInfo = JSON.parse(
      localStorage.getItem("selectedChatInfo")
    );
    if (selectedChatInfo) setSelectedChat(selectedChatInfo);

    setFetchAgain(!fetchAgain);
    // fetchChats();
  }, [navigate]);

  return (
    <div className="uttertale items-center w-full flex flex-col">
      <UserContext.Provider
        value={{
          selectedChat,
          setSelectedChat,
          user,
          setUser,
          chats,
          setChats,
          token,
          setToken,
          fetchAgain,
          setFetchAgain,
          setPasswordUrl,
          passwordUrl,
        }}
      >
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/term-service" element={<Terms />} />
            <Route path="/blog" element={<Blogs />} />
          </Route>
          <Route path="/Sign-Up/Company-Business" element={<Companysign />} />
          <Route path="/Sign-Up/entrepreneur" element={<Signup />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/" element={<Sidenavbar />}>
            <Route path="chat-box" element={<Groupchat />} />
            <Route path="chat-box-member" element={<Groupchat />} />
            <Route path="Profile" element={<Profile />}>
              <Route path=":name" element={<ProfileOther />} />
              <Route path="Own" element={<ProfileSelf />} />
              <Route path="Competitor-Analysis" element={<Analysis />} />
            </Route>
          </Route>
          <Route path="/Forgot-Password" element={<Forgot />} />
          <Route path={`/resetPassword/${passwordUrl}`} element={<Ppage2 />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default Navigation;
