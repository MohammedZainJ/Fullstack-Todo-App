import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

// server creates the cookies and sends it to the client along with the response

export const generateTokenAndSaveInCookie = async (userId, res) => {
  // Generate JWT token (payload, secret key, options)
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "10d",
  });

  // Save token in cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
  });

  await User.findByIdAndUpdate(userId, { token });
  return token;
};
