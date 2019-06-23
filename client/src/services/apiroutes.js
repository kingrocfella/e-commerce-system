import axios from 'axios';
const baseURL = "http://localhost:5000"

export default {
  login(payload) {
    return axios({
      method: 'post',
      url: baseURL + '/customers/login',
      data: payload
    });
  },
  register(payload) {
    return axios({
      method: 'post',
      url: baseURL + '/customers',
      data: payload
    });
  },
  getDepartments() {
    return axios({
      method: 'get',
      url: baseURL + '/departments'
    });
  },
  getCategories(id) {
    return axios({
      method: 'get',
      url: baseURL + '/categories/inDepartment/'+id
    });
  },
  getProductsByDeptID({id, page, desc_length}) {
    return axios({
      method: 'get',
      url: `${baseURL}/products/inDepartment/${id}?description_length=${desc_length}&page=${page}`
    });
  },
  getProductsByCatID({id, page, desc_length}) {
    return axios({
      method: 'get',
      url: `${baseURL}/products/inCategory/${id}?description_length=${desc_length}&page=${page}`
    });
  },
  getAllProducts(payload) {
    return axios({
      method: 'get',
      url: baseURL + '/products?description_length='+payload['desc_length']+'&page='+payload['page']
    });
  },
  searchProducts(payload) {
    return axios({
      method: 'get',
      url: baseURL + '/products/search?description_length='+payload['desc_length']+'&page='+payload['page']+'&query_string='+payload['query_string']
    });
  },
  getProductDetails(id){
    return axios({
      method: 'get',
      url: `${baseURL}/products/${id}/details` 
    });
  },
  generateUniqueCartID(){
    return axios({
      method: 'get',
      url: `${baseURL}/shoppingcart/generateUniqueId` 
    });
  },
  getAttributesByProductID(id){
    return axios({
      method: 'get',
      url: `${baseURL}/attributes/inProduct/${id}` 
    });
  },
  addToCart(payload){
    return axios({
      method: 'post',
      url: `${baseURL}/shoppingcart/add`,
      data: payload,
      headers: { 'USER-KEY': payload['token'] }
    });
  },
  getProductsFromCart(cart_id){
    return axios({
      method: 'get',
      url: `${baseURL}/shoppingcart/${cart_id}` 
    });
  },
  deleteProductFromCart(item_id){
    return axios({
      method: 'delete',
      url: `${baseURL}/shoppingcart/removeProduct/${item_id}` 
    });
  },
  getTotalAmount(cart_id){
    return axios({
      method: 'get',
      url: `${baseURL}/shoppingcart/totalAmount/${cart_id}` 
    });
  },
  getUserDetails(token){
    return axios({
      method: 'get',
      url: `${baseURL}/customer`,
      headers: { 'USER-KEY': token }
    });
  },
  updateUserDetails(payload){
    return axios({
      method: 'put',
      url: `${baseURL}/customer`,
      data: payload,
      headers: { 'USER-KEY': payload['token'] }
    });
  },
  getShippingRegions(){
    return axios({
      method: 'get',
      url: `${baseURL}/shipping/regions` 
    });
  },
  getShippingRegionsByID(id){
    return axios({
      method: 'get',
      url: `${baseURL}/shipping/regions/${id}` 
    });
  },
  getAllTaxes(){
    return axios({
      method: 'get',
      url: `${baseURL}/tax` 
    });
  },
  createNewOrder(payload){
    return axios({
      method: 'post',
      url: `${baseURL}/orders`,
      data: payload,
      headers: { 'USER-KEY': payload['token'] }
    });
  }

}

