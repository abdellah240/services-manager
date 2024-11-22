const editService = (db) => (req, res) =>
{
  const id = req.body.id;
  const service = req.body;
  const sqlCode = "UPDATE Services SET ? WHERE id = ?";
  db.query(sqlCode, [service, id], (err) =>
  {
    if (!err)
    {
      res.status(202).send('Success editing');
    }
    else
    {
      res.status(500).send('Failure editing');
    }
  })
};
module.exports = editService;