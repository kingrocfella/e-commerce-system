const user = require("./Controllers/customers/userController");
const department = require("./Controllers/departments/departmentController");
const categories = require("./Controllers/categories/categoriesController");
const product = require("./Controllers/products/productController");
const shoppingcart = require("./Controllers/shoppingcart/shoppingcartController");
const attributes = require("./Controllers/attributes/attributesController");
const orders = require("./Controllers/orders/orderController");
const tax = require('./Controllers/taxes/taxController');
const shipping = require('./Controllers/shipping/shippingController');
const verifyToken = require("./middlewares/verifyToken");
const multer  = require('multer');
const upload = multer();

module.exports = (app) => {

  //----------------Customers APIs---------------------------------------------

  //login route
  app.post("/customers/login", (req, res) => {
    user.login(req, res);
  });
  //register users
  app.post("/customers", upload.none(), (req, res) => {
    user.register(req, res);
  });
  //update user
  app.put("/customer", upload.none(), verifyToken, (req, res) => {
    user.update(req, res);
  });
  //get user info
  app.get("/customer", verifyToken, (req, res) => {
    user.getUserDetails(req, res);
  });
  //update user address
  app.put("/customers/address", upload.none(), verifyToken, (req, res) => {
    user.updateUserAddress(req, res);
  });
  //update user credit card details
  app.put("/customers/creditCard", upload.none(), verifyToken, (req, res) => {
    user.updateUserCreditCard(req, res);
  });


  //----------------DEPARTMENT APIS--------------------------------------------------

  //get all departments
  app.get("/departments", (req, res) => {
    department.getDepartments(req,res);
  });
  //get department by ID
  app.get("/departments/:department_id", (req, res) => {
    department.getDepartmentsById(req,res);
  });


  //------------------CATEGORIES APIS--------------------------------------------------

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


  //----------------------PRODUCTS APIS--------------------------------------------------

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
  //get products by departmentID
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
  app.post("/products/:product_id/reviews", verifyToken, upload.none(), (req, res) => {
    product.postProductReviews(req,res);
  });


  //----------------SHOPPING CART APIS.--------------------------------------------------------

  //generate unique card_id
  app.get("/shoppingcart/generateUniqueId", (req,res) => {
    shoppingcart.generateUniqueID(req,res);
  });
  //add item to cart
  app.post("/shoppingcart/add", verifyToken, upload.none(), (req,res) => {
    shoppingcart.addToCart(req,res);
  });
  //get items from cart
  app.get("/shoppingcart/:cart_id", (req,res) => {
    shoppingcart.getProductsFromCart(req,res);
  });
  //update item quantity in cart
  app.put("/shoppingcart/update/:item_id", upload.none(), (req,res) => {
    shoppingcart.updateProductsInCart(req,res);
  });
  //empty cart
  app.delete("/shoppingcart/empty/:cart_id", (req,res) => {
    shoppingcart.emptyCart(req,res);
  });
  //move product to cart
  app.get("/shoppingcart/moveToCart/:item_id", (req,res) => {
    shoppingcart.moveProductToCart(req,res);
  });
  //get total amount in cart
  app.get("/shoppingcart/totalAmount/:cart_id", (req,res) => {
    shoppingcart.getTotalAmountInCart(req,res);
  });
  //save product for later
  app.get("/shoppingcart/saveForLater/:item_id", (req,res) => {
    shoppingcart.saveProductForLater(req,res);
  });
  //get saved product for later
  app.get("/shoppingcart/getSaved/:cart_id", (req,res) => {
    shoppingcart.getSavedProductForLater(req,res);
  });
  //delete product in cart
  app.delete("/shoppingcart/removeProduct/:item_id", (req,res) => {
    shoppingcart.removeProductInCart(req,res);
  });


  //----------------------------ATTRIBUTES APIS-------------------------------------------------------------

  //get all attributes
  app.get("/attributes", (req,res) => {
    attributes.getAttributes(req,res);
  });
  //get attributes by ID
  app.get("/attributes/:attribute_id", (req,res) => {
    attributes.getAttributesByAttributeID(req,res);
  });
  //get values from attribute
  app.get("/attributes/values/:attribute_id", (req,res) => {
    attributes.getValuesFromAttribute(req,res);
  });
  //get attributes with product ID
  app.get("/attributes/inProduct/:product_id", (req,res) => {
    attributes.getAttributesByProductID(req,res);
  });


  //-------------------------------ORDERS APIS----------------------------------------------------------------
  
  //create order
  app.post("/orders", verifyToken, upload.none(), (req,res) => {
    orders.createOrder(req,res);
  });
  //get orders by customer
  app.get("/orders/inCustomer", verifyToken,(req,res) => {
    orders.getUserOrders(req,res);
  });
  //get order details
  app.get("/orders/:order_id", verifyToken,(req,res) => {
    orders.getOrderDetails(req,res);
  });
  //get info about order
  app.get("/orders/shortDetail/:order_id", verifyToken,(req,res) => {
    orders.getOrderShortDetail(req,res);
  });


  //------------------------- Taxes APIS-----------------------------------------------------------------------

  //get all taxes
  app.get("/tax",(req,res) => {
    tax.getAllTaxes(req,res);
  });
  //get taxes by ID
  app.get("/tax/:tax_id",(req,res) => {
    tax.getTaxesByID(req,res);
  });


  //----------------------SHIPPING APIS ------------------------------------------------------------------------
  
  //get shipping regions
  app.get("/shipping/regions",(req,res) => {
    shipping.getAllShippingRegions(req,res);
  });
  //get shipping regions by ID
  app.get("/shipping/regions/:shipping_region_id",(req,res) => {
    shipping.getShippingRegionsByID(req,res);
  });

}