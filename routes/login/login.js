const bcrypt = require("bcryptjs");

const loginCustomer = (db) => async (req, res) => {
  const { Email, Password } = req.body; // Extract email and password from the request body
  console.log("Received user data: ", { Email, Password });

  try {
    // Query the database to get the user by email
    const query = `SELECT Password FROM users WHERE Email = ?`;

    db.query(query, [Email], async (err, results) => {
      if (err) {
        console.error("Error fetching user from database:", err);
        return res.status(500).json({ error: "Database error" });
      }

      if (results.length === 0) {
        // No user found with the given email
        return res.status(404).json({ error: "User not found" });
      }

      console.log("results ", results);

      const storedHashedPassword = results[0].Password;

      // Compare the provided password with the stored hashed password
      const isPasswordMatch = await bcrypt.compare(
        Password,
        storedHashedPassword
      );

      if (!isPasswordMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Successful login
      res.status(200).json({ message: "Login successful!" });
    });
  } catch (error) {
    console.error("Error processing login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = loginCustomer;
