const stripe = require('stripe')('your-stripe-secret-key');

const storePayment = (checkoutDB) => async (req, res) => {
    const payment = req.body;

    try {
        const paymentInt = await stripe.paymentIntents.create({
            amount, 
            currency: 'cad',
            payment_method_types: ['card'],
        });

        // Save order to the database
        const query = 'INSERT INTO orders SET ?)';

        res.status(200).send('Payment successful and order placed!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Payment failed.');
    }
};

module.exports = storePayment;

