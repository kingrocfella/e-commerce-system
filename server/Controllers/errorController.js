
module.exports = ({ code, sqlMessage }) => {
  switch (code) {
    case ("ER_DUP_ENTRY"): 
      return {
        "error": {
          "status": 400,
          "code": "USR_02",
          "message": "The email already exists.",
          "field": "email"
        }
      }
      return res;
      break;
    case ("NO TOKEN"): 
      return {
        "error": {
          "status": 403,
          "code": "AUT_01",
          "message": "Authorization code is empty",
          "field": ""
        }
      }
      return res;
      break;
    case ("AUTH FAILED"): 
      return {
        "error": {
          "status": 401,
          "code": "AUT_02",
          "message": "Access Unauthorized.",
          "field": ""
        }
      }
      return res;
      break;
    case ("INVALID DETAILS"): 
      return  {
        "error": {
          "status": 500,
          "code": "USR_01",
          "message": "Email or Password is invalid",
          "field": ""
        }
      }
      return res;
      break;
    case ("HA_ERR_AUTOINC_ERANGE"): 
      return  {
        "error": {
          "status": 500,
          "code": "USR_07",
          "message": sqlMessage,
          "field": ""
        }
      }
      return res;
      break;


    default:
      break;
  }
}