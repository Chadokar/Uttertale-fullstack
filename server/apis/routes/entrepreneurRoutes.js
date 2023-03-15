const express = require('express');
const router = express.Router();
const EntrepreneurController = require('../controllers/entrepreneur_controller.js');
const { validateToken } = require("../auth/JWT.js");

router.post('/registerEntrepreneur', validateToken, EntrepreneurController.registerEntrepreneur);
router.get('/getEntrepreneurself', validateToken, EntrepreneurController.getEntrepreneurself);


module.exports = router;