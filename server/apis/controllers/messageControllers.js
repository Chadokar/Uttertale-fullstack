const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel.js");
const User = require("../models/user.js");
const Chat = require("../models/chatModel.js");

//@description     Get all Messages
//@route           GET /api/Message/:chatId
//@access          Protected
const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "firstname pic email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const starredM = asyncHandler(async (req, res) => {
  try {
    const messages = await User.findById(req.user.id)
      .populate("starred_chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const starredAdd = asyncHandler(async (req, res) => {
  const messageId = req.params.messageId
  try {
    const messages = await User.findById(req.user.id)
    // console.log(messages.starred_chat)
    if(messageId)
    {
      messages.starred_chat.push(messageId)
      messages.save()
    }
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const starredRem = asyncHandler(async (req, res) => {
  const messageId = req.params.messageId
  try {
    const messages = await User.findById(req.user.id)
    console.log(messages)
    if(messageId)
    {
      const index = messages.starred_chat.indexOf(messageId);
      if (index > -1) { // only splice array when item is found
        messages.starred_chat.splice(index, 1); // 2nd parameter means remove one item only
      }
      messages.save()
    }
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected
const sendMessage = asyncHandler(async (req, res) => {
  const { content,post, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.user._id,
    name:req.user.firstname,
    content: content,
    chat: chatId,
    post: post,
  };

  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender","name pic")
    message = await message.populate("chat")
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const likePost = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ _id: req.params.messageId })
    console.log(messages)
    res.send(messages)
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { allMessages, sendMessage , likePost,starredM,starredAdd,starredRem};
