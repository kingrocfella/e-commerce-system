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
  }

}

