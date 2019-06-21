const md5 = require("md5");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const connection = require("../connection");
const errorHandler = require("./errorResponse");
const validResponse = require("./validResponse");
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
      if (rows.length < 1) return res.status(500).send(errorHandler({ code: "INVALID DETAILS" }));
      let token = jwt.sign({ id: rows[0]["customer_id"] }, config.secret, { expiresIn: 86400 });
      res.status(200).send(validResponse({ type: "login", token, customer: rows[0] }));
    });
  },
  getUsers(req, res) {
    let query = "SELECT * FROM ?? WHERE user_id = ?";
    connection.query(query, ['user', req.user_id], (err, results) => {
      if (err) return res.status(500).send(errorHandler(err));
      res.status(200).send({user: results});
    });
  },
  update(req, res){
    if (!req.body.email || !req.body.name) {
      let empty = [];
      if (!req.body.email) empty.push("Email");
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
    let query = "call customer_update_account(?,?,?,?,?,?,?)"
    connection.query(query, [req.customer_id, req.body.name, req.body.email, password, req.body.day_phone, req.body.eve_phone, req.body.mob_phone], (err, results) => {
      if (err) return res.status(500).send(errorHandler(err));
    });
    connection.query(`SELECT * from customer WHERE customer_id = ?`,[req.customer_id], (err, rows) => {
      if (err) return res.status(500).send(errorHandler(err));
      res.status(200).send(validResponse({type: 'userdetails', token: null, customer: rows[0]}));
    });
  },
  getUserDetails(req, res){
    connection.query(`SELECT * from customer WHERE customer_id = ?`,[req.customer_id], (err, rows) => {
      if (err) return res.status(500).send(errorHandler(err));
      res.status(200).send(validResponse({type: 'userdetails', token: null, customer: rows[0]}));
    });
  },
  updateUserAddress(req, res){
    if (!req.body.address_1 || !req.body.city || !req.body.region || !req.body.postal_code || !req.body.country || !req.body.shipping_region_id) {
      let empty = [];
      if (!req.body.address_1) empty.push("address_1");
      if (!req.body.city) empty.push("city");
      if (!req.body.region) empty.push("region");
      if (!req.body.postal_code) empty.push("postal_code");
      if (!req.body.country) empty.push("country");
      if (!req.body.shipping_region_id) empty.push("shipping_region_id");
      return res.status(400).send({
        "error": {
          "status": 400,
          "code": "USR_02",
          "message": "The field(s) are/is required",
          "field": empty
        }
      });
    }

    let query = "call customer_update_address(?,?,?,?,?,?,?,?)"
    connection.query(query, [req.customer_id, req.body.address_1, req.body.address_2, req.body.city, req.body.region, req.body.postal_code, req.body.country, req.body.shipping_region_id], (err, rows) => {
      if (err) return res.status(500).send(errorHandler(err));
    });
    connection.query(`SELECT * from customer WHERE customer_id = ${req.customer_id}`,null, (err, rows) => {
      if (err) return res.status(500).send(errorHandler(err));
      res.status(200).send(validResponse({type: 'userdetails', token: null, customer: rows[0]}));
    });
  },
  updateUserCreditCard(req, res){
    if (!req.body.credit_card) {
      let empty = [];
      if (!req.body.credit_card) empty.push("credit_card");
      return res.status(400).send({
        "error": {
          "status": 400,
          "code": "USR_02",
          "message": "The field(s) are/is required",
          "field": empty
        }
      });
    }

    let query = "call customer_update_credit_card(?,?)";
    connection.query(query, [req.customer_id, req.body.credit_card], (err, rows) => {
      if (err) return res.status(500).send(errorHandler(err));
    });
    connection.query(`SELECT * from customer WHERE customer_id = ${req.customer_id}`,null, (err, rows) => {
      if (err) return res.status(500).send(errorHandler(err));
      res.status(200).send(validResponse({type: 'userdetails', token: null, customer: rows[0]}));
    });
  }
}

