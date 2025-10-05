import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters." });
    }

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists." });

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // creating new user
    const newUser = new User({
      fullName: fullName,
      email: email,
      password: hashedPassword,
    });

    if (newUser) {
      // generate JWT Token
      generateToken(newUser._id, res);
      await newUser.save();

      return res
        .status(201)
        .json({ message: `New user created: ${newUser._id}` });
    } else {
      return res.status(400).json({ message: "Invalid user data." });
    }
  } catch (error) {
    console.log(`Error in singup controller ${error.message}`);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credential." });
    } else {
      const isCorrect = await bcrypt.compare(password, user.password);
      if (!isCorrect)
        return res.status(400).json({ message: "Invalid credential." });
      else {
        // generate token
        await generateToken(user._id, res);
        return res
          .status(200)
          .json({ message: `Login success for user: ${user._id}` });
      }
    }
  } catch (e) {
    console.log(`Error in singup controller ${e.message}`);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });
    return res.status(200).json({ message: `Logout success.` });
  } catch (e) {
    console.log(`Error in singup controller ${e.message}`);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const updateProfile = async (req, res) => {
  try {
  } catch (e) {}
};
