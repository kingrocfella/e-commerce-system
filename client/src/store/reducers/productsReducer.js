
const initState = {
  Products: []
}

const ProductsReducer = (state = initState, action) => {
  const { type, products } = action;
  switch (type) {
    case "GET_PRODUCTS":
      return {
        products: products
      };
  
    default:
      return state;
  }
}

export default ProductsReducer;