const confirmOrders = (checkoutDB) => (req, res) => {
  const query = `
    SELECT orders.fullname, orders.client_id, services.title, orders.paid, orders.date, SUM(services.price) AS total
    FROM orders
    JOIN services ON orders.service_id = services.id
    GROUP BY orders.client_id, services.title;`;

  checkoutDB.query(query, (err, results) => {
    if (!err) {
      const orders = {};

      results.forEach((order) => {
        if (!orders[order.client_id]) {
          orders[order.client_id] = { services: [], total: 0 };
        }
        orders[order.client_id].fullname = order.fullname;
        orders[order.client_id].services.push(order.title);
        orders[order.client_id].total += order.total;
        orders[order.client_id].client_id = order.client_id;
        orders[order.client_id].paid = order.paid;
        orders[order.client_id].date = order.date;
      });
      res.status(200).json({ orders });
    } else {
      res.status(500).send("Error loading orders from database.");
    }
  });
};

module.exports = confirmOrders;
