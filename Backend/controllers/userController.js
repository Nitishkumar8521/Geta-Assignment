import bcrypt from "bcrypt";
import { UserModel } from "../model/user.model.js";
import jwt from "jsonwebtoken";
import validator from 'validator'

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return res.status(500).json({ message: "Internal Server Error" });
        }
        if (result) {
          const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
          return res
            .status(200)
            .json({ message: "User logged in successfully", token });
        } else {
          return res.status(401).json({ message: "Invalid Password" });
        }
      });
    }
  } catch (error) {
    res.status(500).json({ message: `Error while logging in user ${error}` });
  }
};

const userRegister = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    //validating email format & strong password
    if(!validator.isEmail(email)){
        return res.json({message:"Please enter a valid email"})
    }

    //check strong password
    if(password.length < 8 ){
        return res.json({message:"Please enter a strong password greater than 7"})
    }

    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        return res.status(500).json({ message: "Internal Server Error" });
      }
      const user = new UserModel({
        name,
        email,
        password: hash,
      });
      await user.save();
      res.status(201).json({ message: "User registered successfully" });
    });
  } catch (error) {
    res.status(500).json({ message: `Error while registering user ${error}` });
  }
};

export { userLogin, userRegister };
