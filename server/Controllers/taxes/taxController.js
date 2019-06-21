const connection = require("../connection");
const errorHandler = require("./errorResponse");

module.exports = {
  getAllTaxes(req,res){
    connection.query(`SELECT * FROM tax`,null, (err,rows) => {
      if (err) return res.status(500).send(errorHandler(err));
      res.status(200).send(rows);
    });
  },
  getTaxesByID(req,res){
    if (!req.params.tax_id) {
      return res.status(400).send({
        "error": {
          "status": 400,
          "code": "USR_02",
          "message": "The field(s) are/is required",
          "field": "tax_id"
        }
      });
    }
    connection.query(`SELECT * FROM tax WHERE tax_id = ?`,[req.params.tax_id], (err,rows) => {
      if (err) return res.status(500).send(errorHandler(err));
      res.status(200).send(rows);
    });
  }
}