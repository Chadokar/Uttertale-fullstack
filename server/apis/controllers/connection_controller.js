const Joi = require('joi');
const User = require("../models/user.js");
const { decodeToken } = require("../auth/JWT.js");
const { ConnectionRequest, Connection } = require('../models/connections.js');
const { Influencer } = require("../models/influencerprofile.js");
const { EntrepreneurProfile } = require("../models/entrepreneurprofile.js");
const { BuisnessProfile } = require("../models/entrepreneurprofile.js");





exports.getConnectionlistbyId = async(req, res) => {



    // const { userId } = req.body;

    let userId;
    let user;
    console.log("entered getconnectionself");
    try {
        userId = decodeToken(req, res);
        console.log(userId);
        user = await User.findById(userId);
    } catch (e) {

        return res.status(500).send({
            message: "User not found"
        });

    }

    let _connection;
    let userlistbp;
    let userlistcc;
    let userlistep;

    try {
        _connection = await Connection.find({ user: userId });
        if(_connection.length!=0)
        {
        userlistcc = await User.find({'_id':{'$in': _connection[0].connections}, 'role': "Content Creator"}).populate("influencer");
        userlistep = await User.find({'_id':{'$in': _connection[0].connections},'role': "Entrepreneur"}).populate("entrepreneurprofile");
        userlistbp = await User.find({'_id':{'$in': _connection[0].connections},'role': "Buisness"}).populate("buisnessprofile");

            }
        else{

            return res.status(400).send({ message: 'No connections found' });

        }
    } catch (e) {
        console.error(e.message);
        return res.status(500).send({ message: 'Something went wrong while getting connections' });
    }

    return res.status(200).send({contentcreator:userlistcc,buisness:userlistbp,entrepreneur:userlistep});

};

exports.addConnection = async(req, res) => {


    let userId;
    let user;
    let friend;

    try {
        userId = decodeToken(req, res);
        console.log(userId);
        user = await User.findById(userId);
    } catch (e) {

        return res.status(500).send({
            message: "User not found"
        });

    }

    console.log("user found" ,userId);

    const { friendid } = req.body;

    try {
        friend = await User.findById(friendid);
    } catch (e) {

        return res.status(500).send({
            message: "User not found"
        });

    }

    console.log("friend found" ,friend._id);


    let _tempconnection;
    let _connectionlist;
    let newConnections;
    let _tempconnectionfriend;
    let _connectionlistfriend;
    let newfriendConnections;
    let _connectionsfriend ;
    let _connections;

    function checkconnectionexist(userid, connectionlist){
        console.log("connection check fuction");

        let i=0;
        for(i=0; i<connectionlist.length; i++)
        {
           
            if(userid == connectionlist[i])
            {
                return true;
            }

        }
        return false;

        // connectionlist.forEach((id)=>{
        //     if(userid === id)
        //     {
        //         return true;
        //     }
    
        // });
        // return false;
    
    }


    if (user.connectionlist != null)

    {
        console.log("entered user connection list not null");

        try {
            _tempconnection = await Connection.find({ user: userId });
            console.log("connection found",_tempconnection);
           
           if(checkconnectionexist(friendid,_tempconnection[0].connections))
           {
            console.log("connection already exist");
            return res.status(500).send({
                message: "Already a connection"
            });

           }

            else {
                console.log("connection not already exist");
            _tempconnection[0].connections.push(friendid);
            await _tempconnection[0].save();
        }

        } catch (e) {
            return res.status(500).send({
                message: "Error adding connection"
            });
        }

    } else {
        console.log("connection list null");

        
        try {
            _connectionlist = [];
            _connectionlist.push(friendid);
            newConnections = new Connection({
                connections: _connectionlist,
                user: user._id,

            });


            _connections = await newConnections.save();

            user.connectionlist = _connections._id;
            await user.save();

        } catch (e) {
            console.log(e.message);
            return res.status(500).send(e);

        }

    }



    if (friend.connectionlist != null)

    {
        console.log("entered friend connection list not null");

        try {
            _tempconnectionfriend = await Connection.find({ user: friendid })
            if(checkconnectionexist(userId,_tempconnectionfriend[0].connections))
            {
                console.log("friend connection already exist");
             return res.status(500).send({
                 message: "Already a connection"
             });
            }
            else{
                console.log("friend connection not already exist");
                _tempconnectionfriend[0].connections.push(userId);
                await _tempconnectionfriend[0].save();

            }
           

        } catch (e) {
            return res.status(500).send({
                message: "Error adding connection"
            });
        }

    } else {

        console.log("connection list friend null");
        try {

            _connectionlistfriend = [];
            _connectionlistfriend.push(userId);
           newfriendConnections = new Connection({
                connections: _connectionlistfriend,
                user: friend._id,

            });


            _connectionsfriend = await newfriendConnections.save();

            friend.connectionlist = _connectionsfriend._id;
            await friend.save();

        } catch (e) {
            console.log(e.message);
            return res.status(500).send(e);

        }

        console.log("add connection completed");
       



    }
    return res.status(200).json({
        message: 'Connection saved successfully',
    });


   



    


};


