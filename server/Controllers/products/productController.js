const connection = require("../connection");
const errorHandler = require("./errorResponse");

module.exports = {
  getProducts(req,res){
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);
    let desc_length = parseInt(req.query.description_length);

    if (!req.query.limit) limit = 20;
    if (!req.query.page) page = 1;
    if (!req.query.description_length) desc_length = 200;
    let response = [];
    let query = "SELECT product_id,name,description,price,discounted_price,thumbnail FROM ?? limit ? offset ?";
    connection.query(query, ['product', limit, ((page-1) * limit)], (err, rows) => {
      if (err) return res.status(500).send(errorHandler(err));
      rows.forEach(product => {
        response.push({
          product_id: product.product_id,
          name: product.name,
          description: product.description.substring(0,desc_length)+"...",
          price: product.price,
          discounted_price: product.discounted_price,
          thumbnail: product.thumbnail
        });
      });
      res.status(200).send({count: response.length, rows: response});
    });
  },
  searchProducts(req,res){
    let query_string = req.query.query_string;
    let all_words = req.query.all_words;
    let desc_length = parseInt(req.query.description_length);
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);

    if (!query_string) return res.status(500).send(errorHandler({code: "USR_02", sqlMessage: "The field query_string is empty."}));
    if (!all_words) all_words = true;
    if (!desc_length) desc_length = 200;
    if (!page) page = 1;
    if (!limit) limit = 20;

    let response = [];
    let query = "SELECT product_id,name,description,price,discounted_price,thumbnail FROM ?? WHERE description LIKE ? LIMIT ? OFFSET ?";
    connection.query(query, ['product', '%' + query_string + '%', limit, ((page-1) * limit)], (err, rows) => {
      if (err) return res.status(500).send(errorHandler(err));
      rows.forEach(product => {
        response.push({
          product_id: product.product_id,
          name: product.name,
          description: product.description.substring(0,desc_length)+"...",
          price: product.price,
          discounted_price: product.discounted_price,
          thumbnail: product.thumbnail
        });
      });
      res.status(200).send({count: response.length, rows: response});
    });
  },
  getProductsById(req,res){
    if(isNaN(req.params.product_id)) return res.status(500).send(errorHandler({code: "PROD_01", "sqlMessage": "The ID is not a number."}));
    let product_id = req.params.product_id;
    let query = "SELECT * FROM ?? WHERE product_id = ?";
    connection.query(query, ['product', product_id], (err, rows) => {
      if (err) return res.status(500).send(errorHandler(err));
      if(rows.length < 1) return res.status(500).send(errorHandler({code: "PROD_02", "sqlMessage": "ID does not exist"}));
      res.status(200).send(rows);
    });
  },
  getProductsByCategoryId(req,res){
    let category_id = req.params.category_id;
    let desc_length = parseInt(req.query.description_length);
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);
    let dots = "";

    if (isNaN(category_id) || !category_id) return res.status(500).send(errorHandler({code: "CAT_01", sqlMessage: "The field category_id is invalid."}));
    if (!page) page = 1;
    if (!limit) limit = 20;
    if (desc_length)  dots = "...";

    let response = [];
    let query = "SELECT product.product_id,name,description,price,discounted_price,thumbnail FROM ?? INNER JOIN product_category ON product.product_id = product_category.product_id  WHERE product_category.category_id = ?  LIMIT ? OFFSET ?";
    connection.query(query, ['product', category_id, limit, ((page-1) * limit)], (err, rows) => {
      if (err) return res.status(500).send(errorHandler(err));
      rows.forEach(product => {
        response.push({
          product_id: product.product_id,
          name: product.name,
          description: product.description.substring(0,(desc_length || product.description.length)) + dots,
          price: product.price,
          discounted_price: product.discounted_price,
          thumbnail: product.thumbnail
        });
      });
      res.status(200).send({count: response.length, rows: response});
    });
  },
  getProductsByDepartmentId(req,res){
    let department_id = req.params.department_id;
    let desc_length = parseInt(req.query.description_length);
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);
    let dots = "";

    if (isNaN(department_id) || !department_id) return res.status(500).send(errorHandler({code: "DEP_01", sqlMessage: "The field department_id is invalid."}));
    if (!page) page = 1;
    if (!limit) limit = 20;
    if (desc_length)  dots = "...";

    let response = [];
    let query = "SELECT product.product_id,product.name, product.description, product.price, discounted_price, thumbnail, display FROM product INNER JOIN product_category ON product_category.product_id = product.product_id INNER JOIN category ON category.category_id = product_category.category_id WHERE category.department_id = ?  LIMIT ? OFFSET ?";
    connection.query(query, [department_id, limit, ((page-1) * limit)], (err, rows) => {
      if (err) return res.status(500).send(errorHandler(err));
      rows.forEach(product => {
        response.push({
          product_id: product.product_id,
          name: product.name,
          description: product.description.substring(0,(desc_length || product.description.length)) + dots,
          price: product.price,
          discounted_price: product.discounted_price,
          thumbnail: product.thumbnail,
          display: product.display
        });
      });
      res.status(200).send({count: response.length, rows: response});
    });
  },
  getProductDetails(req,res){
    if(isNaN(req.params.product_id)) return res.status(500).send(errorHandler({code: "PROD_01", "sqlMessage": "The ID is not a number."}));
    let product_id = req.params.product_id;
    let query = "SELECT product_id, name,description, price,discounted_price, image, image_2 FROM ?? WHERE product_id = ?";
    connection.query(query, ['product', product_id], (err, rows) => {
      if (err) return res.status(500).send(errorHandler(err));
      if(rows.length < 1) return res.status(500).send(errorHandler({code: "PROD_02", "sqlMessage": "ID does not exist"}));
      res.status(200).send(rows);
    });
  },
  getProductReviews(req,res){
    if(isNaN(req.params.product_id)) return res.status(500).send(errorHandler({code: "PROD_01", "sqlMessage": "The ID is not a number."}));
    let product_id = req.params.product_id;
    let query = "SELECT name,review, rating,created_on FROM ?? INNER JOIN customer ON customer.customer_id = review.customer_id WHERE product_id = ?";
    connection.query(query, ['review', product_id], (err, rows) => {
      if (err) return res.status(500).send(errorHandler(err));
      res.status(200).send(rows);
    });
  },
  postProductReviews(req,res){
    if (!req.param.product_id || !req.body.review || !req.body.rating ||!req.body.customer_id) {
      let empty = [];
      if (!req.param.product_id) empty.push("product_id");
      if (!req.body.review) empty.push("review");
      if (!req.body.rating) empty.push("rating");
      if (!req.body.customer_id) empty.push("customer_id");
      return res.status(400).send({
        "error": {
          "status": 400,
          "code": "USR_02",
          "message": "The field(s) are/is required",
          "field": empty
        }
      });
    }
    let product_id = req.params.product_id;
    let review = req.body.review;
    let rating =  parseInt(req.body.rating);
    let customer_id = parseInt(req.body.customer_id);
    let query = "INSERT INTO ?? (customer_id, product_id, review, rating, created_on) VALUES (?,?,?,?,?)";
    connection.query(query, ['review', customer_id, product_id, review, rating, new Date()], (err, rows) => {
      if (err) return res.status(500).send(errorHandler(err));
      res.status(200).send();
    });
  }
}