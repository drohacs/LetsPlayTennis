const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route  GET api/profile/me
// @desc   Get current users profile
// @access Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );

    if (!profile) {
      return res.status(400).json({ msg: "No profile found" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  POST api/profile/me
// @desc   Get current users profile
// @access Private

router.post(
  "/",
  [
    auth,
    check("status", "Status is required").not().isEmpty(),
    check("phonenumber", "phonenumber is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { bio } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (bio) profileFields.bio = bio;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }
      profile = new Profile(profileFields);
      await Profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);
// @route  POST api/profile/user/:user_id
// @desc   Get profile by user ID
// @access Public
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.find({ user: req.params.user_id }).populate(
      "user",
      ["name", "avatar"]
    );

    if (!profile) return res.status(400).json({ msg: "No profile found " });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kinda == "ObjectID") {
      return res.status(400).json({ msg: "No profile found " });
    }
    res.status(500).send("Server Error");
  }
});
module.exports = router;

// @route  PUT api/profile/
// @desc   Delete profile, user & posts
// @access Private


// @route  GET api/profile/me
// @desc   Delete profile, user & posts
// @access Private
router.delete("/", auth, async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.user.id });

    await Profile.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
