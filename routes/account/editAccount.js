const bcrypt = require('bcrypt');

const editAccount = (db) => async (req, res) =>
{
  const account = req.body;
  const previousEmail = account.previousEmail;
  delete account.previousEmail;

  if (account.password)
  {
    account.password = await bcrypt.hash(account.password, 10);
  }

  const sqlCode = "UPDATE users SET ? WHERE email = ?";

  db.query(sqlCode, [account, previousEmail], (err, results) =>
  {
    if (err)
    {
      console.error("Database error:", err);
      return res.status(500).send("Failure editing account");
    }

    if (results.affectedRows === 0)
    {
      console.error("Email not found");
      return res.status(404).send("Email not found");
    }

    res.status(202).send("Success editing account");
  });

};
module.exports = editAccount;
