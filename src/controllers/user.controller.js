const asyncHandler = require("express-async-handler");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { use } = require("bcrypt/promises");

require("dotenv").config();

//@Desc Get one user for check whow login,
//@route GET /user
//@access private

const getOneUser = asyncHandler(async (req, res) => {
  try {
    // Mendekode token JWT
    const decodedToken = req.user;
    // console.log("decode", decodedToken.user.id);

    const user = await userModel.findById(decodedToken.user.id);
    // console.log("user", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ urlPicture: user.urlPicture, username: user.username });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//@Desc register user
//@route POST /user
//@access private

const registerUser = asyncHandler(async (req, res) => {
  const { urlPicture, username, email, password } = req.body;

  if (!urlPicture || !username || !email || !password) {
    res.status(400);
    throw new Error("All form  Resgister must input");
  }
  const userAvailable = await userModel.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered !");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const createUser = await userModel.create({
    urlPicture,
    username,
    email,
    password: hashPassword,
  });

  if (createUser) {
    res.status(201).json({ _id: createUser.id, email: createUser.email });
  } else {
    res.status(400);
    throw new Error("User data not valid");
  }
  res.json({ message: "Register user Success !" });
});

//@Desc Login user
//@route POST /user
//@access private

const Login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All form fields must be input" });
  }

  const user = await userModel.findOne({ email });

  if (user) {
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const accessToken = jwt.sign(
        {
          user: {
            id: user.id,
          },
        },
        process.env.ACCES_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      // Simpan token di cookie
      // console.log(accessToken);
      res.cookie("access_token", accessToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });
      res.status(200).json({ message: "Login successful" });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } else {
    return res.status(401).json({ message: "User not found" });
  }
});

module.exports = { getOneUser, registerUser, Login };
