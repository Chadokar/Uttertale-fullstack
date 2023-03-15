import React from "react";
import { useState, useEffect, useContext } from "react";
import Tooltip from "react-power-tooltip";
import { Images } from "../assets/Assets";
import axios from "axios";
import { UserContext } from "../../Navigation";
import { Link } from "react-router-dom";
import ProfileOther from "../profile/ProfileOther";
import ScrollableFeed from "react-scrollable-feed";

function Group(props) {
  const [fetchAgainMessages, setFetchAgainMessages] = useState(false);
  // const [allMessages, setAllMessages] = useState(false);

  // console.log(props.star)
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

  let a = [];

  const onMouseOver = (i, a) => {
    if (!props.star && !props.searchPop) props.setShowTooltip(true);
    a[i] = true;
    if (!arr[i]) setArr([...a]);
    // console.log(i)
    console.log(arr[i]);
  };
  const onMouseLeave = (i, a) => {
    props.setShowTooltip(false);
    a[i] = false;
    if (arr[i]) setArr([...a]);
    // console.log(i)
    props.setPop(false);
  };

  const [arr, setArr] = useState([false, false, false]);

  const Popup = ({ i }) => {
    return (
      <>
        <Tooltip
          show={props.showTooltip && arr[i]}
          // animation="fade"
          position="top right"
          textBoxWidth="124px"
          padding=" 8px 8px"
          hoverBackground="#fff"
          background="#fff"
          moveUp="-70px"
          moveRight="-70px"
          // flat={true}
        >
          <img src={Images.heart} alt="" />
          <img src={Images.cul} alt="" />
          <div
            className="popupsbutoon"
            onClick={() => props.setPop(!props.pop)}
          >
            <PopupIN i={i} />
            <img src={Images.horizontal} alt="" />
          </div>
        </Tooltip>
      </>
    );
  };
  const PopupIN = ({ i }) => {
    return (
      <>
        <Tooltip
          show={props.pop && arr[i]}
          // animation="fade"
          position="bottom right"
          textBoxWidth="146px"
          padding=" 8px 8px"
          hoverBackground="#F5F5F5"
          background="#fff"
          // moveUp="-70px"
          moveRight="-94px"
          // flat={true}
        >
          <p>
            {" "}
            <span style={{ width: 10 }}></span> View Profile
          </p>
          <p>
            {" "}
            <span style={{ width: 10 }}></span> Message Privately
          </p>
          {/* in place of false write !(datamessage[i]['isStared']) when you change the APIs */}
          <p
            className={`${false && "star-text-dis"}`}
            onClick={() => starMessage(i)}
          >
            {" "}
            <span style={{ width: 10 }}></span> Star Message
          </p>
          {/* in place of false write (datamessage[i]['isStared']) when you change the APIs */}
          <p className={`${true && "star-text-dis"}`} onClick={() => unStar(i)}>
            {" "}
            <span style={{ width: 10 }}></span> Unstar Message
          </p>
        </Tooltip>
      </>
    );
  };

  const allMembers = selectedChat.users;
  let bussinessMembers = [];
  let entreMembers = [];
  let contentMembers = [];

  for (let i = 0; i < allMembers.length; i++) {
    if (allMembers[i].role === "Content Creator") {
      contentMembers.push({
        imglink: "",
        name: allMembers[i].firstname + " " + allMembers[i].lastname,
        data: allMembers[i],
      });
    } else if (allMembers[i].role === "Entrepreneur") {
      entreMembers.push({
        imglink: "",
        name: allMembers[i].firstname + " " + allMembers[i].lastname,
        data: allMembers[i],
      });
    } else {
      bussinessMembers.push({
        imglink: "",
        name: allMembers[i].firstname + " " + allMembers[i].lastname,
        data: allMembers[i],
      });
    }
  }

  let members = [];
  if (bussinessMembers.length > 0) {
    members.push({
      type: "Bussinesses",
      member: bussinessMembers,
    });
  }
  if (entreMembers.length > 0) {
    members.push({
      type: "Entrepreneurs",
      member: entreMembers,
    });
  }
  if (contentMembers.length > 0) {
    members.push({
      type: "ContentCreators",
      member: contentMembers,
    });
  }

  const starMessage = async (i) => {
    console.log(datamessage[i]);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `/message/starred/${datamessage[i].id}`,
        config
      );
    } catch (error) {
      console.log(error);
    }
  };

  let allMessages = props.allMessages;
  let allStarred = [];

  try {
    allStarred = props.starredMess.data.starred_chat;
  } catch (error) {
    console.log(error);
  }

  let datamessage = [];
  for (let i = 0; i < allMessages.length; i++) {
    let message = {
      name: allMessages[i].sender.firstname,
      date: allMessages[i].createdAt,
      time: allMessages[i].createdAt,
      text: allMessages[i].content,
      id: allMessages[i]._id,
      //create the datamessage in below dummy "datamessage" form
      // 'likes':500,
      // 'isStared':true,
      // 'check':false,
    };
    datamessage.push(message);
    a.push(false);
  }

  let staredChat = [];

  for (let i = 0; i < allStarred.length; i++) {
    let schat = {
      name: allStarred[i].name,
      date: allStarred[i].createdAt,
      time: allStarred[i].createdAt,
      text: allStarred[i].content,
      likes: 500,
      isStared: true,
      check: false,
      id: allStarred[i]._id,
    };
    staredChat.push(schat);
  }

  const unStar = async (input) => {
    console.log(staredChat[input]);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `/message/unstarred/${staredChat[input].id}`,
        config
      );
      // console.log(data)
      // props.setStar(!props.star)
    } catch (error) {
      console.log(error);
    }
    // props.setStar(true);
  };

  return (
    <>
      {props.star && (
        <div className="stared-chat " style={{ minWidth: "40%" }}>
          <div className="s-c-heading">
            <h2>Starred Messages</h2>
          </div>
          <div className="group-chat-box">
            {staredChat.length > 0
              ? staredChat.map((input, i) => (
                  <div key={i} className={`posted-chat }`}>
                    <img src={Images.profileImage} alt="" />
                    <div className="chat-text">
                      <div className="persional-info">
                        <h3>{input.name}</h3>
                        <p>
                          <span>12/11/2017</span>
                          <span>09:01 PM</span>{" "}
                        </p>
                      </div>
                      <div className="g-c-text">
                        <p>{input.text}</p>
                        {input.check && (
                          <p className="mt-5">
                            <a href="">https://forms.gle/AR3xiKDidVCVh2X77</a>
                          </p>
                        )}
                      </div>
                      {input.check && (
                        <button className="link-image">
                          <div className="link-image-text">
                            <p>Google Docs</p>
                            <h1>User Research Survey</h1>
                          </div>
                          <img src={Images.imglink} alt="" />
                        </button>
                      )}
                      <div className="like-star">
                        {input.likes > 0 && (
                          <button className="like-star-box">
                            <p>{input.likes}</p>
                            <img src={Images.redheart} alt="" />
                          </button>
                        )}
                        {input.isStared && (
                          <button
                            onClick={() => unStar(i)}
                            className="like-star-box"
                          >
                            <img src={Images.stared} alt="" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              : "No messages starred"}
          </div>
        </div>
      )}
      <div className="group-chat-box">
        {/* {(pop)&&<div className="hoverpop">
            
        </div> } */}
        {props.memb && (
          <div className="group-member">
            {/* <button onClick={() => props.setMembe(false)}>
              <img src={Images.cross} alt="" />
            </button> */}
            {members.map((input, i) => (
              <div key={i} className="g-m-box">
                <h3>{input.type}</h3>
                {input["member"].map((member, i) => (
                  <Link to={`/Profile/${member.name}`} state={member}>
                    {" "}
                    <div key={i} className="g-m-indiv">
                      <img src={Images.profileImage} alt="" />
                      <p>{member.name}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        )}

        <>
          {datamessage.map((input, i) => (
            <div
              key={i}
              className={`posted-chat ${
                props.showTooltip && arr[i] && "myactive"
              }`}
            >
              <img src={Images.profileImage} alt="" />
              <div
                onMouseOver={() => onMouseOver(i, a)}
                onMouseLeave={() => onMouseLeave(i, a)}
                className="chat-text"
              >
                <Popup i={i} />
                <div className="persional-info">
                  <h3>{input.name}</h3>
                  <p>
                    <span>{input.date}</span>
                    <span>09:5 PM</span>{" "}
                  </p>
                </div>
                <div className="g-c-text">
                  <p>{input.text}</p>
                </div>
                {input.check && (
                  <button className="link-image">
                    <div className="link-image-text">
                      <p>{input["image"].type}</p>
                      <h1>{input["image"].heading}</h1>
                    </div>
                    <img src={Images.imglink} alt="" />
                  </button>
                )}
                {/* below commented code is for star and likes uncomment and use it when you chenge the APIs*/}
                {/* <div className="like-star">
                    {(input.likes > 0) &&<button className="like-star-box">
                        <p>{input.likes}</p>
                        <img src={Images.redheart} alt="" />
                    </button>}
                    {(input.isStared)&& <button onClick={()=>unStar(i)} className="like-star-box">
                        <img src={Images.stared} alt="" />
                    </button>}
                </div> */}
              </div>
            </div>
          ))}
        </>
      </div>
    </>
  );
}

// const members = [
// {
//     'type':'Bussinesses',
//     'member':[
//         {'imglink':'','name':'Kathryn Murphy'},
//         {'imglink':'','name':'Darrell Steward'},
//         {'imglink':'','name':'Theresa Webb'},
//         {'imglink':'','name':'Cameron Williamson'},
//     ]
// },
//     {
//         'type':'Entrepreneurs',
//         'member':[
//             {'imglink':'','name':'Arlene McCoy'},
//             {'imglink':'','name':'Marvin McKinney'},
//             {'imglink':'','name':'Jacob Jones'},
//             {'imglink':'','name':'Cameron Williamson'},
//         ]
//     },
//     {
//         'type':'ContentCreators',
//         'member':[
//             {'imglink':'','name':'Arlene McCoy'},
//             {'imglink':'','name':'Marvin McKinney'},
//             {'imglink':'','name':'Jacob Jones'},
//             {'imglink':'','name':'Cameron Williamson'},
//         ]
//     },
// ]

// const staredChat = [
//     {
//         'name':'Pooja Niwasan',
//         'date':'12/11/2017',
//         'time':'09:01 PM',
//         'text':"I have started front end part yesterday. And today  I will continue that as Nitin complete that ui part.",
//         'likes':409,
//         'isStared':true,
//         'check':false,
//     },
//     {
//         'name':'Robert Fox',
//         'date':'12/11/2017',
//         'time':'09:01 PM',
//         'text':"I have started front end part yesterday. And today  I will continue that as Nitin complete that ui part.",
//         'likes':33,
//         'isStared':true,
//         'check':false,
//     },
//     {
//         'name':'Darrell Steward',
//         'date':'12/11/2017',
//         'time':'09:01 PM',
//         'text':"I have started front end part yesterday. And today I will continue that as Nitin complete that ui part.",
//         'likes':0,
//         'isStared':true,
//         'check':false,
//     },
//     {
//         'name':'Eleanor Pena',
//         'date':'12/11/2017',
//         'time':'09:01 PM',
//         'text':"I have started front end part yesterday. And today  I will continue that as Nitin complete that ui part.",
//         'likes':99,
//         'isStared':true,
//         'check':false,
//     },
// ]

// const datamessage = [
//     {
//         'name':'Nitin.S',
//         'date':'12/11/2017',
//         'time':'09:01 PM',
//         'text':"Hey everyone. I'm working on a productivity app. And need to know more about usage habits of a user. Please fill the survey. It will only take 5 minutes of your time. Thank you",
//         'link':'https://forms.gle/AR3xiKDidVCVh2X77',
//         'image':{
//             'type':'Google Docs',
//             'heading':'User Research Survey',
//             'imglink':Images.imglink
//         },
//         'likes':78,
//         'isStared':true,
//         'check':true,
//     },
//     {
//         'name':'Pooja Niwasan',
//         'date':'12/11/2017',
//         'time':'09:01 PM',
//         'text':'I have started front end part yesterday. And today  I will continue that as Nitin complete that ui part.',
//         'likes':78,
//         'isStared':true,
//         'check':false,
//     },
//     {
//         'name':'Shubham.C',
//         'date':'12/11/2017',
//         'time':'09:01 PM',
//         'text':"Hey everyone. I'm working on a productivity app. And need to know more about usage habits of a user. Please fill the survey. It will only take 5 minutes of your time. Thank you",
//         'likes':78,
//         'isStared':true,
//         'check':false,
//     }
// ]

export default Group;
