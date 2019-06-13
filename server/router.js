const user = require("./Controllers/customers/userController");
const department = require("./Controllers/departments/departmentController");
const categories = require("./Controllers/categories/categoriesController");
const product = require("./Controllers/products/productController");
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
  //get category by ID
  app.get("/categories/:category_id", (req, res) => {
    categories.getCategoriesById(req,res);
  });
  //get category of a product
  app.get("/categories/inProduct/:product_id", (req, res) => {
    categories.getCategoriesByProduct(req,res);
  });
  //get category of a department
  app.get("/categories/inDepartment/:department_id", (req, res) => {
    categories.getCategoriesByDepartment(req,res);
  });

  //get products
  app.get("/products", (req, res) => {
    product.getProducts(req,res);
  });
  //search products
  app.get("/products/search", (req, res) => {
    product.searchProducts(req,res);
  });
  //get products by ID
  app.get("/products/:product_id", (req, res) => {
    product.getProductsById(req,res);
  });
  //get products by categoryID
  app.get("/products/inCategory/:category_id", (req, res) => {
    product.getProductsByCategoryId(req,res);
  });
  //get products by productID
  app.get("/products/inDepartment/:department_id", (req, res) => {
    product.getProductsByDepartmentId(req,res);
  });
  //get product details
  app.get("/products/:product_id/details", (req, res) => {
    product.getProductDetails(req,res);
  });
  //get product reviews
  app.get("/products/:product_id/reviews", (req, res) => {
    product.getProductReviews(req,res);
  });
  //post product reviews
  app.post("/products/:product_id/reviews", verifyToken, (req, res) => {
    product.postProductReviews(req,res);
  });
}