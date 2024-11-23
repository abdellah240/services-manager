const bcrypt = require('bcryptjs');

const signUpInfo = (db) => async (req, res) =>
{
    const user = req.body;


    try
    {
        // Hash the password
        // const hashedPassword = await bcrypt.hash(Password, 10);

        // Insert the user into the database
        const query =
            `INSERT INTO users SET ?`;

        //const values = [firstName, lastName, email, phone, address, birthdate, password];

        db.query(query, user, (err) =>
        {
            if (err)
            {
                console.error('Error inserting user:', err);
                return res.status(500).json({ error: 'Database error' });
            }
            res.status(201).json({ message: 'User registered successfully!' });
        });

    } catch (error)
    {
        console.error('Error processing signup:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = signUpInfo;
