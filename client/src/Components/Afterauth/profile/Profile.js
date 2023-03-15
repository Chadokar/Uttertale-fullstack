import React from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import {
  Avtar,
  Font,
  OptionSearch,
  ThemeSearch,
} from "../../../styling/Styles";
import { Bell, BellActive, Search, TV } from "../../assets/Icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../Navigation";
import { useState, useContext, useEffect } from "react";
import { Dialog } from "@mui/material";
import NotificationPop from "./NotificationPop";
import ReactSelect from "react-select";
import { Popover } from "react-tiny-popover";

function Profile() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [notifPop, setNotifPop] = useState(false);
  const [allMembers, setAllMembers] = useState([]);

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

  useEffect(() => {
    var data = axios
      .get(`/allUsers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setAllMembers([...res.data]);
      });
  }, []);

  const Dropdown = (props) => {
    const [val, setVal] = useState("");
    return (
      <ReactSelect
        options={option}
        value={val}
        className="w-full search-drop"
        classNamePrefix="mySelect"
        theme={(theme) => ThemeSearch(theme)}
        styles={OptionSearch}
        placeholder="Search Influencers, Entrepreneurs & Start-ups..."
        onChange={(value) => {
          handleSearch(value);
          setVal(value);
        }}
        isDisabled={props.disable}
      />
    );
  };

  const allMembersName = [];

  for (let i = 0; i < allMembers.length; i++) {
    allMembersName.push({
      name: allMembers[i].firstname + " " + allMembers[i].lastname,
      id: allMembers[i]._id,
    });
  }

  const option = allMembersName.map((item, i) => {
    return {
      label: item.name,
      value: item.id,
      ...item,
    };
  });

  const handleSearch = async (member) => {
    // console.log(e.target.value)
    console.log(member);
    try {
      // <Link to={`/Profile/${member["name"]}`} state={member} />;
      navigate(`/Profile/${member["name"]}`);
      // navigate(`/Profile/${member['name']}`);
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  // const handleSearch = async(e)=>{
  //   // console.log(e.target.value)
  //   try {
  //     const config = {
  //       headers:{
  //         Authorization: `Bearer ${token}`,
  //       }
  //     }

  //     const { data }= await axios.get(`/allUsers?search=${e.target.value}`,config)
  //     // console.log(data)
  //     setSearchData(data)

  //   } catch (error) {
  //     setError("No search")
  //   }
  // }

  const [notifi, setNotifi] = useState(false);

  return (
    <>
      {/* <Dialog
        fullWidth={false}
        maxWidth="xl"
        open={notifPop}
        onClose={() => setNotifPop(false)}
      >
        <NotificationPop notifPop={notifPop} setNotifPop={setNotifPop} />
      </Dialog> */}
      <div className="profile px-10 w-full pt-4 ">
        <div className="profile-navbar mb-10">
          <label htmlFor="searching" className="memberSearch">
            {/* <input onChange={(e)=>handleSearch(e)} id='searching' type="text" placeholder='Search Influencers, Entrepreneurs & Start-ups...'  /> */}
            <Dropdown placeholder="Year" />
            <Search color={"#242424"} />
          </label>
          <div className="profile-right-nav">
            <button className={`button secondary large`}>
              <TV color="#242424" />
              <p className={`${Font.font} ${Font.body1} ${Font.medium}`}>
                Get Demo
              </p>
            </button>
            {/* Remove both bell icon by replacing globel true from globle boolean same as used in group chat to check and pass message data of perticualar candidate or group */}
            {/* I have used that globel variable to remove member list icon in chat box you may check there */}
            {notifi && true && (
              <button className="button secondary iconlarge">
                <Bell color="#242424" />
              </button>
            )}
            <Popover
              isOpen={notifPop}
              positions={["bottom", "left"]}
              content={
                <NotificationPop
                  setNotifPop={setNotifPop}
                  notifPop={notifPop}
                />
              }
            >
              {!notifi && true && (
                <button
                  className="button secondary iconlarge"
                  onClick={() => setNotifPop(!notifPop)}
                >
                  {/* when there is a notification */}
                  <Bell color="#242424" />
                </button>
              )}
            </Popover>
            <button className={`${Avtar.large} ${Avtar.avtar}`}>
              <p>AB</p>
            </button>
            {/* <button onClick={handleLogout} className={`${Avtar.large} ${Avtar.avtar}`} ><p>Logout</p></button> */}
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default Profile;
