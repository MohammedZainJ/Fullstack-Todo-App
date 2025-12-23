import User from "../model/user.model.js";
import { z } from "zod";
import bcrypt from "bcrypt";
import { generateTokenAndSaveInCookie } from "../jwt/token.js";

// validation schema for user registration
const userSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

// Register a new user
export const register = async (req, res) => {
  try {
    console.log(" register func called");
    const { username, email, password } = req.body;

    // Validate user input
    if (!username || !email || !password) {
      res.status(400).json({ errors: "All fields are required" });
    }

    const validation = userSchema.safeParse({ email, username, password });
    if (!validation.success) {
      //error → the error object, errors → an array of individual validation errors inside tht arr mssg is present
      const errorMessage = validation.error.errors.map((err) => err.message);
      return res.status(400).json({ error: errorMessage });
    }

    const user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ errors: "User already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashPassword });
    await newUser.save();
    if (newUser) {
      const token = await generateTokenAndSaveInCookie(newUser._id, res);
      res
        .status(201)
        .json({ message: "User registered successfully", newUser, token });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: "Error registering user" });
  }
};

// Login an existing user (You check is the signup/registered user = the login user)
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ errors: "All fields are required" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ errors: "Invalid email or password" });
    }
    const token = await generateTokenAndSaveInCookie(user._id, res);
    res
      .status(200)
      .json({ message: "User logged in successfully", user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error logging user" });
  }
};

// Logout a user
export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      path: "/",
    });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error logging out user" });
  }
};
