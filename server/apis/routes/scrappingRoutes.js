const express = require('express');
const router = express.Router();
const ScrappingController = require('../controllers/scrapping_controller.js');
router.get('/scrap/', ScrappingController.scrapper);
module.exports = router;