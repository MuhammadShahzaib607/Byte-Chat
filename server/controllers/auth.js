import User from "../models/Auth.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendRes } from "../utils/responseHandler.js";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return sendRes(res, 400, false, "All fields are required");
    }

    const isEmailAlreadyTaken = await User.findOne({ email: email.toLowerCase() })

    if (isEmailAlreadyTaken) {
      return sendRes(res, 400, false, "email already exists");
    }

    const isuserNameAlreadyTaken = await User.findOne({ username: username.toLowerCase() })

    if (isuserNameAlreadyTaken) {
      return sendRes(res, 400, false, "username already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    await newUser.save();

    return sendRes(res, 201, true, "User registered successfully");

  } catch (error) {
    return sendRes(res, 500, false, error.message);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendRes(res, 400, false, "All fields are required");
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return sendRes(res, 400, false, "Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendRes(res, 400, false, "Invalid credentials");
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // process.env.NODE_ENV === "production"
      sameSite: "none", // strict
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return sendRes(res, 200, true, "Login successful", {
      id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    return sendRes(res, 500, false, error.message);
  }
};

export const validateToken = (req, res)=> {
  const token = req.cookies?.token;
    return sendRes(res, 200, true, "Token is Valid", {userData: req.user, token: token})
}

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true, // process.env.NODE_ENV === "production"
      sameSite: "none", // change this into strict after completion
    });

    return sendRes(res, 200, true, "Logged out successfully");
  } catch (error) {
    return sendRes(res, 500, false, error.message);
  }
};