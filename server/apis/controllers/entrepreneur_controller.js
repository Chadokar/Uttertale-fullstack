const Joi = require('joi');
const User = require("../models/user.js");
const { decodeToken } = require("../auth/JWT.js");
const { EntrepreneurProfile, EntrepreneurDetails } = require('../models/entrepreneurprofile.js');

exports.registerEntrepreneur = async(req, res) => {

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

    if( user.entrepreneurprofile!=null )
    return res.status(400).send({
        message: "Entrepreneur profile already registered."
    });
    const { name, companyname, designation, website, companyemail, instagram, facebook, linkedin, twitter, interests, dob, location, nationality, about, cultureidentity, earlylife, sourceofinterest, passionateabout, highestleveleducation, institute, societyorg, extracurricular, profexpossure, profyouwant, currdesignation, otherjobtitles, pastcareer, whychoose, valuablelessons, keysuccess, educationalachievement, professionalachievement, motivation, emotion, vision } = req.body;

    let newEntrepreneur = new EntrepreneurProfile({

        name: name,
        companyname: companyname,
        companyemail: companyemail,
        designation: designation,

    });

    try {

        const _entrepreneur = await newEntrepreneur.save();
        user.entrepreneurprofile = _entrepreneur._id;
        await user.save();

        newEntrepreneurDetails = new EntrepreneurDetails({
            website: website,
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
            personalques: {
                cultureidentity: cultureidentity,
                earlylife: earlylife,
                sourceofinterest: sourceofinterest,
                passionateabout: passionateabout,

            },
            educationalques: {
                highestleveleducation: highestleveleducation,
                institute: institute,
                societyorg: societyorg,
                extracurricular: extracurricular,
                profexpossure: profexpossure,
                profyouwant: profyouwant,

            },

            workque: {
                currdesignation: currdesignation,
                otherjobtitles: otherjobtitles,
                pastcareer: pastcareer,
                whychoose: whychoose,
                valuablelessons: valuablelessons,
                keysuccess: keysuccess,

            },

            awards: {
                educationalachievement: educationalachievement,
                professionalachievement: professionalachievement
            },
            background: {
                motivation: motivation,
                emotion: emotion,
                vision: vision
            }

        });

        const _entrepreneurDetails = await newEntrepreneurDetails.save();

        _entrepreneur.profiledetails = _entrepreneurDetails._id;
        await _entrepreneur.save();

    } catch (e) {
        console.log(e.message);
        return res.status(500).send(e);
    }

    return res.status(200).json({
        message: 'Entrepreneur details saved successfully',
    });


};


exports.getEntrepreneurself = async(req, res) => {


    let userId;
    let user;
    console.log("entered getentrepreneurself");
    try {
        userId = decodeToken(req, res);
        console.log(userId);
        user = await User.findById(userId);
    } catch (e) {

        return res.status(500).send({
            message: "User not found"
        });

    }

    let entrepreneur;
    console.log(user);

    try {
        entrepreneur = await EntrepreneurProfile.find({ _id: user.entrepreneurprofile }).populate('profiledetails');
    } catch (e) {
        console.error(e.body);
        return res.status(500).send({ message: 'Something went wrong while getting =entrepreneur' });
    }

    return res.status(200).send(entrepreneur);

};