const connection = require("../connection");
const errorHandler = require("./errorResponse");

module.exports = {
  getCategories(req,res){
    let cat_id, name, query, limit, page;
    if(!req.query.page) page = 1;
    if(!req.query.limit) limit = 20;
    cat_id = req.query.category_id;
    name = String(req.query.name);

    if(cat_id && name){
      query = `SELECT (select count(*) FROM category WHERE category_id = ${cat_id} AND name = ${name}) as counter, * FROM ?? WHERE category_id = ? AND name = ? LIMIT ? OFFSET ?`;
      connection.query(query, ['category',cat_id,name,limit,((page-1) * limit)], (err, rows) => {
        if (err) return res.status(500).send(errorHandler(err));
        res.status(200).send({count: rows[0]['counter'], rows});
      });
    }
    else if (cat_id) {
      query = `SELECT (select count(*) FROM category WHERE category_id = ${cat_id}) as counter, category_id,name,description,department_id FROM category WHERE category_id = ${cat_id} LIMIT ? OFFSET ?`;
    }
    else if (name) {
      query = `SELECT (select count(*) FROM category WHERE name = ${String(name)}) as counter, category_id,name,description,department_id FROM category WHERE name = ${String(name)} LIMIT ? OFFSET ?`;
    }else{
      return res.status(500).send(errorHandler({code: "CAT_01", sqlMessage: "No category exists with this ID."}));
    }
    
    connection.query(query, [ limit, ((page-1) * limit)], (err, rows) => {
      if (err) return res.status(500).send(errorHandler(err));
      res.status(200).send({count: rows[0]['counter'], rows});
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