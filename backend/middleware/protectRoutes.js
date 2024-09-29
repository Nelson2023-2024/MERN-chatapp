import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token)
      return res.status(401).json({ error: "Unathorised - No Token Provided" });

    //it returns the payload id in the decode
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    //if decode was false
    if (!decode)
      return res.status(401).json({ error: "unathorised - Invalid Token" });

    //find document in the Db with the decoded id
    const user = await User.findById(decode.userId).select("-password");

    //if the user is not found
    if (!user) return res.status(404).json({ error: "User not found" });

    //if the user is found assign him to the request object
    req.user = user;

    next();
  } catch (error) {
    console.log("Error in the protect routes middleware :", error.message);
    res.status(500).json({ error: "Internal Server error in protectedRoute" });
  }
};

export default protectRoute;
