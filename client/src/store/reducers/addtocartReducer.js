
const initState = {
  addtocart: ""
}

const AddToCartReducer = (state = initState, action) => {
  const { type, addtocart } = action;
  switch (type) {
    case "ADD_TO_CART":
      return {
        addtocart
      };
  
    default:
      return state;
  }
}

export default AddToCartReducer