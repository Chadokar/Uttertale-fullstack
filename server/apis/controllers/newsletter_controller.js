const Joi = require('joi');
const { Newsletter } = require("../models/newsletter.js");
const User = require("../models/user.js");
const { decodeToken } = require("../auth/JWT.js");


exports.getNewsletter = async(req, res) => {


    let newsletters;

    try {
        newsletters = await Newsletter.find();
    } catch (e) {
        console.error(e.body);
        return res.status(500).send({ message: 'Something went wrong while getting newsletter' });
    }

    return res.status(200).send(newsletters);

};

exports.addNewsletter = async(req, res) => {


    let userId;
    let user;

    try {
        userId = decodeToken(req, res);
        console.log(userId);
        user = await User.findById(userId);
    } catch (e) {

        return res.status(500).send({
            message: "User not found"
        });

    }

    const { content } = req.body;

    let newNewsletter = new Newsletter({

        content: content,
        user: userId,

    });

    try {

        const _newsletter = await newNewsletter.save();

        await _newsletter.save();

    } catch (e) {
        console.log(e.message);
        return res.status(500).send(e);

    }

    return res.status(200).json({
        message: 'Newsletter details saved successfully',
    });


};


exports.getNewsletterbyId = async(req, res) => {



    const { userId } = req.body;


    let newsletters;

    try {
        newsletters = await Newsletter.find({ _id: userId });
    } catch (e) {
        console.error(e.body);
        return res.status(500).send({ message: 'Something went wrong while getting newsletter' });
    }

    return res.status(200).send(newsletters);

};