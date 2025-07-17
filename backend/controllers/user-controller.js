const express = require("express");
const User = require("../models/User");
const Event = require("../models/Event");

const findMe = async (req, res) => {
  try {
    const user = await User.findById(req.userInfo.userId).select("-password");
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user profile" });
  }
};


const editInfo = async (req, res) => {
  try {
    const updates = req.body;

    const userId = req.userInfo.userId;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      res.status(404).json({
        success: false,
        message: "Failed to upload",
      });
    }

    res.status(200).json({
      success: true,
      user: updatedUser,
      message: "User profile updated successfully.",
    });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to update user.",
    });
  }
};

module.exports = { findMe, editInfo };
