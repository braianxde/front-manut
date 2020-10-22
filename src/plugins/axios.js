import axios from "axios";
import Vue from "vue";

export default class ApiService {
  static async get(endpoint) {
    try {
      endpoint = process.env.VUE_APP_API_ENDPOINT + endpoint;

      const request = await axios.get(endpoint, this.mountHeaders())
        .catch(error => {
          Vue.toasted.error('Something goes wrong webservice');
          console.log(error.response);
        })
        .then(response => {
          return response;
        })

      if(!request.data.success){
        Vue.toasted.error(request.data.msg);
      }

      return request.data.data;
    } catch (error) {
      Vue.toasted.error('Something goes wrong webservice');
      console.log(error);
    }
  }

  static async post(endpoint, body) {
    try {
      endpoint = process.env.VUE_APP_API_ENDPOINT + endpoint;

      const request = await axios.post(
        endpoint,
        body,
        this.mountHeaders(),
      )
        .catch(function (error) {
          Vue.toasted.error('Something goes wrong webservice');
          console.log(error)
        })
        .then(function (response) {
          return response;
        })

      if(!request.data.success){
        Vue.toasted.error(request.data.msg);
      }

      return request.data;
    } catch (error) {
      Vue.toasted.error('Something goes wrong webservice');
      console.log(error);
    }
  }

  static mountHeaders() {
    return {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    };
  }
}
