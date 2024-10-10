import { Router } from "express";
import protectRoute from "../middleware/protectRoutes.js";
import { User } from "../models/user.model.js";

const router = Router();

router.get("/", protectRoute, async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    //find every user except for the one who is logged in
    const allUsers = await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-password"
    );

    res.status(200).json(allUsers);
  } catch (error) {
    console.log("Error in userRoute.js", error.message);

    res.status(500).json({ error: "Internal server error" });
  }
});

export { router as userRoutes };
