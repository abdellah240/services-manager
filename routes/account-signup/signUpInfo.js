const bcrypt = require("bcryptjs");

const signUpInfo = (db) => async (req, res) => {
  const user = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(user.Password, 10);
    user.Password = hashedPassword;
    // Insert the user into the database
    const query = `INSERT INTO users SET ?`;

    db.query(query, user, (err) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }
      res.status(201).json({ message: "User registered successfully!" });
    });
  } catch (error) {
    console.error("Error processing signup:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = signUpInfo;
