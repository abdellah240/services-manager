// Takes db as a parameter
// Returns "(req,res) => {......}"

const addService = ((db) => (req, res) =>
{
  const service = req.body;

  const sqlCode = "INSERT INTO Services SET ?";

  // Query DB
  db.query(sqlCode, service, (err) =>
  {
    if (err)
      return res.status(500).send("Could not add service.");
    else
      return res.status(201).send("Service created successfully.");
  })
});

module.exports = addService;

