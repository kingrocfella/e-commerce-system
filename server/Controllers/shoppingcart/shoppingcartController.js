const connection = require("../connection");
const errorHandler = require("./errorResponse");
const helperFunction = require("./helperFunctions");

module.exports = {
  generateUniqueID(req,res){
    //generate a unique id using uuid version 4 solution
    const uniqueId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    res.status(200).send({cart_id: uniqueId});
  },
  addToCart(req,res){
    if (!req.body.product_id || !req.body.cart_id || !req.body.attributes) {
      let empty = [];
      if (!req.body.product_id) empty.push("product_id");
      if (!req.body.cart_id) empty.push("cart_id");
      if (!req.body.attributes) empty.push("attributes");
      return res.status(400).send({
        "error": {
          "status": 400,
          "code": "USR_02",
          "message": "The field(s) are/is required",
          "field": empty
        }
      });
    }
    let product_id = req.body.product_id;
    let cart_id = req.body.cart_id;
    let attributes =  req.body.attributes;
    let query = "call shopping_cart_add_product(?,?,?)";
    connection.query(query, [cart_id, product_id, attributes], (err, rows) => {
      if (err) return res.status(500).send(errorHandler(err));
    });
    helperFunction.getProductsInCart(res, cart_id);
  },
  getProductsFromCart(req,res){
    if (!req.params.cart_id) return res.status(500).send(errorHandler({code: "USR_02", sqlMessage: "The field cart_id is empty."}));
    helperFunction.getProductsInCart(res, req.params.cart_id);
  },
  updateProductsInCart(req,res){
    if (!req.body.quantity || !req.params.item_id) {
      let empty = [];
      if (!req.body.quantity) empty.push("quantity");
      if (!req.body.item_id) empty.push("item_id");
      return res.status(400).send({
        "error": {
          "status": 400,
          "code": "USR_02",
          "message": "The field(s) are/is required",
          "field": empty
        }
      });
    }
    let query = "call shopping_cart_update(?,?)";
    connection.query(query, [parseInt(req.params.item_id), parseInt(req.body.quantity)], (err, rows) => {
      if (err) return res.status(500).send(errorHandler(err));
    });
    connection.query("SELECT cart_id FROM shopping_cart WHERE item_id = ?",[parseInt(req.params.item_id)], (err,rows) => {
      if (err) return res.status(500).send(errorHandler(err));
      helperFunction.getProductsInCart(res, rows[0]['cart_id']);
    });
  },
  emptyCart(req,res){
    if(!req.params.cart_id) return res.status(500).send(errorHandler({code: "USR_02", sqlMessage: "The field cart_id is empty."}));
    let query = "call shopping_cart_empty(?)";
    connection.query(query,[req.params.cart_id], (err,rows) => {
      if (err) return res.status(500).send(errorHandler(err));
      res.status(200).send([]);
    });
  },
  moveProductToCart(req,res){
    if(!req.params.item_id) return res.status(500).send(errorHandler({code: "USR_02", sqlMessage: "The field item_id is empty."}));
    let query = "call shopping_cart_move_product_to_cart(?)"
    connection.query(query, [parseInt(req.params.item_id)], (err,rows) => {
      if (err) return res.status(500).send(errorHandler(err));
      res.status(200).send();
    });
  },
  getTotalAmountInCart(req,res){
    if(!req.params.cart_id) return res.status(500).send(errorHandler({code: "USR_02", sqlMessage: "The field cart_id is empty."}));
    let query = "call shopping_cart_get_total_amount(?)"
    connection.query(query, [req.params.cart_id], (err,rows) => {
      if (err) return res.status(500).send(errorHandler(err));
      res.status(200).send(rows[0]);
    });
  },
  saveProductForLater(req,res){
    if(!req.params.item_id) return res.status(500).send(errorHandler({code: "USR_02", sqlMessage: "The field item_id is empty."}));
    let query = "call shopping_cart_save_product_for_later(?)"
    connection.query(query, [parseInt(req.params.item_id)], (err,rows) => {
      if (err) return res.status(500).send(errorHandler(err));
      res.status(200).send();
    });
  },
  getSavedProductForLater(req,res){
    if(!req.params.cart_id) return res.status(500).send(errorHandler({code: "USR_02", sqlMessage: "The field cart_id is empty."}));
    let query = "call shopping_cart_get_saved_products(?)"
    connection.query(query, [req.params.cart_id], (err,rows) => {
      if (err) return res.status(500).send(errorHandler(err));
      res.status(200).send(rows[0]);
    });
  },
  removeProductInCart(req,res){
    if(!req.params.item_id) return res.status(500).send(errorHandler({code: "USR_02", sqlMessage: "The field item_id is empty."}));
    let query = "call shopping_cart_remove_product(?)"
    connection.query(query, [parseInt(req.params.item_id)], (err,rows) => {
      if (err) return res.status(500).send(errorHandler(err));
      res.status(200).send();
    });
  }
}