import React, { useState, useEffect, useContext } from "react";
import { BottomCenter, BottomLeft } from "../../assets/Popup";
import { Images } from "../assets/Assets";
import Group from "./Group";
import "./groupchat.css";
import axios from "axios";
import { UserContext } from "../../Navigation";
import { Link, useNavigate } from "react-router-dom";
import Search from "./Search";
import { MinusCircle } from "../../assets/Icons";

function Groupchat() {
  const [memb, setMembe] = useState(true);
  const [star, setStar] = useState(false);
  const [starf, setStarf] = useState(false);
  const [showStarpop, setShowStarpop] = useState(false);
  const [showMemberpop, setShowMemberpop] = useState(false);
  const [newmessage, setNewMessage] = useState();
  const [messages, setMessages] = useState([]);
  const [onRefresh, setOnRefresh] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [pop, setPop] = useState(false);

  const [file, setFile] = useState([]);
  const [n, setN] = useState(0);
  const [fileName, setFileName] = useState(null);

  const navigate = useNavigate();

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
  if (!selectedChat) navigate("/Profile/own");

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

  const [starred, setStarred] = useState([]);

  const fetchStarredMessages = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const data = await axios.get(`/message/starred`, config);
      //   setAllMessages(data);
      setStarred(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("refresh hya");
    // fetchStarredMessages()
    // const selectedChatInfo = JSON.parse(localStorage.getItem("selectedChatInfo"));
    // if(selectedChatInfo)
    //   setSelectedChat(selectedChatInfo)

    // console.log(selectedChatInfo)
  }, [onRefresh]);

  useEffect(() => {
    // console.log("useeffect run hua")
    // if(!selectedChat)
    //   console.log("no selectedchat state")

    // setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    fetchMessages();
    fetchStarredMessages();
    // console.log(fetchAgain," changed ")
    // eslint-disable-next-line
  }, [selectedChat, fetchAgain, star]);

  function clickHandler(e) {
    setNewMessage(e.target.value);
  }

  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(`/message/${selectedChat._id}`, config);
      setMessages(data);
      setFetchAgain(false);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async (event) => {
    let itfin;
    if (newmessage) {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/message",
          {
            content: newmessage,
            chatId: selectedChat._id,
          },
          config
        );

        setMessages([...messages, data]);
        setFetchAgain(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const [searchPop, setSearchPop] = useState(false);

  const handlePops = (prop) => {
    if (prop === "star") {
      setStar(!star);
      setPop(false);
      setShowTooltip(false);
      setMembe(!memb);
      setSearchPop(false);
    }
    // else if(prop === 'memb'){
    //   setStar(false);
    //   setPop(false);
    //   setShowTooltip(false);
    //   setMembe(!memb);
    //   setSearchPop(false);
    // }
    else if (prop === "search") {
      setStar(false);
      setPop(false);
      setShowTooltip(false);
      setMembe(false);
      setSearchPop(!searchPop);
    }
  };

  const removeHandler = (val) => {
    let remainingFile = file.filter((e) => e !== val);
    setFile([...remainingFile]);
    setFileName(null);
    setN(n - 1);
  };
  const changeUploadhandler = (evnt) => {
    if (evnt.target.files.length >= 0) {
      setN(n + 1);
      const selectedFIles = [];
      const targetFiles = evnt.target.files;
      const targetFilesObject = [...targetFiles];
      targetFilesObject.map((file) => {
        return selectedFIles.push(URL.createObjectURL(file));
      });
      setFile([...file, selectedFIles]);
      setFileName(evnt.target.files[0].name);
    }
  };

  return (
    <>
      <div className="group-chat-container">
        <div className="group-chat-header">
          <div className="g-c-h-container">
            <div className="g-c-h-left">
              <img src={Images.profile} alt="" />
              <h2>
                {selectedChat.isGroupChat
                  ? selectedChat.chatName
                  : selectedChat.users[1].firstname}
              </h2>
            </div>
            <div className="g-c-h-right">
              {/* <Search searchPop={searchPop} setSearchPop={setSearchPop} /> */}

              <button
                onMouseOver={() => setShowStarpop(true)}
                onMouseLeave={() => setShowStarpop(false)}
                style={{ position: "relative", width: "fit-content" }}
                className="popup bottom h-center"
                onClick={() => handlePops("star")}
                type="submit"
              >
                {!star && <img src={Images.star} alt="" />}
                {star && <img src={Images.activestar} alt="" />}
                <BottomCenter show={showStarpop} text={"Starred Messages"} />
              </button>

              {/* {selectedChat.isGroupChat && (
                <button
                  onMouseOver={() => setShowMemberpop(true)}
                  onMouseLeave={() => setShowMemberpop(false)}
                  style={{ position: "relative", width: "fit-content" }}
                  className="popup bottom "
                  onClick={() => handlePops("memb")}
                >
                  {!memb && <img src={Images.doubleman} alt="" />}
                  {memb && <img src={Images.Doublemanb} alt="" />}
                  <BottomLeft show={showMemberpop} text={"Group Members"} />
                </button>
              )} */}
            </div>
          </div>
        </div>
        <div className="group-chat-box-container w-full">
          <Group
            searchPop={searchPop}
            handlePops={handlePops}
            pop={pop}
            setPop={setPop}
            showTooltip={showTooltip}
            setShowTooltip={setShowTooltip}
            memb={memb}
            allMessages={messages}
            starredMess={starred}
            setMembe={setMembe}
            star={star}
            starf={starf}
            setStar={setStar}
          />
        </div>

        <div className={`announc-container ${true && "myactive"}`}>
          <label className="chat-post w-11/12" htmlFor="makepost">
            {n <= 0 && (
              <label
                className="uploadmore flex flex-row gap-3 py-3"
                htmlFor="cupload"
              >
                <input
                  style={{ display: "none" }}
                  id="cupload"
                  type="file"
                  onChange={changeUploadhandler}
                />
                <img src={Images.pluscircle} alt="" />
              </label>
            )}
            {n > 0 && (
              <div onClick={() => removeHandler(file[0])}>
                <MinusCircle />
              </div>
            )}
            <input
              id="makepost"
              type="text"
              value={newmessage}
              onChange={clickHandler}
              placeholder={`${n <= 0 ? "Create Announcment" : fileName}`}
            />
          </label>
          <button className="postbutton" onClick={sendMessage}>
            <img src={Images.arrUpRight} alt="" />
          </button>
        </div>
      </div>
    </>
  );
}

export default Groupchat;
