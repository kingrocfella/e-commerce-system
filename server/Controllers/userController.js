const md5 = require("md5");
const jwt = require("jsonwebtoken");
const config = require("../config");
const connection = require("./connection");
const errorHandler = require("./errorController");
const validResponse = require("./validResponseController");
connection.connect();

module.exports = {
  register(req, res) {
    if (!req.body.email || !req.body.password || !req.body.name) {
      let empty = [];
      if (!req.body.email) empty.push("Email");
      if (!req.body.password) empty.push("Password");
      if (!req.body.name) empty.push("Name");
      return res.status(400).send({
        "error": {
          "status": 400,
          "code": "USR_02",
          "message": "The field(s) are/is required",
          "field": empty
        }
      });
    }
    let password = md5(String(req.body.password));
    let query = `INSERT INTO customer (customer_id, name,email,password) VALUES (?,?,?,?)`;
    let customer_id = Math.floor((Math.random() * 999999999) + 111111111);
    connection.query(query, [customer_id, req.body.name, req.body.email, password], (err, rows) => {
      if (err) return res.status(500).send(errorHandler(err));
      let token = jwt.sign({ id: customer_id }, config.secret, { expiresIn: 86400 });
      let customer = { customer_id: customer_id, name: req.body.name, email: req.body.email }
      res.status(200).send(validResponse({ type: "register", token, customer }));
    });
  },
  login(req, res) {
    if (!req.body.email || !req.body.password) {
      let empty = [];
      if (!req.body.email) empty.push("Email");
      if (!req.body.password) empty.push("Password");
      return res.status(400).send({
        "error": {
          "status": 400,
          "code": "USR_02",
          "message": "The field(s) are/is required",
          "field": empty
        }
      });
    }
    let password = md5(String(req.body.password));
    let query = "SELECT * FROM ?? WHERE email = ? AND password = ?";

    connection.query(query, ['customer', String(req.body.email), password], (err, rows) => {
      if (err) return res.status(500).send(errorHandler(err));
      if (rows.length < 1) return res.status(500).send(errorHandler({ code: "INVALID DETAILS" }))
      let token = jwt.sign({ id: rows[0]["customer_id"] }, config.secret, { expiresIn: 86400 });
      res.status(200).send(validResponse({ type: "login", token, customer: rows[0] }));
    });
  },
  getUsers(req, res) {
    let query = "SELECT * FROM ?? WHERE user_id = ?";
    connection.query(query, ['user', req.user_id], (err, results) => {
      if (err) {
        return res.status(500).send({
          "message": err.message
        })
      }
      res.status(200).send({
        user: results
      });
    })
  }

}

