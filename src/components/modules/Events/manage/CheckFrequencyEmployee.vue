<template>
      <div class="col-xs-12 col-sm-12 col-md-12">
            <q-data-table
              :data="this.checkFrequencyEmployeeList || []"
              :columns="columns"
              :config="config"
              @refresh="refresh"
            >
              <template slot="col-checkin" slot-scope="cell">
                <q-toggle v-model="check_inArray" @change="alterCheckin(cell.row.id)" left-label color="primary" :val="cell.row.id" />
              </template>
              <template slot="col-checkout" slot-scope="cell">
                <q-toggle v-model="check_outArray" color="primary" :val="cell.row.id" />
              </template>
            </q-data-table>
      </div>
</template>

<script>
    import moment from 'moment'
    import DataTableCheckEvent from '../../../../mixins/dataTableCheckFrequencyEmployee'
    import { CNPJ, CPF } from 'cpf_cnpj'
    import { clone } from 'quasar'
    export default {
      mixins: [DataTableCheckEvent],
      data () {
        return {
          checkFrequencyEmployeeList: [],
          check_outArray: []
        }
      },
      methods: {
        testes (v) {
          console.log(v)
        },
        goTo (value) {
          console.log(value)
        },
        refresh (done) {
          this.timeout = setTimeout(() => {
            done()
          }, 5000)
        },
        getCheckFrequencyEmployees () {
          this.$http.get('http://127.0.0.1:8000/api/manage/employee/checkList/' + this.$route.params.id)
            .then((response) => {
              console.log(response)
              this.checkFrequencyEmployeeList = response.data
            })
        },
        alterCheckin (v) {
          console.log(v)
          console.log(this.checkinArray)
        }
      },
      computed: {
        check_inArray () {
          return this.$store.state.events.employeeCheckinList
        },
        progress () {
          let x = this.event.quantityEmployees
          let val = (100 / x) * this.check_employee.length
          return val
        },
        event () {
          return this.$store.state.events.one || {}
        }
      },
      mounted () {
        this.$store.dispatch('employeeCheckinListGet', this.$route.params.id)
        this.getCheckFrequencyEmployees()
      },
      filters: {
        moment: function (date) {
          return moment(date).format('DD/MM/YYYY HH:mm')
        },
        document: function (value) {
          if (value.length === 11) {
            return CPF.format(value)
          }
          return CNPJ.format(value)
        }
      },
      watch: {
        pagination (value) {
          if (!value) {
            this.oldPagination = clone(this.config.pagination)
            this.config.pagination = false
            return
          }
          this.config.pagination = this.oldPagination
        },
        rowHeight (value) {
          this.config.rowHeight = value + 'px'
        },
        bodyHeight (value) {
          let style = {}
          if (this.bodyHeightProp !== 'auto') {
            style[this.bodyHeightProp] = value + 'px'
          }
          this.config.bodyStyle = style
        },
        bodyHeightProp (value) {
          let style = {}
          if (value !== 'auto') {
            style[value] = this.bodyHeight + 'px'
          }
          this.config.bodyStyle = style
        }
      }
    }
</script>

<style>
</style>
