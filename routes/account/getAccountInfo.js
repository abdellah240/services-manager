const getAccountInfo = (db) => (req, res) =>
{
  console.log("Request body:", req.body);

  const email = req.body.email;
  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], (err, results) =>
  {
    if (!err)
    {
      console.log("Query results:", results);
      res.status(200).json(results);
    } else
    {
      console.error("Database error:", err);
      res.status(500).send("Internal database error");
    }
  });
};
module.exports = getAccountInfo;