exports.sendConnectionRequest = async(req, res) => {


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

    const { friendid } = req.body;

    let connectionrequest;




    let newConnectionRequest = new ConnectionRequest({

        sender: userId,
        receiver: friendid,
        isactive: true,


    });

    try {

        const _request = await newConnectionRequest.save();

    } catch (e) {
        console.log(e.message);
        return res.status(500).send(e);

    }

    return res.status(200).json({
        message: 'Connection Request send successfully',
    });


};

exports.acceptConnectionRequest = async(req, res) => {


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

    const { connectionid } = req.body;

    let connectionrequest;

    try {
        connectionrequest = await ConnectionRequest.findById(connectionid);
        connectionrequest.isactive = false;
        await connectionrequest.save();
    } catch (e) {
        console.log(e.message);
        return res.status(500).send({
            message: "Connection Request failed"
        });
    }

    let friend;
    let friendid;

    try {
        friend = await User.findById(connectionrequest.sender);
        friendid = friend._id;
    } catch (e) {

        return res.status(500).send({
            message: "User not found"
        });

    }


    let _tempconnection;
    let _connectionlist;
    let newConnections;
    let _tempconnectionfriend;
    let _connectionlistfriend;
    let newfriendConnections;
    let _connectionsfriend ;
    let _connections;

    function checkconnectionexist(userid, connectionlist){
        console.log("connection check fuction");

        let i=0;
        for(i=0; i<connectionlist.length; i++)
        {
            if(userid == connectionlist[i])
            {
                return true;
            }

        }
        return false;

        // connectionlist.forEach((id)=>{
        //     if(userid === id)
        //     {
        //         return true;
        //     }
    
        // });
        // return false;
    
    }


    if (user.connectionlist != null)

    {
        console.log("entered user connection list not null");

        try {
            _tempconnection = await Connection.find({ user: userId });
            console.log("connection found",_tempconnection);
           
           if(checkconnectionexist(friendid,_tempconnection[0].connections))
           {
            console.log("connection already exist");
            return res.status(500).send({
                message: "Already a connection"
            });

           }

            else {
                console.log("connection not already exist");
            _tempconnection[0].connections.push(friendid);
            await _tempconnection[0].save();
        }

        } catch (e) {
            return res.status(500).send({
                message: "Error adding connection"
            });
        }

    } else {
        console.log("connection list null");

        
        try {
            _connectionlist = [];
            _connectionlist.push(friendid);
            newConnections = new Connection({
                connections: _connectionlist,
                user: user._id,

            });


            _connections = await newConnections.save();

            user.connectionlist = _connections._id;
            await user.save();

        } catch (e) {
            console.log(e.message);
            return res.status(500).send(e);

        }

    }



    if (friend.connectionlist != null)

    {
        console.log("entered friend connection list not null");

        try {
            _tempconnectionfriend = await Connection.find({ user: friendid })
            if(checkconnectionexist(userId,_tempconnectionfriend[0].connections))
            {
                console.log("friend connection already exist");
             return res.status(500).send({
                 message: "Already a connection"
             });
            }
            else{
                console.log("friend connection not already exist");
                _tempconnectionfriend[0].connections.push(userId);
                await _tempconnectionfriend[0].save();

            }
           

        } catch (e) {
            return res.status(500).send({
                message: "Error adding connection"
            });
        }

    } else {

        console.log("connection list friend null");
        try {

            _connectionlistfriend = [];
            _connectionlistfriend.push(userId);
           newfriendConnections = new Connection({
                connections: _connectionlistfriend,
                user: friend._id,

            });


            _connectionsfriend = await newfriendConnections.save();

            friend.connectionlist = _connectionsfriend._id;
            await friend.save();

        } catch (e) {
            console.log(e.message);
            return res.status(500).send(e);

        }

        console.log("add connection completed");
       



    }
    return res.status(200).json({
        message: 'Connection saved successfully',
    });


   



    






};


exports.rejectConnectionRequest = async(req, res) => {


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

    const { connectionid } = req.body;

    try {
        let connectionrequest = await ConnectionRequest.findById(connectionid);
        connectionrequest.isactive = false;
        await connectionrequest.save();
    } catch (e) {
        return res.status(500).send({
            message: "Connection Request failed"
        });
    }


    return res.status(200).json({
        message: 'Connection rejected successfully',
    });



};



exports.listactiveConnectionRequest = async(req, res) => {


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

    let connectionrequests;

    try {
        connectionrequests = await ConnectionRequest.find({ receiver: userId, isactive: true });
    } catch (e) {
        return res.status(500).send({
            message: "Connection Request failed"
        });
    }


    return res.status(200).json(connectionrequests);



};