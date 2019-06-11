
const initState = {
  departments: []
}

const DepartmentsReducer = (state = initState, action) => {
  const { type, departments } = action;
  switch (type) {
    case "GET_DEPARTMENTS":
      return {
        departments: departments
      };
  
    default:
      return state;
  }
}

export default DepartmentsReducer