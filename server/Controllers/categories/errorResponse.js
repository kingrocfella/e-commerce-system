
module.exports = ({ code, sqlMessage }) => {
  switch (code) {
    case ("CAT_01"):
      return {
        "error": {
          "status": 500,
          "code": "CAT_01",
          "message": sqlMessage,
          "field": "category_id"
        }
      }

    default: return {
      "error": {
        "status": 500,
        "code": "CAT_01",
        "message": sqlMessage,
        "field": ""
      }
    }
  }
}
