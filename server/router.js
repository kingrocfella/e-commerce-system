const user = require("./Controllers/userController");
const verifyToken = require("./middlewares/verifyToken");

module.exports = (app) => {
  //login route
  app.post("/customers/login", (req, res) => {
    user.login(req, res);
  })
  //get all users
  app.get("/users/all", verifyToken, (req, res) => {
    user.getUsers(req,res);
  })
  //register users
  app.post("/customers", (req, res) => {
    user.register(req, res);
  })
}