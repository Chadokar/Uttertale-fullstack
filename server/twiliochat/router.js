const Router = require('express').Router;

const { registerBind, sendNotification } = require('./notification_handler');
const tokenGenerator = require('./token_generator');
const config = require('./config');

const router = new Router();

// Convert keys to camelCase to conform with the twilio-node api definition contract
const camelCase = require('camelcase');

function camelCaseKeys(hashmap) {
    var newhashmap = {};
    Object.keys(hashmap).forEach(function(key) {
        var newkey = camelCase(key);
        newhashmap[newkey] = hashmap[key];
    });
    return newhashmap;
};

router.get('/token/:id?', (req, res) => {
    const id = req.params.id;
    res.send(tokenGenerator(id));
});

router.post('/token', (req, res) => {
    const id = req.body.id;
    res.send(tokenGenerator(id));
});

router.post('/register', (req, res) => {
    var content = camelCaseKeys(req.body);
    registerBind(content).then((data) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.status(data.status);
        res.send(data.data);
    });
});

router.post('/send-notification', (req, res) => {
    var content = camelCaseKeys(req.body);
    sendNotification(content).then((data) => {
        res.status(data.status);
        res.send(data.data);
    });
});

router.get('/config', (req, res) => {
    res.json(config);
});

module.exports = router;