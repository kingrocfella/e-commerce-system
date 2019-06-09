
const persistState = ({auth: { isUserLoggedIn, token, email, name, customer_id }}) => {
  localStorage.setItem("isUserLoggedIn", isUserLoggedIn);
  localStorage.setItem("token", token);
  localStorage.setItem("email", email);
  localStorage.setItem("name", name);
  localStorage.setItem("customer_id", customer_id);
}

export default persistState

