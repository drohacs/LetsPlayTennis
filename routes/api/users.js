const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

// @route  GET api/users
// @desc   Register user
// @access Public

router.post("/", [
  check("name", "Name is required").notEmpty(),
  check("email", "Please enter a valid email").isEmail(),
  check(
    "password",
    "Please enter a password with 8 or more characters"
  ).isLength({ min: 8 }),
]);

async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    // See if user exists
    let user = await User.findOne({ email });

    // Get the users gravatar
    if (user) {
      res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }
    const avatar =
      (gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      }),
      { forceHttps: true });
    user = new User({
      name,
      email,
      avatar,
      password,
    });
    // Encrypt the password
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    user.save();

    // Return jsonwebtoken (WIP)

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 180000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = router;
