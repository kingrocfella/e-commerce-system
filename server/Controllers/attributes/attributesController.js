const connection = require("../connection");
const errorHandler = require("./errorResponse");

module.exports = {
  getAttributes(req,res){
    let query = "call catalog_get_attributes()";
    connection.query(query, null, (err, rows) => {
      if (err) return res.status(500).send(errorHandler(err));
      res.status(200).send(rows[0]);
    });
  },
  getAttributesByAttributeID(req,res){
    if(!req.params.attribute_id) return res.status(500).send(errorHandler({code: "USR_02", sqlMessage: "The field attribute_id is empty."}));
    let query = "SELECT * FROM ?? WHERE attribute_id = ?";
    connection.query(query, ['attribute', req.params.attribute_id], (err, rows) => {
      if (err) return res.status(500).send(errorHandler(err));
      res.status(200).send(rows[0]);
    });
  },
  getValuesFromAttribute(req,res){
    if(!req.params.attribute_id) return res.status(500).send(errorHandler({code: "USR_02", sqlMessage: "The field attribute_id is empty."}));
    let query = "call catalog_get_attribute_values(?)";
    connection.query(query, [req.params.attribute_id], (err, rows) => {
      if (err) return res.status(500).send(errorHandler(err));
      res.status(200).send(rows[0]);
    });
  },
  getAttributesByProductID(req,res){
    if(!req.params.product_id) return res.status(500).send(errorHandler({code: "USR_02", sqlMessage: "The field product_id is empty."}));
    let query = "call catalog_get_product_attributes(?)";
    connection.query(query, [req.params.product_id], (err, rows) => {
      if (err) return res.status(500).send(errorHandler(err));
      res.status(200).send(rows[0]);
    });
  }
}