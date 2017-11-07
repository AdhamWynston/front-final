import 'vue-resource'
import Vue from 'vue'

export default {
  state: {
    manageList: [],
    one: {},
    manageEmployees: [],
    employeeCheckinList: []
  },
  mutations: {
    update (state, config) {
      state[config.state] = config.data
    }
  },
  actions: {
    manageListGet (context, id) {
      return Vue.http.get('http://127.0.0.1:8000/api/manage/employee/checkList/' + id)
        .then((res) => {
          context.commit('update', {
            state: 'manageList',
            data: res.data
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
    employeeCheckinListGet (context, id) {
      return Vue.http.get('http://127.0.0.1:8000/api/manage/employee/checkin/events/' + id)
        .then((res) => {
          context.commit('update', {
            state: 'employeeCheckinList',
            data: res.data
          })
        })
    }
  }
}
