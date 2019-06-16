
const initState = {
  addtocart: []
}

const AddToCartReducer = (state = initState, action) => {
  const { type, addtocart } = action;
  switch (type) {
    case "ADD_TO_CART":
      return {
        ...state,
        addtocart: [...state.addtocart, addtocart]
      };
  
    default:
      return state;
  }
}

export default AddToCartReducer