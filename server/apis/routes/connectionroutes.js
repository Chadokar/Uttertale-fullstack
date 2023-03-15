const express = require('express');
const router = express.Router();
const ConnectionController = require('../controllers/connection_controller.js');
const { validateToken } = require("../auth/JWT.js");
router.post('/addConnectionRequest', validateToken, ConnectionController.sendConnectionRequest);
router.post('/addConnection', validateToken, ConnectionController.addConnection);
router.post('/sendConnectionRequest', validateToken, ConnectionController.sendConnectionRequest);
router.post('/acceptConnectionRequest', validateToken, ConnectionController.acceptConnectionRequest);
router.post('/rejectConnectionRequest', validateToken, ConnectionController.rejectConnectionRequest);
router.get('/listactiveConnectionRequest', validateToken, ConnectionController.listactiveConnectionRequest);
router.get('/getConnectionlist', validateToken, ConnectionController.getConnectionlistbyId);

module.exports = router;