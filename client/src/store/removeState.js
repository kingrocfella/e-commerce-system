const removeState = () => {
  localStorage.removeItem("customer_id");
  localStorage.removeItem("token");
  localStorage.removeItem("email");
  localStorage.removeItem("name");
  localStorage.removeItem("isUserLoggedIn");
}

export default removeState;