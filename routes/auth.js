const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../util/validation");

router.post("/register", async (req, res) => {
  // Validate data
  const { error } = registerValidation(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });

  // Check user not already registered
  const exists = await User.findOne({ email: req.body.email });
  if (exists)
    return res
      .status(400)
      .json({ success: false, message: "Email already registered" });

  // Hash user password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Save to database
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const result = await user.save();
    res.json({
      success: true,
      message: `User successfully added to database.`,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
