const connection = require("../connection");
const errorHandler = require("./errorResponse");

module.exports = {
  getAllShippingRegions(req,res){
    connection.query(`SELECT *  FROM shipping_region`, null, (err,rows) => {
      if (err) return res.status(500).send(errorHandler(err));
      res.status(200).send(rows);
    });
  },
  getShippingRegionsByID(req,res){
    if (!req.params.shipping_region_id) {
      return res.status(400).send({
        "error": {
          "status": 400,
          "code": "USR_02",
          "message": "The field(s) are/is required",
          "field": "shipping_region_id"
        }
      });
    }
    connection.query(`call orders_get_shipping_info(?)`, [req.params.shipping_region_id], (err,rows) => {
      if (err) return res.status(500).send(errorHandler(err));
      res.status(200).send(rows[0]);
    });
  }
}