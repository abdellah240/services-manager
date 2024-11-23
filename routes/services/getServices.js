const getServices = (db) => (req, res) => {
  console.log("req ", req);

  // Get the search query from the request
  const searchQuery = req.query.name || ""; // Default to an empty string if no search term is provided
  // SQL query with a WHERE clause for filtering by name
  const sqlCode = `
    SELECT * FROM services
    WHERE title LIKE ?
  `;

  // Wildcard search for partial matches
  const searchTerm = `%${searchQuery}%`;

  // Query the database
  db.query(sqlCode, [searchTerm], (err, result) => {
    if (err) {
      console.error("Error fetching services:", err);
      return res.status(500).send("Could not get services.");
    }

    // Respond with the filtered results
    return res.json(result);
  });
};

module.exports = getServices;
