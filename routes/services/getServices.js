// Takes db as a parameter
// Returns "(req,res) => {......}"

const getServices = (db) => (req, res) =>
{
  const sqlCode = "SELECT * FROM Services";

  // Query DB
  db.query(sqlCode, (err, result) =>
  {
    if (err)
    {
      return res.status(500).send("Could not get services.");
    }
    else
      return res.json(result);
  })
}

module.exports = getServices;
