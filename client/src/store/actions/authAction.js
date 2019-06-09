const authAction =  (authData) => {
  return {type: "LOGIN_SUCCESS", authData};
}

export default authAction;