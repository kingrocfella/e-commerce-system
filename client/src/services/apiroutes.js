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
      url: baseURL + '/categories?department_id='+id
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
  }

}

