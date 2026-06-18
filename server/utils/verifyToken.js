import jwt from "jsonwebtoken";
import { sendRes } from "./responseHandler.js";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token) {
    return sendRes(res, 401, false, "Access denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "supersecretkey");
    req.user = decoded;
    next();
  } catch (error) {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    return sendRes(res, 401, false, "Session expired or invalid token.");
  }
};