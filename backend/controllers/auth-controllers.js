const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const checkExistingEmail = await User.findOne({ email });

    if (checkExistingEmail) {
      return res.status(400).json({
        success: false,
        message: "User already exists with the same email",
      });
    }

    const newlyCreatedUser = await User.create({
      username,
      email,
      password,
      role,
    });

    if (!newlyCreatedUser) {
      return res.status(400).json({
        success: false,
        message: "Unable to register user. Please try again 🤨😌",
      });
    }

    res.status(201).json({
      success: true,
      message: "User registration successful 🥳🥳",
    });
  } catch (err) {
    console.error("Register User Error:", err);
    res.status(500).json({
      success: false,
      message: "Server error during registration",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User doesn't exist!",
      });
    }
    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials!",
      });
    }

    const accessToken = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Logged in successfully!",
      accessToken,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Some error occurred! Please try again.",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
