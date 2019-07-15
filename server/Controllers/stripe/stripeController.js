const connection = require("../connection");
const stripe = require("stripe")("sk_test_lomdOfxbm7QDgZWvR82UhV6D");

module.exports = {
  createStrikeToken(req, res) {
    let { number, exp_month, exp_year, cvc } = req.body;
    exp_month = Number(exp_month);
    exp_year = Number(exp_year);
    stripe.tokens.create({
      card: {
        number,
        exp_month,
        exp_year,
        cvc
      }
    }, (err, token) => {
      if (err) res.status(500).send(err);
      res.status(200).send(token.id);
    });
  },
  async stripeCharge(req, res) {
    let { amount, currency, description, stripeToken, order_id } = req.body;
    if (!amount || !description || !order_id || !stripeToken) {
      let empty = [];
      if (!amount) empty.push("Amount");
      if (!description) empty.push("Description");
      if (!order_id) empty.push("Order_id");
      if (!stripeToken) empty.push("stripeToken");
      return res.status(400).send({
        "error": {
          "status": 400,
          "code": "USR_02",
          "message": "The field(s) are/is required",
          "field": empty
        }
      });
    }
    //convert amount to cents
    amount = Math.ceil(amount*100);
    try {
      let { status } = await stripe.charges.create({
        amount,
        currency,
        description,
        source: stripeToken
      });
      res.json({ status });
    } catch (err) {
      res.status(500).send(err);
    }
  }
}