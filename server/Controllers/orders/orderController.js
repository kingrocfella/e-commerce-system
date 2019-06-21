const connection = require("../connection");
const errorHandler = require("./errorResponse");

module.exports = {
  createOrder(req, res) {
    if (!req.body.shipping_id || !req.body.cart_id || !req.body.tax_id) {
      let empty = [];
      if (!req.body.shipping_id) empty.push("shipping_id");
      if (!req.body.cart_id) empty.push("cart_id");
      if (!req.body.tax_id) empty.push("tax_id");
      return res.status(400).send({
        "error": {
          "status": 400,
          "code": "USR_02",
          "message": "The field(s) are/is required",
          "field": empty
        }
      });
    }
    
    let total_amount, order_id, unit_cost;
    //GET TOTAL AMOUNT IN CART
    connection.query(`call shopping_cart_get_total_amount(?)`, [req.body.cart_id], (err, rows) => {
      if (err) return res.status(500).send(errorHandler(err));
      total_amount = rows[0][0]["total_amount"];
      //insert details into DB
      connection.query("INSERT INTO ?? (total_amount, created_on, customer_id, shipping_id, tax_id) VALUES (?,?,?,?,?)", ['orders', total_amount, new Date(), req.customer_id, req.body.shipping_id, req.body.tax_id], (err, rows) => {
        if (err) return res.status(500).send(errorHandler(err));
        order_id = rows.insertId;
        connection.query(`SELECT * FROM shopping_cart INNER JOIN product ON product.product_id = shopping_cart.product_id WHERE shopping_cart.cart_id = ?`, [req.body.cart_id], (err, rows) => {
          if (err) return res.status(500).send(errorHandler(err));
          rows.forEach( item => {
            if(item["discounted_price"] !== 0) unit_cost = item["discounted_price"]
            else unit_cost = item["price"]
            //insert order details in DB
            connection.query(`INSERT INTO ?? (item_id,order_id,product_id,attributes,product_name,quantity,unit_cost) VALUES (?,?,?,?,?,?,?)`, ['order_detail', item['item_id'], order_id, item['product_id'],item['attributes'],item['name'],item['quantity'],unit_cost], (err, rows) => {
              if (err) return res.status(500).send(errorHandler(err));
              res.status(200).send({orderId: order_id});
            });
          });
        });
      });
    });
  },
  getOrderDetails(req,res){
    if (!req.params.order_id) {
      return res.status(400).send({
        "error": {
          "status": 400,
          "code": "USR_02",
          "message": "The field(s) are/is required",
          "field": "order_id"
        }
      });
    }
    connection.query(`call orders_get_order_details(?)`, [req.params.order_id], (err,rows) => {
      if (err) return res.status(500).send(errorHandler(err));
      res.status(200).send(rows[0]);
    });
  },
  getUserOrders(req,res){
    connection.query(`call orders_get_by_customer_id(?)`, [req.customer_id], (err,rows) => {
      if (err) return res.status(500).send(errorHandler(err));
      res.status(200).send(rows[0]);
    });
  },
  getOrderShortDetail(req,res){
    if (!req.params.order_id) {
      return res.status(400).send({
        "error": {
          "status": 400,
          "code": "USR_02",
          "message": "The field(s) are/is required",
          "field": "order_id"
        }
      });
    }
    connection.query(`call orders_get_order_short_details(?)`, [req.params.order_id], (err,rows) => {
      if (err) return res.status(500).send(errorHandler(err));
      res.status(200).send(rows[0]);
    });
  }
}