
const persistState = ({ auth: { isUserLoggedIn, token, email, name, customer_id }, addtocart: { addtocart } }) => {
  if (isUserLoggedIn) localStorage.setItem("isUserLoggedIn", isUserLoggedIn);
  if (token) localStorage.setItem("token", token);
  if (email) localStorage.setItem("email", email);
  if (name) localStorage.setItem("name", name);
  if (customer_id) localStorage.setItem("customer_id", customer_id);
  if (addtocart) localStorage.setItem("cart_items", addtocart);
}

export default persistState

