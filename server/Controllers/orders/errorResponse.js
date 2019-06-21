
module.exports = ({ code, sqlMessage }) => {
  switch (code) {
    case ("USR_02"):
      return {
        "error": {
          "status": 500,
          "code": "USR_02",
          "message": sqlMessage,
          "field": "department_id"
        }
      }

    default: return {
      "error": {
        "status": 500,
        "message": sqlMessage,
        "field": ""
      }
    }
  }
}
