
const initState = {
  isUserLoggedIn: false,
  token: "",
  email: "",
  name: "",
  customer_id:""
}

const authReducer = (state = initState, action) => {
  const { type, authData } = action;
  switch (type) {
    case "LOGIN_SUCCESS":
      return {
        isUserLoggedIn: true,
        token: authData.token,
        email: authData.email,
        name: authData.name,
        customer_id: authData.customer_id
      };
  
    default:
      return state;
  }
}

export default authReducer