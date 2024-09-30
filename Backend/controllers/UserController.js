const User = require("../models/UserModel");

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });

    // Check if the user exists
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Directly compare the plaintext password with the stored password
    if (password !== user.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Send back the admin flag if credentials are valid
    res.json({ success: true, isAdmin: user.isAdmin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  login,
};
