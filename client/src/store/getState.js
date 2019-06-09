let GetState = {
  auth: {
    token: localStorage.getItem("token"),
    email: localStorage.getItem("email"),
    name: localStorage.getItem("name"),
    isUserLoggedIn: localStorage.getItem("isUserLoggedIn"),
    customer_id: localStorage.getItem("customer_id")
  }
}

export default GetState;