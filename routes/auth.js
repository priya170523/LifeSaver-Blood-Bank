
const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

// SIGN UP
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required."
      });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (cleanName.length < 2 || cleanName.length > 100) {
      return res.status(400).json({
        success: false,
        message: "Name must contain 2–100 characters."
      });
    }

    if (
      cleanEmail.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)
    ) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid email address."
      });
    }

    if (password.length < 12 || password.length > 72) {
      return res.status(400).json({
        success: false,
        message: "Password must contain 12–72 characters."
      });
    }

    const existingUser = await User.findOne({ email: cleanEmail });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists."
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name: cleanName,
      email: cleanEmail,
      password: hashedPassword
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfully. You can now sign in.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists."
      });
    }

    console.error("Sign up error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to create your account right now."
    });
  }
});

// SIGN IN
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      email.length > 254 ||
      password.length > 72
    ) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid email and password."
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      email: cleanEmail
    }).select("+password");

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password."
      });
    }

    // Create a fresh session after successful authentication.
    req.session.regenerate((error) => {
      if (error) {
        console.error("Session error:", error.message);
        return res.status(500).json({
          success: false,
          message: "Unable to sign in right now."
        });
      }

      req.session.userId = user._id.toString();

      req.session.save((saveError) => {
        if (saveError) {
          console.error("Session save error:", saveError.message);
          return res.status(500).json({
            success: false,
            message: "Unable to sign in right now."
          });
        }

        return res.json({
          success: true,
          message: "Signed in successfully.",
          user: {
            id: user._id,
            name: user.name,
            email: user.email
          }
        });
      });
    });
  } catch (error) {
    console.error("Sign in error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to sign in right now."
    });
  }
});

// CHECK CURRENT SESSION
router.get("/me", async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({
        success: false,
        message: "You are not signed in."
      });
    }

    const user = await User.findById(req.session.userId)
      .select("name email");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Account not found."
      });
    }

    return res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error("Session lookup error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to check your session."
    });
  }
});

// SIGN OUT
router.post("/signout", (req, res, next) => {
  req.session.destroy((error) => {
    if (error) return next(error);

    res.clearCookie("blood.sid", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production"
    });

    return res.json({
      success: true,
      message: "Signed out successfully."
    });
  });
});

module.exports = router;
