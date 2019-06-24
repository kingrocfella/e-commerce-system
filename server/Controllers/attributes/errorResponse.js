
module.exports = ({ code, sqlMessage }) => {
  switch (code) {
    case ("USR_02"):
      return {
        "error": {
          "status": 500,
          "code": "USR_02",
          "message": "The field example is empty.",
          "field": "category_id"
        }
      }

    default: return {
      "error": {
        "status": 500,
        "code": "ATR_01",
        "message": sqlMessage,
        "field": ""
      }
    }
  }
}
