const deleteService = (db) => (req, res) =>
{
  const id = req.body.id;

  const sqlCode = "DELETE FROM Services WHERE id = ?";
  db.query(sqlCode, id, (err) =>
  {
    if (!err)
    {
      res.status(202).send('Success deleting');
    }
    else
    {
      res.status(500).send('Failure deleting');
    }
  })
};

module.exports = deleteService;