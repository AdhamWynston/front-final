import 'vue-resource'
import Vue from 'vue'

export default {
  state: {
    list: [],
    employeeList: [],
    one: {},
    manageEmployees: []
  },
  mutations: {
    update (state, config) {
      state[config.state] = config.data
    }
  },
  actions: {
    eventsList (context) {
      return Vue.http.get('http://127.0.0.1:8000/api/events')
        .then((res) => {
          context.commit('update', {
            state: 'list',
            data: res
          })
        })
    },
    manageGet (context, id) {
      return Vue.http.get('http://127.0.0.1:8000/api/manage/check/events/' + id)
        .then((res) => {
          context.commit('update', {
            state: 'manageEmployees',
            data: res.data
          })
        })
    },
    eventsGet (context, id) {
      return Vue.http.get('http://127.0.0.1:8000/api/events/' + id)
        .then((res) => {
          context.commit('update', {
            state: 'one',
            data: res.data
          })
        })
    },
    employeesManageList (context) {
      return Vue.http.get('http://127.0.0.1:8000/api/employees?where[status]=1')
        .then((res) => {
          context.commit('update', {
            state: 'employeeList',
            data: res
          })
        })
    },
    eventInsert (context, data) {
      return Vue.http.post('http://127.0.0.1:8000/api/events', data)
    },
    manageInsert (context, data) {
      return Vue.http.post('http://127.0.0.1:8000/api/manage/events', data)
    },
    manageEmployeeList (context, config) {
      return Vue.http.post('http://127.0.0.1:8000/api/manage/employee/list' + config.id, config.data)
    },
    eventUpdate (context, config) {
      return Vue.http.put('http://127.0.0.1:8000/api/events/' + config.id, config.data)
    },
    eventDesactive (context, id) {
      return Vue.http.delete('http://127.0.0.1:8000/api/events/' + id)
    }
  }
}
