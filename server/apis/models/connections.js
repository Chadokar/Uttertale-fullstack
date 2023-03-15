const { boolean } = require('joi');
const mongoose = require('mongoose');



const ConnectionsSchema = new mongoose.Schema({

    connections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});

const ConnectionRequestSchema = new mongoose.Schema({

    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    isactive: { type: Boolean }
});

module.exports.Connection = mongoose.model("Connection", ConnectionsSchema);
module.exports.ConnectionRequest = mongoose.model("ConnectionRequest", ConnectionRequestSchema);