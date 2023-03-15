const express = require('express');
const router = express.Router();
const InfluencerController = require('../controllers/influencer_controller.js');
const { validateToken } = require("../auth/JWT.js");




router.post('/registerInfluencer', validateToken, InfluencerController.registerInfluencer);
router.get('/getInfluencers', validateToken, InfluencerController.getInfluencers);
router.post('/getInfluencersbyId', validateToken, InfluencerController.getInfluencersbyId);
router.get('/getInfluencerself', validateToken, InfluencerController.getInfluencerself);

module.exports = router;