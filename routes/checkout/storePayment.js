const storePayment = (checkoutDB) => async (req, res) =>
{
    try
    {
        const order = req.body;
        console.log(order);
        // Save order to the database
        const query = 'INSERT INTO orders SET ?';
        checkoutDB.query(query, order, (err) =>
        {
            if (!err)
            {
                res.status(200).send('Payment successful and order placed!');
            }
            else
            {
                res.status(500).send('Payment failed.');
            }
        })
    } catch (e)
    {
        const errorMessage = e.message;
        res.status(500).send("Error in payment: " + errorMessage)
    }
};
module.exports = storePayment;

