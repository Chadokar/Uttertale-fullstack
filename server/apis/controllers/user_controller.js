const Joi = require("joi");
const User = require("../models/user.js");
const sgMail = require("@sendgrid/mail");
const bcrypt = require("bcrypt");
const { createTokens, validateToken } = require("../auth/JWT.js");
const cookieParser = require("cookie-parser");
const { sign, verify } = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.home = (req, res) => {
  res.send("Welcome to Uttertale");
};

exports.update = asyncHandler(async (req, res) => {
  const {
    userid,
    firstname,
    lastname,
    about,
    education,
    location,
    website_link,
    experience,
    social_media,
    featured_link,
    achivement,
  } = req.body;
  const user = await User.findById(userid);
  if (!user) {
    res.status(404);
    throw new sError("User Not Found");
  } else {
    try {
      if (firstname) user.firstname = firstname;
      if (lastname) user.lastname = lastname;
      if (about) user.about = about;
      if (education) user.education = education;
      if (location) user.location = location;
      if (website_link) user.website_link = website_link;
      if (experience) user.experience = experience;
      if (social_media) user.social_media = social_media;
      if (featured_link) user.featured_link = featured_link;
      if (achivement) user.achivement = achivement;
      user.save();
      res.json(user);
    } catch (error) {
      console.log(error);
    }
  }
});

exports.getuser = asyncHandler(async (req, res) => {
  const userid = req.params.userid;
  const user = await User.findById(userid);
  if (!user) {
    res.status(404);
    throw new sError("User Not Found");
  }
  res.json(user);
});

exports.register = async (req, res) => {
  const { email, fname, lname, password, pnumber, role } = req.body;
  const schema = Joi.object({
    email: Joi.string().email().min(5).required(),
    fname: Joi.string().required(),
    lname: Joi.string().required(),
    pnumber: Joi.string().required(),
    role: Joi.string().required(),
    password: Joi.string()
      .min(8)
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  });

  const result = schema.validate(req.body);

  if (result.error) {
    console.log("joi error");
    console.log(result.error.details[0].message);
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const user = await User.findOne({ email: email });
  if (user) {
    console.log("user already exist");
    res
      .status(400)
      .json({ error: "User Already Exist", verified: user.isVerified });
    return;
  }

  let newUser = new User({
    email: email,
    password: password,
    firstname: fname,
    lastname: lname,
    phonenumber: pnumber,
    role: role,
  });

  newUser
    .save()
    .then((user) => {
      let verificationToken = user.generateemailVerificationToken();
      const url = `${process.env.SERVER}/verifyEmail/${verificationToken}`;

      const msg = {
        to: user.email,
        from: process.env.EMAIL,
        subject: "Email Verification",
        html: `Click <a href = '${url}'>here</a> to confirm your email.`,
      };

      sgMail
        .send(msg)
        .then(() => {
          return res.status(200).json({
            success: true,
            message:
              "A verification email has been sent to your email address.",
          });
        })
        .catch((error) => {
          console.error(error.body);
          return res.status(500).send({
            message: "Server Error.Something went wrong while sending email",
          });
        });
    })
    .catch((err) => {
      console.log("mangoose error");
      console.log(err.message);
      return res.status(500).json({ message: err.message });
    });

  console.log("fuction completed");
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) {
    res.status(400).json({ error: "User Doesn't Exist" });
    return;
  } else if (!user.isVerified) {
    return res.status(400).json({ error: "User is not verified" });
  }

  const dbPassword = user.password;
  bcrypt.compare(password, dbPassword).then((match) => {
    if (!match) {
      res
        .status(400)
        .json({ error: "Wrong Username and Password Combination!" });
    } else {
      const accessToken = createTokens(user);

      res.cookie("access-token", accessToken, {
        maxAge: 60 * 60 * 24 * 30 * 1000,
        sameSite: "strict",
        httpOnly: true,
      });

      return res.status(200).json({ user, accessToken });
    }
  });
};

