import Vue from 'vue'
import Vuex from 'vuex'
import Api from '../api/Api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [],  //lista de todos
    filterTodos: "all"  //all-active-complete
  },
  getters: {
    todos(state) {
      return state.todos
    },
    filterTodos(state) {
      return state.filterTodos
    },
  },
  mutations: {
    todos(state, todos) {
      state.todos = todos
    },
    filterTodos(state, filterTodos) {
      state.filterTodos = filterTodos
    },
  },
  actions: {
    todos (context) {
      Api.getTodo().then(response => {
        context.commit('todos', response.data)
      })
    },
    filterTodos (context,value) {
        context.commit('filterTodos', value)
  
    }
  },
  modules: {
  }
})
