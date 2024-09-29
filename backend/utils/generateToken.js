import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    sameSite: "strict", //prevent CSRF
    httpOnly: true, //prevent XSS attacks
    secure: process.env.NODE_ENV === "production",
    maxAge: 15 * 24 * 60 * 60 * 1000,
  });
  console.log(`JWT : ${token}`);
};

export default generateTokenAndSetCookie;
