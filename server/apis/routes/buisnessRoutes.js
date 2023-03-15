const express = require('express');
const router = express.Router();
const BuisnessController = require('../controllers/buisness_controller.js');
const { validateToken } = require("../auth/JWT.js");

router.post('/registerBuisnessProfile', validateToken, BuisnessController.registerBuisnessProfile);
router.get('/getBuisnessself', validateToken, BuisnessController.getBuisnessself);


module.exports = router;