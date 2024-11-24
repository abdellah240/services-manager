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

  db.query(sqlCode, [account, previousEmail], (err) =>
  {
    if (!err)
    {
      res.status(202).send('Success editing account');
    } else
    {
      console.error(err); // Log the error for debugging
      res.status(500).send('Failure editing account');
    }
  });
};
module.exports = editAccount;