exports.verifyEmail = async (req, res) => {
  const token = req.params.token;
  // Check we have an idn
  if (!token) {
    return res.status(422).send({
      message: "Missing Token",
    });
  }
  // Step 1 -  Verify the token from the URL
  let payload = null;
  try {
    payload = verify(token, process.env.USER_VERIFICATION_TOKEN_SECRET);
    console.log(payload.id);
  } catch (err) {
    return res.status(500).send(err);
  }
  try {
    // Step 2 - Find user with matching ID
    const user = await User.findOne({ _id: payload.id }).exec();
    if (!user) {
      return res.status(404).send({
        message: "User does not  exists",
      });
    }
    // Step 3 - Update user verification status to true
    user.isVerified = true;
    await user.save();
    const msg = {
      to: user.email,
      from: process.env.EMAIL,
      subject: "Email Verified",
      html: ` <p> Thank You , Your ${user.email} is verified. Have a nice day</p>`,
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
        return res
          .status(200)
          .json({ success: true, message: "Your email address is verified" });
      })
      .catch((error) => {
        console.error(error.body);
        return res
          .status(500)
          .json({ message: "Server error, Something went wrong" });
      });
  } catch (err) {
    return res.status(500).send("error" + err);
  }
};

exports.getResetPasswordLink = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    let token = user.generatePasswordResetToken();

    // const url = `http://localhost:3000/createNewPassword/${token}`;    //localhost
    const url = `${process.env.SERVER}/resetPassword/${token}`;

    const emailSent = await sgMail.send({
      from: process.env.EMAIL,
      to: email,
      subject: "Reset Password",
      text: "Reset your password for Uttertale.",
      html: `<p>Please click this link to reset password. <a href="${url}">click here</a></p>`,
    });
    if (emailSent) {
      return res.status(201).json({
        status: "Password reset email sent.",
        message: `Password reset link was sent to ${email}.`,
      });
    } else {
      console.error(error.body);
      return res
        .status(403)
        .json({ message: "Password reset failed, Email sending failed!" });
    }
  } else {
    console.error(error.body);
    return res
      .status(403)
      .json({ message: "There is no account associated with this email!" });
  }
};

exports.resetPassword = async (req, res) => {
  const { id } = verify(
    req.params.token,
    process.env.USER_VERIFICATION_TOKEN_SECRET
  );
  if (id) {
    let { newPassword, conPassword } = req.body;
    const schema = Joi.object({
      newPassword: Joi.string()
        .min(8)
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
      conPassword: Joi.ref("newPassword"),
    }).with("newPassword", "conPassword");

    const result = schema.validate(req.body);

    if (result.error) {
      res.status(400).send(result.error.details[0].message);
      return;
    }

    const updatedUser = await User.findByIdAndUpdate(id, {
      password: newPassword,
    });
    updatedUser.save();
    if (updatedUser) {
      res.status(200);
      return res.json({ status: "Password reset successfully!" });
    } else {
      return res.status(404).send({ message: "Password reset failed!" });
    }
  } else {
    return res.status(404).send({ message: "User not found!" });
  }
};

exports.allUsers = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
    // console.log(req.user._id)
    //   const users = await User.find(keyword);

    const users = await User.find(keyword).find({
      email: { $ne: req.user.email },
    });
    res.send(users);
  } catch (error) {
    console.log(error);
  }
};

exports.writetous = async (req, res) => {
  const { fullname, email, pnumber, role, writetous } = req.body;
  const emailSent = await sgMail.send({
    from: process.env.EMAIL,
    to: `shubhamchadokar36@gmail.com`,
    subject: "User contacted through Contact Page",
    text: "Reset your password for Uttertale.",
    html: `<p>${writetous}<br/><br/>Name : ${fullname}<br/>Email : ${email}<br/>Mobile No. : ${pnumber}<br/>Profile : ${role}</p>`,
  });
  if (emailSent) {
    return res.status(201).json({
      status: "Password reset email sent.",
      message: `Password reset link was sent to ${email}.`,
    });
  } else {
    // console.error(error.body);
    return res
      .status(403)
      .json({ message: "Password reset failed, Email sending failed!" });
  }
};
