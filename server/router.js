const user = require("./Controllers/customers/userController");
const department = require("./Controllers/departments/departmentController");
const categories = require("./Controllers/categories/categoriesController");
const verifyToken = require("./middlewares/verifyToken");

module.exports = (app) => {
  //login route
  app.post("/customers/login", (req, res) => {
    user.login(req, res);
  });
  //get all departments
  // app.get("/departments", verifyToken, (req, res) => {
  //   user.getUsers(req,res);
  // })
  //register users
  app.post("/customers", (req, res) => {
    user.register(req, res);
  });

  //get all departments
  app.get("/departments", (req, res) => {
    department.getDepartments(req,res);
  });
  //get department by ID
  app.get("/departments/:department_id", (req, res) => {
    department.getDepartmentsById(req,res);
  });

  //get all categories
  app.get("/categories", (req, res) => {
    categories.getCategories(req,res);
  });

}