import { Router } from "express";
import bcryptjs from "bcryptjs";
import { User } from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

const router = Router();

router.post("/signup", async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    // Check if all required fields are provided
    if (!fullName || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    //check if the username exists
    const user = await User.findOne({ username });
    //if the username exists
    if (user) return res.status(400).json({ error: "Username already exists" });

    //if it doesn't exist
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, 10);
    console.log(`Salt: ${salt}`);

    //https://avatar-placeholder.iran.liara.run/

    //https://avatar.iran.liara.run/public/boy?username=Scott

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });
    if (newUser) {
      //generate JWT token
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.post("/login", async (req, res) => {
  console.log("Login route");
});

router.post("/logout", async (req, res) => {
  console.log("Logout route");
});

export { router as authRoutes };
