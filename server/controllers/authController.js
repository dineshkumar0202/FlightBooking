import User from "../models/User.js";
import jwt from "jsonwebtoken";

const generateToken = (id, role) =>
  jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const userExists = await User.findOne({ email: normalizedEmail });
    if (userExists) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const user = await User.create({ name, email: normalizedEmail, password });

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      msg: "Registration success",
      token,
      user,
    });
  } catch (err) {
    console.error("🔥 REGISTER ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = (email || "").trim().toLowerCase();

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const match = await user.matchPassword(password);
    if (!match) return res.status(400).json({ msg: "Invalid credentials" });

    const token = generateToken(user._id, user.role);

    res.json({ msg: "Login success", token, user });
  } catch (err) {
    console.error("🔥 LOGIN ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
};
