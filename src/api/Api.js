import axios from "axios";

export default class Api {
  static uri = '/todos/'

  static getTodo () {
    return axios.get(this.uri)
  }
  static createTodo (data) {
    return axios.post(this.uri, data)
  }
  static editTodo (data) {
    return axios.patch(this.uri + data.id  , data)
  }
  static deleteTodo (id) {
    return axios.delete(this.uri + id)
  }
 
  

}