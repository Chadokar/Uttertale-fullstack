const express = require("express");
const {
  allMessages,
  sendMessage,
  likePost,
  starredM,
  starredAdd,
  starredRem,
} = require("../controllers/messageControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route('/starred').get(protect,starredM)
router.route('/starred/:messageId').get(protect,starredAdd)
router.route('/unstarred/:messageId').get(protect,starredRem)
router.route("/:chatId").get(protect,allMessages);
router.route("/").post(protect,sendMessage);
router.route("/like/:messageId").put(protect,likePost);


module.exports = router;
