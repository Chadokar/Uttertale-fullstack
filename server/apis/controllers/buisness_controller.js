const Joi = require('joi');
const { BuisnessProfile, BuisnessProfileDetails } = require("../models/buisnessprofile.js");
const User = require("../models/user.js");
const { decodeToken } = require("../auth/JWT.js");



exports.registerBuisnessProfile = async(req, res) => {

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

    const {
        brandname,
        buisness_as,
        company_type,
        locations,
        hcity,
        hstate,
        hpincode,
        year_established,
        websitelink,
        smfacebook,
        sminstagram,
        smlinkedin,
        smtwitter,
        usp,
        bmodel,
        bsize,
        coi,
        gstin,
        pan,
        bdomain,
        motive,
        taudience,
        competitors,
        r_n_d,
        awards,
        recognition,
        collabration,
        print_media,
        online,
        revenue,
        growth,
        nooffundraised,
        valuation,
        marketshare,
        invname,
        invemail,
        invqual,
        invhobbies,
        invdesignation,
        invstake,
        sname,
        sdesc,
        slink,
        sspecs,
    } = req.body;

    let newBuisness = new BuisnessProfile({

        brandname: brandname,

    });

    try {

        const _buisness = await newBuisness.save();
        user.buisnessprofile = _buisness._id;
        await user.save();

        newBuisnessDetails = new BuisnessProfileDetails({
            buisness_as: buisness_as,
            company_type: company_type,
            locations: locations,
            headquarter: { city: hcity, pincode: hpincode, state: hstate },
            websitelink: websitelink,
            socialmedia: { facebook: smfacebook, twitter: smtwitter, instagram: sminstagram, linkedin: smlinkedin },
            usp: usp,
            bmodel: bmodel,
            coi: coi,
            gstin: gstin,
            pan: pan,
            bdomain: bdomain,
            motive: motive,
            taudience: taudience,
            competitors: competitors,
            r_n_d: r_n_d,
            awards: awards,
            recognition: recognition,
            collabration: collabration,
            print_media: print_media,
            online: online,
            revenue: revenue,
            growth: growth,
            fundraised: { amount: nooffundraised, valuation: valuation },
            marketshare: marketshare,
            investors: { name: invname, emailid: invemail, qualifications: invqual, hobbies: invhobbies, designation: invdesignation, stake: invstake },
            services: { name: sname, desciption: sdesc, link: slink, otherinfo: sspecs },


        });

        const _buisnessDetails = await newBuisnessDetails.save();

        _buisness.profiledetails = _buisnessDetails._id;
        await _buisness.save();

    } catch (e) {
        console.log(e.message);
        return res.status(500).send(e);
    }

    return res.status(200).json({
        message: 'Buisness Profile details saved successfully',
    });


};

exports.getBuisnessself = async(req, res) => {


    let userId;
    let user;
    console.log("entered getbuisnessself");
    try {
        userId = decodeToken(req, res);
        console.log(userId);
        user = await User.findById(userId);
    } catch (e) {

        return res.status(500).send({
            message: "User not found"
        });

    }

    let buisness;
    console.log(user);

    try {
        buisness = await BuisnessProfile.find({ _id: user.buisnessprofile }).populate('profiledetails');
        console.log(buisness);
    } catch (e) {
        console.error(e.body);
        return res.status(500).send({ message: 'Something went wrong while getting buisness profile' });
    }

    return res.status(200).send(buisness);

};