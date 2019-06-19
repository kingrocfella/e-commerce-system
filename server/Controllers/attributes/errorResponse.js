
module.exports = ({ code, sqlMessage }) => {
  switch (code) {
    case ("CAT_01"):
      return {
        "error": {
          "status": 500,
          "code": "CAT_01",
          "message": "No category exists with this ID.",
          "field": ""
        }
      }

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
        "code": "CAT_01",
        "message": sqlMessage,
        "field": ""
      }
    }
  }
}
