
module.exports = ({ code, sqlMessage }) => {
  switch (code) {
    
    case ("USR_02"):
      return {
        "error": {
          "status": 500,
          "code": code,
          "message": sqlMessage,
          "field": ""
        }
      }
    case ("CAT_01"):
      return {
        "error": {
          "status": 500,
          "code": code,
          "message": sqlMessage,
          "field": ""
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
