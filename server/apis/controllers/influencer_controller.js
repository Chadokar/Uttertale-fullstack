const Joi = require('joi');
const { Influencer, InfluencerDetails } = require("../models/influencerprofile.js");
const User = require("../models/user.js");
const { decodeToken } = require("../auth/JWT.js");


exports.getInfluencers = async(req, res) => {


    let influencers;

    try {
        influencers = await Influencer.find().populate('profiledetails');
    } catch (e) {
        console.error(e.body);
        return res.status(500).send({ message: 'Something went wrong while getting influencers' });
    }

    return res.status(200).send(influencers);

};

exports.getInfluencersbyId = async(req, res) => {

    console.error("entered getinfluencer by iD");
    const { id } = req.body;
    let influencers;

    try {
        influencers = await Influencer.find({ _id: id }).populate('profiledetails');
    } catch (e) {
        console.error(e.body);
        return res.status(500).send({ message: 'Something went wrong while getting influencer' });
    }

    return res.status(200).send(influencers);

};

exports.registerInfluencer = async(req, res) => {


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


    if( user.influencer!=null )
    return res.status(400).send({
        message: "Content creator profile already registered."
    });

    console.log(req.body);
    const { name, companyname, designation, companywebsite, companyemail, instagram, facebook, linkedin, twitter, interests, dob, location, nationality, about, passionateabout, educationalbackground, workexperience, awards } = req.body;

    let newInfluencer = new Influencer({

        name: name,
        companyname: companyname,
        designation: designation,

    });

    try {

        const _influencer = await newInfluencer.save();

        user.influencer = _influencer._id;
        await user.save();

        newInfluencerDetails = new InfluencerDetails({
            companywebsite: companywebsite,
            companyemail: companyemail,
            socialmedia: {
                instagram: instagram,
                facebook: facebook,
                linkedin: linkedin,
                twitter: twitter
            },
            interests: interests,
            dob: dob,
            location: location,
            nationality: nationality,
            about: about,
            passionateabout: passionateabout,
            educationalbackground: educationalbackground,
            workexperience: workexperience,
            awards: awards,
        });

        const _influencerDetails = await newInfluencerDetails.save();

        _influencer.profiledetails = _influencerDetails._id;
        await _influencer.save();

    } catch (e) {
        console.log(e.message);
        return res.status(500).send(e);

    }

    return res.status(200).json({
        message: 'Influencer details saved successfully',
    });


};

exports.getInfluencerself = async(req, res) => {


    let userId;
    let user;
    console.log("entered getinfluencerself");
    try {
        userId = decodeToken(req, res);
        console.log(userId);
        user = await User.findById(userId);
    } catch (e) {

        return res.status(500).send({
            message: "User not found"
        });

    }

    let influencers;
    console.log(user);

    try {
        influencers = await Influencer.find({ _id: user.influencer }).populate('profiledetails');
    } catch (e) {
        console.error(e.body);
        return res.status(500).send({ message: 'Something went wrong while getting influencer' });
    }

    return res.status(200).send(influencers);

};