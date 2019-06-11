const connection = require("../connection");
const errorHandler = require("./errorResponse");
const validResponse = require("./validResponse");

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
      return res.status(500).send(errorHandler({code: "CAT_01", sqlMessage: "Don't exist category with this ID."}));
    }
    
    connection.query(query, ['category', (dep_id || cat_id || name)], (err, rows) => {
      if (err) return res.status(500).send(errorHandler(err));
      res.status(200).send({count: rows.length, rows});
    });
  }
}