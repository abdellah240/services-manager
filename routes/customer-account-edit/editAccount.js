const editAccount = (db) => (res,req) => {
    const email = req.body.email;
    const address = req.body.address;
    const password = req.body.password;
    const sqlCode = "UPDATE INTO users SET ?";

    db.query(sqlCode, [email,address,password,address], (err) =>
        {
          if (!err)
          {
            res.status(202).send('Success editing account');
          }
          else
          {
            res.status(500).send('Failure editing account');
          }
        })
      };
      module.exports = editAccount;
