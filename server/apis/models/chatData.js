const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
    groupName : String,
    conversation : [
        {
            message: String,
            timestamp: String,
            users:{
                displayName: String,
                email: String,
                photo: String,
                vid: String
            }
        }
    ]
})

module.exports = mongoose.model("Chats", groupSchema);