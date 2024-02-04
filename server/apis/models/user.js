const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {
  createemail_verificationTokens,
  passwordResetToken,
} = require("../auth/JWT.js");
const { Influencer } = require("../models/influencerprofile.js");
const { EntrepreneurProfile } = require("../models/entrepreneurprofile.js");
const { BuisnessProfile } = require("../models/entrepreneurprofile.js");

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    phonenumber: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["Content Creator", "Entrepreneur", "Buisness"],
    },
    about: { type: String, default: "" },
    education: { type: String, default: "" },
    location: { type: String, default: "" },
    website_link: { type: String, default: "" },

    createdDate: { type: Date, default: Date.now },
    influencer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Influencer",
    },
    entrepreneurprofile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EntrepreneurProfile",
    },
    buisnessprofile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BuisnessProfile",
    },
    connectionlist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Connections",
    },
    experience: [
      {
        comName: { type: String },
        start: { type: Date },
        end: { type: Date },
        isWorking: { type: Boolean },
      },
    ],

    social_media: {
      instagram: { type: String },
      twitter: { type: String },
      youtube: { type: String },
      linkedin: { type: String },
      facebook: { type: String },
    },

    featured_link: [
      {
        link: { type: String },
        title: { type: String },
        date: { type: String },
        image: { type: String },
      },
    ],

    achivement: [
      {
        link: { type: String },
        title: { type: String },
        date: { type: String },
        image: { type: String },
      },
    ],

    pic: {
      type: "String",
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },

    starred_chat: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
  },
  { timestaps: true }
);

UserSchema.pre("save", function (next) {
  let user = this;
  if (this.isModified("password") || this.isNew) {
    bcrypt
      .hash(user.password, 10)
      .then((hash) => {
        user.password = hash;
        return next();
      })
      .catch((error) => {
        return next(error);
      });
  } else {
    return next();
  }
});

UserSchema.methods.generateemailVerificationToken = function () {
  return createemail_verificationTokens(this);
};

UserSchema.methods.generatePasswordResetToken = function () {
  return passwordResetToken(this);
};

UserSchema.methods.generateOtp = function () {
  for (let i = 0; i < 6; i++) {
    this.Otp = Math.floor(Math.random() * 10000);
  }
  this.OtpExpires = Date.now() + 3600000; //expires in an hour
  return this.Otp;
};

module.exports = mongoose.model("User", UserSchema);
