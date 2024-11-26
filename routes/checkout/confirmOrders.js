const confirmOrders = (checkoutDB) => (req, res) =>
{
  const query = `
    SELECT   orders.fullname, orders.client_id, services.title, orders.paid, orders.date, SUM(services.price) AS total
    FROM     orders
    JOIN     services ON orders.service_id = services.id
    GROUP BY orders.fullname, services.title;`;

  checkoutDB.query(query, (err, results) => // where results is an array of orders
  {
    if (!err)
    {
      const orders = {};
      const result = results;

      results.forEach((order) =>
      {
        if (!orders[order.fullname])
        {
          orders[order.fullname] = { services: [], total: 0, id: 0};
        }
        orders[order.fullname].services.push(order.title);
        orders[order.fullname].total += order.total;
        orders[order.fullname].id = order.client_id;
      });
      res.status(200).json({orders,result});
    } else
    {
      res.status(500).send("Error loading orders from database.");
    }
    {
    }
  });
};
module.exports = confirmOrders;
