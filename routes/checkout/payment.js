const payment = (checkoutDB) => (req, res) => {
    // Extract `paid` and `id` from the request body
    const { paid, client_id } = req.body;
  
    // SQL query to update the `paid` status of the order
    const query = "UPDATE orders SET paid = ? WHERE client_id = ?";
  
    // Execute the query with the provided `paid` and `id` values
    checkoutDB.query(query, [paid, client_id], (err, results) => {
      if (!err) {
        if (results.affectedRows > 0) {
          // Successfully updated the order
          res.status(200).json({ message: "Order updated successfully.", results });
        } else {
          // No matching order found
          res.status(404).json({ message: "Order not found." });
        }
      } else {
        // Handle database error
        res.status(500).send("Error updating order in database: " + err.message);
      }
    });
  };
  
  module.exports = payment;
  