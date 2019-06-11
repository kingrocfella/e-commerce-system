const connection = require("../connection");
const errorHandler = require("./errorResponse");

module.exports = {
  getDepartments(req, res) {
    let query = "SELECT * FROM ??";
    connection.query(query, ['department'], (err, rows) => {
      if (err) return res.status(500).send(errorHandler(err));
      res.status(200).send(rows);
    });
  },
  getDepartmentsById(req,res){
    if(!req.params.department_id) return res.status(500).send(errorHandler({code: "USR_02", "sqlMessage": "The field example is empty."}));
    if(isNaN(req.params.department_id)) return res.status(500).send(errorHandler({code: "DEP_01", "sqlMessage": "The ID is not a number."}));
    let department_id = req.params.department_id;
    let query = "SELECT * FROM ?? WHERE department_id = ?";
    connection.query(query, ['department', department_id], (err, rows) => {
      if (err) return res.status(500).send(errorHandler(err));
      if(rows.length < 1) return res.status(500).send(errorHandler({code: "DEP_02", "sqlMessage": "ID does not exist"}));
      res.status(200).send(rows);
    });
  }
}