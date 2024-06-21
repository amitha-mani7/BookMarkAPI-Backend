import { UserDataSource } from "../dataSource/userDataSource";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const userDataSource = new UserDataSource();
  const { username, password } = req.body;

  try {
    const user = await userDataSource.getUserByName(username);
    if (user) {
      return res.status(400).json({ message: "Username already exists" });
    }
    await userDataSource.addUser(username, password);
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  const userDataSource = new UserDataSource();
  try {
    const user = await userDataSource.getUserByName(username);

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const decryptedPassword = await bcrypt.compare(password, user.password);
    if (!decryptedPassword)
      return res.status(401).json({ message: "Invalid username or password" });
    const token = jwt.sign(
      { userId: user.id },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
