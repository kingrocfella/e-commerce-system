const connection = require("../connection");
const errorHandler = require("./errorResponse");

module.exports = {
  getCategories(req,res){
    let dep_id, cat_id, name;
    if(req.query.department_id){
      dep_id = req.query.department_id;
      var query = "SELECT * FROM ?? WHERE department_id = ?";
    } 
    else if (req.query.category_id) {
      cat_id = req.query.category_id;
      var query = "SELECT * FROM ?? WHERE category_id = ?";
    }
    else if (req.query.name) {
      req.query.name;
      var query = "SELECT * FROM ?? WHERE department_id = ?";
    }else{
      return res.status(500).send(errorHandler({code: "CAT_01", sqlMessage: "No category exists with this ID."}));
    }
    
    connection.query(query, ['category', (dep_id || cat_id || name)], (err, rows) => {
      if (err) return res.status(500).send(errorHandler(err));
      res.status(200).send({count: rows.length, rows});
    });
  },
  getCategoriesById(req,res){
    if(isNaN(req.params.category_id)) return res.status(500).send(errorHandler({code: "CAT_01", sqlMessage: "No category exists with this ID."}));
    let query = "SELECT * FROM ?? WHERE category_id = ?";
    connection.query(query, ['category', req.params.category_id], (err, rows) => {
      if (err) return res.status(500).send(errorHandler(err));
      res.status(200).send(rows);
    });
  },
  getCategoriesByProduct(req,res){
    if(isNaN(req.params.product_id)) return res.status(500).send(errorHandler({code: "CAT_01", sqlMessage: "No category exists with this ID."}));
    let query = `SELECT product_category.category_id, category.department_id, category.name FROM product_category INNER JOIN category ON product_category.category_id = category.category_id WHERE product_category.product_id = ${req.params.product_id}`;
    connection.query(query, null, (err, rows) => {
      if (err) return res.status(500).send(errorHandler(err));
      res.status(200).send(rows);
    });
  },
  getCategoriesByDepartment(req,res){
    if(isNaN(req.params.department_id)) return res.status(500).send(errorHandler({code: "DEPT_ERR", sqlMessage: "No department exists with this ID."}));
    let query = "SELECT * FROM ?? WHERE department_id = ?";
    connection.query(query, ['category', req.params.department_id], (err, rows) => {
      if (err) return res.status(500).send(errorHandler(err));
      res.status(200).send(rows);
    });
  }
}