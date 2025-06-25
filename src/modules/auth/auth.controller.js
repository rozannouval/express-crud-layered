const express = require("express");
const { registerUser, loginUser } = require("./auth.service");

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).send({ user, message: "User registered!" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const tokenData = await loginUser(req.body);
    res.send(tokenData);
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
});

module.exports = router;
