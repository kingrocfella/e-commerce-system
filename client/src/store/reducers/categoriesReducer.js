
const initState = {
  categories: []
}

const CategoriesReducer = (state = initState, action) => {
  const { type, categories } = action;
  switch (type) {
    case "GET_CATEGORIES":
      return {
        categories: categories
      };
  
    default:
      return state;
  }
}

export default CategoriesReducer