const connection = require("../connection");
const errorHandler = require("./errorResponse");

module.exports = {
  getProductsInCart(res, cart_id){
    //get products in the cart
    query = "call shopping_cart_get_products(?)";
    connection.query(query, [cart_id], (err, rows) => {
      if (err) return res.status(500).send(errorHandler(err));
      res.status(200).send(rows[0]);
    });
  }
}